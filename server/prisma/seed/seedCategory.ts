import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // 1. Upsert top‐level categories (unchanged)
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      iconFile: 'Icon-Home.svg',
    },
  })

  const homeAndKitchen = await prisma.category.upsert({
    where: { slug: 'home-and-kitchen' },
    update: {},
    create: {
      name: 'Home & Kitchen',
      slug: 'home-and-kitchen',
      iconFile: 'Icon-Home.svg',
    },
  })

  const beautyAndHealth = await prisma.category.upsert({
    where: { slug: 'beauty-and-health' },
    update: {},
    create: {
      name: 'Beauty & Health',
      slug: 'beauty-and-health',
      iconFile: 'Icon-Home.svg',
    },
  })

  // 2. Subcategories under “Electronics” (Romanian names & slugs)
  await prisma.category.upsert({
    where: { slug: 'smartphones-si-gadgeturi' },
    update: {},
    create: {
      name: 'Smartphones și Gadgeturi',
      slug: 'smartphones-si-gadgeturi',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: electronics.id } },
    },
  })

  await prisma.category.upsert({
    where: { slug: 'televizoare-si-audio' },
    update: {},
    create: {
      name: 'Televizoare și Audio',
      slug: 'televizoare-si-audio',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: electronics.id } },
    },
  })

  await prisma.category.upsert({
    where: { slug: 'calculatoare-si-laptopuri' },
    update: {},
    create: {
      name: 'Calculatoare și Laptopuri',
      slug: 'calculatoare-si-laptopuri',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: electronics.id } },
    },
  })

  await prisma.category.upsert({
    where: { slug: 'accesorii-electronice' },
    update: {},
    create: {
      name: 'Accesorii Electronice',
      slug: 'accesorii-electronice',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: electronics.id } },
    },
  })

  // 3. Subcategories under “Home & Kitchen” (Romanian)
  await prisma.category.upsert({
    where: { slug: 'electrocasnice-pentru-bucatarie' },
    update: {},
    create: {
      name: 'Electrocasnice pentru Bucătărie',
      slug: 'electrocasnice-pentru-bucatarie',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: homeAndKitchen.id } },
    },
  })

  await prisma.category.upsert({
    where: { slug: 'mobilier-de-interior' },
    update: {},
    create: {
      name: 'Mobilier de Interior',
      slug: 'mobilier-de-interior',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: homeAndKitchen.id } },
    },
  })

  await prisma.category.upsert({
    where: { slug: 'articole-de-decor' },
    update: {},
    create: {
      name: 'Articole de Decor',
      slug: 'articole-de-decor',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: homeAndKitchen.id } },
    },
  })

  await prisma.category.upsert({
    where: { slug: 'tesaturi-pentru-casa' },
    update: {},
    create: {
      name: 'Țesături pentru Casă',
      slug: 'tesaturi-pentru-casa',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: homeAndKitchen.id } },
    },
  })

  // 4. Subcategories under “Beauty & Health” (Romanian)
  await prisma.category.upsert({
    where: { slug: 'ingrijirea-pielii' },
    update: {},
    create: {
      name: 'Îngrijirea Pielii',
      slug: 'ingrijirea-pielii',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: beautyAndHealth.id } },
    },
  })

  await prisma.category.upsert({
    where: { slug: 'produse-de-machiaj' },
    update: {},
    create: {
      name: 'Produse de Machiaj',
      slug: 'produse-de-machiaj',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: beautyAndHealth.id } },
    },
  })

  await prisma.category.upsert({
    where: { slug: 'parfumuri' },
    update: {},
    create: {
      name: 'Parfumuri',
      slug: 'parfumuri',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: beautyAndHealth.id } },
    },
  })

  await prisma.category.upsert({
    where: { slug: 'sanatate-si-wellness' },
    update: {},
    create: {
      name: 'Sănătate și Wellness',
      slug: 'sanatate-si-wellness',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: beautyAndHealth.id } },
    },
  })

  // 5. Log summary
  const count = await prisma.category.count()
  console.log(`✅ Seed complete: ${count} categories in database.`)
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
