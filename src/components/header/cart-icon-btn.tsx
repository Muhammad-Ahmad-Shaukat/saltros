'use client'

import { ShoppingBag03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useAside } from '../aside'

interface CartIconBtnProps {
  cartCount?: number
}

const CartIconBtn = ({ cartCount = 0 }: CartIconBtnProps) => {
  const { open: openAside } = useAside()
  return (
    <button
      type="button"
      className="-m-2.5 inline-flex cursor-pointer items-center justify-center rounded-md p-2.5"
      onClick={() => openAside('cart')}
      aria-label={`Cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`}
    >
      <HugeiconsIcon icon={ShoppingBag03Icon} size={24} color="currentColor" strokeWidth={1} />
      {cartCount > 0 ? (
        <span className="text-xs leading-none">({cartCount})</span>
      ) : null}
    </button>
  )
}

export default CartIconBtn
