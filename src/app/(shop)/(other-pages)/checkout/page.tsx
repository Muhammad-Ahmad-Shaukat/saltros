import { getCartProducts } from '@/data'
import { Divider } from '@/components/divider'
import { Metadata } from 'next'
import { CheckoutForm } from './checkout-form'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Your checkout page description goes here.',
  keywords: ['checkout', 'shopping cart', 'ecommerce'],
}

export default async function Page() {
  const products = await getCartProducts()

  return (
    <div className="container">
      <div className="mx-auto max-w-7xl pt-16 pb-24">
        <h2 className="sr-only">Checkout</h2>
        <CheckoutForm products={products} />
      </div>
      <Divider />
    </div>
  )
}
