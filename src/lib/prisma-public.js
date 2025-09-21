// lib/prisma-public.js
import { PrismaClient } from '@prisma/client'

const prismaPublic = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL.replace('?sslmode=require', '') + '?sslmode=require&connection_limit=1'
    }
  }
})

export { prismaPublic }