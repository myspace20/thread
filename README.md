# thread-app(backend)

During my time as a student, whatsapp was the default platform for conversations among students but it had one problem, conversations were not organized and were "scattered" around making it difficult to locate important or critical information. This resulted in students missing important tests and other critical curricular activities.

## Getting Started

Clone the project

```bash
https://github.com/myspace20/thread.git
```

Go to the project directory

```bash
  cd thread
```

Install dependencies

```bash
  npm install
```

Copy and populate the .env file

```bash
  mv .env.example .env
```

Run migrations

```bash
  npm rum migrate
```

Run the application in dev or prod

```javascript
  npm run dev or npm run start
```

## Features

- User authentication using cookies with refresh and access tokens
- User authorization
- File uploads with supabase bucket storage and multer
- Role-based access control(RBAC)

## Architecture

This project uses some of and follows the principles of both Clean Architecture and Domain-Driven Design.

i. The Protocol/Application layer is used to receive and send HTTP requests to and from the client. Express routers are used for this purpose.

ii. The Model or Domain contains most of the business rules and logic and is contained within the services.

iii. The Infrastructure layer is responsible for communication with databases, third-party apis, email services and others.

-Database(Postgresql)

-Redis

-Supabase bucket storage

-Email(SMTP)

-Job Queues

## Tech Stack

- Node Js
- Express Js
- Postgresql
- Knex with Objection Js
- Redis for Job Queues
- typescript

## Development Toolkit

- husky
- prettier
- eslint
- github actions
- dotenv
- jest
- supertest
- jwt

## JWT RSA-256 Encryption

- Navigate to the scripts folder and run the keypair.mjs file to generate a key pair for RSA use cases(Such as a pair both refresh and access tokens respectively). Copy and place them in the .env file.

```bash
cd scripts
```

```bash
node keypair.mjs
```

- Sample result

```bash
Public Key:
 -----BEGIN PUBLIC KEY-----
......
......
......
-----END PUBLIC KEY-----

Private Key:
 -----BEGIN PRIVATE KEY-----
......
......
......
-----END PRIVATE KEY-----
```

- Set the dotenv config in the project entry file as follows

```javascript
import path from 'path';

require('dotenv').config({ path: path.resolve(__dirname, '../.env'), override: true });
```

## Workflow with Github Actions

- Deployments

## Development Specification

- Do not write queries in the router and service files keep them in the repositories.
- Use pino for logging purposes.
- Checkout the .env.example file for required secrets and keys that are needed

## Documentation Specification

- Postman is used for documentation purposes.

## Tests

- Unit tests
- e2e tests

## Monitoring

- Prom-client
