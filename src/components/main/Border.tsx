import { cn } from '@/utils/cn'
import React from 'react'
interface BorderProps {
  className?: string
}
const Border = ({className}: BorderProps) => {
  return (
    <div className={cn("absolute top-0 -right-6 z-10 h-full w-12", className)}>
        <div
          className="block h-full w-full border-r border-l dark:hidden"
          style={{
            borderColor: "rgba(0, 0, 0, 0.04)",
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(0, 0, 0, 0.04) 4px, rgba(0, 0, 0, 0.04) 5px)",
          }}
        ></div>
      </div>
  )
}

export default Border