'use client'

import { TCollection } from '@/data'
import { TImage } from '@/type'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import CollectionCard from '../collection-card'
import { Text, TextLink } from '../text'

export interface MegaMenuPopoverProps {
  megamenu: { name: string; href: string; chidren: { name: string; href: string }[] }[]
  children: React.ReactNode | string
  rightImage?: TImage
  featuredCollections?: TCollection[]
  variant?: 'right-collection' | 'right-image'
}

const MegaMenuPopover = ({
  megamenu,
  children,
  rightImage,
  featuredCollections,
  variant = 'right-collection',
}: MegaMenuPopoverProps) => {
  return (
    <Popover className="flex h-full items-center bitpan-popover-full-panel">
      <PopoverButton className="flex cursor-pointer items-center gap-x-0.5 focus-visible:outline-0 transition-colors hover:text-zinc-300 relative before:absolute before:-inset-x-4 before:-bottom-10 before:h-12 before:z-0">
        <Text className="relative z-10">{children}</Text>
        <HugeiconsIcon icon={ArrowDown01Icon} size={16} strokeWidth={1} className="transition-transform duration-200 ui-open:rotate-180 relative z-10" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute inset-x-0 top-full -z-10 bg-zinc-950 pt-8 pb-10 text-white shadow-xl transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in border-t border-white/10"
      >
        <div className="mx-auto flex justify-center gap-x-[10vw] px-8 2xl:container">
          <div className="flex flex-col justify-center min-w-[200px]">
            {megamenu.map((group) => {
              return (
                <div key={group.name} className="flex flex-col">
                  <Text className="text-sm/6 font-bold uppercase tracking-wider mb-6 text-white">{group.name}</Text>
                  <ul role="list" className="flex flex-col space-y-4">
                    {group.chidren.map((item, index) => (
                      <li key={index}>
                        <TextLink
                          href={item.href}
                          className="text-sm/6 text-zinc-400 transition-colors hover:text-white"
                        >
                          {item.name}
                        </TextLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Featured Collections */}
          {variant === 'right-collection' && featuredCollections ? (
            <div className="flex items-center gap-4 border-l border-white/10 pl-[5vw]">
              {featuredCollections?.map((collection) => (
                <div className="w-60 shrink-0" key={collection.id}>
                  <CollectionCard collection={collection} />
                </div>
              ))}
            </div>
          ) : null}

          {/* OR Featrued Image */}
          {variant === 'right-image' && rightImage ? (
            <div className="w-1/3 ps-8 border-l border-white/10 pl-[5vw]">
              <div className="relative aspect-16/9 w-full">
                <Image
                  src={rightImage?.src || '/images/hijab/feature-1-2.png'}
                  alt={rightImage?.alt || 'Featured product'}
                  fill
                  className="h-auto w-full object-cover object-top rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280) 50vw, 35vw"
                />
              </div>
            </div>
          ) : null}
        </div>
      </PopoverPanel>
    </Popover>
  )
}

export default MegaMenuPopover
