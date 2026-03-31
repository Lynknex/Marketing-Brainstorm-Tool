'use client'

import { BrainstormAnswer, BrainstormQuestion } from '@/types/brainstorm'
import { OptionSelector } from './OptionSelector'

type AnswerValue = BrainstormAnswer['value']

interface QuestionCardProps {
  question: BrainstormQuestion
  answer?: AnswerValue
  onAnswer: (value: AnswerValue) => void
}

export function QuestionCard({ question, answer, onAnswer }: QuestionCardProps) {
  return (
    <div className="rounded-2xl border-2 border-border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">{question.question}</h2>
        {question.subtitle && (
          <p className="text-muted-foreground mt-2">{question.subtitle}</p>
        )}
      </div>
      <OptionSelector
        type={question.type}
        options={question.options || []}
        value={answer}
        onChange={onAnswer}
      />
    </div>
  )
}
