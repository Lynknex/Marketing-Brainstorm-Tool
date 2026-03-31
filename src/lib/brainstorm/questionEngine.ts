import { BrainstormQuestion, BrainstormAnswer, BrainstormSession } from '@/types/brainstorm'
import questionsData from './questions.json'

export class QuestionEngine {
  private questions: BrainstormQuestion[]
  private session: BrainstormSession

  constructor(campaignId: string, existingSession?: BrainstormSession) {
    this.questions = questionsData as BrainstormQuestion[]
    this.session = existingSession || {
      campaignId,
      currentQuestionIndex: 0,
      answers: [],
      status: 'in-progress',
    }
  }

  getCurrentQuestion(): BrainstormQuestion | null {
    const question = this.questions[this.session.currentQuestionIndex]

    // Check if question has dependencies
    if (question?.dependsOn) {
      const dependentAnswer = this.session.answers.find(
        a => a.questionId === question.dependsOn!.questionId
      )

      if (!dependentAnswer || !this.matchesDependency(dependentAnswer.value, question.dependsOn.answerValue)) {
        // Skip this question
        return this.nextQuestion()
      }
    }

    return question || null
  }

  answerQuestion(answer: Omit<BrainstormAnswer, 'timestamp'>): void {
    // Validate answer
    const question = this.getCurrentQuestion()
    if (!question) throw new Error('No current question')

    this.validateAnswer(question, answer.value)

    // Save answer
    this.session.answers.push({
      ...answer,
      timestamp: new Date(),
    })

    // Move to next question
    this.session.currentQuestionIndex++

    // Check if complete
    if (this.session.currentQuestionIndex >= this.questions.length) {
      this.session.status = 'completed'
    }
  }

  private validateAnswer(question: BrainstormQuestion, value: any): void {
    const rules = question.validation
    if (!rules) return

    if (rules.required && !value) {
      throw new Error('Answer is required')
    }

    if (Array.isArray(value)) {
      if (rules.minSelections && value.length < rules.minSelections) {
        throw new Error(`Minimum ${rules.minSelections} selections required`)
      }
      if (rules.maxSelections && value.length > rules.maxSelections) {
        throw new Error(`Maximum ${rules.maxSelections} selections allowed`)
      }
    }
  }

  private matchesDependency(value: any, expected: string | string[]): boolean {
    if (Array.isArray(expected)) {
      return Array.isArray(value) && expected.some(e => value.includes(e))
    }
    return Array.isArray(value) ? value.includes(expected) : value === expected
  }

  nextQuestion(): BrainstormQuestion | null {
    this.session.currentQuestionIndex++
    return this.getCurrentQuestion()
  }

  previousQuestion(): BrainstormQuestion | null {
    if (this.session.currentQuestionIndex > 0) {
      this.session.currentQuestionIndex--
    }
    return this.getCurrentQuestion()
  }

  getProgress(): { current: number; total: number; percentage: number } {
    return {
      current: this.session.currentQuestionIndex,
      total: this.questions.length,
      percentage: (this.session.currentQuestionIndex / this.questions.length) * 100,
    }
  }

  getSession(): BrainstormSession {
    return this.session
  }

  isComplete(): boolean {
    return this.session.status === 'completed'
  }
}
