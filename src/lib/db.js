const mysql = require('mysql2/promise');
const { PrismaClient } = require('@prisma/client');

// Conexión directa con MySQL2 (para operaciones crudas)
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Conexión Prisma
const prisma = new PrismaClient();

// Verificación de conexión
async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('✅ Conexión MySQL2 exitosa:', rows);
    
    await prisma.$queryRaw`SELECT 1 + 1 AS result`;
    console.log('✅ Conexión Prisma exitosa');
  } catch (error) {
    console.error('❌ Error de conexión:', error);
  }
}

module.exports = { pool, prisma, testConnection };