# 1️⃣ Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# ✅ استخدم npm install بدل npm ci لأنه لا يوجد package-lock.json
RUN npm install

# Copy the rest of the source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app (Turbopack)
RUN npm run build

# 2️⃣ Runtime Stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Expose app port
EXPOSE 3000

# Start Next.js production server
CMD ["npm", "start"]
