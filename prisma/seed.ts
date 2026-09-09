import { PrismaClient } from '@prisma/client';
import { INITIAL_VEHICLES, FINANCING_PLANS } from '../src/data/initialStock';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando carga de datos iniciales en CARVLAK...');

  // 1. Limpiar base previa si existe
  await prisma.reservation.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.financingPlan.deleteMany();
  await prisma.adminUser.deleteMany();

  // 2. Cargar Vehículos
  for (const v of INITIAL_VEHICLES) {
    await prisma.vehicle.create({
      data: {
        id: v.id,
        slug: v.slug,
        brand: v.brand,
        model: v.model,
        version: v.version,
        category: v.category,
        year: v.year,
        mileage: v.mileage,
        priceUsd: v.priceUsd,
        transmission: v.transmission,
        fuel: v.fuel,
        condition: v.condition,
        bodyType: v.bodyType,
        location: v.location,
        engine: v.engine,
        powerHp: v.powerHp,
        doors: v.doors,
        colorExterior: v.colorExterior,
        colorInterior: v.colorInterior,
        features: JSON.stringify(v.features),
        images: JSON.stringify(v.images),
        status: v.status,
        isFeatured: v.isFeatured || false,
        viewsCount: v.viewsCount || 0
      }
    });
  }
  console.log(`✓ ${INITIAL_VEHICLES.length} vehículos cargados con éxito.`);

  // 3. Cargar Planes de Financiación
  for (const plan of FINANCING_PLANS) {
    await prisma.financingPlan.create({
      data: {
        id: plan.id,
        bankName: plan.bankName,
        minDownPaymentPercent: plan.minDownPaymentPercent,
        maxTermMonths: plan.maxTermMonths,
        annualInterestRate: plan.annualInterestRate,
        description: plan.description,
        requirements: JSON.stringify(plan.requirements || []),
        isActive: plan.isActive
      }
    });
  }
  console.log(`✓ ${FINANCING_PLANS.length} planes de financiación cargados.`);

  // 4. Crear Usuario Admin por defecto
  await prisma.adminUser.create({
    data: {
      email: 'admin@carvlak.com',
      name: 'Equipo Comercial Carvlak',
      passwordHash: 'carvlak2026',
      role: 'ADMIN'
    }
  });
  console.log('✓ Usuario admin creado (admin@carvlak.com / carvlak2026).');

  console.log('¡Base de datos CARVLAK lista y operativa!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
