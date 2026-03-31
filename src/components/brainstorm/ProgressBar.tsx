'use client'

interface ProgressBarProps {
  progress: number
  current: number
  total: number
}

export function ProgressBar({ progress, current, total }: ProgressBarProps) {
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Question {current} of {total}</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
