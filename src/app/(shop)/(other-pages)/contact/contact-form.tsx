'use client'

import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Description, Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Text } from '@/components/text'
import { Textarea } from '@/components/textarea'
import { useState } from 'react'

export const ContactForm = () => {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('Message')

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', data: { name, email, message } })
      })
      if (res.ok) setMsg('Message sent successfully!')
      else setMsg('Error sending message.')
    } catch {
      setMsg('Error sending message.')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-5">
      <Field>
        <Label>Your name</Label>
        <Input placeholder="Mr.  / Mrs." type="text" name="name" required />
        <Description>This is your public display name.</Description>
      </Field>
      <Field>
        <Label>Email</Label>
        <Input placeholder="mail@gmail.com" type="email" name="email" required />
      </Field>
      <Field>
        <Label>Message</Label>
        <Textarea placeholder="Tell us a bit about yourself" name="Message" required />
        <Description>Let us know your concern or inquiry.</Description>
      </Field>
      <div className="flex items-center justify-between">
        <CheckboxField>
          <Checkbox name="conditions" />
          <Label>Accept terms and conditions</Label>
          <Description>You agree to our Terms of Service and Privacy Policy.</Description>
        </CheckboxField>
      </div>
      <div className="pt-5">
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'SENDING...' : 'SUBMIT'}
        </Button>
        {msg && <Text className="mt-4 text-center text-sm font-medium">{msg}</Text>}
      </div>
    </form>
  )
}
