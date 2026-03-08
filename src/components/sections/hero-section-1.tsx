import clsx from 'clsx'
import Image from 'next/image'
import ButtonLargeWithIcon from '../button-large-with-icon'
import { Text } from '../text'

interface HeroSection1Props {
  className?: string
}

const HeroSection1 = ({ className }: HeroSection1Props) => {
  return (
    <div className={clsx('flex flex-col items-center gap-16', className)}>
      <div className="flex w-full flex-col justify-between gap-6 md:flex-row">
        <div className="w-full flex-1">
          <div className="group relative overflow-hidden rounded-2xl shadow-sm transition-shadow duration-500 hover:shadow-xl">
            <Image
              src="/images/salt-decors.avif"
              alt="salt decor items"
              width={450}
              height={340}
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/3"></div>
          </div>
          <Text className="mt-2.5 max-w-xs">Bring nature’s raw beauty home with our hand-carved salt decor.</Text>
        </div>
        <div className="w-full flex-1">
          <div className="group relative overflow-hidden rounded-2xl shadow-sm transition-shadow duration-500 hover:shadow-xl">
            <Image
              src="/images/edible-salt.avif"
              alt="edible Himalayan salt"
              width={450}
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              height={440}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/3"></div>
          </div>
        </div>
        <div className="flex w-full flex-1 flex-col justify-end gap-2.5">
          <Text className="max-w-xs self-end text-right">
            Our sustainable salt products serve as both stunning visual accents and functional wellness tools for the modern enthusiast.
          </Text>
          <div className="group relative overflow-hidden rounded-2xl shadow-sm transition-shadow duration-500 hover:shadow-xl mt-2">
            <Image
              src="/images/salt-bricks.avif"
              alt="salt bricks"
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              width={450}
              height={280}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/3"></div>
          </div>
          <Text className="max-w-xs">Nature’s most versatile mineral, refined for you.</Text>
        </div>
      </div>
      <ButtonLargeWithIcon href="/shop">explore all products</ButtonLargeWithIcon>
    </div>
  )
}

export default HeroSection1
