export type QuestionType = 'single-select' | 'multi-select' | 'text' | 'date-range'

export interface BrainstormQuestion {
  id: string
  order: number
  question: string
  subtitle?: string
  type: QuestionType
  options?: QuestionOption[]
  validation?: ValidationRule
  dependsOn?: {
    questionId: string
    answerValue: string | string[]
  }
}

export interface QuestionOption {
  value: string
  label: string
  description: string
  preview?: string  // For visual previews
  icon?: string
  recommended?: boolean
}

export interface BrainstormAnswer {
  questionId: string
  value: string | string[] | { start: Date; end: Date }
  timestamp: Date
}

export interface BrainstormSession {
  campaignId: string
  currentQuestionIndex: number
  answers: BrainstormAnswer[]
  status: 'in-progress' | 'completed'
}

export interface ValidationRule {
  required?: boolean
  minSelections?: number
  maxSelections?: number
  pattern?: string
}
