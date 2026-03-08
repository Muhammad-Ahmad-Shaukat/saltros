import { Text } from '@/components/text'
import { VectorArrowDown3 } from '@/components/vector-arrow-down'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'

interface TProductFaq {
  question: string
  answer: string
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

interface ProductFaqsSectionProps {
  className?: string
  faqs?: TProductFaq[]
  imageSrc?: string
  imageAlt?: string
}

const ProductFaqsSection = ({ className, faqs = faqs_demo, imageAlt, imageSrc }: ProductFaqsSectionProps) => {
  return (
    <div className={clsx('flex flex-col-reverse justify-between gap-8 lg:flex-row', className)}>
      <div className="relative flex-1/2 2xl:flex-3/7">
        <Image
          src={imageSrc || '/images/hijab/feature-1-2.png'}
          width={662}
          height={653}
          alt={imageAlt || 'product-faqs'}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
        <VectorArrowDown3 className="absolute start-full top-full hidden -translate-x-1/5 -translate-y-full lg:block xl:top-[96%]" />
      </div>

      <div className="relative flex flex-1/2 justify-center 2xl:flex-4/7">
        <div className="w-full max-w-lg self-start">
          <dl className="divide-y divide-zinc-900/10">
            {faqs.map((faq, index) => (
              <Disclosure defaultOpen={index === 0} key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <DisclosureButton className="group flex w-full justify-between text-start">
                    <Text className="font-medium">{faq.question}</Text>
                    <span className="ms-6 self-center text-zinc-600 dark:text-zinc-400">
                      <PlusIcon aria-hidden="true" className="size-4 group-data-open:hidden" />
                      <MinusIcon aria-hidden="true" className="size-4 group-not-data-open:hidden" />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-3">
                  <Text className="max-w-md text-zinc-600">{faq.answer}</Text>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default ProductFaqsSection
