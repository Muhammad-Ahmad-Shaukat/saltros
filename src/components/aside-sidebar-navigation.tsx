'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import Aside from './aside'
import { Text, TextLink } from './text'

const demo_pages_menu = [
  { name: 'Home skincare', href: '/' },
  { name: 'Home fashion', href: '/home-fashion' },
  { name: 'Home hijab', href: '/home-hijab' },
  { name: 'Coming soon', href: '#' },
]

interface Props {
  className?: string
}

const AsideSidebarNavigation = ({ className }: Props) => {
  return (
    <Aside openFrom="right" type="sidebar-navigation" logoOnHeading contentMaxWidthClassName="max-w-sm">
      <div className={clsx('h-full flex flex-col', className)}>
        <div className="mt-8 flow-root flex-1 px-2">
          <div className="divide-y divide-zinc-950/5">
            <div className="space-y-1 py-6">
              <Disclosure as="div" className="-mx-2 group/disclosure">
                <DisclosureButton className="flex w-full items-center justify-between rounded-xl py-3 px-4 text-base font-semibold text-zinc-900 transition-colors hover:bg-zinc-50">
                  <span>Home</span>
                  <HugeiconsIcon
                    className="group-data-open/disclosure:rotate-180 transition-transform duration-300"
                    icon={ArrowDown01Icon}
                    size={20}
                    strokeWidth={1.5}
                  />
                </DisclosureButton>
                <DisclosurePanel className="px-4 pb-4 pt-1 space-y-1">
                  {demo_pages_menu.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <DisclosureButton
                        as={TextLink}
                        href={item.href}
                        className="block rounded-lg py-2 px-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 transition-all"
                      >
                        {item.name}
                      </DisclosureButton>
                    </motion.div>
                  ))}
                </DisclosurePanel>
              </Disclosure>

              {[
                { name: 'Shop', href: '/shop' },
                { name: 'Explore', href: '/collection/all' },
                { name: 'Checkout', href: '/checkout' },
                { name: 'Cart', href: '/cart' },
                { name: 'Orders', href: '/orders' },
                { name: 'Contact', href: '/contact' },
              ].map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <TextLink
                    href={link.href}
                    className="-mx-2 block rounded-xl px-4 py-3 text-base font-semibold text-zinc-900 transition-all hover:bg-zinc-50 hover:translate-x-1"
                  >
                    {link.name}
                  </TextLink>
                </motion.div>
              ))}
            </div>

            <div className="py-8 space-y-3">
              <Text className="px-2 text-xs font-bold tracking-widest text-zinc-400 uppercase">Account</Text>
              <div className="grid grid-cols-2 gap-3">
                <TextLink
                  href="/login"
                  className="flex items-center justify-center rounded-xl bg-zinc-50 px-4 py-3 text-sm font-bold text-zinc-900 transition-colors hover:bg-zinc-100"
                >
                  Sign in
                </TextLink>
                <TextLink
                  href="/register"
                  className="flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  Register
                </TextLink>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-auto p-6 border-t border-zinc-100">
           <Text className="text-[10px] text-center text-zinc-400 font-medium tracking-tight">
             © 2026 SALT ROSA. ALL RIGHTS RESERVED.
           </Text>
        </div>
      </div>
    </Aside>
  )
}

export default AsideSidebarNavigation
