'use client'

import { Button } from '@/components/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function ClearCartButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleClear() {
    if (!confirm('Are you sure you want to clear your cart?')) return
    setLoading(true)
    const res = await fetch('/api/cart', { method: 'DELETE' })
    if (res.ok) {
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <Button 
      outline 
      onClick={handleClear} 
      disabled={loading}
      className="text-xs uppercase"
    >
      {loading ? 'Clearing...' : 'Clear Cart'}
    </Button>
  )
}
