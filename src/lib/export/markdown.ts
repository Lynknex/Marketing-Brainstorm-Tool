import { Campaign, Post } from '@prisma/client'
import { format } from 'date-fns'

type CampaignWithPosts = Campaign & { posts: Post[] }

export function exportToMarkdown(campaign: CampaignWithPosts): string {
  const md: string[] = []

  // Header
  md.push(`# ${campaign.name}`)
  md.push('')
  md.push(`**Campaign Period:** ${format(campaign.startDate, 'MMM d, yyyy')} - ${format(campaign.endDate, 'MMM d, yyyy')}`)
  md.push(`**Post Count:** ${campaign.postCount} posts`)
  md.push(`**Status:** ${campaign.status}`)
  md.push('')
  md.push('---')
  md.push('')

  // Objectives
  md.push('## Campaign Objectives')
  md.push('')
  const objectives = campaign.objectives as any[]
  objectives.forEach(obj => md.push(`- ${obj}`))
  md.push('')

  // Audience
  md.push('## Target Audience')
  md.push('')
  const audience = campaign.audience as any[]
  audience.forEach(aud => md.push(`- ${aud}`))
  md.push('')

  // Products
  md.push('## Product Focus')
  md.push('')
  const products = campaign.products as any[]
  products.forEach(prod => md.push(`- ${prod}`))
  md.push('')

  // KPIs
  md.push('## Success Metrics')
  md.push('')
  const kpis = campaign.kpis as any[]
  kpis.forEach(kpi => md.push(`- ${kpi}`))
  md.push('')
  md.push('---')
  md.push('')

  // Posts
  md.push('## Content Calendar')
  md.push('')

  campaign.posts.forEach((post, index) => {
    md.push(`### Post ${index + 1}: ${post.title}`)
    md.push('')
    md.push(`**Date:** ${format(post.scheduledDate, 'EEEE, MMMM d, yyyy')}`)
    md.push(`**Type:** ${post.postType}`)
    md.push(`**Content Dimension:** ${post.contentDimension}`)
    if (post.productFocus) {
      md.push(`**Product Focus:** ${post.productFocus}`)
    }
    if (post.holidayTieIn) {
      md.push(`**Holiday Tie-In:** ${post.holidayTieIn}`)
    }
    md.push('')
    md.push('**Copy:**')
    md.push('')
    md.push(post.copy)
    md.push('')
    md.push('**Visual Concept:**')
    md.push('')
    md.push(post.visualConcept)
    md.push('')
    md.push('**Hashtags:**')
    md.push('')
    const hashtags = post.hashtags as string[]
    md.push(hashtags.join(' '))
    md.push('')
    md.push('**Call to Action:**')
    md.push('')
    md.push(post.cta)
    md.push('')
    md.push('---')
    md.push('')
  })

  // Design spec
  if (campaign.designSpec) {
    md.push('## Full Design Specification')
    md.push('')
    md.push(campaign.designSpec)
    md.push('')
  }

  return md.join('\n')
}
