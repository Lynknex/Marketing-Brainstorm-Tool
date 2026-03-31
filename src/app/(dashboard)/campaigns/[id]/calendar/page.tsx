import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CampaignCalendar } from '@/components/calendar/CampaignCalendar'

export default async function CampaignCalendarPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/login')
  }

  const { id } = await params

  const campaign = await prisma.campaign.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      posts: {
        orderBy: { scheduledDate: 'asc' },
      },
    },
  })

  if (!campaign) notFound()

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{campaign.name}</h1>
        <p className="text-muted-foreground mt-1">{campaign.posts.length} posts scheduled</p>
      </div>
      <CampaignCalendar
        posts={campaign.posts}
        startDate={campaign.startDate}
        endDate={campaign.endDate}
      />
    </div>
  )
}
