import { Logo } from '@/app/logo'
import { getCartProducts, getSkincareCollections } from '@/data'
import { getSession } from '@/lib/auth'
import clsx from 'clsx'
import Link from 'next/link'
import { TextLink } from '../text'
import CartIconBtn from './cart-icon-btn'
import HamburgerIconMenu from './hamburger-icon-menu'
import MegaMenuPopover, { MegaMenuPopoverProps } from './mega-menu-popover'
import SearchIconPopover from './search-icon-popover'
import UserIconPopover from './user-icon-popover'

const mega_menus = [
  {
    name: 'Quick links',
    href: '#',
    chidren: [
      { name: 'Track order', href: '/orders' },
      { name: 'Contact us', href: '/contact' },
      { name: 'About us', href: '/about-us' },
      { name: 'Blogs', href: '/blog' },
    ],
  },
]



interface HeaderProps {
  className?: string
  hasBottomBorder?: boolean
  variant?: 'default' | 'bg-transparent-text-white'
  megamenuVariant?: MegaMenuPopoverProps['variant']
}

const Header = async ({ className, hasBottomBorder = true, variant = 'default', megamenuVariant }: HeaderProps) => {
  const [collections, cartProducts, session] = await Promise.all([
    getSkincareCollections(),
    getCartProducts(),
    getSession(),
  ])
  const featuredCollections = collections.slice(0, 3) // Get 3 collections
  const cartCount = cartProducts.length

  return (
    <header
      className={clsx(
        className,
        'group z-10 w-full',
        variant === 'default' && 'relative',
        variant === 'bg-transparent-text-white' &&
          'absolute inset-x-0 top-0 bg-transparent text-white transition-colors duration-300 has-[.bitpan-popover-full-panel]:text-zinc-950'
      )}
    >
      <nav aria-label="Global" className="container">
        <div
          className={clsx(
            'flex items-center justify-between border-zinc-950/10 py-6 dark:border-white/10',
            hasBottomBorder && 'border-b',
            !hasBottomBorder && 'has-[.bitpan-popover-full-panel]:border-b'
          )}
        >
          {/* LEFT LOGO */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Logo />
            </Link>
          </div>

          {/* MAIN CENTER MENUS */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            {/* DROPDOWN REMOVED */}

            {/* MEGA MENU */}
            <MegaMenuPopover
              megamenu={mega_menus}
              rightImage={{
                src: '/images/hijab/feature-1-2.png',
                alt: 'Featured product',
              }}
              featuredCollections={featuredCollections}
              variant={megamenuVariant}
            >
              Explore
            </MegaMenuPopover>

            {/* TEXT LINKS */}
            <TextLink href="/">Home</TextLink>
            <TextLink href="/collections/page-style-2/all">Shop</TextLink>
            <TextLink href="/checkout">Checkout</TextLink>
          </div>

          {/* RIGHT ICON BUTTONS */}
          <div className="flex flex-1 justify-end gap-x-2.5 md:gap-x-4 xl:gap-x-5">
            {/* HAMBURGER MENU */}
            <HamburgerIconMenu />

            {/* SEARCH  */}
            <SearchIconPopover />

            {/* USER - DROPDOWN */}
            <UserIconPopover user={session ? { email: session.email, name: session.name } : null} />

            {/* CART */}
            <CartIconBtn cartCount={cartCount} />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
