import { verifyStripeSession } from '@/lib/verify-stripe-session'
import { NextResponse } from 'next/server'

// GET /api/checkout/verify-session?session_id=cs_xxx
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  }
  const orderNumber = await verifyStripeSession(sessionId)
  if (!orderNumber) {
    return NextResponse.json({ verified: false }, { status: 400 })
  }
  return NextResponse.json({ verified: true, orderNumber })
}
