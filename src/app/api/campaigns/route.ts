import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, startDate, endDate } = body

    const campaign = await prisma.campaign.create({
      data: {
        name,
        userId: session.user.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        objectives: [],
        audience: [],
        frequency: 'conservative',
        contentMix: 'balanced',
        postCount: 0,
        holidays: [],
        products: [],
        kpis: [],
        status: 'DRAFT',
      },
    })

    return NextResponse.json({ campaign })
  } catch (error) {
    console.error('Campaign creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    )
  }
}
