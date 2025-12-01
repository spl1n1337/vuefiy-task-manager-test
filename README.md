# Fullstack Task Manager (Nuxt + Vuetify + NestJS + PostgreSQL + Prisma + Redis)

This is a full-stack application built using **Vuetify.js (Nuxt)** for the frontend and **NestJS (TypeScript, PostgreSQL, Prisma ORM, Redis Cache)** for the backend.

The server and client follow standard architecture patterns commonly used in similar full-stack projects.

Vuetify.js was chosen for the frontend due to its rich and convenient UI component library.  
NestJS was selected for the backend thanks to its strict, enterprise-friendly structure.

---

## Frontend (Nuxt + Vuetify)

### Structure
1. The main page (`index`) is located in the `/pages` directory.  
   Components responsible for rendering task cards and the task creation/edit form are in `/components`.

2. The **getTasks** function uses **$fetch instead of useFetch** because `useFetch` performs client-side caching that is hard to disable. `$fetch` ensures fresh data on each request.

### Possible Improvements
1. Extract logic from `pages/index.vue` into a separate page-component to improve readability.
2. Split the page into smaller components:
   - `FilterAndSort`
   - `TasksWrapper`
3. Add infinite scroll / scroll-based pagination / page-based pagination.
4. Add support for the user’s browser timezone.
5. (*) Group tasks by dueDate blocks (today, week, month, distant future).

---

##  Backend (NestJS + Prisma + Redis)

### Structure
1. Standard NestJS architecture.  
   Schema and migrations are in `server/prisma`, ORM module in `src/prisma`.

2. Redis Cache is used for `GET /tasks`, with caching based on schema + filter/sort.

3. Cache is automatically cleared after any Task table update.

4. Caching is implemented in the service layer to avoid unpredictable results when module complexity grows.

### Possible improvements
1. Add authentication.
2. Add Guards / Pipes to secure endpoints from unauthorized or malicious requests.
3. Add rate limiting.
4. Improve Redis configuration to prevent uncontrolled memory usage.
5. Restrict CORS policy.
6. Add nginx to docker-compose for port proxying.
7. Host the project on a VPS.
8. Add SSH to ci-cd for autodeployment.

---

#  Run the project with Docker Compose

Follow the steps below to clone and run the project anywhere using Docker.

## 1. Clone the repository

```bash
git clone https://github.com/spl1n1337/vuefiy-task-manager-test
cd vuefiy-task-manager-test
```

## 2. Build and start all services

```bash
docker compose up --build
```

## 2. Access app ports
Frontend: http://localhost:3000
Backend API: http://localhost:4040