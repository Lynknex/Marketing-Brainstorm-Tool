import { describe, it, expect } from 'vitest'
import { QuestionEngine } from '@/lib/brainstorm/questionEngine'

describe('QuestionEngine', () => {
  it('should initialize with first question', () => {
    const engine = new QuestionEngine('test-campaign-id')
    const question = engine.getCurrentQuestion()

    expect(question).not.toBeNull()
    expect(question?.id).toBe('objectives')
  })

  it('should advance to next question after answering', () => {
    const engine = new QuestionEngine('test-campaign-id')

    engine.answerQuestion({
      questionId: 'objectives',
      value: ['lead-generation'],
    })

    const nextQuestion = engine.getCurrentQuestion()
    expect(nextQuestion?.id).toBe('audience')
  })

  it('should validate required answers', () => {
    const engine = new QuestionEngine('test-campaign-id')

    expect(() => {
      engine.answerQuestion({
        questionId: 'objectives',
        value: [],
      })
    }).toThrow('Minimum 1 selections required')
  })
})
