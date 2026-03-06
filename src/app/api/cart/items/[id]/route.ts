import { prisma } from '@/lib/db'
import { getCartId } from '@/lib/cart'
import { NextResponse } from 'next/server'

// PATCH /api/cart/items/[id] - update quantity (body: { quantity: number })
export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cartId = await getCartId()
    if (!cartId) {
      return NextResponse.json({ error: 'No cart' }, { status: 400 })
    }
    const { id } = await params
    const itemId = parseInt(id, 10)
    if (Number.isNaN(itemId)) {
      return NextResponse.json({ error: 'Invalid item id' }, { status: 400 })
    }
    const body = await _request.json().catch(() => ({})) as { quantity?: number }
    const quantity = body.quantity
    if (typeof quantity !== 'number' || quantity < 1) {
      return NextResponse.json({ error: 'quantity must be a positive number' }, { status: 400 })
    }
    const item = await prisma.cartItem.findFirst({
      where: { id: itemId, cartId },
      include: { product: true },
    })
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }
    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    })
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { product: true } } },
    })
    const items = (cart?.items ?? []).map((i) => {
      const p = i.product
      const feat = p.featuredImage as { src: string; alt?: string }
      const opt = (i.options as { size?: string; color?: string }) ?? {}
      return {
        id: i.id,
        productId: p.id,
        name: p.title,
        handle: p.handle,
        price: `$${Number(i.price).toFixed(2)}`,
        color: opt.color ?? null,
        size: opt.size ?? null,
        inStock: true,
        imageSrc: feat?.src ?? '/images/placeholder.svg',
        imageAlt: feat?.alt ?? p.title,
        quantity: i.quantity,
      }
    })
    const subtotal = (cart?.items ?? []).reduce(
      (sum, i) => sum + Number(i.price) * i.quantity,
      0
    )
    return NextResponse.json({ items, subtotal: Number(subtotal.toFixed(2)) })
  } catch (e) {
    console.error('PATCH /api/cart/items/[id]', e)
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 })
  }
}

// DELETE /api/cart/items/[id] - remove item from cart
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cartId = await getCartId()
    if (!cartId) {
      return NextResponse.json({ error: 'No cart' }, { status: 400 })
    }
    const { id } = await params
    const itemId = parseInt(id, 10)
    if (Number.isNaN(itemId)) {
      return NextResponse.json({ error: 'Invalid item id' }, { status: 400 })
    }
    const item = await prisma.cartItem.findFirst({
      where: { id: itemId, cartId },
    })
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }
    await prisma.cartItem.delete({ where: { id: itemId } })
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { product: true } } },
    })
    const items = (cart?.items ?? []).map((i) => {
      const p = i.product
      const feat = p.featuredImage as { src: string; alt?: string }
      const opt = (i.options as { size?: string; color?: string }) ?? {}
      return {
        id: i.id,
        productId: p.id,
        name: p.title,
        handle: p.handle,
        price: `$${Number(i.price).toFixed(2)}`,
        color: opt.color ?? null,
        size: opt.size ?? null,
        inStock: true,
        imageSrc: feat?.src ?? '/images/placeholder.svg',
        imageAlt: feat?.alt ?? p.title,
        quantity: i.quantity,
      }
    })
    const subtotal = (cart?.items ?? []).reduce(
      (sum, i) => sum + Number(i.price) * i.quantity,
      0
    )
    return NextResponse.json({ items, subtotal: Number(subtotal.toFixed(2)) })
  } catch (e) {
    console.error('DELETE /api/cart/items/[id]', e)
    return NextResponse.json({ error: 'Failed to remove item' }, { status: 500 })
  }
}
