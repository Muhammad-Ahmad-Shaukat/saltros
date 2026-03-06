import Stripe from 'stripe'

const secret =
  process.env.STRIPE_SECRET_KEY || process.env.Secret_key || ''

export function getStripe(): Stripe | null {
  if (!secret) return null
  return new Stripe(secret)
}

export function getStripePublishableKey(): string {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.Publishable_key || ''
}
