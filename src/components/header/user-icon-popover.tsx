'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import {
  FavouriteIcon,
  Logout01Icon,
  Settings03Icon,
  ShoppingBasket01Icon,
  UserCircleIcon,
  UserListIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRouter } from 'next/navigation'
import { Text, TextLink } from '../text'

const userMenu = [
  { name: 'My account', href: '/orders', icon: UserListIcon },
  { name: 'Account settings', href: '/settings', icon: Settings03Icon },
  { name: 'Orders', href: '/orders', icon: ShoppingBasket01Icon },
  { name: 'Wishlist', href: '/collections/all', icon: FavouriteIcon },
]

export interface UserIconPopoverProps {
  user?: { email: string; name?: string } | null
}

const UserIconPopover = ({ user }: UserIconPopoverProps) => {
  const router = useRouter()

  async function handleSignOut(e: React.MouseEvent) {
    e.preventDefault()
    await fetch('/api/auth/logout', { method: 'POST' })
    router.refresh()
    router.push('/')
  }

  return (
    <Popover className="relative">
      <PopoverButton className="-m-2.5 flex cursor-pointer items-center justify-center p-2.5 focus-visible:outline-0">
        <HugeiconsIcon icon={UserCircleIcon} size={24} color="currentColor" strokeWidth={1} />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute top-full -right-5 -z-10 mt-6 flex w-56 flex-col gap-y-0.5 bg-white px-2.5 pt-6 pb-5 text-zinc-950 shadow-lg transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in dark:bg-zinc-800 dark:text-zinc-100"
      >
        {user ? (
          <>
            <div className="border-b border-zinc-200 px-2 pb-2 dark:border-zinc-700 sm:px-3">
              <Text className="truncate text-sm font-medium">{user.name || user.email}</Text>
              <Text className="truncate text-xs text-zinc-500">{user.email}</Text>
            </div>
            {userMenu.map((item) => (
              <TextLink
                href={item.href}
                key={item.name}
                className="flex items-center gap-x-3.5 px-2 py-2 hover:bg-zinc-50 sm:gap-x-5 sm:px-3 dark:hover:bg-zinc-900"
              >
                <HugeiconsIcon icon={item.icon} size={20} color="currentColor" strokeWidth={1} />
                <Text>{item.name}</Text>
              </TextLink>
            ))}
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-x-3.5 px-2 py-2 text-left hover:bg-zinc-50 sm:gap-x-5 sm:px-3 dark:hover:bg-zinc-900"
            >
              <HugeiconsIcon icon={Logout01Icon} size={20} color="currentColor" strokeWidth={1} />
              <Text>Sign out</Text>
            </button>
          </>
        ) : (
          <>
            <TextLink
              href="/login"
              className="flex items-center gap-x-3.5 px-2 py-2 hover:bg-zinc-50 sm:gap-x-5 sm:px-3 dark:hover:bg-zinc-900"
            >
              <HugeiconsIcon icon={UserCircleIcon} size={20} color="currentColor" strokeWidth={1} />
              <Text>Login</Text>
            </TextLink>
            <TextLink
              href="/register"
              className="flex items-center gap-x-3.5 px-2 py-2 hover:bg-zinc-50 sm:gap-x-5 sm:px-3 dark:hover:bg-zinc-900"
            >
              <HugeiconsIcon icon={UserListIcon} size={20} color="currentColor" strokeWidth={1} />
              <Text>Sign up</Text>
            </TextLink>
          </>
        )}
      </PopoverPanel>
    </Popover>
  )
}

export default UserIconPopover
