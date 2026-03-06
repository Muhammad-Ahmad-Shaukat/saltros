import { prisma } from '@/lib/db'
import { createSession } from '@/lib/auth'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password, address } = body as {
      email?: string
      name?: string
      password?: string
      address?: any
    }
    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }
    const trimmedEmail = email.trim().toLowerCase()
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }
    const existing = await prisma.user.findUnique({ where: { email: trimmedEmail } })
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 })
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email: trimmedEmail,
        name: (name as string)?.trim() || null,
        passwordHash,
        address: address || null,
      },
    })
    await createSession({ userId: user.id, email: user.email, name: user.name ?? undefined })
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } })
  } catch (e) {
    console.error('Register error', e)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
