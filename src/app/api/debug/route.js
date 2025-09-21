// app/api/debug/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Count records
    const blogCount = await prisma.blog.count();
    
    return NextResponse.json({
      status: 'connected',
      blogCount,
      databaseUrl: process.env.DATABASE_URL ? 'configured' : 'missing',
      environment: process.env.NODE_ENV
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({
      status: 'error',
      error: error.message,
      databaseUrl: process.env.DATABASE_URL ? 'configured' : 'missing'
    }, { status: 500 });
  }
}