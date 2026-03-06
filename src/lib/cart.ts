import { cookies } from 'next/headers'

export const CART_COOKIE = 'cart_id'

export async function getCartId(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(CART_COOKIE)?.value ?? null
}

export function cartCookieOptions() {
  return {
    name: CART_COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  }
}
