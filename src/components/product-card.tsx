"use client"
import { TProductItem } from '@/data'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { Text, TextLink } from './text'

interface ProductCardProps {
  product: TProductItem
  className?: string
  imageRatio?: string
}

export default function ProductCard({ product, className, imageRatio = 'aspect-3/4' }: ProductCardProps) {
  const { id, title, price, featured_image, handle, images, tags, vendor, selected_options } = product

  // find the product color
  const color = selected_options?.find((option: any) => option.name === 'Color')?.value
  // // find the product size
  const size = selected_options?.find((option: any) => option.name === 'Size')?.value

  return (
    <div className={clsx('group/prd relative w-full', className)}>
      {/* Product Image */}
      <Link href={`/products/${handle}`} className={clsx('relative block w-full', imageRatio)}>
        <Image
          src={images[0]?.src ?? (featured_image as { src?: string })?.src ?? '/images/placeholder.svg'}
          alt={title}
          fill
          className="z-0 rounded-lg object-cover transition-transform duration-500 group-hover/prd:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
          priority
        />
        {images[1]?.src ? (
          <Image
            src={images[1].src}
            alt={title}
            fill
            className="z-0 rounded-lg object-cover opacity-0 transition-all duration-500 group-hover/prd:scale-105 group-hover/prd:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
          />
        ) : null}
      </Link>

      {/* Category Label */}
      <div className="absolute top-3 left-3">
        <div className="rounded-full bg-white px-3.5 py-1.5 text-xs leading-none text-zinc-900 uppercase">{vendor}</div>
      </div>

      {/* Shopping Bag Icon */}
      <div className="absolute top-3 right-3">
        <div className="rounded-full bg-white p-1.5 text-zinc-500">
          <ShoppingBagIcon className="h-4 w-4" />
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-3">
        <div className="flex justify-between">
          <TextLink href={`/products/${handle}`}>
            <span className="absolute inset-0"></span>
            {title}
          </TextLink>
          <Text className="">${Number(price).toFixed(2)}</Text>
        </div>
        <Text className="mt-0.5 text-xs text-zinc-500">{color ?? size ?? ''}</Text>
      </div>
    </div>
  )
}
