'use client'

import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { ButtonCircle } from '../button'
import { Heading } from '../heading'
import { Text } from '../text'

interface NewsletterProps {
  className?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
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
        body: JSON.stringify({ type: 'subscribe', data: { email } }),
      })
      if (res.ok) setMsg('Subscribed!')
      else setMsg('Error subscribing')
    } catch {
      setMsg('Error subscribing')
    }
    setLoading(false)
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      className={className}
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <motion.div variants={itemVariants} className="max-w-xl lg:col-span-7">
          <Heading bigger>
            Want product <span data-slot="italic">news and updates?</span> Sign up for our newsletter.
          </Heading>
        </motion.div>

        <motion.form
          variants={itemVariants}
          onSubmit={handleSubscribe}
          className="w-full max-w-md lg:col-span-5 lg:pt-2"
        >
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
              className="min-w-0 flex-auto rounded-full bg-white px-6 py-2 text-xs/6 text-zinc-900 uppercase shadow-sm border border-zinc-200 transition-all focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none placeholder:text-zinc-600 placeholder:uppercase"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ButtonCircle type="submit" disabled={loading} className="bg-zinc-900 shadow-sm transition-transform">
                <ArrowUpRightIcon className="h-4 w-4 text-zinc-50" />
              </ButtonCircle>
            </motion.div>
          </div>
          <div className="mt-4 pl-1.5 flex flex-col gap-2">
            <Text className="text-xs text-zinc-500">
              We care about your data. Read our{' '}
              <Link href="#" className="font-medium text-zinc-950 underline hover:text-zinc-700 transition-colors">
                privacy policy
              </Link>
              .
            </Text>
            {msg && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <Text className="text-xs text-green-600 font-medium uppercase tracking-wider">{msg}</Text>
              </motion.div>
            )}
          </div>
        </motion.form>
      </div>
    </motion.div>
  )
}
