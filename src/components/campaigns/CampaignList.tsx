import { Campaign } from '@prisma/client'
import { CampaignCard } from './CampaignCard'

interface CampaignListProps {
  campaigns: (Campaign & { _count?: { posts: number } })[]
}

export function CampaignList({ campaigns }: CampaignListProps) {
  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-border rounded-xl">
        <p className="text-lg text-muted-foreground">No campaigns yet</p>
        <p className="text-sm text-muted-foreground mt-2">
          Create your first campaign to get started
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  )
}
