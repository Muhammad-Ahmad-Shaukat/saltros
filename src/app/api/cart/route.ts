import { prisma } from '@/lib/db'
import { getCartId, cartCookieOptions } from '@/lib/cart'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// GET /api/cart - get current cart with items
export async function GET() {
  try {
    const cartId = await getCartId()
    if (!cartId) {
      return NextResponse.json({ items: [], subtotal: 0 })
    }
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })
    if (!cart) {
      return NextResponse.json({ items: [], subtotal: 0 })
    }
    const items = cart.items.map((item) => {
      const product = item.product
      const featuredImage = product.featuredImage as { src: string; alt?: string }
      const options = (item.options as { size?: string; color?: string }) ?? {}
      return {
        id: item.id,
        productId: product.id,
        name: product.title,
        handle: product.handle,
        price: `$${Number(item.price).toFixed(2)}`,
        color: options.color ?? null,
        size: options.size ?? null,
        inStock: true,
        imageSrc: featuredImage?.src ?? '/images/placeholder.svg',
        imageAlt: featuredImage?.alt ?? product.title,
        quantity: item.quantity,
      }
    })
    const subtotal = cart.items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0)
    return NextResponse.json({ items, subtotal: Number(subtotal.toFixed(2)) })
  } catch (e) {
    console.error('GET /api/cart', e)
    return NextResponse.json({ error: 'Failed to get cart' }, { status: 500 })
  }
}

// POST /api/cart - add item to cart (body: { productId, quantity?, options? })
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, quantity = 1, options = {} } = body as {
      productId: number
      quantity?: number
      options?: { size?: string; color?: string }
    }
    if (!productId || typeof productId !== 'number') {
      return NextResponse.json({ error: 'productId required' }, { status: 400 })
    }
    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    const price = product.price
    let cartId = await getCartId()
    if (!cartId) {
      const cart = await prisma.cart.create({ data: { sessionId: crypto.randomUUID() } })
      cartId = cart.id
      const cookieStore = await cookies()
      cookieStore.set('cart_id', cartId, cartCookieOptions())
    }
    const opts = Object.keys(options).length ? options : undefined
    const existing = await prisma.cartItem.findFirst({
      where: {
        cartId,
        productId,
        ...(opts ? { options: { equals: opts } } : {}),
      },
    })
    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId,
          productId,
          quantity,
          price,
          options: options as object,
        },
      })
    }
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { product: true } } },
    })
    const items = (cart?.items ?? []).map((item) => {
      const p = item.product
      const feat = p.featuredImage as { src: string; alt?: string }
      const opt = (item.options as { size?: string; color?: string }) ?? {}
      return {
        id: item.id,
        productId: p.id,
        name: p.title,
        handle: p.handle,
        price: `$${Number(item.price).toFixed(2)}`,
        color: opt.color ?? null,
        size: opt.size ?? null,
        inStock: true,
        imageSrc: feat?.src ?? '/images/placeholder.svg',
        imageAlt: feat?.alt ?? p.title,
        quantity: item.quantity,
      }
    })
    const subtotal = (cart?.items ?? []).reduce(
      (sum, i) => sum + Number(i.price) * i.quantity,
      0
    )
    return NextResponse.json({ items, subtotal: Number(subtotal.toFixed(2)) })
  } catch (e) {
    console.error('POST /api/cart', e)
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 })
  }
}

// DELETE /api/cart - clear cart
export async function DELETE() {
  try {
    const cartId = await getCartId()
    if (cartId) {
      await prisma.cartItem.deleteMany({ where: { cartId } })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('DELETE /api/cart', e)
    return NextResponse.json({ error: 'Failed to clear cart' }, { status: 500 })
  }
}

