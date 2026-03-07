'use client'

import { Logo } from '@/app/logo'
import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { ErrorMessage, Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Strong, Text, TextLink } from '@/components/text'
import { getCountries } from '@/lib/countries'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/

type FieldErrors = Record<string, string>

export function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('Canada')

  const countries = useMemo(() => getCountries(), [])
  const regions = useMemo(
    () => countries.find((c) => c.name === selectedCountry)?.regions ?? [],
    [countries, selectedCountry]
  )

  function validate(formData: FormData): FieldErrors {
    const errors: FieldErrors = {}
    const email = (formData.get('email') as string)?.trim()
    const password = formData.get('password') as string
    const firstName = (formData.get('first-name') as string)?.trim()
    const lastName = (formData.get('last-name') as string)?.trim()
    const address = (formData.get('address') as string)?.trim()
    const city = (formData.get('city') as string)?.trim()
    const region = (formData.get('region') as string)?.trim()
    const postalCode = (formData.get('postal-code') as string)?.trim()
    const phone = (formData.get('phone') as string)?.trim()

    if (!firstName) errors['first-name'] = 'First name is required'
    if (!lastName) errors['last-name'] = 'Last name is required'
    if (!email) errors.email = 'Email is required'
    else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address'
    if (!password) errors.password = 'Password is required'
    else if (password.length < 6) errors.password = 'Must be at least 6 characters'
    if (!address) errors.address = 'Address is required'
    if (!city) errors.city = 'City is required'
    if (!region) errors.region = 'State / Province is required'
    if (!postalCode) errors['postal-code'] = 'Postal code is required'
    if (!phone) errors.phone = 'Phone number is required'
    else if (!PHONE_RE.test(phone)) errors.phone = 'Enter a valid phone number'

    return errors
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setFieldErrors({})

    const form = e.currentTarget
    const formData = new FormData(form)

    const errors = validate(formData)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setLoading(true)

    const email = (formData.get('email') as string).trim()
    const password = formData.get('password') as string
    const firstName = (formData.get('first-name') as string).trim()
    const lastName = (formData.get('last-name') as string).trim()
    const address = (formData.get('address') as string).trim()
    const city = (formData.get('city') as string).trim()
    const country = (formData.get('country') as string).trim()
    const region = (formData.get('region') as string).trim()
    const postalCode = (formData.get('postal-code') as string).trim()
    const phone = (formData.get('phone') as string).trim()

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
    <form onSubmit={handleSubmit} className="grid w-full max-w-lg grid-cols-1 gap-8">
      <h1 className="sr-only">Create your account</h1>

      <div>
        <Link href="/">
          <Logo className="text-zinc-950 dark:text-white" />
        </Link>
        <Text className="mt-5 text-zinc-600">
          Create a new account to join our community and get access to exclusive offers, rewards and content.
        </Text>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {/* Account details */}
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 sm:col-span-2">
          Account details
        </p>

        <Field className="sm:col-span-2">
          <Label>Email</Label>
          <Input type="email" name="email" required autoComplete="email" />
          {fieldErrors.email && <ErrorMessage>{fieldErrors.email}</ErrorMessage>}
        </Field>
        <Field className="sm:col-span-2">
          <Label>Password</Label>
          <Input type="password" name="password" autoComplete="new-password" minLength={6} required />
          {fieldErrors.password && <ErrorMessage>{fieldErrors.password}</ErrorMessage>}
        </Field>
      </div>

      {/* Personal information */}
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 sm:col-span-2">
          Personal information
        </p>

        <Field>
          <Label>First name</Label>
          <Input name="first-name" required autoComplete="given-name" />
          {fieldErrors['first-name'] && <ErrorMessage>{fieldErrors['first-name']}</ErrorMessage>}
        </Field>
        <Field>
          <Label>Last name</Label>
          <Input name="last-name" required autoComplete="family-name" />
          {fieldErrors['last-name'] && <ErrorMessage>{fieldErrors['last-name']}</ErrorMessage>}
        </Field>
        <Field className="sm:col-span-2">
          <Label>Phone</Label>
          <Input type="tel" name="phone" required autoComplete="tel" placeholder="+1 (555) 000-0000" />
          {fieldErrors.phone && <ErrorMessage>{fieldErrors.phone}</ErrorMessage>}
        </Field>
      </div>

      {/* Shipping address */}
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 sm:col-span-2">
          Shipping address
        </p>

        <Field className="sm:col-span-2">
          <Label>Address</Label>
          <Input name="address" required autoComplete="street-address" />
          {fieldErrors.address && <ErrorMessage>{fieldErrors.address}</ErrorMessage>}
        </Field>
        <Field>
          <Label>City</Label>
          <Input name="city" required autoComplete="address-level2" />
          {fieldErrors.city && <ErrorMessage>{fieldErrors.city}</ErrorMessage>}
        </Field>
        <Field>
          <Label>Country</Label>
          <Select name="country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
            {countries.map((c) => (
              <option key={c.code} value={c.name}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label>State / Province</Label>
          <Select name="region" required>
            <option value="">Select…</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
          {fieldErrors.region && <ErrorMessage>{fieldErrors.region}</ErrorMessage>}
        </Field>
        <Field>
          <Label>Postal code</Label>
          <Input name="postal-code" required autoComplete="postal-code" />
          {fieldErrors['postal-code'] && <ErrorMessage>{fieldErrors['postal-code']}</ErrorMessage>}
        </Field>
      </div>

      <CheckboxField>
        <Checkbox name="newsletter" />
        <Label>Get emails about product updates and news.</Label>
      </CheckboxField>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating account…' : 'Create account'}
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
