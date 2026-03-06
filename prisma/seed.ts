import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleProducts = [
  {
    handle: 'clay-mask',
    title: 'Clay Mask',
    vendor: 'GlowBeauty',
    price: 199,
    tags: ['Oily Skin', 'Detox'],
    images: [
      { src: '/images/skincare/face-1.webp', width: 1600, height: 2000, alt: 'Clay Mask' },
      { src: '/images/skincare/face-1-1.webp', width: 1600, height: 2000, alt: 'Clay Mask' },
    ],
    featuredImage: { src: '/images/skincare/face-1.webp', width: 1600, height: 2000, alt: 'Clay Mask' },
    options: [
      { name: 'Color', optionValues: [{ name: 'Light Blue', swatch: { color: '#ADD8E6', image: null } }, { name: 'Dark Blue', swatch: { color: '#00008B', image: null } }, { name: 'Black', swatch: { color: '#000000', image: null } }] },
      { name: 'Size', optionValues: [{ swatch: null, name: '100g' }, { swatch: null, name: '200g' }, { swatch: null, name: '300g' }] },
    ],
    selectedOptions: [{ name: 'Color', value: 'Light Blue' }, { name: 'Size', value: '100g' }],
    description: 'Purifying clay mask for deep cleansing.',
  },
  {
    handle: 'hydrating-sheet-mask',
    title: 'Hydrating Sheet Mask',
    vendor: 'GlowBeauty',
    price: 299,
    tags: ['Hydrating', 'All Skin Types'],
    images: [
      { src: '/images/skincare/face-2.webp', width: 1600, height: 2000, alt: 'Sheet Mask' },
      { src: '/images/skincare/face-2-2.webp', width: 1600, height: 2000, alt: 'Sheet Mask' },
    ],
    featuredImage: { src: '/images/skincare/face-2.webp', width: 1600, height: 2000, alt: 'Sheet Mask' },
    options: [
      { name: 'Color', optionValues: [{ name: 'White', swatch: { color: '#FFFFFF', image: null } }, { name: 'Cream', swatch: { color: '#FFFDD0', image: null } }] },
      { name: 'Pack Size', optionValues: [{ swatch: null, name: '1 Sheet' }, { swatch: null, name: '5 Sheets' }] },
    ],
    selectedOptions: [{ name: 'Color', value: 'White' }, { name: 'Pack Size', value: '1 Sheet' }],
    description: 'Hydrating sheet mask for all skin types.',
  },
  {
    handle: 'exfoliating-mask',
    title: 'Exfoliating Mask',
    vendor: 'GlowBeauty',
    price: 399,
    tags: ['Exfoliating', 'Brightening'],
    images: [
      { src: '/images/skincare/face-3.webp', width: 1600, height: 2000, alt: 'Exfoliating Mask' },
      { src: '/images/skincare/face-3-3.webp', width: 1600, height: 2000, alt: 'Exfoliating Mask' },
    ],
    featuredImage: { src: '/images/skincare/face-3.webp', width: 1600, height: 2000, alt: 'Exfoliating Mask' },
    options: [
      { name: 'Color', optionValues: [{ name: 'Green', swatch: { color: '#008000', image: null } }, { name: 'Yellow', swatch: { color: '#FFFF00', image: null } }] },
      { name: 'Size', optionValues: [{ swatch: null, name: '100g' }, { swatch: null, name: '150g' }] },
    ],
    selectedOptions: [{ name: 'Color', value: 'Green' }, { name: 'Size', value: '100g' }],
    description: 'Gentle exfoliating mask for brighter skin.',
  },
  {
    handle: 'leather-tote-bag',
    title: 'Leather Tote Bag',
    vendor: 'Fashion Co',
    price: 32,
    tags: ['Bags', 'Leather'],
    images: [
      { src: '/images/skincare/face-1.webp', width: 1600, height: 2000, alt: 'Tote Bag' },
    ],
    featuredImage: { src: '/images/skincare/face-1.webp', width: 1600, height: 2000, alt: 'Tote Bag' },
    options: [
      { name: 'Color', optionValues: [{ name: 'Black', swatch: { color: '#000000', image: null } }, { name: 'Sienna', swatch: { color: '#A0522D', image: null } }] },
      { name: 'Size', optionValues: [{ swatch: null, name: 'Large' }, { swatch: null, name: 'Medium' }] },
    ],
    selectedOptions: [{ name: 'Color', value: 'Black' }, { name: 'Size', value: 'Large' }],
    description: 'Classic leather tote bag.',
  },
  {
    handle: 'nomad-tumbler',
    title: 'Nomad Tumbler',
    vendor: 'Fashion Co',
    price: 35,
    tags: ['Drinkware'],
    images: [
      { src: '/images/skincare/face-3.webp', width: 1600, height: 2000, alt: 'Tumbler' },
    ],
    featuredImage: { src: '/images/skincare/face-3.webp', width: 1600, height: 2000, alt: 'Tumbler' },
    options: [
      { name: 'Color', optionValues: [{ name: 'White', swatch: { color: '#FFFFFF', image: null } }, { name: 'Black', swatch: { color: '#000000', image: null } }] },
    ],
    selectedOptions: [{ name: 'Color', value: 'White' }],
    description: 'Insulated tumbler for your next adventure.',
  },
]

async function main() {
  console.log('Seeding database...')
  const productIds: number[] = []
  for (const p of sampleProducts) {
    const created = await prisma.product.upsert({
      where: { handle: p.handle },
      create: {
        handle: p.handle,
        title: p.title,
        vendor: p.vendor,
        price: p.price,
        tags: p.tags,
        images: p.images,
        featuredImage: p.featuredImage,
        options: p.options,
        selectedOptions: p.selectedOptions,
        description: p.description,
      },
      update: { title: p.title, price: p.price, description: p.description },
    })
    productIds.push(created.id)
  }
  const coll1 = await prisma.collection.upsert({
    where: { handle: 'face-wash' },
    create: {
      handle: 'face-wash',
      title: 'Face Wash',
      description: 'A gentle cleanser for all skin types.',
      image: '/images/skincare/feature-6.webp',
      theme: 'skincare',
    },
    update: {},
  })
  const coll2 = await prisma.collection.upsert({
    where: { handle: 'skincare-essentials' },
    create: {
      handle: 'skincare-essentials',
      title: 'Skincare Essentials',
      description: 'Discover our complete range.',
      image: '/images/skincare/c1.webp',
      theme: 'skincare',
    },
    update: {},
  })
  for (const productId of productIds) {
    await prisma.productCollection.upsert({
      where: { productId_collectionId: { productId, collectionId: coll1.id } },
      create: { productId, collectionId: coll1.id },
      update: {},
    })
    await prisma.productCollection.upsert({
      where: { productId_collectionId: { productId, collectionId: coll2.id } },
      create: { productId, collectionId: coll2.id },
      update: {},
    })
  }
  console.log('Seed complete. Products:', productIds.length, 'Collections: 2')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
