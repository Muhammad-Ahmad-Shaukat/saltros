'use client'

import clsx from 'clsx'
import React from 'react'
import { motion } from 'framer-motion'

interface SectionBiggestHeadingProps {
  className?: string
  heading?: React.ReactNode
  features?: string[]
}

const SectionBiggestHeading: React.FC<SectionBiggestHeadingProps> = ({
  className,
  heading = (
    <>
      Collection Of <span className="font-serif font-normal italic">Nature</span>
    </>
  ),
  features = ['PREMIUM DECOR', 'ARCHITECTURAL BRICKS', 'GOURMET EDIBLES', 'NATURAL WELLNESS'],
}) => {
  return (
    <div className={clsx('', className)}>
      <motion.h1
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="text-center text-[4.75rem] leading-none font-semibold tracking-tighter text-zinc-950 lg:text-[6.5rem] xl:text-[8.3rem] 2xl:text-[10rem] dark:text-white"
      >
        {heading}
      </motion.h1>
      <div className="mt-4 flex flex-wrap justify-between text-sm tracking-wide uppercase 2xl:mt-5 overflow-hidden">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
            className="group cursor-default flex items-center px-2 py-1"
          >
            <span className="text-zinc-400 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-zinc-950 dark:group-hover:text-white text-base">
              [
            </span>
            <span className="px-1.5 transition-colors duration-300 group-hover:text-zinc-500 dark:group-hover:text-zinc-300 font-medium tracking-widest">
              {feature}
            </span>
            <span className="text-zinc-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-zinc-950 dark:group-hover:text-white text-base">
              ]
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SectionBiggestHeading
