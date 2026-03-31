import { describe, it, expect } from 'vitest'
import { exportToMarkdown } from '@/lib/export/markdown'

const mockCampaign = {
  id: '1',
  name: 'Test Campaign',
  userId: 'user1',
  objectives: ['Lead Generation'],
  audience: ['Decision Makers'],
  frequency: 'moderate',
  contentMix: 'balanced',
  startDate: new Date('2026-04-01'),
  endDate: new Date('2026-04-30'),
  postCount: 2,
  holidays: [],
  products: ['ElevateX Series'],
  kpis: ['Engagement Rate'],
  designSpec: null,
  planDoc: null,
  status: 'DRAFT',
  createdAt: new Date(),
  updatedAt: new Date(),
  posts: [
    {
      id: 'post1',
      campaignId: '1',
      title: 'Future of Mission-Critical Communications',
      scheduledDate: new Date('2026-04-01'),
      postType: 'TEXT',
      contentDimension: 'Innovation',
      copy: 'The communication landscape is evolving.',
      visualConcept: 'Modern cityscape with comms overlay',
      hashtags: ['#MissionCritical', '#Communications'],
      cta: 'Learn more at our website',
      productFocus: 'ElevateX Series',
      holidayTieIn: null,
      impressions: null,
      engagementRate: null,
      clicks: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
} as any

describe('exportToMarkdown', () => {
  it('should generate markdown with campaign name as heading', () => {
    const md = exportToMarkdown(mockCampaign)
    expect(md).toContain('# Test Campaign')
  })

  it('should include campaign objectives', () => {
    const md = exportToMarkdown(mockCampaign)
    expect(md).toContain('## Campaign Objectives')
    expect(md).toContain('- Lead Generation')
  })

  it('should include all posts in the calendar section', () => {
    const md = exportToMarkdown(mockCampaign)
    expect(md).toContain('## Content Calendar')
    expect(md).toContain('### Post 1: Future of Mission-Critical Communications')
  })

  it('should include post copy and hashtags', () => {
    const md = exportToMarkdown(mockCampaign)
    expect(md).toContain('The communication landscape is evolving.')
    expect(md).toContain('#MissionCritical')
  })

  it('should include product focus when present', () => {
    const md = exportToMarkdown(mockCampaign)
    expect(md).toContain('ElevateX Series')
  })
})
