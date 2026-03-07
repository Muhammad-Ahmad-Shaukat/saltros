'use client'

import { TCollection } from '@/data'
import { TImage } from '@/type'
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
    <div className="group flex h-full items-center">
      <div className="flex cursor-pointer py-6 items-center gap-x-0.5 focus-visible:outline-0 transition-colors hover:text-zinc-600">
        <Text>{children}</Text>
        <HugeiconsIcon icon={ArrowDown01Icon} size={16} strokeWidth={1} className="transition-transform duration-200 group-hover:rotate-180" />
      </div>

      <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute inset-x-0 top-full -z-10 bg-white pt-8 pb-10 text-zinc-950 shadow-xl transition-all duration-300 ease-out dark:bg-zinc-800 dark:text-zinc-100">
        <div className="mx-auto flex justify-center gap-x-[10vw] px-8 2xl:container">
          <div className="flex flex-col justify-center min-w-[200px]">
            {megamenu.map((group) => {
              return (
                <div key={group.name} className="flex flex-col">
                  <Text className="text-sm/6 font-bold uppercase tracking-wider mb-6 text-zinc-900 dark:text-zinc-100">{group.name}</Text>
                  <ul role="list" className="flex flex-col space-y-4">
                    {group.chidren.map((item, index) => (
                      <li key={index}>
                        <TextLink
                          href={item.href}
                          className="text-sm/6 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
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
            <div className="flex items-center gap-4 border-l border-zinc-200 pl-[5vw] dark:border-white/10">
              {featuredCollections?.map((collection) => (
                <div className="w-60 shrink-0" key={collection.id}>
                  <CollectionCard collection={collection} />
                </div>
              ))}
            </div>
          ) : null}

          {/* OR Featrued Image */}
          {variant === 'right-image' && rightImage ? (
            <div className="w-1/3 ps-8 border-l border-zinc-200 pl-[5vw] dark:border-white/10">
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
      </div>
    </div>
  )
}

export default MegaMenuPopover
