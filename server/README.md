To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000

## Better Auth

This project uses [Better Auth](https://www.betterauth.dev/) for authentication. The auth setup is integrated with Hono routes and includes automatic profile creation on sign-up.

### Features

- Email/password authentication with secure sign-up
- Automatic user profile creation on successful registration
- Seamless integration with Hono HTTP framework
- Database persistence with Drizzle ORM

### Auth Routes

- `POST /auth/sign-up/email` - Create new account with email
- `GET/POST /auth/*` - All other auth endpoints (login, logout, etc.)

### Implementation

The authentication layer intercepts the sign-up flow to automatically create a user profile in the database when a new account is registered. See [auth-route.ts](../src/routes/auth-route.ts) for implementation details.

## Logging with Pino

This project uses [Pino](https://getpino.io/) for high-performance JSON logging, integrated with Hono through [hono-pino](https://github.com/honojs/middleware/tree/main/packages/pino).

### Features

- Structured JSON logging for production environments
- Pretty-printed logs in development with [pino-pretty](https://github.com/pinojs/pino-pretty)
- Automatic request ID generation (UUID) for request tracing
- Integrated HTTP request/response logging

### Logger Middleware

The pino logger is configured in [pino-logger.ts](../src/middlewares/pino-logger.ts) and provides:

- Pretty-formatted console output in development
- Request correlation via unique IDs
- Performance-optimized JSON logging in production

### Usage

The logger is automatically integrated into the Hono app via the middleware and logs all HTTP requests with request IDs for request tracing and debugging.

## API Documentation with Scalar

This project uses [Scalar](https://scalar.com/) for interactive API documentation and testing.

### Features

- Interactive OpenAPI documentation UI
- Built-in API request testing and debugging
- Real-time schema validation
- Beautiful, modern API documentation interface

### Access API Docs

The Scalar API documentation is available at:

```
http://localhost:3000/reference
```

### Implementation

Scalar is integrated with Hono to automatically generate and serve OpenAPI documentation for all API endpoints. This provides a user-friendly interface to explore, test, and debug API endpoints without requiring external tools.
