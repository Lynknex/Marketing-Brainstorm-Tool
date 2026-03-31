'use client'

import { useState } from 'react'
import { Post } from '@prisma/client'
import { WeekView } from './WeekView'
import { format, addWeeks, startOfWeek } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CampaignCalendarProps {
  posts: Post[]
  startDate: Date
  endDate: Date
}

export function CampaignCalendar({ posts, startDate, endDate }: CampaignCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(startDate, { weekStartsOn: 1 })
  )
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{format(currentWeek, 'MMMM yyyy')}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCurrentWeek(addWeeks(currentWeek, -1))}
            className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
            className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Week view */}
      <WeekView
        posts={posts}
        weekStart={currentWeek}
        onPostClick={setSelectedPost}
      />

      {/* Post detail modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-card rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold pr-4">{selectedPost.title}</h3>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="text-muted-foreground hover:text-foreground text-xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              {format(new Date(selectedPost.scheduledDate), 'EEEE, MMMM d, yyyy')} · {selectedPost.postType}
            </p>
            <div className="whitespace-pre-wrap text-sm">{selectedPost.copy}</div>
            <div className="border-t border-border pt-4">
              <p className="text-sm font-semibold mb-1">Visual Concept</p>
              <p className="text-sm text-muted-foreground">{selectedPost.visualConcept}</p>
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-sm font-semibold mb-2">Hashtags</p>
              <div className="flex flex-wrap gap-2">
                {(selectedPost.hashtags as string[]).map((tag, i) => (
                  <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-sm font-semibold mb-1">Call to Action</p>
              <p className="text-sm">{selectedPost.cta}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
