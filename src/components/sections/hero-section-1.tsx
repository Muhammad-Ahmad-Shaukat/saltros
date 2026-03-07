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
        <div className="w-full">
          <Image
            src="/images/salt-decors.avif"
            alt="salt decor items"
            width={450}
            height={340}
            className="w-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <Text className="mt-2.5 max-w-xs">From mineral-rich edible salt to hand-carved decorative pieces, we provide nature’s finest elements for a healthier, more beautiful home.</Text>
        </div>
        <div className="w-full">
          <Image
            src="/images/edible-salt.avif"
            alt="edible Himalayan salt"
            width={450}
            className="w-full"
            height={440}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="flex w-full flex-col justify-end gap-2.5">
          <Text className="max-w-xs self-end text-right">
            Our sustainable salt products serve as both stunning visual accents and functional wellness tools for the modern enthusiast.
          </Text>
          <Image
            src="/images/salt-bricks.avif"
            alt="salt bricks"
            className="w-full"
            width={450}
            height={280}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <Text className="max-w-xs">Nature’s most versatile mineral, refined for you.</Text>
        </div>
      </div>
      <ButtonLargeWithIcon href="/shop">explore all products</ButtonLargeWithIcon>
    </div>
  )
}

export default HeroSection1
