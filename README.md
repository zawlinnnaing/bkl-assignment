# Brikl backend engineer assignment

## Introducing the Alpha

Alpha is the new startup company we are developing a cutting edge task management system with modern technology.

You will be getting involved on this! We have setting up user service to manage user in our system but we still missing our core business logic which is the task management.

## Functionality

### Task management

- Create a new list, (mutation: `createTasklist`)
- Create a new task in a list (the task should be prepended to the list and the
  status should indicate it has not been completed) (mutation: `createTask`)
- Update a task (title and status) (mutation: `updateTask`)
- Move a task to a specific position in the list (mutation: `moveTask`)
- Retrieve all lists and their tasks

## Getting start

- [Prerequisites](#prerequisites)
- [Setup](#setup)

### Prerequisites

Make sure you have these tools installed

- Docker
- Node.js
- Node package manager, preferably `pnpm`

### Setup

This is the instruction to setup this project and run in your local machine. Note that this instruction uses `pnpm` as a package manager. You may replace these commands corresponding to your package manager.

1. Copy `.env.example` file and rename it to `.env`.
2. Install dependencies.
3. Run `docker compose up -d` to start docker containers in background.
4. Run `pnpm db:migrate` to initiate database.
5. Run `pnpm codegen` to generate TypeScript definition for GraphQL and Prisma client.
6. Run `pnpm start` to start the project. (or) Run `pnpm run start:dev` to server that watches code changes.
7. Go to `http://localhost:4000`, you should see Apollo Playground. You may change the port according to `GATEWAY_PORT` in your `.env` file.
8. To browse existing database using [prisma studio](https://www.prisma.io/studio), run `pnpm run db:studio`

### Test
To run unit tests, you can run:
```
pnpm run test
```
or to run tests when code changes in development, run
```
pnpm run test:watch
```