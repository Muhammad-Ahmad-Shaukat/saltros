import { prisma } from '@/lib/db'
import { getCartId } from '@/lib/cart'
import { NextResponse } from 'next/server'

// GET /api/orders - list orders for current session
export async function GET() {
  try {
    const cartId = await getCartId()
    if (!cartId) {
      return NextResponse.json({ orders: [] })
    }
    const cart = await prisma.cart.findUnique({ where: { id: cartId } })
    const sessionId = cart?.sessionId
    if (!sessionId) {
      return NextResponse.json({ orders: [] })
    }
    const orders = await prisma.order.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: { product: true },
        },
      },
    })
    const list = orders.map((order) => ({
      number: order.number,
      status: order.status === 'confirmed' ? 'Confirmed' : order.status,
      createdAt: order.createdAt,
      products: order.items.map((item) => {
        const snap = item.productSnapshot as {
          name: string
          handle: string
          imageSrc: string
          imageAlt: string
        }
        const opt = (item.options as { size?: string; color?: string }) ?? {}
        return {
          id: item.id,
          name: snap.name,
          handle: snap.handle,
          price: `$${Number(item.price).toFixed(2)}`,
          quantity: item.quantity,
          imageSrc: snap.imageSrc,
          imageAlt: snap.imageAlt,
          color: opt.color ?? '',
          size: opt.size ?? '',
        }
      }),
    }))
    return NextResponse.json({ orders: list })
  } catch (e) {
    console.error('GET /api/orders', e)
    return NextResponse.json({ error: 'Failed to list orders' }, { status: 500 })
  }
}
