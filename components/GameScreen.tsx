'use client'

import { useRef, useState, useEffect } from 'react'
import { Card } from '@/app/page'
import FlipCard from './FlipCard'
import styles from './GameScreen.module.css'

interface GameScreenProps {
  card: Card
  isFlipped: boolean
  onFlip: () => void
  onNext: () => void
  onPrevious: () => void
  canGoPrevious: boolean
  onExit: () => void
}

export default function GameScreen({
  card,
  isFlipped,
  onFlip,
  onNext,
  onPrevious,
  canGoPrevious,
  onExit,
}: GameScreenProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      onNext()
    } else if (isRightSwipe && canGoPrevious) {
      onPrevious()
    }
  }

  return (
    <div className={styles.container}>
      <div
        ref={cardRef}
        className={styles.cardWrapper}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <FlipCard card={card} isFlipped={isFlipped} onFlip={onFlip} />
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={onExit}
          aria-label="Exit game"
        >
          Exit
        </button>
        <button
          className={styles.button}
          onClick={onNext}
          aria-label="Next card"
        >
          Next card
        </button>
      </div>
    </div>
  )
}


