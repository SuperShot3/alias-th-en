'use client'

import { Card } from '@/app/page'
import styles from './FlipCard.module.css'

interface FlipCardProps {
  card: Card
  isFlipped: boolean
  onFlip: () => void
}

export default function FlipCard({ card, isFlipped, onFlip }: FlipCardProps) {
  return (
    <div
      className={`${styles.cardContainer} ${isFlipped ? styles.flipped : ''}`}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      aria-label={isFlipped ? 'Flip to Thai side' : 'Flip to English side'}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onFlip()
        }
      }}
    >
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardId}>#{card.id}</span>
          <span className={styles.languageLabel}>
            {isFlipped ? 'EN' : 'TH'}
          </span>
        </div>

        <div className={styles.cardFront}>
          <div className={styles.wordGrid}>
            {card.pairs.map((pair, index) => (
              <div key={index} className={styles.wordItem}>
                {pair.thai}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cardBack}>
          <div className={styles.wordGrid}>
            {card.pairs.map((pair, index) => (
              <div key={index} className={styles.wordItem}>
                {pair.english}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

