'use client'

import { Post } from '@prisma/client'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface PostCardProps {
  post: Post
  onClick?: () => void
}

export function PostCard({ post, onClick }: PostCardProps) {
  const getTypeColor = () => {
    switch (post.postType) {
      case 'IMAGE': return 'border-l-blue-500'
      case 'VIDEO': return 'border-l-purple-500'
      case 'CAROUSEL': return 'border-l-orange-500'
      default: return 'border-l-gray-500'
    }
  }

  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-card p-3 cursor-pointer hover:shadow-md transition-shadow border-l-4',
        getTypeColor()
      )}
      onClick={onClick}
    >
      <p className="text-xs text-muted-foreground mb-1">
        {format(new Date(post.scheduledDate), 'MMM d')} · {post.postType}
      </p>
      <h4 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">
        {post.title}
      </h4>
      <p className="text-xs text-muted-foreground line-clamp-2">
        {post.copy.substring(0, 80)}...
      </p>
      {post.productFocus && (
        <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
          {post.productFocus}
        </span>
      )}
    </div>
  )
}
