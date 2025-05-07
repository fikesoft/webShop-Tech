import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

//If prisma client exits then uses it if not makes other
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

//In development, it assigns the Prisma client to globalThis,so the instance persists across file changes (hot reload)
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
