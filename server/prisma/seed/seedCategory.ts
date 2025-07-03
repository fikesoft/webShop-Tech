// prisma/seed.ts

import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. ————————————————————————————————————————
  // Upsert top‐level categories
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

  // 2. ————————————————————————————————————————
  // Subcategorías de Electronics
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

  // 3. ————————————————————————————————————————
  // Subcategorías de Home & Kitchen
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

  // 4. ————————————————————————————————————————
  // Subcategorías de Beauty & Health
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

  // 5. ————————————————————————————————————————
  // Características globales
  await prisma.characteristic.upsert({
    where: { slug: 'dimensions' },
    update: {},
    create: { name: 'Dimensiuni', slug: 'dimensions', group: 'Generale' },
  })
  await prisma.characteristic.upsert({
    where: { slug: 'brand' },
    update: {},
    create: { name: 'Brand', slug: 'brand', group: 'Generale' },
  })
  await prisma.characteristic.upsert({
    where: { slug: 'display' },
    update: {},
    create: { name: 'Tip display', slug: 'display', group: 'Display' },
  })
  await prisma.characteristic.upsert({
    where: { slug: 'memory' },
    update: {},
    create: { name: 'Memorie', slug: 'memory', group: 'Memorie' },
  })
  await prisma.characteristic.upsert({
    where: { slug: 'sim' },
    update: {},
    create: { name: 'SIM', slug: 'sim', group: 'Memorie' },
  })

  // 6. ————————————————————————————————————————
  // Prepara mapas para conectar por slug
  const allCategories = await prisma.category.findMany()
  const categoryMap = Object.fromEntries(allCategories.map((c) => [c.slug, c]))
  const allChars = await prisma.characteristic.findMany()
  const charMap = Object.fromEntries(allChars.map((ch) => [ch.slug, ch]))

  // 7. ————————————————————————————————————————
  // Datos de ejemplo para productos (1–2 por subcategoría)
  type ProdSeed = {
    name: string
    slug: string
    code: string
    description: string
    price: number
    discount?: number
    availability: 'IN_STOCK' | 'ON_ORDER'
    rating: number
    reviewCount: number
    isNew: boolean
    isTop: boolean
    categorySlug: string
    images: string[]
    variants: Array<{ color: string; memory: string; sim: string; stock: number }>
    characteristics: Array<{ slug: string; value: string }>
  }

  const productsData: ProdSeed[] = [
    // Electronics → Smartphones
    {
      name: 'Smartphone Apple iPhone 13 128GB Starlight',
      slug: 'iphone-13-starlight',
      code: 'MYX33ZD/A',
      description: 'Ecran 6.1″ Super Retina XDR OLED, 128 GB stocare.',
      price: 31124,
      discount: 3000,
      availability: 'IN_STOCK',
      rating: 4.2,
      reviewCount: 16,
      isNew: true,
      isTop: true,
      categorySlug: 'smartphones-si-gadgeturi',
      images: ['/images/iphone13-1.png', '/images/iphone13-2.png'],
      variants: [{ color: 'Starlight', memory: '128 GB', sim: 'Single SIM', stock: 12 }],
      characteristics: [
        { slug: 'dimensions', value: '146.7 x 71.5 x 7.4 mm' },
        { slug: 'display', value: '6.1″ Super Retina XDR OLED' },
        { slug: 'memory', value: '128 GB' },
        { slug: 'sim', value: 'Single SIM' },
        { slug: 'brand', value: 'Apple' },
      ],
    },
    {
      name: 'Smartphone Samsung Galaxy S22 128GB Phantom Black',
      slug: 'galaxy-s22-128gb-black',
      code: 'SM-S901BZKLEUB',
      description: 'Ecran 6.1″ Dynamic AMOLED, 128 GB stocare.',
      price: 28999,
      discount: 2000,
      availability: 'IN_STOCK',
      rating: 4.0,
      reviewCount: 10,
      isNew: false,
      isTop: false,
      categorySlug: 'smartphones-si-gadgeturi',
      images: ['/images/s22-1.png', '/images/s22-2.png'],
      variants: [{ color: 'Phantom Black', memory: '128 GB', sim: 'Dual SIM', stock: 8 }],
      characteristics: [
        { slug: 'dimensions', value: '146 x 70.6 x 7.6 mm' },
        { slug: 'display', value: '6.1″ Dynamic AMOLED' },
        { slug: 'memory', value: '128 GB' },
        { slug: 'sim', value: 'Dual SIM' },
        { slug: 'brand', value: 'Samsung' },
      ],
    },
    // Electronics → Televizoare și Audio
    {
      name: 'Televisor Samsung QLED 55″ Q60C',
      slug: 'samsung-qled-55-q60c',
      code: 'QN55Q60CAFXZA',
      description: 'QLED 4K, HDR10+, Smart TV cu Tizen OS.',
      price: 4599,
      availability: 'ON_ORDER',
      rating: 4.5,
      reviewCount: 22,
      isNew: true,
      isTop: false,
      categorySlug: 'televizoare-si-audio',
      images: ['/images/qled55-1.png'],
      variants: [],
      characteristics: [
        { slug: 'dimensions', value: '1230 x 786 x 59 mm' },
        { slug: 'brand', value: 'Samsung' },
      ],
    },
    // Electronics → Calculatoare și Laptopuri
    {
      name: 'Laptop Apple MacBook Pro 14″ M1 Pro',
      slug: 'macbook-pro-14-m1-pro',
      code: 'MKGP3ZE/A',
      description: 'CPU M1 Pro, 16 GB RAM, 512 GB SSD.',
      price: 11299,
      availability: 'IN_STOCK',
      rating: 4.8,
      reviewCount: 30,
      isNew: false,
      isTop: true,
      categorySlug: 'calculatoare-si-laptopuri',
      images: ['/images/macbook14-1.png'],
      variants: [],
      characteristics: [
        { slug: 'dimensions', value: '312.6 x 221.2 x 15.5 mm' },
        { slug: 'brand', value: 'Apple' },
      ],
    },
    // Electronics → Accesorii Electronice
    {
      name: 'Căști Bluetooth Wireless Sony WH-1000XM4',
      slug: 'sony-wh-1000xm4',
      code: 'WH1000XM4/B',
      description: 'Noise cancelling, autonomie 30h.',
      price: 1249,
      availability: 'IN_STOCK',
      rating: 4.6,
      reviewCount: 18,
      isNew: false,
      isTop: true,
      categorySlug: 'accesorii-electronice',
      images: ['/images/sonyxm4-1.png'],
      variants: [],
      characteristics: [
        { slug: 'dimensions', value: '254 x 376 x 87 mm' },
        { slug: 'brand', value: 'Sony' },
      ],
    },
    // Home & Kitchen → Electrocasnice pentru Bucătărie
    {
      name: 'Mixer KitchenAid Artisan 4.8 L',
      slug: 'kitchenaid-artisan-4-8l',
      code: 'KSM150PSER',
      description: 'Motor 300 W, bol inox 4.8 L.',
      price: 1899,
      availability: 'IN_STOCK',
      rating: 4.7,
      reviewCount: 12,
      isNew: true,
      isTop: false,
      categorySlug: 'electrocasnice-pentru-bucatarie',
      images: ['/images/kitchenaid-1.png'],
      variants: [],
      characteristics: [
        { slug: 'dimensions', value: '357 x 196 x 363 mm' },
        { slug: 'brand', value: 'KitchenAid' },
      ],
    },
    // Home & Kitchen → Mobilier de Interior
    {
      name: 'Canapea modulară IKEA VIMLE',
      slug: 'ikea-vimle',
      code: '804.469.34',
      description: '3 locuri, cușetă extensibilă.',
      price: 2599,
      availability: 'ON_ORDER',
      rating: 4.3,
      reviewCount: 8,
      isNew: false,
      isTop: false,
      categorySlug: 'mobilier-de-interior',
      images: ['/images/vimle-1.png'],
      variants: [],
      characteristics: [
        { slug: 'dimensions', value: '225 x 95 x 83 cm' },
        { slug: 'brand', value: 'IKEA' },
      ],
    },
    // Home & Kitchen → Articole de Decor
    {
      name: 'Vază ceramică decorativă',
      slug: 'vaza-ceramica-decor',
      code: 'DECOR-VAZA-001',
      description: 'Înălțime 30 cm, finisaj mat.',
      price: 199,
      availability: 'IN_STOCK',
      rating: 4.0,
      reviewCount: 5,
      isNew: false,
      isTop: false,
      categorySlug: 'articole-de-decor',
      images: ['/images/vaza-1.png'],
      variants: [],
      characteristics: [
        { slug: 'dimensions', value: 'Ø 15 x 30 cm' },
        { slug: 'brand', value: 'HomeDecor' },
      ],
    },
    // Home & Kitchen → Țesături pentru Casă
    {
      name: 'Set lenjerie pat bumbac 4 piese',
      slug: 'lenjerie-pat-bumbac-4-piese',
      code: 'BED-SET-4C',
      description: '100% bumbac, 200 TC.',
      price: 349,
      availability: 'IN_STOCK',
      rating: 4.4,
      reviewCount: 14,
      isNew: true,
      isTop: false,
      categorySlug: 'tesaturi-pentru-casa',
      images: ['/images/lenjerie-1.png'],
      variants: [],
      characteristics: [
        { slug: 'dimensions', value: '200 x 220 cm (pilota)' },
        { slug: 'brand', value: 'SoftHome' },
      ],
    },
    // Beauty & Health → Îngrijirea Pielii
    {
      name: 'Cremă anti-îmbătrânire La Roche-Posay',
      slug: 'crema-lrp-anti-aging',
      code: 'LRP-ANTIAGE',
      description: '50 ml, SPF 20.',
      price: 299,
      availability: 'IN_STOCK',
      rating: 4.5,
      reviewCount: 9,
      isNew: false,
      isTop: false,
      categorySlug: 'ingrijirea-pielii',
      images: ['/images/lrp-1.png'],
      variants: [],
      characteristics: [
        { slug: 'dimensions', value: '50 ml' },
        { slug: 'brand', value: 'La Roche-Posay' },
      ],
    },
    // Beauty & Health → Produse de Machiaj
    {
      name: 'Ruj MAC Retro Matte Ruby Woo',
      slug: 'mac-ruby-woo',
      code: 'MAC-RW',
      description: 'Mat, nuanță intensă roșu.',
      price: 119,
      availability: 'IN_STOCK',
      rating: 4.6,
      reviewCount: 20,
      isNew: false,
      isTop: true,
      categorySlug: 'produse-de-machiaj',
      images: ['/images/mac-1.png'],
      variants: [],
      characteristics: [
        { slug: 'dimensions', value: '3 g' },
        { slug: 'brand', value: 'MAC' },
      ],
    },
    // Beauty & Health → Parfumuri
    {
      name: 'Parfum Chanel No. 5 EDP 100 ml',
      slug: 'chanel-no5-100ml',
      code: 'CH-5-100',
      description: 'Apa de parfum, 100 ml.',
      price: 899,
      availability: 'ON_ORDER',
      rating: 4.8,
      reviewCount: 25,
      isNew: false,
      isTop: true,
      categorySlug: 'parfumuri',
      images: ['/images/chanel5-1.png'],
      variants: [],
      characteristics: [
        { slug: 'dimensions', value: '100 ml' },
        { slug: 'brand', value: 'Chanel' },
      ],
    },
    // Beauty & Health → Sănătate și Wellness
    {
      name: 'Brățară fitness Fitbit Charge 5',
      slug: 'fitbit-charge-5',
      code: 'FB417BKBK',
      description: 'Monitorizare puls, GPS integrat.',
      price: 799,
      availability: 'IN_STOCK',
      rating: 4.3,
      reviewCount: 11,
      isNew: false,
      isTop: false,
      categorySlug: 'sanatate-si-wellness',
      images: ['/images/fitbit5-1.png'],
      variants: [],
      characteristics: [
        { slug: 'dimensions', value: '36.7 x 22.7 x 10.5 mm' },
        { slug: 'brand', value: 'Fitbit' },
      ],
    },
  ]

  // 8. ————————————————————————————————————————
  // Inserta cada producto con sus relaciones
  for (const p of productsData) {
    const cat = categoryMap[p.categorySlug]
    if (!cat) {
      throw new Error(`Categoria no encontrada: ${p.categorySlug}`)
    }

    // Prepara datos anidados
    const imgs = p.images.map((url, i) => ({ url, position: i + 1 }))
    const variantCreates = p.variants.map((v) => ({ ...v }))
    const charCreates = p.characteristics.map((ch) => ({
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      characteristic: { connect: { id: charMap[ch.slug]?.id! } },
      value: ch.value,
    }))

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        code: p.code,
        description: p.description,
        price: new Prisma.Decimal(p.price),
        discount: p.discount ? new Prisma.Decimal(p.discount) : undefined,
        availability: p.availability,
        rating: p.rating,
        reviewCount: p.reviewCount,
        isNew: p.isNew,
        isTop: p.isTop,
        category: { connect: { id: cat.id } },
        gallery: { create: imgs },
        variants: { create: variantCreates },
        characteristics: { create: charCreates },
      },
    })
  }

  // 9. ————————————————————————————————————————
  const totalCategories = await prisma.category.count()
  const totalProducts = await prisma.product.count()
  console.log(`✅ Seed completo: ${totalCategories} categorías, ${totalProducts} productos.`)
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
