'use client'

import { CartProductItem, type CartProductItemProps } from '@/components/cart-product-item'
import { Button } from '@/components/button'
import { Description, Field, Fieldset, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Radio, RadioGroup } from '@/components/radio'
import { Select } from '@/components/select'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import DeliveryRadio from './delivery-radio'

export function CheckoutForm({
  products,
  initialAddress,
  initialEmail,
}: {
  products: CartProductItemProps[]
  initialAddress?: any
  initialEmail?: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addr = initialAddress ?? {}

  const subtotal = products.reduce((sum, p) => {
    const match = p.price.replace(/[^0-9.]/g, '')
    return sum + parseFloat(match || '0') * p.quantity
  }, 0)
  const shipping = subtotal >= 100 ? 0 : 5
  const tax = Math.round(subtotal * 0.1 * 100) / 100
  const total = Math.round((subtotal + shipping + tax) * 100) / 100

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    const email = (formData.get('email') as string)?.trim() || 'guest@example.com'
    const paymentMethod = (formData.get('payment-type') as string) || 'cash_on_delivery'
    const shippingAddress = {
      firstName: formData.get('first-name') || formData.get('fisrt-name'),
      lastName: formData.get('last-name'),
      address: formData.get('address'),
      city: formData.get('city'),
      country: formData.get('country'),
      region: formData.get('region'),
      postalCode: formData.get('postal-code'),
      phone: formData.get('phone'),
    }
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          shippingAddress,
          paymentMethod: paymentMethod === 'Stripe' ? 'stripe' : 'cash_on_delivery',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'Checkout failed')
        setLoading(false)
        return
      }
      if (data.url) {
        window.location.href = data.url
        return
      }
      router.push(`/order-successful?order=${data.orderNumber}`)
    } catch {
      setError('Checkout failed')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 2xl:gap-x-20">
      <div>
        <div>
          <div className="flex items-center justify-between">
            <Heading fontSize="text-2xl font-medium text-zinc-950" level={3}>
              <span data-slot="italic">Contact</span> information
            </Heading>
            {!initialEmail && (
              <p className="text-sm text-zinc-500">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-zinc-900 underline">
                  Log in
                </Link>
              </p>
            )}
          </div>
          <Field className="mt-10">
            <Label>Email address</Label>
            <Input type="email" name="email" defaultValue={initialEmail} required />
            <Description>We'll send you a confirmation email when your order has shipped.</Description>
          </Field>
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-10">
          <Heading fontSize="text-2xl font-medium text-zinc-950" level={3}>
            <span data-slot="italic">Shipping</span> information
          </Heading>
          <div className="mt-10 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <Field>
              <Label>First name</Label>
              <Input type="text" name="first-name" defaultValue={addr.firstName} />
            </Field>
            <Field>
              <Label>Last name</Label>
              <Input type="text" name="last-name" defaultValue={addr.lastName} />
            </Field>
            <Field className="sm:col-span-2">
              <Label>Company</Label>
              <Input type="text" name="company" />
            </Field>
            <Field className="sm:col-span-2">
              <Label>Address</Label>
              <Input type="text" name="address" defaultValue={addr.address} />
            </Field>
            <Field className="sm:col-span-2">
              <Label>Apartment, suite, etc.</Label>
              <Input type="text" name="apartment" />
            </Field>
            <Field>
              <Label>City</Label>
              <Input type="text" name="city" defaultValue={addr.city} />
            </Field>
            <Field>
              <Label>Country</Label>
              <Select className="mt-3 sm:col-span-2 sm:mt-0" name="country" defaultValue={addr.country || 'United States'}>
                <option>Canada</option>
                <option>Mexico</option>
                <option>United States</option>
              </Select>
            </Field>
            <Field>
              <Label>State / Province</Label>
              <Input type="text" name="region" defaultValue={addr.region} />
            </Field>
            <Field>
              <Label>Postal code</Label>
              <Input type="text" name="postal-code" defaultValue={addr.postalCode} />
            </Field>
            <Field className="sm:col-span-2">
              <Label>Phone</Label>
              <Input type="tel" name="phone" defaultValue={addr.phone} />
            </Field>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-10">
          <Fieldset>
            <Heading fontSize="text-2xl font-medium text-zinc-950" level={3}>
              <span data-slot="italic">Delivery</span> method
            </Heading>
            <DeliveryRadio />
          </Fieldset>
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-10">
          <Heading fontSize="text-2xl font-medium text-zinc-950" level={3}>
            <span data-slot="italic">Payment</span> method
          </Heading>
          <Fieldset className="mt-6">
            <legend className="sr-only">Payment type</legend>
            <RadioGroup
              name="payment-type"
              defaultValue="Cash on Delivery"
              className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4"
            >
              <Field className="relative flex cursor-pointer rounded-lg border border-zinc-300 bg-white p-4 shadow-sm hover:border-zinc-400 focus:outline-none has-checked:border-zinc-950 has-checked:ring-2 has-checked:ring-zinc-950">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <Label className="font-medium text-zinc-900">Cash on Delivery</Label>
                      <Description className="text-zinc-500">Pay when you receive</Description>
                    </div>
                  </div>
                  <Radio value="Cash on Delivery" className="h-4 w-4 text-zinc-950" />
                </div>
              </Field>

              <Field className="relative flex cursor-pointer rounded-lg border border-zinc-300 bg-white p-4 shadow-sm hover:border-zinc-400 focus:outline-none has-checked:border-zinc-950 has-checked:ring-2 has-checked:ring-zinc-950">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <Label className="font-medium text-zinc-900">Stripe (Card)</Label>
                      <Description className="text-zinc-500">Secure card payment</Description>
                    </div>
                  </div>
                  <Radio value="Stripe" className="h-4 w-4 text-zinc-950" />
                </div>
                <div className="absolute top-2 right-10 flex space-x-1 opacity-50">
                   <svg className="h-4 w-auto" viewBox="0 0 38 24" fill="none"><rect width="38" height="24" rx="4" fill="#252525"/><path d="M12 11h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" fill="#fff"/></svg>
                </div>
              </Field>
            </RadioGroup>
          </Fieldset>
        </div>
      </div>

      <div className="mt-10 lg:mt-0">
        <Heading fontSize="text-2xl font-medium text-zinc-950" level={3}>
          <span data-slot="italic">Order</span> summary
        </Heading>
        <div className="mt-5 rounded-lg border border-zinc-200 bg-white">
          <h3 className="sr-only">Items in your cart</h3>
          <ul role="list" className="divide-y divide-zinc-200">
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} className="px-4 py-6 sm:px-6" />
            ))}
          </ul>
          <dl className="space-y-6 border-t border-zinc-200 px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between">
              <dt className="text-sm uppercase">Subtotal</dt>
              <dd className="text-sm font-medium text-zinc-900">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm uppercase">Shipping</dt>
              <dd className="text-sm font-medium text-zinc-900">${shipping.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm uppercase">Taxes</dt>
              <dd className="text-sm font-medium text-zinc-900">${tax.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-200 pt-6">
              <dt className="text-base font-medium uppercase">Total</dt>
              <dd className="text-base font-medium text-zinc-900">${total.toFixed(2)}</dd>
            </div>
          </dl>
          {error && (
            <p className="px-4 pb-4 text-sm text-red-600">{error}</p>
          )}
          <div className="border-t border-zinc-200 px-4 py-6 sm:px-6">
            <Button className="w-full font-medium" type="submit" disabled={loading}>
              {loading ? 'Placing order...' : 'Confirm order'}
            </Button>
            <div className="mt-4 flex justify-center text-center text-sm text-zinc-500">
              <span className="text-xs">
                or{' '}
                <span className="text-xs font-medium text-zinc-900 uppercase">
                  <Link href="/shop">Continue Shopping</Link>
                  <span aria-hidden="true"> →</span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
