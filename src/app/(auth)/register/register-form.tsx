'use client'

import { Logo } from '@/app/logo'
import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Strong, Text, TextLink } from '@/components/text'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    const email = (formData.get('email') as string)?.trim()
    const password = formData.get('password') as string
    const firstName = (formData.get('first-name') as string)?.trim()
    const lastName = (formData.get('last-name') as string)?.trim()
    const address = (formData.get('address') as string)?.trim()
    const city = (formData.get('city') as string)?.trim()
    const country = (formData.get('country') as string)?.trim()
    const region = (formData.get('region') as string)?.trim()
    const postalCode = (formData.get('postal-code') as string)?.trim()
    const phone = (formData.get('phone') as string)?.trim()

    if (!email || !password) {
      setError('Email and password required')
      setLoading(false)
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: `${firstName} ${lastName}`.trim(),
          password,
          address: {
            firstName,
            lastName,
            address,
            city,
            country,
            region,
            postalCode,
            phone,
          },
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'Registration failed')
        setLoading(false)
        return
      }
      router.push('/')
      router.refresh()
    } catch {
      setError('Registration failed')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid w-full max-w-sm grid-cols-1 gap-8">
      <h1 className="sr-only">Create your account</h1>

      <div>
        <Link href="/">
          <Logo className="text-zinc-950 dark:text-white" />
        </Link>
        <Text className="mt-5 text-zinc-600">
          Create a new account to join our community and get access to exclusive offers, rewards and content.
        </Text>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
        <Field className="sm:col-span-2">
          <Label>Email</Label>
          <Input type="email" name="email" required autoComplete="email" />
        </Field>
        <Field>
          <Label>First name</Label>
          <Input name="first-name" autoComplete="given-name" />
        </Field>
        <Field>
          <Label>Last name</Label>
          <Input name="last-name" autoComplete="family-name" />
        </Field>
        <Field className="sm:col-span-2">
          <Label>Password</Label>
          <Input type="password" name="password" autoComplete="new-password" minLength={6} required />
        </Field>
        <Field className="sm:col-span-2">
          <Label>Address</Label>
          <Input name="address" autoComplete="street-address" />
        </Field>
        <Field>
          <Label>City</Label>
          <Input name="city" autoComplete="address-level2" />
        </Field>
        <Field>
          <Label>Country</Label>
          <Select name="country">
            <option>Canada</option>
            <option>Mexico</option>
            <option>United States</option>
          </Select>
        </Field>
        <Field>
          <Label>State / Province</Label>
          <Input name="region" autoComplete="address-level1" />
        </Field>
        <Field>
          <Label>Postal code</Label>
          <Input name="postal-code" autoComplete="postal-code" />
        </Field>
        <Field className="sm:col-span-2">
          <Label>Phone</Label>
          <Input type="tel" name="phone" autoComplete="tel" />
        </Field>
      </div>
      <CheckboxField>
        <Checkbox name="newsletter" />
        <Label>Get emails about product updates and news.</Label>
      </CheckboxField>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating account...' : 'Create account'}
      </Button>
      <Text>
        Already have an account?{' '}
        <TextLink href="/login">
          <Strong>Sign in</Strong>
        </TextLink>
      </Text>
    </form>
  )
}
