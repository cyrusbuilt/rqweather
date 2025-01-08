# Stage 1: build
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

COPY .env ./

RUN npm run build

# Stage 2: package (runtime stage)
FROM node:22-slim
WORKDIR /app
COPY --from=builder /app .

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
