---
title: Docker for Modern Development
date: February 10, 2024
excerpt: Learn how Docker can streamline your development workflow. From containerizing apps to setting up consistent development environments.
---

# Docker for Modern Development

Docker has revolutionized how we develop, test, and deploy applications. Let's explore how to leverage Docker for a better development experience.

## Why Docker?

### Development Benefits
- **Consistency**: Same environment everywhere
- **Isolation**: No more "works on my machine"
- **Easy setup**: New developers onboard quickly
- **Clean slate**: Reset environment anytime

### Production Benefits
- **Scalability**: Easy horizontal scaling
- **Portability**: Run anywhere Docker runs
- **Resource efficiency**: Lightweight containers
- **CI/CD integration**: Seamless deployment

## Basic Docker Concepts

### Images vs Containers
- **Image**: Blueprint for containers (like a class)
- **Container**: Running instance of an image (like an object)

### Dockerfile
A text file with instructions to build an image:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

## Development Workflow

### 1. Containerize Your App
```dockerfile
# Multi-stage build for optimization
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

### 2. Docker Compose for Multi-Service Apps
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    depends_on:
      - database
      - redis

  database:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### 3. Development Scripts
```json
{
  "scripts": {
    "dev": "docker-compose up --build",
    "dev:detached": "docker-compose up -d --build",
    "dev:logs": "docker-compose logs -f",
    "dev:down": "docker-compose down",
    "dev:clean": "docker-compose down -v --rmi all"
  }
}
```

## Best Practices

### Dockerfile Optimization
```dockerfile
# Use specific versions
FROM node:18.19.0-alpine

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy package files first (better caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY --chown=nextjs:nodejs . .

# Switch to non-root user
USER nextjs

# Use exec form
CMD ["npm", "start"]
```

### .dockerignore
```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.nyc_output
.coverage
.DS_Store
```

### Development vs Production

#### Development
```yaml
# docker-compose.dev.yml
services:
  app:
    build:
      context: .
      target: development
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DEBUG=*
```

#### Production
```yaml
# docker-compose.prod.yml
services:
  app:
    build:
      context: .
      target: production
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

## Common Commands

```bash
# Build image
docker build -t myapp .

# Run container
docker run -p 3000:3000 myapp

# List containers
docker ps

# Stop container
docker stop <container-id>

# Remove container
docker rm <container-id>

# View logs
docker logs <container-id>

# Execute commands in container
docker exec -it <container-id> sh
```

## Debugging Containers

### Shell Access
```bash
# Access running container
docker exec -it myapp sh

# Run new container with shell
docker run -it myapp sh
```

### Health Checks
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

Docker transforms development from "it works on my machine" to "it works everywhere." Start small, containerize one service, and gradually expand to full orchestration with Docker Compose! 