import { getCartProducts, getUserAddress } from '@/data'
import { Divider } from '@/components/divider'
import { Metadata } from 'next'
import { CheckoutForm } from './checkout-form'
import { getSession } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Your checkout page description goes here.',
  keywords: ['checkout', 'shopping cart', 'ecommerce'],
}

export default async function Page() {
  const [products, session] = await Promise.all([getCartProducts(), getSession()])
  const address = session?.email ? await getUserAddress(session.email) : null

  return (
    <div className="container">
      <div className="mx-auto max-w-7xl pt-16 pb-24">
        <h2 className="sr-only">Checkout</h2>
        <CheckoutForm products={products} initialAddress={address} initialEmail={session?.email} />
      </div>
      <Divider />
    </div>
  )
}
