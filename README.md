# FoodWaste

A full-stack application designed to help users reduce food waste by better managing their food inventory and meal planning.

## Development Environment

[![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black)](https://www.linux.org/)
[![Fedora](https://img.shields.io/badge/Fedora-51A2DA?style=flat&logo=fedora&logoColor=white)](https://fedoraproject.org/)
[![KDE Plasma](https://img.shields.io/badge/KDE_Plasma_43-1D99F3?style=flat&logo=kde&logoColor=white)](https://kde.org/plasma/)
[![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/)

Coded on Fedora Linux with KDE Plasma 43 desktop environment using VS Code.

## Tech Stack

### Frontend

[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

**Why this stack?**

- **React**: Provides a component-based architecture that makes building interactive, dynamic user interfaces simple and maintainable. Perfect for creating responsive food inventory dashboards and meal tracking features.
- **TypeScript**: Adds static type safety to JavaScript, catching errors at development time rather than runtime. Essential for reducing bugs in a feature-rich application.
- **Vite**: Offers lightning-fast development server startup and optimized production builds. Significantly improves developer experience with instant module replacement (HMR).

### Backend

[![Bun](https://img.shields.io/badge/Bun-000000?style=flat&logo=bun&logoColor=white)](https://bun.sh/)
[![Hono](https://img.shields.io/badge/Hono-F0DB4F?style=flat&logo=hono&logoColor=black)](https://hono.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Zod](https://img.shields.io/badge/Zod-3E67AC?style=flat&logo=zod&logoColor=white)](https://zod.dev/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5E1A5?style=flat&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)

**Why this stack?**

- **Bun**: Modern JavaScript runtime and package manager designed for speed and developer experience. Offers faster startup times, built-in bundling, and native TypeScript support without compilation steps. A more performant alternative to traditional Node.js runtimes.
- **Hono**: Lightweight, ultra-fast web framework that works seamlessly with Bun and edge runtimes. Provides a clean routing API with minimal overhead, making it perfect for building high-performance REST APIs and microservices.
- **TypeScript**: Ensures type safety across your entire backend, reducing runtime errors and improving code maintainability as the application grows.
- **Zod**: TypeScript-first schema validation library that provides runtime type checking and validation. Ensures API requests and responses conform to expected schemas, catching invalid data early.
- **Drizzle ORM**: Type-safe, lightweight ORM that provides excellent developer experience. Enables safe database operations with SQL flexibility and TypeScript integration.

### Infrastructure

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=flat&logo=docker&logoColor=white)](https://docs.docker.com/compose/)

**Why this stack?**

- **Docker & Docker Compose**: Ensures consistent development and production environments. Simplifies deployment and makes it easy for other developers to get the project running locally without complex setup procedures.

### Database

[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

**Why this stack?**

- **PostgreSQL**: Robust, open-source relational database known for reliability and advanced features. Provides ACID compliance, excellent performance, and strong data integrity—ideal for managing food inventory and user data in a production environment.

## Project Structure

```
FoodWaste/
├── client/           # React + TypeScript frontend
│   ├── src/
│   ├── public/
│   └── vite.config.ts
└── server/           # Node.js + TypeScript backend
    ├── src/
    ├── db/          # Database schema (Drizzle)
    └── Dockerfile
```

### Installation

1. **Start the backend and database:**

```bash
cd server
docker compose up -d
```

2. **Install frontend dependencies:**

```bash
cd client
bun i
```

3. **Start the development server:**

```bash
bun dev
```

The application will be available at `http://localhost:5173`

## Development

Each part of the stack can be developed independently:

- **Frontend**: Run `bun dev` in the `client/` directory
- **Backend**: The server runs in Docker and can be accessed via its exposed API endpoints

## Key Benefits of This Architecture

- **Type Safety**: Full TypeScript implementation across frontend and backend prevents entire classes of bugs
- **Developer Experience**: Fast feedback loops with Vite's HMR and Node.js's rapid prototyping capabilities
- **Scalability**: Modern frameworks and patterns allow easy feature expansion
- **Maintainability**: Consistent language and type system makes the codebase easier to navigate and modify
- **Deployment**: Containerized backend simplifies deployment to any environment
