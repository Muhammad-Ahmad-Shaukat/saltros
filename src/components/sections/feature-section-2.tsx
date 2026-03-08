import { VectorArrowDown3, VectorArrowDown4 } from '@/components/vector-arrow-down'
import { TImage } from '@/type'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Image from 'next/image'
import { Heading } from '../heading'
import { Text } from '../text'

interface FeatureSection2Props {
  className?: string
  variant?: 'down' | 'up'
  heading?: string
  faqs?: {
    question: string
    answer: string
  }[]
  image?: TImage
}

const faqs_demo = [
  {
    question: 'Is Himalayan salt decor safe for indoor use?',
    answer: 'Yes, our hand-carved Himalayan salt decor is perfectly safe and designed for indoor use. When warmed by a bulb or the natural environment, these pieces can help release negative ions, potentially improving air quality and creating a calming, serene atmosphere in your home.',
  },
  {
    question: 'How do I maintain and clean my salt bricks?',
    answer: 'To keep your salt bricks in pristine condition, simply wipe them with a dry, lint-free cloth to remove any surface dust. Avoid using water or harsh cleaning chemicals, as salt is moisture-absorbent and can dissolve or erode if exposed to excess liquid.',
  },
  {
    question: 'Can edible Himalayan salt be used in daily cooking?',
    answer: 'Absolutely. Our premium edible Himalayan salt is a mineral-rich, unprocessed alternative to common table salt. It adds a delicate, complex flavor to your dishes while providing essential trace minerals that are often stripped away during commercial processing.',
  },
  {
    question: 'How do I incorporate salt bricks into my interior design?',
    answer: 'Salt bricks are highly versatile; they are commonly used to create stunning feature walls, backlit room dividers, or grounding decorative accents. Because they emit a soft, amber glow when backlit, they act as both structural building elements and functional mood lighting for any modern sanctuary.',
  },
  {
    question: 'Are there any health benefits associated with Himalayan salt decor?',
    answer: 'While Himalayan salt decor is primarily used for its aesthetic appeal and ability to create a serene ambiance, many users report a sense of well-being when surrounded by these natural elements. The gentle, warm glow of backlit salt bricks can help create a calming environment conducive to relaxation and mindfulness.',
  },
]
const image_demo = {
  src: '/images/hijab/feature-2-1.png',
  width: 662,
  height: 653,
  alt: 'feature-2-1',
}

const FeatureSection2 = ({
  className,
  variant = 'down',
  heading,
  faqs = faqs_demo,
  image = image_demo,
}: FeatureSection2Props) => {
  return (
    <div className={clsx('flex flex-col justify-between gap-8 lg:flex-row', className)}>
      <div className="relative flex-1/2 2xl:flex-3/7">
        <Image
          src={image?.src ?? '/images/placeholder.svg'}
          width={image?.width ?? 800}
          height={image?.height ?? 600}
          alt={image?.alt ?? ''}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          priority
        />
        {variant === 'down' ? (
          <VectorArrowDown3 className="absolute start-full top-full hidden -translate-x-1/5 -translate-y-full lg:block xl:top-[96%]" />
        ) : null}
        {variant === 'up' ? (
          <VectorArrowDown4 className="absolute start-full top-0 hidden -translate-x-1/5 lg:block" />
        ) : null}
      </div>

      <div className="relative flex flex-1/2 lg:justify-center 2xl:flex-4/7">
        <div className={clsx('w-full max-w-md', variant === 'up' && 'self-end', variant === 'down' && 'self-start')}>
          {heading && <Heading className="mb-8" dangerouslySetInnerHTML={{ __html: heading }}></Heading>}

          <dl className="divide-y divide-zinc-900/10">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="group py-6 first:pt-0 last:pb-0 overflow-hidden cursor-default">
                <dt>
                  <div className="flex w-full justify-between text-start transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-400">
                    <Text className="font-medium">{faq.question}</Text>
                    <span className="ms-6 self-center text-zinc-600 dark:text-zinc-400">
                      <PlusIcon aria-hidden="true" className="size-4 block group-hover:hidden" />
                      <MinusIcon aria-hidden="true" className="size-4 hidden group-hover:block" />
                    </span>
                  </div>
                </dt>
                <dd className="grid grid-rows-[0fr] transition-all duration-300 ease-in-out group-hover:grid-rows-[1fr] mt-0 group-hover:mt-3">
                  <div className="overflow-hidden">
                    <Text className="max-w-sm text-zinc-600">{faq.answer}</Text>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default FeatureSection2
