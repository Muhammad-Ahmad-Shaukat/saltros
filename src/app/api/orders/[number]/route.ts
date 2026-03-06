import { prisma } from '@/lib/db'
import { getCartId } from '@/lib/cart'
import { NextResponse } from 'next/server'

// GET /api/orders/[number] - get single order by number (only if session matches)
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ number: string }> }
) {
  try {
    const cartId = await getCartId()
    if (!cartId) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const cart = await prisma.cart.findUnique({ where: { id: cartId } })
    const sessionId = cart?.sessionId
    if (!sessionId) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const { number } = await params
    const order = await prisma.order.findFirst({
      where: { number, sessionId },
      include: { items: true },
    })
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    const products = order.items.map((item) => {
      const snap = item.productSnapshot as {
        name: string
        handle: string
        imageSrc: string
        imageAlt: string
      }
      const opt = (item.options as { size?: string; color?: string }) ?? {}
      const addr = (order.shippingAddress as { firstName?: string; lastName?: string; address?: string; city?: string; country?: string; region?: string }) ?? {}
      const addressLines = [
        [addr.firstName, addr.lastName].filter(Boolean).join(' '),
        addr.address,
        [addr.city, addr.region, addr.country].filter(Boolean).join(', '),
      ].filter(Boolean)
      return {
        id: item.id,
        name: snap.name,
        handle: snap.handle,
        href: `/products/${snap.handle}`,
        price: item.price.toString(),
        quantity: item.quantity,
        imageSrc: snap.imageSrc,
        imageAlt: snap.imageAlt,
        size: opt.size ?? '',
        color: opt.color ?? '',
        status: 'Confirmed',
        step: 1,
        date: new Date(order.createdAt).toLocaleDateString('en-US'),
        datetime: order.createdAt.toISOString().slice(0, 10),
        address: addressLines,
        email: order.email,
        phone: addr.phone ?? '',
      }
    })
    return NextResponse.json({
      number: order.number,
      status: order.status,
      createdAt: order.createdAt,
      subtotal: Number(order.subtotal),
      shipping: Number(order.shipping),
      tax: Number(order.tax),
      total: Number(order.total),
      products,
    })
  } catch (e) {
    console.error('GET /api/orders/[number]', e)
    return NextResponse.json({ error: 'Failed to get order' }, { status: 500 })
  }
}
