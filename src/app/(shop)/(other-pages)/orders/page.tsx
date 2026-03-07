'use client'

import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Link } from '@/components/link'
import { Text } from '@/components/text'
import Image from 'next/image'
import { useState } from 'react'

const dummyOrder: any = {
  id: 1,
  number: 'WU88191111',
  date: '2025-01-01',
  datetime: '2025-01-01T12:00:00Z',
  href: '#',
  invoiceHref: '#',
  total: '$84.00',
  status: 'In Transit',
  customerInfo: {
    name: 'Customer',
    email: 'customer@test.com',
    phone: '123-456-7890'
  },
  products: [
    {
      id: 1,
      name: 'Essential Hijab',
      description: 'Demo',
      href: '#',
      handle: 'essential-hijab',
      price: '$42.00',
      status: 'Shipped',
      color: 'Black',
      size: 'M',
      imageSrc: '/images/hijab/feature-1-2.png',
      imageAlt: 'Demo',
      quantity: 1,
    }
  ]
}

export default function Page() {
  const [orderNumber, setOrderNumber] = useState('')
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Simulating API call for demonstration
    setTimeout(() => {
      if (orderNumber.trim()) {
         dummyOrder.number = orderNumber
         setTrackedOrder(dummyOrder)
      } else {
         setError('Please enter a valid order number.')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="container">
      <div className="mx-auto max-w-3xl py-16 sm:py-24">
        <div className="max-w-xl">
          <Heading level={1} id="track-order-heading" bigger>
            Track <span data-slot="italic">Order</span>
          </Heading>
          <Text className="mt-2 text-zinc-500">
            Enter your order number to track your package status. (For demo purposes, you can enter any string).
          </Text>
        </div>

        <form onSubmit={handleTrack} className="mt-8 flex gap-4 max-w-sm">
          <Input 
            required 
            placeholder="e.g. WU88191111" 
            value={orderNumber} 
            onChange={(e) => setOrderNumber(e.target.value)} 
            className="flex-1"
          />
          <Button type="submit" disabled={loading} color="dark">
            {loading ? 'Tracking...' : 'Track'}
          </Button>
        </form>

        {error && <Text className="mt-4 text-red-500">{error}</Text>}

        {trackedOrder && (
          <div className="mt-12 space-y-20 sm:mt-16">
            <section aria-labelledby={`${trackedOrder.number}-heading`}>
              <div className="space-y-1 md:flex md:items-baseline md:space-y-0 md:space-x-4 border-b border-zinc-200 pb-4">
                <h2 id={`${trackedOrder.number}-heading`} className="text-lg font-medium text-zinc-900 md:shrink-0">
                  Order #{trackedOrder.number}
                </h2>
                <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
                  <Text className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">{trackedOrder.status}</Text>
                </div>
              </div>

              <div className="mt-6 -mb-6 flow-root divide-y divide-zinc-200">
                {trackedOrder.products.map((product: any) => (
                  <div key={product.id} className="py-6 sm:flex">
                    <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                      <div className="relative aspect-3/4 w-20 flex-none sm:w-40 border border-zinc-200 rounded-md overflow-hidden">
                        <Image
                          alt={product.imageAlt}
                          src={product.imageSrc}
                          fill
                          className="object-cover"
                          sizes="(min-width: 640px) 10rem, 100vw"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-1 pt-1.5 sm:pt-0">
                        <h3 className="text-sm font-medium text-zinc-900 uppercase">
                          <Link href={'/products/' + product.handle}>{product.name}</Link>
                        </h3>
                        <Text className="truncate text-xs text-zinc-500">
                          <span>{product.color}</span>{' '}
                          <span aria-hidden="true" className="mx-1.5 text-zinc-300">
                            /
                          </span>{' '}
                          <span>{product.size}</span>
                        </Text>
                        <Text className="text-xs text-zinc-500">Qty {product.quantity}</Text>
                        <Text className="mt-auto font-medium text-zinc-900">{product.price}</Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
      <Divider />
    </div>
  )
}
