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
