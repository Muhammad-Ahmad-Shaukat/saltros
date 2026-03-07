import { Divider } from '@/components/divider'
import { Heading } from '@/components/heading'
import { Text } from '@/components/text'
import { getOrder } from '@/data'
import { verifyStripeSession } from '@/lib/verify-stripe-session'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
export const metadata: Metadata = {
  title: 'Order Successful',
  description: 'Your order has been successfully placed.',
}

type Props = { searchParams: Promise<{ order?: string; session_id?: string }> }

export default async function Page({ searchParams }: Props) {
  const { order: orderParam, session_id: sessionId } = await searchParams
  // If redirected from Stripe, verify session and confirm order (clears cart)
  const orderNumber = sessionId ? await verifyStripeSession(sessionId) : orderParam
  const order = orderNumber ? await getOrder(orderNumber) : null

  if (!orderNumber || !order) {
    return (
      <>
        <main className="container">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-3xl">
            <Heading bigger className="mt-4">
              Order <span data-slot="italic">not found</span>
            </Heading>
            <Text className="mt-2.5 text-sm text-zinc-500">
              We couldn&apos;t find that order. Try visiting your{' '}
              <Link href="/orders" className="underline">
                orders page
              </Link>
              .
            </Text>
            <div className="mt-8">
              <Link href="/shop" className="text-sm font-medium text-zinc-950 uppercase">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </main>
        <Divider />
      </>
    )
  }

  const products = order.products
  const subtotal = products.reduce((sum, p) => {
    const match = p.price.replace(/[^0-9.]/g, '')
    return sum + parseFloat(match || '0') * p.quantity
  }, 0)
  const shipping = subtotal >= 100 ? 0 : 5
  const tax = Math.round(subtotal * 0.1 * 100) / 100
  const total = Math.round((subtotal + shipping + tax) * 100) / 100

  return (
    <>
      <main className="container">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-3xl">
          <div className="flex w-fit items-center justify-center rounded-full border border-zinc-900 px-6 py-2.5 text-sm font-medium">
            <span className="text-xs uppercase">Thanks for ordering</span>
          </div>
          <Heading bigger className="mt-4">
            Payment <span data-slot="italic">successful!</span>
          </Heading>

          <Text className="mt-2.5 text-sm text-zinc-500">
            We appreciate your order, we&apos;re currently processing it. So hang tight and we&apos;ll send you
            confirmation very soon!
          </Text>

          <dl className="mt-16 text-sm">
            <dt className="text-zinc-500 uppercase">Order number</dt>
            <dd className="mt-2 font-medium text-zinc-950">#{order.number}</dd>
          </dl>

          <ul
            role="list"
            className="mt-6 divide-y divide-zinc-200 border-t border-zinc-200 text-sm font-medium text-zinc-500"
          >
            {products.map((product) => (
              <li key={product.id} className="flex space-x-6 py-6">
                <div className="relative aspect-3/4 w-24 flex-none">
                  <Image
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    fill
                    sizes="200px"
                    className="rounded-md bg-zinc-100 object-cover"
                  />
                </div>
                <div className="flex flex-auto flex-col space-y-1">
                  <h3 className="text-zinc-900 uppercase">
                    <Link href={'/products/' + product.handle}>{product.name}</Link>
                  </h3>
                  <div className="flex items-center space-x-2 text-zinc-500">
                    <Text className="text-xs text-zinc-500">{product.color}</Text>
                    {product.size ? <Text className="text-xs text-zinc-300">/</Text> : null}
                    {product.size ? <Text className="text-xs text-zinc-500">{product.size}</Text> : null}
                  </div>
                  <Text className="mt-auto text-xs text-zinc-500">Qty {product.quantity}</Text>
                </div>
                <p className="flex-none font-medium text-zinc-900">{product.price}</p>
              </li>
            ))}
          </ul>

          <dl className="space-y-6 border-t border-zinc-200 pt-6 text-sm font-medium text-zinc-500">
            <div className="flex justify-between">
              <dt className="uppercase">Subtotal</dt>
              <dd className="text-zinc-900">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="uppercase">Shipping</dt>
              <dd className="text-zinc-900">${shipping.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="uppercase">Taxes</dt>
              <dd className="text-zinc-900">${tax.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-200 pt-6 text-zinc-900">
              <dt className="text-base uppercase">Total</dt>
              <dd className="text-base">${total.toFixed(2)}</dd>
            </div>
          </dl>

          <div className="mt-16 border-t border-zinc-200 py-6 text-right">
            <Link href="/shop" className="text-sm font-medium text-zinc-950 uppercase">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>

        <Divider />
      </main>
    </>
  )
}
