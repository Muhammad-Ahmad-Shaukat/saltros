'use client'

import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button, ButtonCircle } from '../button'
import { Heading } from '../heading'
import { Text } from '../text'

const demo_collections = [
  {
    title: '<span data-slot="italic">Premium Rayon</span> Hijab',
    desciption: 'The fabric is soft and smooth, making it easy to wear and style, and it is comfortable to wear.',
    images: [
      '/images/hijab/premium-rayon-1.webp',
      //  more images ...
    ],
  },
  {
    title: '<span data-slot="italic">Premium Chiffon</span> Hijab',
    desciption: 'Experience unparalleled comfort with our breathable hijabs, perfect for any season.',
    images: [
      '/images/hijab/essential-modal-1-1.webp',
      //  more images ...
    ],
  },
]

interface FeatureSection3Props {
  className?: string
  containerClassName?: string
  heading?: string
  collection1?: {
    title: string
    desciption: string
    images: string[]
  }
  collection2?: {
    title: string
    desciption: string
    images: string[]
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
}

const FeatureSection3 = ({
  className,
  containerClassName = 'container',
  heading = `Transform your <span data-slot="italic">Home with Nature</span> , with our premium salt gallery and gourmet essentials.`,
  collection1 = demo_collections[0],
  collection2 = demo_collections[1],
}: FeatureSection3Props) => {
  const [emblaRef] = useEmblaCarousel({
    slidesToScroll: 'auto',
  })
  const [emblaRef2] = useEmblaCarousel({
    slidesToScroll: 'auto',
    startIndex: 9,
  })

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      className={clsx('overflow-hidden py-20', className)}
    >
      <div className={containerClassName}>
        {/* Heading */}
        <motion.div variants={itemVariants} className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex-1/3">
            <Button href={'/collection/all'} outline className="hover:bg-zinc-900 hover:text-white transition-colors duration-300">
              Our products
            </Button>
          </div>
          <Heading className="flex-2/3 max-w-4xl" bigger dangerouslySetInnerHTML={{ __html: heading }} />
        </motion.div>

        {/* COLLECTION 1 */}
        <div className="mt-24 flex flex-col gap-12 lg:flex-row lg:gap-0">
          <motion.div variants={imageVariants} className="relative z-10 flex-1/2 group">
            <div className="relative aspect-5/6 w-full overflow-hidden rounded-2xl">
              <Image
                src={collection1.images[0]}
                alt={'feature-section'}
                fill
                className="z-0 object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-1/2 flex-col gap-10 lg:self-center lg:ps-10 xl:ps-20">
            {/* Heading */}
            <div className="flex items-end justify-between gap-4 border-b border-zinc-900/10 pb-6">
              <Heading dangerouslySetInnerHTML={{ __html: collection1.title }} className="text-3xl lg:text-4xl"></Heading>
              <ButtonCircle href={'/collection/all'} className="bg-zinc-900 hover:scale-110 transition-transform">
                <ArrowUpRightIcon className="h-5 w-5 text-zinc-50" />
              </ButtonCircle>
            </div>

            {/* SLIDER */}
            <div className="embla-overflow-unset" ref={emblaRef}>
              <div className="embla__container">
                {collection1.images
                  .filter((_, i) => i !== 0)
                  .map((image, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -10 }}
                      className="ms-4 min-w-0 embla__slide shrink-0 grow-0 basis-3/4 first:ms-0 sm:basis-2/5"
                    >
                      <div className="relative aspect-4/6 w-full overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-lg">
                        <Image
                          src={image}
                          alt={'feature-section'}
                          fill
                          className="z-0 object-cover transition-transform duration-500 hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
              <Text className="max-w-md text-zinc-600 leading-relaxed">{collection1.desciption}</Text>
              <Button outline href={'#'} className="shrink-0 hover:bg-zinc-900 hover:text-white transition-colors">
                DESCRIPTION
              </Button>
            </div>
          </motion.div>
        </div>

        {/* COLLECTION 2 */}
        <div className="mt-32 flex flex-col-reverse gap-12 lg:flex-row lg:gap-0">
          <motion.div variants={itemVariants} className="flex flex-1/2 flex-col gap-10 lg:self-center lg:pe-10 xl:pe-20">
            {/* Heading */}
            <div className="flex items-end justify-between gap-4 border-b border-zinc-900/10 pb-6">
              <Heading dangerouslySetInnerHTML={{ __html: collection2.title }} className="text-3xl lg:text-4xl"></Heading>
              <ButtonCircle href={'/collection/all'} className="bg-zinc-900 hover:scale-110 transition-transform">
                <ArrowUpRightIcon className="h-5 w-5 text-zinc-50" />
              </ButtonCircle>
            </div>

            {/* SLIDER */}
            <div className="embla-overflow-unset" ref={emblaRef2}>
              <div className="embla__container flex-row">
                {collection2.images
                  .filter((_, i) => i !== 0)
                  .map((image, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -10 }}
                      className="ms-4 min-w-0 embla__slide shrink-0 grow-0 basis-3/4 first:ms-0 sm:basis-2/5"
                    >
                      <div className="relative aspect-4/6 w-full overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-lg">
                        <Image
                          src={image}
                          alt={'feature-section'}
                          fill
                          className="z-0 object-cover transition-transform duration-500 hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
              <Text className="max-w-md text-zinc-600 leading-relaxed">{collection2.desciption}</Text>
              <Button outline href={'#'} className="shrink-0 hover:bg-zinc-900 hover:text-white transition-colors">
                DESCRIPTION
              </Button>
            </div>
          </motion.div>
          <motion.div variants={imageVariants} className="relative z-10 flex-1/2 group">
            <div className="relative aspect-5/6 w-full overflow-hidden rounded-2xl">
              <Image
                src={collection2.images[0]}
                alt={'feature-section'}
                fill
                className="z-0 object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default FeatureSection3
