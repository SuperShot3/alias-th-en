'use client'

import { useState } from 'react'
import styles from './WelcomeScreen.module.css'

interface WelcomeScreenProps {
  onStart: () => void
  onFindCard: (cardId: number) => boolean
}

export default function WelcomeScreen({ onStart, onFindCard }: WelcomeScreenProps) {
  const [showFindInput, setShowFindInput] = useState(false)
  const [cardIdInput, setCardIdInput] = useState('')
  const [error, setError] = useState('')

  const handleFindSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const cardId = parseInt(cardIdInput.trim())
    if (isNaN(cardId) || cardIdInput.trim() === '') {
      setError('Please enter a valid card number')
      return
    }

    const found = onFindCard(cardId)
    if (!found) {
      setError('Card not found. Please enter a valid card ID.')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Alias Thai ⇄ English</h1>
        
        <div className={styles.rules}>
          <h2>How to Play</h2>
          <ul>
            <li>Tap the card to flip between Thai and English</li>
            <li>Use "Next card" to get a random card</li>
            <li>Swipe left for next card</li>
            <li>Swipe right to go back to previous card</li>
          </ul>
        </div>

        {!showFindInput ? (
          <div className={styles.buttons}>
            <button
              className={styles.button}
              onClick={() => setShowFindInput(true)}
              aria-label="Find a card by number"
            >
              Find a card
            </button>
            <button
              className={styles.button}
              onClick={onStart}
              aria-label="Start game with random card"
            >
              Start
            </button>
          </div>
        ) : (
          <form onSubmit={handleFindSubmit} className={styles.findForm}>
            <label htmlFor="cardId" className={styles.label}>
              Enter card number:
            </label>
            <input
              id="cardId"
              type="number"
              value={cardIdInput}
              onChange={(e) => {
                setCardIdInput(e.target.value)
                setError('')
              }}
              className={styles.input}
              placeholder="Card ID"
              min="1"
              autoFocus
              aria-label="Card number input"
            />
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.findButtons}>
              <button
                type="button"
                className={styles.buttonSecondary}
                onClick={() => {
                  setShowFindInput(false)
                  setCardIdInput('')
                  setError('')
                }}
              >
                Cancel
              </button>
              <button type="submit" className={styles.button}>
                Find
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

