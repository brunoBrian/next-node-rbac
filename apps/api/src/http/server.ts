/* eslint-disable prettier/prettier */
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { createAccount } from './routes/auth/create-account'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'SaaS',
      description: 'Specifications for the API of the SaaS platform.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyCors)

app.register(createAccount)

app.setErrorHandler((error, _, reply) => {
  console.error(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})
