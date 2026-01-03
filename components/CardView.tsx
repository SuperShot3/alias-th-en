'use client'

import { Card } from '@/app/page'
import FlipCard from './FlipCard'
import styles from './CardView.module.css'

interface CardViewProps {
  card: Card
  isFlipped: boolean
  onFlip: () => void
  onBack: () => void
}

export default function CardView({ card, isFlipped, onFlip, onBack }: CardViewProps) {
  return (
    <div className={styles.container}>
      <FlipCard card={card} isFlipped={isFlipped} onFlip={onFlip} />
      <button
        className={styles.backButton}
        onClick={onBack}
        aria-label="Back to home"
      >
        Back / Home
      </button>
    </div>
  )
}


