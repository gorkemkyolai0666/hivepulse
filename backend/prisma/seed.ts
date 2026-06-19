import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const APIARY_ID = '00000000-0000-0000-0000-000000000001';

async function main() {
  const passwordHash = await bcrypt.hash('demo123456', 12);

  await prisma.apiary.upsert({
    where: { id: APIARY_ID },
    update: {},
    create: {
      id: APIARY_ID,
      name: 'Golden Meadow Apiary',
      phone: '+905551234567',
      address: 'Çiçekli Yayla No: 12',
      city: 'Rize',
      state: 'Karadeniz',
      zipCode: '53100',
      totalHives: 48,
      timezone: 'Europe/Istanbul',
      users: {
        create: {
          email: 'demo@goldenmeadowapiary.com',
          passwordHash,
          firstName: 'Ayşe',
          lastName: 'Yılmaz',
          role: 'owner',
        },
      },
    },
  });

  const hiveData = [
    { id: '00000000-0000-0000-0000-000000000101', number: 'K-01', location: 'Kuzey Çayır', hiveType: 'langstroth' as const, queenAgeMonths: 8, status: 'active' as const },
    { id: '00000000-0000-0000-0000-000000000102', number: 'K-02', location: 'Kuzey Çayır', hiveType: 'langstroth' as const, queenAgeMonths: 14, status: 'active' as const },
    { id: '00000000-0000-0000-0000-000000000103', number: 'K-03', location: 'Orman Kenarı', hiveType: 'warre' as const, queenAgeMonths: 6, status: 'swarm_risk' as const },
    { id: '00000000-0000-0000-0000-000000000104', number: 'K-04', location: 'Lavanta Tarlası', hiveType: 'langstroth' as const, queenAgeMonths: 10, status: 'active' as const },
    { id: '00000000-0000-0000-0000-000000000105', number: 'K-05', location: 'Lavanta Tarlası', hiveType: 'top_bar' as const, queenAgeMonths: 22, status: 'queenless' as const },
    { id: '00000000-0000-0000-0000-000000000106', number: 'K-06', location: 'Güney Bahçe', hiveType: 'langstroth' as const, queenAgeMonths: 4, status: 'active' as const },
  ];

  const hives = [];
  for (const h of hiveData) {
    const hive = await prisma.hive.upsert({
      where: { id: h.id },
      update: {},
      create: { ...h, apiaryId: APIARY_ID, lastInspected: new Date() },
    });
    hives.push(hive);
  }

  const harvestData = [
    { id: '00000000-0000-0000-0000-000000000201', batchName: 'İlkbahar Çiçek Balı', floralSource: 'Yayla Çiçekleri', weightKg: 42.5, container: 'drum' as const, status: 'stored' as const, hiveId: hives[0].id },
    { id: '00000000-0000-0000-0000-000000000202', batchName: 'Lavanta Hasadı', floralSource: 'Lavanta', weightKg: 28.0, container: 'bucket' as const, status: 'extracted' as const, hiveId: hives[3].id },
    { id: '00000000-0000-0000-0000-000000000203', batchName: 'Orman Balı Parti 3', floralSource: 'Keçiboynuzu', weightKg: 35.2, container: 'drum' as const, status: 'planned' as const },
  ];

  for (const harvest of harvestData) {
    await prisma.harvest.upsert({
      where: { id: harvest.id },
      update: {},
      create: {
        ...harvest,
        apiaryId: APIARY_ID,
        harvestedAt: harvest.status !== 'planned' ? new Date() : undefined,
      },
    });
  }

  const inspectedAt = new Date();
  inspectedAt.setDate(inspectedAt.getDate() - 5);

  await prisma.inspection.upsert({
    where: { id: '00000000-0000-0000-0000-000000000301' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000301',
      apiaryId: APIARY_ID,
      hiveId: hives[0].id,
      inspectedAt,
      broodPattern: 'excellent',
      temperament: 'calm',
      honeyStores: 8.5,
      status: 'completed',
      notes: 'Güçlü koloni, bal depolama yeterli',
    },
  });

  await prisma.inspection.upsert({
    where: { id: '00000000-0000-0000-0000-000000000302' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000302',
      apiaryId: APIARY_ID,
      hiveId: hives[2].id,
      inspectedAt: new Date(),
      broodPattern: 'fair',
      temperament: 'moderate',
      honeyStores: 4.0,
      status: 'follow_up',
      notes: 'Oğul belirtileri — kontrol planlandı',
    },
  });

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  await prisma.treatment.upsert({
    where: { id: '00000000-0000-0000-0000-000000000401' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000401',
      apiaryId: APIARY_ID,
      title: 'Varroa Oxalic Asit Tedavisi',
      description: 'Kış öncesi varroa kontrolü',
      category: 'varroa',
      location: 'Tüm kovanlar',
      scheduledAt: nextWeek,
      status: 'scheduled',
    },
  });

  await prisma.treatment.upsert({
    where: { id: '00000000-0000-0000-0000-000000000402' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000402',
      apiaryId: APIARY_ID,
      title: 'Şeker Şurubu Besleme',
      category: 'feeding',
      location: 'K-05',
      scheduledAt: new Date(),
      status: 'overdue',
    },
  });

  const varieties = [
    { id: '00000000-0000-0000-0000-000000000501', title: 'Yayla Çiçek Balı', varietyCategory: 'wildflower' as const, pricePerKg: 450, moisturePercent: 17.5 },
    { id: '00000000-0000-0000-0000-000000000502', title: 'Lavanta Balı', varietyCategory: 'lavender' as const, pricePerKg: 680, moisturePercent: 16.8, status: 'seasonal' as const },
    { id: '00000000-0000-0000-0000-000000000503', title: 'Keçiboynuzu Orman Balı', varietyCategory: 'forest' as const, pricePerKg: 520, moisturePercent: 18.0 },
  ];

  for (const variety of varieties) {
    await prisma.honeyVariety.upsert({
      where: { id: variety.id },
      update: {},
      create: { ...variety, apiaryId: APIARY_ID, status: variety.status || 'active' },
    });
  }

  console.log('HivePulse seed completed');
  console.log('Demo: demo@goldenmeadowapiary.com / demo123456');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
