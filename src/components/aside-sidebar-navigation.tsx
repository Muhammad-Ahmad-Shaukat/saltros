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
]

const explore_menu = [
  { name: 'Track order', href: '/orders' },
  { name: 'Contact us', href: '/contact' },
  { name: 'About us', href: '/about-us' },
  { name: 'Blogs', href: '/blog' },
]

interface Props {
  className?: string
}

const AsideSidebarNavigation = ({ className }: Props) => {
  return (
    <Aside openFrom="right" type="sidebar-navigation" logoOnHeading contentMaxWidthClassName="max-w-sm">
      <div className={clsx('h-full flex flex-col bg-white', className)}>
        <div className="mt-8 flow-root flex-1 px-4">
          <div className="divide-y divide-zinc-100">
            <div className="space-y-1 py-6">
              {/* Home Disclosure */}
              <Disclosure as="div" className="group/disclosure">
                <DisclosureButton className="flex w-full items-center justify-between rounded-xl py-3 px-2 text-base font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 uppercase tracking-wide">
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
                        className="block rounded-lg py-2 px-3 text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-all uppercase"
                      >
                        {item.name}
                      </DisclosureButton>
                    </motion.div>
                  ))}
                </DisclosurePanel>
              </Disclosure>

              {/* Shop Link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <TextLink
                  href="/shop"
                  className="block rounded-xl px-2 py-3 text-base font-semibold text-zinc-900 transition-all hover:bg-zinc-50 hover:translate-x-1 uppercase tracking-wide"
                >
                  Shop
                </TextLink>
              </motion.div>

              {/* Explore Disclosure (Same as Desktop MegaMenu) */}
              <Disclosure as="div" className="group/disclosure">
                <DisclosureButton className="flex w-full items-center justify-between rounded-xl py-3 px-2 text-base font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 uppercase tracking-wide">
                  <span>Explore</span>
                  <HugeiconsIcon
                    className="group-data-open/disclosure:rotate-180 transition-transform duration-300"
                    icon={ArrowDown01Icon}
                    size={20}
                    strokeWidth={1.5}
                  />
                </DisclosureButton>
                <DisclosurePanel className="px-4 pb-4 pt-1 space-y-1">
                  {explore_menu.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <DisclosureButton
                        as={TextLink}
                        href={item.href}
                        className="block rounded-lg py-2 px-3 text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-all uppercase"
                      >
                        {item.name}
                      </DisclosureButton>
                    </motion.div>
                  ))}
                </DisclosurePanel>
              </Disclosure>

              {/* Checkout & Other Links */}
              {[
                { name: 'Checkout', href: '/checkout' },
                { name: 'Cart', href: '/cart' },
                { name: 'Orders', href: '/orders' },
                { name: 'Contact', href: '/contact' },
              ].map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                >
                  <TextLink
                    href={link.href}
                    className="block rounded-xl px-2 py-3 text-base font-semibold text-zinc-900 transition-all hover:bg-zinc-50 hover:translate-x-1 uppercase tracking-wide"
                  >
                    {link.name}
                  </TextLink>
                </motion.div>
              ))}
            </div>

            <div className="py-8 space-y-3">
              <Text className="px-2 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">Account</Text>
              <div className="grid grid-cols-2 gap-3">
                <TextLink
                  href="/login"
                  className="flex items-center justify-center rounded-xl border border-zinc-200 px-4 py-3 text-sm font-bold text-zinc-900 transition-colors hover:bg-zinc-50"
                >
                  Sign in
                </TextLink>
                <TextLink
                  href="/register"
                  className="flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 uppercase tracking-widest"
                >
                  Join
                </TextLink>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-auto p-6 border-t border-zinc-100">
           <Text className="text-[10px] text-center text-zinc-400 font-medium tracking-tight normal-case">
             © {new Date().getFullYear()} Salt Rosa. All rights reserved.
           </Text>
        </div>
      </div>
    </Aside>
  )
}

export default AsideSidebarNavigation
