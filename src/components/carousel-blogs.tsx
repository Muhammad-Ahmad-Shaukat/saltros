'use client'

import { getBlogPosts } from '@/data'
import clsx from 'clsx'
import { EmblaViewportRefType } from 'embla-carousel-react'
import BlogPostCart from './blog-post-cart'
import { motion } from 'framer-motion'

interface CarouselBlogsProps {
  posts: ReturnType<typeof getBlogPosts>
  className?: string
  emblaRef: EmblaViewportRefType
}

const CarouselBlogs = ({ className, posts, emblaRef }: CarouselBlogsProps) => {
  return (
    <div className={clsx('embla', className)} ref={emblaRef}>
      <div className="-ms-5 embla__container">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="embla__slide basis-[86%] ps-5 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <BlogPostCart post={post} className="h-full border border-zinc-100 rounded-2xl p-4 transition-all hover:border-zinc-300 hover:shadow-sm bg-white" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CarouselBlogs
