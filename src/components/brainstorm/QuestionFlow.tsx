'use client'

import { useState } from 'react'
import { QuestionCard } from './QuestionCard'
import { ProgressBar } from './ProgressBar'
import { BrainstormAnswer, BrainstormQuestion } from '@/types/brainstorm'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface QuestionFlowProps {
  campaignId: string
  questions: BrainstormQuestion[]
  onComplete: (answers: BrainstormAnswer[]) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function QuestionFlow({ campaignId: _campaignId, questions, onComplete }: QuestionFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<BrainstormAnswer[]>([])

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id)

  const handleAnswer = (value: BrainstormAnswer['value']) => {
    const newAnswer: BrainstormAnswer = {
      questionId: currentQuestion.id,
      value,
      timestamp: new Date(),
    }
    setAnswers(prev => [
      ...prev.filter(a => a.questionId !== currentQuestion.id),
      newAnswer,
    ])
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onComplete(answers)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  if (!currentQuestion) return null

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <ProgressBar
        progress={progress}
        current={currentIndex + 1}
        total={questions.length}
      />

      <QuestionCard
        question={currentQuestion}
        answer={currentAnswer?.value}
        onAnswer={handleAnswer}
      />

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!currentAnswer}
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {currentIndex === questions.length - 1 ? 'Complete' : 'Next'}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
