'use client'

import { Button } from '@/components/button'
import { Link } from '@/components/link'
import { Text } from '@/components/text'
import type { getCartProducts } from '@/data'
import { CheckIcon, ClockIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type CartProduct = Awaited<ReturnType<typeof getCartProducts>>[number]

export function CartItemRow({ product }: { product: CartProduct }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(product.quantity)
  const [removing, setRemoving] = useState(false)

  async function updateQty(newQty: number) {
    if (newQty < 1) return
    setQuantity(newQty)
    const res = await fetch(`/api/cart/items/${product.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQty }),
    })
    if (res.ok) router.refresh()
  }

  async function remove() {
    setRemoving(true)
    const res = await fetch(`/api/cart/items/${product.id}`, { method: 'DELETE' })
    if (res.ok) router.refresh()
    else setRemoving(false)
  }

  return (
    <li className="flex py-6 sm:py-10">
      <div className="shrink-0">
        <div className="relative aspect-3/4 w-24 sm:w-40">
          <Image
            alt={product.imageAlt}
            src={product.imageSrc}
            sizes="(min-width: 640px) 220px, 140px"
            className="rounded-lg object-cover"
            fill
            priority
          />
        </div>
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <Link href={'/products/' + product.handle} className="font-medium uppercase">
                  {product.name}
                </Link>
              </h3>
            </div>
            <div className="mt-1.5 flex gap-2 text-sm">
              <Text className="text-zinc-500">{product.color}</Text>
              {product.size ? <Text className="text-zinc-300">/</Text> : null}
              {product.size ? <Text className="text-zinc-500">{product.size} </Text> : null}
            </div>
            <Text className="mt-1.5">{product.price}</Text>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <div className="grid w-full grid-cols-1">
              <select
                value={quantity}
                onChange={(e) => updateQty(parseInt(e.target.value, 10))}
                className="w-full max-w-20 rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm"
                aria-label={`Quantity for ${product.name}`}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="absolute top-0 right-0">
              <button
                type="button"
                onClick={remove}
                disabled={removing}
                className="-m-2 inline-flex p-2 text-zinc-400 hover:text-zinc-500 disabled:opacity-50"
                aria-label="Remove"
              >
                <XMarkIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-2 text-zinc-700">
          {product.inStock ? (
            <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500" />
          ) : (
            <ClockIcon aria-hidden="true" className="size-5 shrink-0 text-zinc-300" />
          )}
          <Text className="text-xs">{product.inStock ? 'In stock' : 'Ships in 3–4 weeks'}</Text>
        </div>
      </div>
    </li>
  )
}
