import { env } from "@saas/env"
import Redis from "ioredis"

export const redis = new Redis(env.REDIS_URL)
