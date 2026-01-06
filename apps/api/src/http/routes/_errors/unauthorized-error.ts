export class UnauthorizedError extends Error {
  constructor(message?: string) {
    // eslint-disable-next-line prettier/prettier
    super(message ?? "Unauthorized.")
  }
}
