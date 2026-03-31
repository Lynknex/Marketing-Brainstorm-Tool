import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { CampaignList } from '@/components/campaigns/CampaignList'
import { NewCampaignDialog } from '@/components/campaigns/NewCampaignDialog'

export default async function CampaignsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/login')
  }

  const campaigns = await prisma.campaign.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Campaigns</h1>
          <p className="text-muted-foreground mt-1">
            Manage your marketing campaigns
          </p>
        </div>
        <NewCampaignDialog />
      </div>

      <CampaignList campaigns={campaigns} />
    </div>
  )
}
