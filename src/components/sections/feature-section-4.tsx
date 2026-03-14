'use client'
import { AiIdeaIcon, BoatIcon, CoinsDollarIcon, Mailbox01Icon, Plant03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { Text } from '../text'
import { motion } from 'framer-motion'

const data = [
  {
    id: 1,
    title: 'DESIGNED TO LAST',
    description: 'These designs will last in your home, forever.',
    icon: AiIdeaIcon,
  },
  {
    id: 2,
    title: 'WORLDWIDE SHIPPING',
    description: 'Cheap, Fast Shipping Available to your Destination.',
    icon: BoatIcon,
  },
  {
    id: 3,
    title: '5 STAR CARE',
    description: 'We\'re here for you anytime, <span class="underline text-zinc-900 font-medium normal-case">contact@saltrosa.com</span>',
    icon: Mailbox01Icon,
  },
  {
    id: 4,
    title: 'WORTH THE PRICE',
    description: 'You get what you pay for, and it is worth it.',
    icon: CoinsDollarIcon,
  },
  {
    id: 5,
    title: 'KIND TO PLANET',
    description: "You're doing good for yourself, and the planet.",
    icon: Plant03Icon,
  },
]

interface FeatureSection4Props {
  className?: string
}

const FeatureSection4 = ({ className }: FeatureSection4Props) => {
  return (
    <div className={clsx('grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 container', className)}>
      {data.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
          className="h-full"
        >
          <div className="flex flex-col h-full border border-zinc-200 bg-white p-8 transition-all duration-300 group">
            <Text className="text-zinc-400 font-mono text-[10px] tracking-widest transition-colors group-hover:text-zinc-900">
              ({String(index + 1).padStart(2, '0')})
            </Text>
            
            <Text className="mt-6 font-bold tracking-widest text-zinc-900 text-xs sm:text-sm">
              {item.title}
            </Text>
            
            <div className="mt-8 mb-4 transform transition-transform duration-500 group-hover:scale-110 origin-left">
              <HugeiconsIcon icon={item.icon} size={32} className="text-zinc-800" strokeWidth={1} />
            </div>
            
            <Text
              className="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-500 transition-colors group-hover:text-zinc-700 normal-case font-medium"
              dangerouslySetInnerHTML={{ __html: item.description }}
            ></Text>
            
            <div className="mt-auto pt-8">
              <div className="h-[1px] w-8 bg-zinc-200 transition-all duration-500 group-hover:w-full group-hover:bg-zinc-950" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default FeatureSection4
