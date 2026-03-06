import { prisma } from '@/lib/db'
import { getCartId } from '@/lib/cart'
import { NextResponse } from 'next/server'

// POST /api/checkout - create order from cart, clear cart, return order number
// Body: { email, shippingAddress: { firstName, lastName, address, city, country, region, postalCode, phone } }
export async function POST(request: Request) {
  try {
    const cartId = await getCartId()
    if (!cartId) {
      return NextResponse.json({ error: 'No cart' }, { status: 400 })
    }
    const body = await request.json().catch(() => ({})) as {
      email?: string
      shippingAddress?: {
        firstName?: string
        lastName?: string
        address?: string
        city?: string
        country?: string
        region?: string
        postalCode?: string
        phone?: string
      }
    }
    const email = body.email?.trim() || 'guest@example.com'
    const shippingAddress = body.shippingAddress ?? {}

    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { product: true } } },
    })
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const subtotal = cart.items.reduce(
      (sum, i) => sum + Number(i.price) * i.quantity,
      0
    )
    const shipping = subtotal >= 100 ? 0 : 5
    const tax = Math.round(subtotal * 0.1 * 100) / 100
    const total = Math.round((subtotal + shipping + tax) * 100) / 100

    const orderNumber = String(Math.floor(1000 + Math.random() * 9000))
    const existing = await prisma.order.findUnique({ where: { number: orderNumber } })
    const finalNumber = existing ? String(Math.floor(10000 + Math.random() * 90000)) : orderNumber

    const order = await prisma.order.create({
      data: {
        number: finalNumber,
        sessionId: cart.sessionId,
        email,
        status: 'confirmed',
        shippingAddress: shippingAddress as object,
        subtotal,
        shipping,
        tax,
        total,
        items: {
          create: cart.items.map((item) => {
            const p = item.product
            const feat = p.featuredImage as { src: string; alt?: string }
            return {
              productId: p.id,
              quantity: item.quantity,
              price: item.price,
              options: item.options as object,
              productSnapshot: {
                name: p.title,
                handle: p.handle,
                imageSrc: feat?.src ?? '/images/placeholder.svg',
                imageAlt: feat?.alt ?? p.title,
              },
            }
          }),
        },
      },
      include: { items: true },
    })

    await prisma.cartItem.deleteMany({ where: { cartId } })

    return NextResponse.json({
      orderNumber: order.number,
      orderId: order.id,
      total: Number(order.total),
    })
  } catch (e) {
    console.error('POST /api/checkout', e)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
