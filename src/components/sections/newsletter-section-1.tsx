'use client'

import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'
import { ButtonCircle } from '../button'
import { Heading } from '../heading'
import { Text } from '../text'

interface NewsletterProps {
  className?: string
}

export default function NewsletterSection({ className = '' }: NewsletterProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'subscribe', data: { email } })
      })
      if (res.ok) setMsg('Subscribed!')
      else setMsg('Error subscribing')
    } catch {
      setMsg('Error subscribing')
    }
    setLoading(false)
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="max-w-xl lg:col-span-7">
          <Heading bigger>
            Want product <span data-slot="italic">news and updates?</span> Sign up for our newsletter.
          </Heading>
        </div>

        <form onSubmit={handleSubscribe} className="w-full max-w-md lg:col-span-5 lg:pt-2">
          <div className="flex gap-x-0.5">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              autoComplete="email"
              className="min-w-0 flex-auto rounded-full bg-white px-6 py-2 text-xs/6 text-zinc-900 uppercase outline-1 -outline-offset-1 outline-zinc-400 placeholder:text-zinc-600 placeholder:uppercase focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-900"
            />
            {/* <Button type="submit">Subscribe</Button> */}
            <ButtonCircle type="submit" disabled={loading}>
              <ArrowUpRightIcon className="h-4 w-4 text-zinc-900" />
            </ButtonCircle>
          </div>
          <div className="mt-4 pl-1.5 flex gap-4">
            <Text className="text-xs">
              We care about your data. Read our{' '}
              <Link href="#" className="font-medium text-zinc-950 underline">
                privacy&nbsp;policy
              </Link>
              .
            </Text>
            {msg && <Text className="text-xs text-green-600 font-medium">{msg}</Text>}
          </div>
        </form>
      </div>
    </div>
  )
}
