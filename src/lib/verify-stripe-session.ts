import { prisma } from '@/lib/db'
import { getStripe } from '@/lib/stripe'

/** Server-side: verify Stripe Checkout Session and mark order confirmed, clear cart. Returns order number if verified. */
export async function verifyStripeSession(sessionId: string): Promise<string | null> {
  const stripe = getStripe()
  if (!stripe) return null
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') return null
    const orderNumber = session.metadata?.orderNumber as string | undefined
    if (!orderNumber) return null
    const updated = await prisma.order.updateMany({
      where: { number: orderNumber, status: 'pending_payment' },
      data: { status: 'confirmed' },
    })
    if (updated.count > 0) {
      const order = await prisma.order.findUnique({ where: { number: orderNumber } })
      if (order) {
        const cart = await prisma.cart.findUnique({ where: { sessionId: order.sessionId } })
        if (cart) await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
      }
    }
    return orderNumber
  } catch {
    return null
  }
}
