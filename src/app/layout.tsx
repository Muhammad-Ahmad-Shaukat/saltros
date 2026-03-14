import Aside from '@/components/aside'
import '@/styles/tailwind.css'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"

const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  variable: '--font-dm-sans',
})
const playfair_display = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  style: 'italic',
  variable: '--font-playfair-display',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Salt Rosa',
    default: 'Salt Rosa',
  },
  description:
    'Salt Rosa',
  keywords: [
    'Next.js',
    'Tailwind CSS',
    'TypeScript',
    'Salt Rosa',
    'Headless UI',
    'Fashion',
    'Hijab',
    'Skincare',
    'E-commerce',
  ],
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={clsx(
        'scroll-smooth text-zinc-950 antialiased dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950',
        dm_sans.variable,
        playfair_display.variable
      )}
    >
      <body>

        <Aside.Provider>{children}</Aside.Provider>
      </body>
    </html>
  )
}
