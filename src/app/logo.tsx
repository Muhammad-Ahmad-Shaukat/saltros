import Image from 'next/image'
import clsx from 'clsx'

export function Logo({ className, style, ...props }: React.ComponentPropsWithoutRef<'img'>) {
  return (
    <Image
      src="/images/logo.png"
      alt="Salt Rosa"
      width={140}
      height={42}
      className={clsx('object-contain', className)}
      style={{
        width: 'auto',
        height: 'auto',
        ...style,
      }}
      priority
      {...(props as any)}
    />
  )
}
