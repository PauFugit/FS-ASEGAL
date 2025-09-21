// lib/prisma.js - CORREGIDO
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis; // Usar globalThis en lugar de global

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['query', 'error', 'warn'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export { prisma };