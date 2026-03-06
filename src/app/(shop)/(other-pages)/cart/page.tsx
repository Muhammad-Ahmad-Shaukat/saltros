import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Heading } from '@/components/heading'
import { Link } from '@/components/link'
import { Text } from '@/components/text'
import { getCartProducts } from '@/data'
import { HelpCircleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Metadata } from 'next'
import { CartItemRow } from './cart-item-row'

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Your shopping cart page description goes here.',
}

function orderSummary(products: Awaited<ReturnType<typeof getCartProducts>>) {
  const subtotal = products.reduce((sum, p) => {
    const match = p.price.replace(/[^0-9.]/g, '')
    return sum + parseFloat(match || '0') * p.quantity
  }, 0)
  const shipping = subtotal >= 100 ? 0 : 5
  const tax = Math.round(subtotal * 0.1 * 100) / 100
  const total = Math.round((subtotal + shipping + tax) * 100) / 100
  return { subtotal, shipping, tax, total }
}

export default async function Page() {
  const products = await getCartProducts()
  const { subtotal, shipping, tax, total } = orderSummary(products)

  return (
    <div className="container">
      <div className="mx-auto max-w-7xl pt-16">
        <Heading level={1}>
          Shopping <span data-slot="italic">Cart</span>
        </Heading>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-14">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <ul role="list" className="divide-y divide-zinc-900/10 border-t border-b border-zinc-900/10">
              {products.map((product) => (
                <CartItemRow key={product.id} product={product} />
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg border border-zinc-900/10 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <Heading fontSize="text-2xl font-medium text-zinc-950" level={3}>
              <span data-slot="italic">Order</span> summary
            </Heading>
            <dl className="mt-8 space-y-5">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-zinc-600 uppercase">Subtotal</dt>
                <dd className="text-sm font-medium text-zinc-900">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center text-sm text-zinc-600">
                  <Text>Shipping estimate</Text>
                  <a href="#" className="ml-2 shrink-0 text-zinc-400 hover:text-zinc-500">
                    <span className="sr-only">Learn more about how shipping is calculated</span>
                    <HugeiconsIcon icon={HelpCircleIcon} size={16} color="currentColor" strokeWidth={1.5} />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-zinc-900">${shipping.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center text-sm text-zinc-600">
                  <Text>Tax estimate</Text>
                  <a href="#" className="ml-2 shrink-0 text-zinc-400 hover:text-zinc-500">
                    <span className="sr-only">Learn more about how tax is calculated</span>
                    <HugeiconsIcon icon={HelpCircleIcon} size={16} color="currentColor" strokeWidth={1.5} />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-zinc-900 uppercase">${tax.toFixed(2)}</dd>
              </div>
              <Divider />
              <div className="flex items-center justify-between">
                <dt className="text-base font-medium text-zinc-900 uppercase">Order total</dt>
                <dd className="text-base font-medium text-zinc-900 uppercase">${total.toFixed(2)}</dd>
              </div>
            </dl>
            <div className="mt-10">
              <Button className="w-full font-medium" href="/checkout">
                Checkout
              </Button>
              <div className="mt-4 flex justify-center text-center text-sm text-zinc-500">
                <span className="text-xs">
                  or{' '}
                  <span className="text-xs font-medium text-zinc-900 uppercase">
                    <Link href="/collections/all">Continue Shopping</Link>
                    <span aria-hidden="true"> →</span>
                  </span>
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
