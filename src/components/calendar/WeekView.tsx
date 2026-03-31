'use client'

import { Post } from '@prisma/client'
import { PostCard } from './PostCard'
import { format, addDays, isSameDay } from 'date-fns'
import { cn } from '@/lib/utils'

interface WeekViewProps {
  posts: Post[]
  weekStart: Date
  onPostClick: (post: Post) => void
}

export function WeekView({ posts, weekStart, onPostClick }: WeekViewProps) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  return (
    <div className="grid grid-cols-7 gap-3">
      {days.map((day) => {
        const dayPosts = posts.filter((post) =>
          isSameDay(new Date(post.scheduledDate), day)
        )
        const isToday = isSameDay(day, new Date())

        return (
          <div key={day.toISOString()} className="min-h-[180px]">
            <div className={cn(
              'text-center pb-2 mb-2 border-b border-border',
              isToday && 'text-primary font-bold'
            )}>
              <div className="text-xs text-muted-foreground uppercase">
                {format(day, 'EEE')}
              </div>
              <div className={cn(
                'text-lg font-semibold w-8 h-8 mx-auto flex items-center justify-center rounded-full',
                isToday && 'bg-primary text-primary-foreground'
              )}>
                {format(day, 'd')}
              </div>
            </div>
            <div className="space-y-2">
              {dayPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClick={() => onPostClick(post)}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
