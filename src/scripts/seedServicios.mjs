import { PrismaClient } from '@prisma/client';
import { slugify } from '../lib/slugify.js';

const prisma = new PrismaClient();

const servicios = [
  {
    name: 'Resolución Sanitaria (RS)',
    description: 'Te brindamos asesoría y acompañamiento en cada etapa del proceso para obtener la resolución sanitaria de tu negocio y abrirte a nuevos mercados.',
    longDescription: `Reunión inicial online: Diagnóstico de las necesidades de tu empresa.
Visita a la instalación: Evaluación de infraestructura y layout.
Preparación de documentos: Recopilación y confección de protocolos de manejo seguro de los alimentos BPM.
Entrega de documentos: Tramitación en plataforma SEREMI y seguimiento.
Obtención de la resolución sanitaria.`,
    imageUrl: '/cardservicios1.jpg',
  },
  {
    name: 'Buenas Prácticas de Manipulación (BPM)',
    description: 'Uno de las exigencias para obtener la RS de tu negocio gastronómico, es contar con un Manual de BPM para garantizar la inocuidad de tus productos.',
    longDescription: `Reunión inicial online: Diagnóstico de las necesidades de tu empresa.
Preparación de documentos: Recopilación de información, confección de protocolos y registros de manejo seguro de los alimentos, que incluye: aspecto del personal, seguridad del agua, manejo de productos químicos, limpieza y sanitización, manejo integrado de plagas, mantención de equipos, control de temperaturas, otros.
Entrega de documentos: Manual de BPM adaptado de tu negocio.`,
    imageUrl: '/cardservicios3.webp',
  },
  {
    name: 'Auditorías de BPM',
    description: 'Somos tu aliado estratégico de confianza, mediante un auditor interno que revisa, examina y evalúa el cumplimiento de las BPM de tus procesos productivos según las normativas sanitarias vigentes.',
    longDescription: `Visita de instalaciones: Se aplica un check list sanitario de BPM para ver el estado de cumplimiento regulatorio de los procesos.
Plan de acción: Se hace entrega del informe técnico con las mejoras, detallando cada actividad a realizarse.
Seguimiento: Te brindamos apoyo ante dudas o consultas para la implementación de las mejoras durante 1 mes. Además, puedes establecer una frecuencia de auditorías internas para mantener controladas tus BPM en la producción y evitar sanciones sanitarias y/o clausura de local.`,
    imageUrl: '/cardservicios4.jpg',
  },
  {
    name: 'Etiquetado Nutricional',
    description: 'En Asegal B&F ponemos nuestro conocimiento y experiencia a tu disposición para ayudarte a generar un rotulado nutricional confiable de tus productos. Utilizando el método oficial de tablas de composición, hacemos los cálculos nutricionales y desarrollamos la etiqueta de tu producto.',
    longDescription: `Reunión inicial online: Recopilación de información.
Desarrollo etiqueta nutricional: cálculos nutricionales según receta, identificación de sellos, alergenos y mensajes saludables según corresponda.
Entrega de etiqueta: En formato digital lista para impresión y certificado profesional acreditando fuentes de cálculo.`,
    imageUrl: '/servicios3.jpg',
  },
  {
    name: 'Capacitaciones',
    description: 'El primer paso para crear alimentos seguros es la formación íntegra y de calidad de tus manipuladores de alimentos, es por esto que contamos con los siguientes programas de capacitación.',
    longDescription: `Programa BPM: Se capacita a tu personal sobre las BPM de tus procesos productivos: aspecto del personal, seguridad del agua, manejo de productos químicos, limpieza y sanitización, manejo integrado de plagas, mantención de equipos, control de temperaturas, otros (contaminación cruzada, manejo de residuos).
Programa Trazabilidad: Se capacita a todo el personal sobre la importancia de la trazabilidad en la producción y los registros asociados, desde la recepción de MP hasta la elaboración del producto final.
Obtención Resolución Sanitaria.`,
    imageUrl: '/bannerServicios1.jpg',
  },
];

async function main() {
  for (const servicio of servicios) {
    const existing = await prisma.services.findUnique({ where: { name: servicio.name } });
    if (existing) {
      console.log(`Ya existe: "${servicio.name}", se omite.`);
      continue;
    }

    const slug = slugify(servicio.name);
    await prisma.services.create({
      data: {
        name: servicio.name,
        slug,
        description: servicio.description,
        longDescription: servicio.longDescription,
        imageUrl: servicio.imageUrl,
        status: 'publicado',
      },
    });
    console.log(`Creado: "${servicio.name}" -> slug "${slug}"`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
