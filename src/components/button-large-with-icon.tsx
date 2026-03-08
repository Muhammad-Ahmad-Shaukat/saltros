import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React from 'react'
import { Button } from './button'

interface ButtonLargeWithIconProps {
  className?: string
  children?: React.ReactNode
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
}

const ButtonLargeWithIcon = ({ className = '', children, icon, ...props }: ButtonLargeWithIconProps) => {
  return (
    <Button
      outline
      className={clsx('group relative w-full max-w-4xl border-zinc-200 cursor-pointer py-5 uppercase text-sm font-semibold tracking-widest sm:py-6 overflow-hidden hover:border-zinc-950 transition-colors duration-500', className)}
      {...props}
    >
      <div className="absolute top-full left-0 h-full w-full bg-zinc-950 transition-transform duration-700 ease-out group-hover:-translate-y-full z-0"></div>
      <span className="relative z-10 transition-all duration-700 ease-out group-hover:tracking-[0.3em] group-hover:text-white">{children}</span>
      <div className="absolute right-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 group-hover:bg-white text-white group-hover:text-zinc-950 transition-all duration-700 ease-out sm:h-12 sm:w-12 z-10 shadow-sm group-hover:shadow-md">
        {icon ? icon : <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-700 ease-out group-hover:rotate-45 group-hover:scale-110" />}
      </div>
    </Button>
  )
}

export default ButtonLargeWithIcon
