// lib/prisma-public.js - CORREGIDO
import { PrismaClient } from '@prisma/client'

const prismaPublic = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_URL // ← CAMBIA a POSTGRES_URL
    }
  }
})

export { prismaPublic }