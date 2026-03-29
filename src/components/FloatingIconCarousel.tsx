'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import type { IconRecord } from '@/lib/types'

type FloatingIconCarouselProps = {
  icons: IconRecord[]
  onSelectIcon?: (icon: IconRecord) => void
}

const STEP_DURATION = 3.8
const FLOAT_DELAYS = [0, 0.65, 1.3, 1.95]

export function FloatingIconCarousel({ icons, onSelectIcon }: FloatingIconCarouselProps) {
  const iconPool = useMemo(() => icons.filter((icon) => Boolean(icon.thumbnail)), [icons])
  const [startIndex, setStartIndex] = useState(0)

  if (iconPool.length < 4) {
    return null
  }

  const frameIcons = Array.from({ length: 4 }, (_, offset) => iconPool[(startIndex + offset) % iconPool.length])

  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white/85 p-3 shadow-soft backdrop-blur sm:p-4">
      <div className="pointer-events-none absolute -left-24 -top-16 h-40 w-40 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-16 h-36 w-36 rounded-full bg-cyan-300/30 blur-3xl" />

      <motion.div
        key={startIndex}
        className="relative flex h-[160px] w-[133.333%] sm:h-[185px] lg:h-[210px]"
        initial={{ x: '0%' }}
        animate={{ x: '-25%' }}
        transition={{ duration: STEP_DURATION, ease: 'linear' }}
        onAnimationComplete={() => {
          setStartIndex((current) => (current + 1) % iconPool.length)
        }}
      >
        {frameIcons.map((icon, index) => {
          const card = (
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: FLOAT_DELAYS[index % FLOAT_DELAYS.length],
              }}
              className="relative h-full overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 shadow-soft"
            >
              <Image
                src={icon.thumbnail || ''}
                alt={icon.name}
                fill
                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 14vw"
                className="object-contain p-4 sm:p-5"
              />
            </motion.div>
          )

          if (!onSelectIcon) {
            return (
              <div key={`${icon.id}-${index}`} className="w-1/4 px-1.5 sm:px-2">
                {card}
              </div>
            )
          }

          return (
            <button
              key={`${icon.id}-${index}`}
              type="button"
              aria-label={icon.name}
              onClick={() => onSelectIcon(icon)}
              className="w-1/4 px-1.5 text-left sm:px-2"
            >
              {card}
            </button>
          )
        })}
      </motion.div>
    </div>
  )
}
