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
      className={clsx('group w-full max-w-4xl cursor-pointer py-5 font-medium tracking-wide sm:py-6 overflow-hidden transition-all duration-300 hover:bg-zinc-900 hover:text-white', className)}
      {...props}
    >
      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-2">{children}</span>
      <div className="absolute right-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white transition-all duration-300 group-hover:bg-white group-hover:text-zinc-900 sm:h-12 sm:w-12 z-10">
        {icon ? icon : <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />}
      </div>
    </Button>
  )
}

export default ButtonLargeWithIcon
