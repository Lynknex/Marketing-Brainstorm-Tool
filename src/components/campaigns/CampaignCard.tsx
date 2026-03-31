'use client'

import { Campaign } from '@prisma/client'
import { format } from 'date-fns'
import Link from 'next/link'

interface CampaignCardProps {
  campaign: Campaign & { _count?: { posts: number } }
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT': return 'bg-gray-500/10 text-gray-600 dark:text-gray-400'
      case 'IN_BRAINSTORM': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
      case 'DESIGN_COMPLETE': return 'bg-green-500/10 text-green-600 dark:text-green-400'
      case 'IN_PRODUCTION': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
      case 'SCHEDULED': return 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
      case 'ACTIVE': return 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
      case 'COMPLETED': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
      default: return 'bg-gray-500/10 text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <Link href={`/campaigns/${campaign.id}`}>
      <div className="rounded-xl border border-border bg-card p-5 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold line-clamp-2 flex-1">{campaign.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ml-3 ${getStatusColor(campaign.status)}`}>
            {campaign.status.replace('_', ' ')}
          </span>
        </div>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>📅 {format(campaign.startDate, 'MMM d')} - {format(campaign.endDate, 'MMM d, yyyy')}</p>
          <p>📝 {campaign._count?.posts || 0} posts</p>
        </div>
        <div className="mt-4 flex gap-2">
          <Link
            href={`/campaigns/${campaign.id}/calendar`}
            className="text-sm px-3 py-1.5 rounded-lg border border-border hover:bg-accent transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Calendar
          </Link>
        </div>
      </div>
    </Link>
  )
}
