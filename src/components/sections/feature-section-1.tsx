'use client'

import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Text } from '@/components/text'
import { VectorArrowDown2 } from '@/components/vector-arrow-down'
import clsx from 'clsx'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface TImage {
  src: string
  width: number
  height: number
  alt: string
}
interface FeatureSection1Props {
  className?: string
  heading?: string
  description?: string
  image1?: TImage
  image2?: TImage
  buttonText?: string
  buttonLink?: string
}

const FeatureSection1 = ({
  className,
  description = 'At Salt Rosa, we bridge the gap between ancient geological power and MODREN INTERIOR DESIGN. By sourcing only the finest mineral-rich salt, we ensure that every hand-carved piece and architectural brick serves as both a stunning visual focal point and a functional wellness tool. We don’t just provide decor; we curate the raw, grounding essence of nature to help you transform your home into a refined, restorative sanctuary.',
  heading = `<span>What makes us</span><br /><span data-slot="italic">Different? </span>`,
  image1 = {
    src: '/images/hijab/feature-1-1.png',
    width: 325,
    height: 325,
    alt: 'feature-1-1',
  },
  image2 = {
    src: '/images/hijab/feature-1-2.png',
    width: 494,
    height: 529,
    alt: 'feature-1-2',
  },
  buttonText = 'EXPLORE PRODUCTS',
  buttonLink = '/shop',
}: FeatureSection1Props) => {
  return (
    <div className={clsx('flex flex-col justify-between gap-8 lg:flex-row lg:gap-6 xl:gap-2.5', className)}>
      <div className="flex flex-2/3 flex-col gap-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative"
        >
          <Heading
            fontSize="text-5xl font-semibold"
            dangerouslySetInnerHTML={{ __html: heading }}
            className="max-w-[400px]"
          ></Heading>
          <VectorArrowDown2 className="absolute start-60 top-1/2 hidden h-[150px] md:block 2xl:start-72 2xl:top-2/3 2xl:h-auto" />
        </motion.div>

        <div className="mt-auto flex flex-col gap-8 sm:flex-row lg:gap-6 xl:gap-2.5">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex-1/2 xl:flex-1/3"
          >
            <div className="group relative overflow-hidden rounded-2xl shadow-sm transition-shadow duration-500 hover:shadow-xl w-full h-full">
              <Image
                {...image1}
                alt={image1.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/3"></div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-1/2 sm:justify-center xl:flex-2/3"
          >
            <div className="max-w-sm self-end">
              <Text dangerouslySetInnerHTML={{ __html: description }} className="leading-relaxed"></Text>
              <Button outline href={buttonLink} className="mt-7 transition-colors duration-300 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 group">
                <span className="transition-all duration-300 group-hover:tracking-[0.15em]">{buttonText}</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex flex-1/3"
      >
        <div className="group relative overflow-hidden rounded-2xl shadow-sm transition-shadow duration-500 hover:shadow-xl w-full h-full">
          <Image 
            {...image2} 
            alt={image2.alt} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
            priority 
          />
          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/3"></div>
        </div>
      </motion.div>
    </div>
  )
}

export default FeatureSection1
