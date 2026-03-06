import { prisma } from '@/lib/db'
import { getCartId } from '@/lib/cart'

type ProductRow = {
  id: number
  handle: string
  title: string
  vendor: string | null
  price: unknown
  tags: unknown
  images: unknown
  featuredImage: unknown
  options: unknown
  selectedOptions: unknown
  description: string | null
  collections?: { collection: { id: string; title: string; handle: string } }[]
}

function mapProduct(p: ProductRow) {
  const price = Number(p.price)
  const images = (p.images as { src: string; width: number; height: number; alt: string }[]) ?? []
  const featuredImage = (p.featuredImage as { src: string; width: number; height: number; alt: string }) ?? { src: '', width: 0, height: 0, alt: '' }
  const options = (p.options as { name: string; optionValues: { name: string; swatch?: unknown }[] }[]) ?? []
  const selectedOptions = (p.selectedOptions as { name: string; value: string }[]) ?? []
  const collections = (p.collections ?? []).map((pc: { collection: { title: string; id: string; handle: string } }) => ({
    title: pc.collection.title,
    id: pc.collection.id,
    handle: pc.collection.handle,
  }))
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    vendor: p.vendor ?? '',
    tags: (p.tags as string[]) ?? [],
    price,
    images,
    featured_image: featuredImage,
    options,
    selected_options: selectedOptions,
    collections,
    description: p.description ?? undefined,
  }
}

export async function getProducts() {
  const products = await prisma.product.findMany({
    include: {
      collections: { include: { collection: true } },
    },
    orderBy: { id: 'asc' },
  })
  return products.map((p) => mapProduct(p as unknown as ProductRow))
}

export async function getProductByHandle(handle: string) {
  const product = await prisma.product.findUnique({
    where: { handle: handle.toLowerCase() },
    include: {
      collections: { include: { collection: true } },
    },
  })
  if (!product) return null
  const mapped = mapProduct(product as unknown as ProductRow)
  return {
    ...mapped,
    description: mapped.description ?? 'lorem ipsum dolor...',
  }
}

export async function getCollections(theme: 'fashion' | 'hijab' | 'skincare' | 'all') {
  const where = theme === 'all' ? {} : { theme }
  const collections = await prisma.collection.findMany({
    where,
    include: {
      products: {
        include: {
          product: {
            include: {
              collections: { include: { collection: true } },
            },
          },
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
  })
  return collections.map((c) => ({
    id: c.id,
    title: c.title,
    handle: c.handle,
    description: c.description,
    updatedAt: c.updatedAt.toISOString(),
    image: c.image,
    products: c.products.map((pc) => mapProduct(pc.product as unknown as ProductRow)),
  }))
}

export async function getCollectionById(id: string) {
  const collection = await prisma.collection.findUnique({
    where: { id },
    include: {
      products: {
        include: {
          product: {
            include: {
              collections: { include: { collection: true } },
            },
          },
        },
      },
    },
  })
  if (!collection) return null
  return {
    id: collection.id,
    title: collection.title,
    handle: collection.handle,
    description: collection.description,
    updatedAt: collection.updatedAt.toISOString(),
    image: collection.image,
    products: collection.products.map((pc) => mapProduct(pc.product as unknown as ProductRow)),
  }
}

export async function getCollectionByHandle(handle: string) {
  if (handle === 'all') {
    const products = await getProducts()
    return {
      id: 'gid://0',
      title: 'All Products',
      handle: '/all',
      description:
        'Discover our complete range of skincare, haircare, and body care products. Find the perfect product for your needs.',
      updatedAt: new Date().toISOString(),
      image: '/images/skincare/c1.webp',
      products: products.slice(0, 8),
    }
  }
  const collection = await prisma.collection.findUnique({
    where: { handle },
    include: {
      products: {
        include: {
          product: {
            include: {
              collections: { include: { collection: true } },
            },
          },
        },
      },
    },
  })
  if (!collection) return null
  return {
    id: collection.id,
    title: collection.title,
    handle: collection.handle,
    description: collection.description,
    updatedAt: collection.updatedAt.toISOString(),
    image: collection.image,
    products: collection.products.map((pc) => mapProduct(pc.product as unknown as ProductRow)),
  }
}

export async function getCartProducts() {
  const cartId = await getCartId()
  if (!cartId) return []
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: { product: true },
      },
    },
  })
  if (!cart) return []
  const feat = (p: { featuredImage: unknown; title: string }) => {
    const f = (p.featuredImage as { src?: string; alt?: string }) ?? {}
    return { src: f.src ?? '/images/placeholder.svg', alt: f.alt ?? p.title }
  }
  const opt = (o: unknown) => (o as { size?: string; color?: string }) ?? {}
  return cart.items.map((item) => {
    const p = item.product
    const { src: imageSrc, alt: imageAlt } = feat(p)
    const options = opt(item.options)
    return {
      id: item.id,
      name: p.title,
      handle: p.handle,
      price: `$${Number(item.price).toFixed(2)}`,
      color: options.color ?? null,
      size: options.size ?? null,
      inStock: true,
      imageSrc,
      imageAlt,
      quantity: item.quantity,
    }
  })
}

export async function getOrders() {
  const cartId = await getCartId()
  if (!cartId) return []
  const cart = await prisma.cart.findUnique({ where: { id: cartId } })
  if (!cart) return []
  const orders = await prisma.order.findMany({
    where: { sessionId: cart.sessionId },
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  })
  return orders.map((order) => {
    const products = order.items.map((item) => {
      const snap = item.productSnapshot as { name: string; handle: string; imageSrc: string; imageAlt: string }
      const opt = (item.options as { size?: string; color?: string }) ?? {}
      return {
        id: item.id,
        name: snap.name,
        handle: snap.handle,
        description: '',
        href: '#',
        price: `$${Number(item.price).toFixed(2)}`,
        status: 'Preparing to ship',
        step: 1,
        date: new Date(order.createdAt).toLocaleDateString('en-US'),
        datetime: order.createdAt.toISOString().slice(0, 10),
        address: [] as string[],
        email: order.email,
        phone: '',
        imageSrc: snap.imageSrc,
        imageAlt: snap.imageAlt,
        quantity: item.quantity,
        size: opt.size ?? '',
        color: opt.color ?? '',
      }
    })
    return {
      number: order.number,
      status: order.status === 'confirmed' ? 'Confirmed' : order.status,
      invoiceHref: '#',
      products,
    }
  })
}

export async function getOrder(number: string) {
  const orders = await getOrders()
  return orders.find((o) => o.number === number) ?? null
}
