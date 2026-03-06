import { prisma } from '@/lib/db'
import { createSession } from '@/lib/auth'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body as { email?: string; password?: string }
    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }
    const trimmedEmail = email.trim().toLowerCase()
    const user = await prisma.user.findUnique({ where: { email: trimmedEmail } })
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }
    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }
    await createSession({ userId: user.id, email: user.email, name: user.name ?? undefined })
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } })
  } catch (e) {
    console.error('Login error', e)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
