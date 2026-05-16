/**
 * Script para crear el primer usuario ADMIN
 * Uso: node src/scripts/seed-admin.mjs
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_URL,
    },
  },
});

// ─── CONFIGURACIÓN DE DATOS ───────────────────────────────────────────────
const ADMIN = {
  name:      'Asesorías Asegal',        
  lastname:  'B%F',     
  email:     'admin@asegalbyfasesorias.cl', 
  username:  'admin',        // ← username para login
  password:  'ByFAsegal123!', // ← contraseña (SE PUEDE CAMBIAR DESPUÉS)
  phone:     null,
  company:   null,
};
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🔍 Verificando base de datos...');

  const count = await prisma.Users.count();
  if (count > 0) {
    console.log(`⚠️  Ya existen ${count} usuario(s). El seed solo corre con la BD vacía.`);
    console.log('   Si querés resetear, eliminá los usuarios desde el dashboard primero.');
    return;
  }

  console.log('🔐 Hasheando contraseña...');
  const hashedPassword = await bcrypt.hash(ADMIN.password, 10);

  console.log('👤 Creando usuario ADMIN...');
  const user = await prisma.Users.create({
    data: {
      name:      ADMIN.name,
      lastname:  ADMIN.lastname,
      email:     ADMIN.email,
      username:  ADMIN.username,
      password:  hashedPassword,
      phone:     ADMIN.phone,
      company:   ADMIN.company,
      role:      'ADMIN',
      active:    true,
    },
  });

  console.log('\n✅ Admin creado exitosamente:');
  console.log(`   ID:       ${user.id}`);
  console.log(`   Nombre:   ${user.name} ${user.lastname}`);
  console.log(`   Email:    ${user.email}`);
  console.log(`   Username: ${user.username}`);
  console.log(`   Rol:      ${user.role}`);
  console.log('\n🚨 IMPORTANTE: Cambia la contraseña después del primer login.');
}

main()
  .catch((e) => { console.error('❌ Error:', e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
