import { getCartProducts } from '@/data'
import clsx from 'clsx'
import { Aside } from './aside/aside'
import { Button } from './button'
import { CartProductItem } from './cart-product-item'
import { Text, TextLink } from './text'

interface Props {
  className?: string
}

const AsideSidebarCart = async ({ className = '' }: Props) => {
  const products = await getCartProducts()
  const subtotal = products.reduce((sum, p) => {
    const match = p.price.replace(/[^0-9.]/g, '')
    return sum + parseFloat(match || '0') * p.quantity
  }, 0)

  return (
    <Aside openFrom="right" type="cart" heading="Shopping Cart">
      <div className={clsx('flex h-full flex-col', className)}>
        {/* CONTENT */}

        <div className="flex-1 overflow-x-hidden overflow-y-auto py-6 hidden-scrollbar">
          <div className="flow-root">
            {products.length === 0 ? (
              <p className="text-sm text-zinc-500">Your cart is empty.</p>
            ) : (
              <ul role="list" className="-my-6 divide-y divide-zinc-900/10">
                {products.map((product) => (
                  <CartProductItem key={product.id} product={product} />
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* FOOTER  */}
        <section
          aria-labelledby="summary-heading"
          className="mt-auto grid shrink-0 gap-4 border-t border-zinc-900/10 py-6"
        >
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>
          <div className="">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <Text className="font-medium">Subtotal</Text>
              <Text className="font-medium">${subtotal.toFixed(2)}</Text>
            </div>
            <Text className="mt-0.5 text-xs text-zinc-500">Shipping and taxes calculated at checkout.</Text>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button outline href={'/cart'}>
                View cart
              </Button>
              <Button href={'/checkout'}>Check out</Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-zinc-500">
              <Text className="text-xs">
                or{' '}
                <TextLink href={'/collection/all'} className="text-xs font-medium text-zinc-900 uppercase">
                  Continue Shopping<span aria-hidden="true"> →</span>
                </TextLink>
              </Text>
            </div>
          </div>
        </section>
      </div>
    </Aside>
  )
}

export default AsideSidebarCart
