
# 1️⃣ Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package files first
COPY package*.json ./

# Install deps without running postinstall (prisma generate)
RUN npm install --ignore-scripts

# Copy the rest of the app
COPY . .

# Generate Prisma client after schema is available
RUN npx prisma generate

# Build Next.js app (Turbopack)
RUN npm run build

# 2️⃣ Runtime Stage
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
