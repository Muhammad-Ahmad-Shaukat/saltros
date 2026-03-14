import Image from 'next/image'
import clsx from 'clsx'

export function Logo({ className, ...props }: React.ComponentPropsWithoutRef<'img'>) {
  return (
    <Image
      src="/images/logo.png"
      alt="Salt Rosa"
      width={140}
      height={42}
      className={clsx('object-contain', className)}
      priority
      {...(props as any)}
    />
  )
}
