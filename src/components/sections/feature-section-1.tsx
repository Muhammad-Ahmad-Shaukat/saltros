'use client'

import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Text } from '@/components/text'
import { VectorArrowDown2 } from '@/components/vector-arrow-down'
import clsx from 'clsx'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'

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
  description2?: string
  image1?: TImage
  image2?: TImage
  buttonText?: string
  buttonLink?: string
}

const FeatureSection1 = ({
  className,
  description = 'At Salt Rosa, we bridge the profound legacy of ancient geological formations with the vanguard of modern interior design. We don\'t merely source materials; we curate the rarest, mineral-rich salt to hand-craft architectural elements that redefine the luxury living space.',
  description2 = 'Each hand-carved piece and artisan salt brick serves as a dual masterpiece: a striking visual focal point and a functional catalyst for holistic well-being. By integrating the raw, grounding essence of the natural world into the home, we help you transform your environment into a refined, restorative sanctuary.',
  heading = `<span>What makes us</span><br /><span data-slot="italic">Different? </span>`,
  image1 = {
    src: '/images/oeister-salt-lamp.avif',
    width: 325,
    height: 325,
    alt: 'oeister-salt-lamp',
  },
  image2 = {
    src: '/images/salt-decor-lamp.avif',
    width: 494,
    height: 529,
    alt: 'salt-decor-lamp',
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
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const }}
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
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] as const }}
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
            transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="flex flex-1/2 sm:justify-center xl:flex-2/3"
          >
            <div className="max-w-sm self-end">
              <Text dangerouslySetInnerHTML={{ __html: description }} className="leading-relaxed"></Text>
              <Text dangerouslySetInnerHTML={{ __html: description2 }} className="leading-relaxed"></Text>
              <Button 
                outline 
                href={buttonLink} 
                className="group relative mt-7 overflow-hidden border-zinc-950 transition-colors duration-500 hover:text-white dark:hover:text-zinc-900 shadow-sm"
              >
                <span className="relative z-10 flex items-center gap-2 transition-transform duration-500 group-hover:translate-x-1">
                  {buttonText}
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="size-4 -translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      d="M6.75 3.75 11.25 8l-4.5 4.25"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="absolute inset-0 z-0 translate-y-full bg-zinc-900 transition-transform duration-500 ease-in-out group-hover:translate-y-0 dark:bg-zinc-100" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] as const }}
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
