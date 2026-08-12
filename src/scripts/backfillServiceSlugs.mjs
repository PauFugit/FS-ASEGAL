import { PrismaClient } from '@prisma/client';
import { slugify } from '../lib/slugify.js';

const prisma = new PrismaClient();

async function main() {
  const services = await prisma.services.findMany({ where: { slug: null } });

  for (const service of services) {
    const base = slugify(service.name);
    let slug = base;
    let counter = 2;

    while (await prisma.services.findFirst({ where: { slug, id: { not: service.id } } })) {
      slug = `${base}-${counter}`;
      counter += 1;
    }

    await prisma.services.update({ where: { id: service.id }, data: { slug } });
    console.log(`Servicio "${service.name}" -> slug "${slug}"`);
  }

  console.log(`Listo. ${services.length} servicio(s) actualizado(s).`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
