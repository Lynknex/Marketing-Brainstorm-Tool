import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateCampaignDesign } from '@/lib/claude'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { campaignId, answers } = body

    // Verify campaign ownership
    const campaign = await prisma.campaign.findFirst({
      where: {
        id: campaignId,
        userId: session.user.id,
      },
    })

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    }

    // Transform answers into config
    const config = transformAnswersToConfig(answers, campaign)

    // Generate campaign design with Claude
    const { designSpec, posts } = await generateCampaignDesign(config)

    // Save to database
    const updatedCampaign = await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        designSpec,
        status: 'DESIGN_COMPLETE',
        posts: {
          create: posts.map((post: any) => ({
            title: post.title,
            scheduledDate: new Date(post.date),
            postType: post.type.toUpperCase(),
            contentDimension: post.contentDimension,
            copy: post.copy,
            visualConcept: post.visualConcept,
            hashtags: post.hashtags,
            cta: post.cta,
            productFocus: post.productFocus,
            holidayTieIn: post.holidayTieIn,
          })),
        },
      },
      include: {
        posts: true,
      },
    })

    return NextResponse.json({
      success: true,
      campaign: updatedCampaign,
    })
  } catch (error) {
    console.error('Campaign generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate campaign' },
      { status: 500 }
    )
  }
}

function transformAnswersToConfig(answers: any[], campaign: any) {
  // Transform brainstorm answers into Claude API config
  const answerMap = answers.reduce((acc: Record<string, any>, answer: any) => {
    acc[answer.questionId] = answer.value
    return acc
  }, {})

  return {
    objectives: answerMap.objectives || [],
    audience: answerMap.audience || [],
    frequency: answerMap.frequency || 'conservative',
    contentMix: answerMap.contentMix || 'balanced',
    products: answerMap.products || [],
    holidays: answerMap.holidays || [],
    kpis: answerMap.kpis || [],
    startDate: campaign.startDate,
    endDate: campaign.endDate,
  }
}
