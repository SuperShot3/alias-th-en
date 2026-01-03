'use client'

import { useState, useEffect } from 'react'
import WelcomeScreen from '@/components/WelcomeScreen'
import GameScreen from '@/components/GameScreen'
import CardView from '@/components/CardView'
import cardsDataRaw from '@/data/cards.json'

export type Card = {
  id: number
  theme_id: number
  theme: string
  pairs: Array<{ thai: string; english: string }>
}

const cardsData = cardsDataRaw as Card[]

type Screen = 'welcome' | 'find' | 'game'

export default function Home() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [currentCardId, setCurrentCardId] = useState<number | null>(null)
  const [cardHistory, setCardHistory] = useState<number[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [isFlipped, setIsFlipped] = useState(false)

  // Reset to welcome on mount (browser refresh)
  useEffect(() => {
    setScreen('welcome')
    setCurrentCardId(null)
    setCardHistory([])
    setHistoryIndex(-1)
    setIsFlipped(false)
  }, [])

  const getRandomCardId = (): number => {
    const randomIndex = Math.floor(Math.random() * cardsData.length)
    return cardsData[randomIndex].id
  }

  const handleStartGame = () => {
    const randomId = getRandomCardId()
    setCurrentCardId(randomId)
    setCardHistory([randomId])
    setHistoryIndex(0)
    setIsFlipped(false)
    setScreen('game')
  }

  const handleFindCard = (cardId: number): boolean => {
    const cardExists = cardsData.some(card => card.id === cardId)
    if (cardExists) {
      setCurrentCardId(cardId)
      setIsFlipped(false)
      setScreen('find')
      return true
    }
    return false
  }

  const handleNextCard = () => {
    const randomId = getRandomCardId()
    const newHistory = cardHistory.slice(0, historyIndex + 1)
    newHistory.push(randomId)
    setCardHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setCurrentCardId(randomId)
    setIsFlipped(false)
  }

  const handlePreviousCard = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setCurrentCardId(cardHistory[newIndex])
      setIsFlipped(false)
    }
  }

  const handleExit = () => {
    setScreen('welcome')
    setCurrentCardId(null)
    setCardHistory([])
    setHistoryIndex(-1)
    setIsFlipped(false)
  }

  const currentCard = cardsData.find(card => card.id === currentCardId) || null

  if (screen === 'welcome') {
    return (
      <WelcomeScreen
        onStart={handleStartGame}
        onFindCard={handleFindCard}
      />
    )
  }

  if (screen === 'find' && currentCard) {
    return (
      <CardView
        card={currentCard}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
        onBack={() => {
          setScreen('welcome')
          setCurrentCardId(null)
          setIsFlipped(false)
        }}
      />
    )
  }

  if (screen === 'game' && currentCard) {
    return (
      <GameScreen
        card={currentCard}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
        onNext={handleNextCard}
        onPrevious={handlePreviousCard}
        canGoPrevious={historyIndex > 0}
        onExit={handleExit}
      />
    )
  }

  return null
}

