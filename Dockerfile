# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Build Backend and Production Image
FROM node:20-alpine
WORKDIR /app

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/dist ./dist

# Install backend dependencies
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --production

# Copy backend source
COPY server/ ./

# Expose the port the app runs on
EXPOSE 3001

# Run the server
CMD ["node", "server.js"]
