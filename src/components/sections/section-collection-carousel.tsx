'use client'

import CarouselBlogs from '@/components/carousel-blogs'
import NextPrevButtons from '@/components/next-prev-btns'
import { getBlogPosts } from '@/lib/static-data'
import { useCarouselArrowButtons } from '@/hooks/use-carousel-arrow-buttons'
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from '../button'
import { Divider } from '../divider'
import { Heading } from '../heading'
import { Text } from '../text'
import { motion } from 'framer-motion'

interface SectionBlogCarouselProps {
  emblaOptions?: EmblaOptionsType
  className?: string
  sectonTitle?: string
}

const SectionBlogCarousel = ({
  emblaOptions = {
    slidesToScroll: 'auto',
  },
  className,
  sectonTitle = 'Explore our <span data-slot="italic">Latest Stories</span> and insights.',
}: SectionBlogCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions)
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useCarouselArrowButtons(emblaApi)
  
  const blogs = getBlogPosts().slice(0, 5)

  return (
    <div className={className}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-between gap-8 lg:flex-row"
      >
        <div className="flex-2/3">
          <Heading className="max-w-2xl" bigger dangerouslySetInnerHTML={{ __html: sectonTitle || '' }} />
        </div>

        <div className="flex-1/3">
          <Text>Dive into our world of wellness, design, and artisan crafting.</Text>
          <Button outline href={'/blog'} className="mt-4 group">
            <span className="group-hover:tracking-wider transition-all duration-300">VIEW ALL BLOGS</span>
          </Button>
        </div>

        <Divider className="block lg:hidden" />
      </motion.div>

      <div className="mt-16 flex items-center justify-between gap-5 border-b border-zinc-100 pb-8">
        <Text className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">Featured Articles</Text>
        <NextPrevButtons
          className="ms-auto"
          onNextClick={onNextButtonClick}
          onPrevClick={onPrevButtonClick}
          nextBtnDisabled={nextBtnDisabled}
          prevBtnDisabled={prevBtnDisabled}
        />
      </div>

      <CarouselBlogs
        className="mt-10"
        emblaRef={emblaRef}
        posts={blogs}
      />
    </div>
  )
}

export default SectionBlogCarousel
