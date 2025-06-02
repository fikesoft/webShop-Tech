import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // NOTE: We will use “Icon-Home.svg” for every category’s iconFile.
  // Make sure this file actually gets deployed to e.g. /icons/Icon-Home.svg
  // so that your frontend can do: <img src="/icons/Icon-Home.svg" … />

  // 1. Create (or upsert) some top‐level categories:
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
      iconFile: 'Icon-Home.svg', // ← same icon
    },
  })

  const beautyAndHealth = await prisma.category.upsert({
    where: { slug: 'beauty-and-health' },
    update: {},
    create: {
      name: 'Beauty & Health',
      slug: 'beauty-and-health',
      iconFile: 'Icon-Home.svg', // ← same icon
    },
  })

  // 2. Create subcategories under “Electronics” (using the same iconFile)
  await prisma.category.upsert({
    where: { slug: 'smartphones-gadgets' },
    update: {},
    create: {
      name: 'Smartphones & Gadgets',
      slug: 'smartphones-gadgets',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: electronics.id } },
    },
  })

  await prisma.category.upsert({
    where: { slug: 'tv-audio-hifi' },
    update: {},
    create: {
      name: 'TV, Audio & Hi-Fi',
      slug: 'tv-audio-hifi',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: electronics.id } },
    },
  })

  await prisma.category.upsert({
    where: { slug: 'computers-laptops' },
    update: {},
    create: {
      name: 'Computers & Laptops',
      slug: 'computers-laptops',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: electronics.id } },
    },
  })

  // 3. Subcategories under “Home & Kitchen”
  await prisma.category.upsert({
    where: { slug: 'kitchen-appliances' },
    update: {},
    create: {
      name: 'Kitchen Appliances',
      slug: 'kitchen-appliances',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: homeAndKitchen.id } },
    },
  })

  await prisma.category.upsert({
    where: { slug: 'home-appliances' },
    update: {},
    create: {
      name: 'Home Appliances',
      slug: 'home-appliances',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: homeAndKitchen.id } },
    },
  })

  // 4. Subcategories under “Beauty & Health”
  await prisma.category.upsert({
    where: { slug: 'skincare' },
    update: {},
    create: {
      name: 'Skin Care',
      slug: 'skincare',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: beautyAndHealth.id } },
    },
  })

  await prisma.category.upsert({
    where: { slug: 'personal-care' },
    update: {},
    create: {
      name: 'Personal Care',
      slug: 'personal-care',
      iconFile: 'Icon-Home.svg',
      parent: { connect: { id: beautyAndHealth.id } },
    },
  })

  // 5. (Optional) Log how many categories now exist
  const count = await prisma.category.count()
  console.log(`✅  Seed complete: ${count} categories in database.`)
}

main()
  .catch((e) => {
    console.error('❌  Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
