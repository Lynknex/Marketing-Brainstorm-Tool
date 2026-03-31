'use client'

import { BrainstormAnswer, QuestionOption, QuestionType } from '@/types/brainstorm'
import { cn } from '@/lib/utils'

type AnswerValue = BrainstormAnswer['value']

interface OptionSelectorProps {
  type: QuestionType
  options: QuestionOption[]
  value?: AnswerValue
  onChange: (value: AnswerValue) => void
}

export function OptionSelector({ type, options, value, onChange }: OptionSelectorProps) {
  if (type === 'single-select') {
    return (
      <div className="grid gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'w-full text-left rounded-xl border-2 p-4 transition-all duration-200',
              value === option.value
                ? 'border-primary bg-primary/10 shadow-md'
                : 'border-border hover:border-primary/50 hover:bg-accent'
            )}
          >
            <div className="flex items-center gap-3">
              {option.icon && <span className="text-2xl">{option.icon}</span>}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{option.label}</span>
                  {option.recommended && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
              </div>
              <div className={cn(
                'h-5 w-5 rounded-full border-2 flex-shrink-0',
                value === option.value ? 'border-primary bg-primary' : 'border-border'
              )} />
            </div>
          </button>
        ))}
      </div>
    )
  }

  if (type === 'multi-select') {
    const selectedValues = Array.isArray(value) ? value : []

    const handleToggle = (optionValue: string) => {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v: string) => v !== optionValue)
        : [...selectedValues, optionValue]
      onChange(newValues)
    }

    return (
      <div className="grid gap-3">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value)
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleToggle(option.value)}
              className={cn(
                'w-full text-left rounded-xl border-2 p-4 transition-all duration-200',
                isSelected
                  ? 'border-primary bg-primary/10 shadow-md'
                  : 'border-border hover:border-primary/50 hover:bg-accent'
              )}
            >
              <div className="flex items-center gap-3">
                {option.icon && <span className="text-2xl">{option.icon}</span>}
                <div className="flex-1">
                  <span className="font-semibold">{option.label}</span>
                  <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
                </div>
                <div className={cn(
                  'h-5 w-5 rounded border-2 flex-shrink-0 flex items-center justify-center',
                  isSelected ? 'border-primary bg-primary' : 'border-border'
                )}>
                  {isSelected && (
                    <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          )
        })}
        {selectedValues.length > 0 && (
          <p className="text-sm text-muted-foreground text-center">
            {selectedValues.length} selected
          </p>
        )}
      </div>
    )
  }

  return null
}
