'use client'

import { VectorArrowDown3, VectorArrowDown4 } from '@/components/vector-arrow-down'
import { TImage } from '@/type'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import { Heading } from '../heading'
import { Text } from '../text'
import { motion } from 'framer-motion'

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
  src: '/images/salt-products-range.avif',
  width: 662,
  height: 653,
  alt: 'salt-products-range',
}

const FeatureSection2 = ({
  className,
  variant = 'down',
  heading = `Frequently Asked <br/><span data-slot="italic">Questions</span>`,
  faqs = faqs_demo,
  image = image_demo,
}: FeatureSection2Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className={clsx('flex flex-col justify-between gap-8 lg:flex-row pb-12 sm:pb-20 lg:pb-32', className)}>
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative flex-1/2 2xl:flex-3/7"
      >
        <div className="group relative overflow-hidden rounded-2xl shadow-sm transition-shadow duration-500 hover:shadow-xl w-full max-h-[400px] sm:max-h-[500px] lg:max-h-none h-full">
          <Image
            src={image?.src ?? '/images/placeholder.svg'}
            width={image?.width ?? 800}
            height={image?.height ?? 600}
            alt={image?.alt ?? ''}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/3"></div>
        </div>
        {variant === 'down' ? (
          <VectorArrowDown3 className="absolute start-full top-full hidden -translate-x-1/5 -translate-y-full lg:block xl:top-[96%]" />
        ) : null}
        {variant === 'up' ? (
          <VectorArrowDown4 className="absolute start-full top-0 hidden -translate-x-1/5 lg:block" />
        ) : null}
      </motion.div>

      <div className="relative flex flex-1/2 lg:justify-center 2xl:flex-4/7">
        <div className={clsx('w-full max-w-md', variant === 'up' && 'self-end', variant === 'down' && 'self-start')}>
          {heading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <Heading fontSize="text-5xl font-semibold" className="mb-8" dangerouslySetInnerHTML={{ __html: heading }}></Heading>
            </motion.div>
          )}

          <dl className="divide-y divide-zinc-900/10 dark:divide-white/10">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <motion.div 
                  key={faq.question} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                  className="group py-6 first:pt-4 last:pb-0 overflow-hidden"
                >
                  <dt>
                    <button 
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full justify-between text-start transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
                    >
                      <Text className={clsx('font-medium transition-all duration-300 ease-out', isOpen && 'translate-x-1 text-zinc-950 dark:text-white')}>
                        {faq.question}
                      </Text>
                      <span className="ms-6 self-center text-zinc-600 dark:text-zinc-400">
                        {isOpen ? (
                          <MinusIcon aria-hidden="true" className="size-5 transition-transform duration-300 rotate-180" />
                        ) : (
                          <PlusIcon aria-hidden="true" className="size-5 transition-transform duration-300" />
                        )}
                      </span>
                    </button>
                  </dt>
                  <dd 
                    className={clsx(
                      'grid transition-all duration-500 ease-in-out mt-0 opacity-0 overflow-hidden',
                      isOpen ? 'grid-rows-[1fr] mt-4 opacity-100' : 'grid-rows-[0fr]'
                    )}
                  >
                    <div className="overflow-hidden">
                      <Text className="max-w-sm text-zinc-500 dark:text-zinc-400 leading-relaxed ps-1">{faq.answer}</Text>
                    </div>
                  </dd>
                </motion.div>
              )
            })}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default FeatureSection2
