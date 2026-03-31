import { jsPDF } from 'jspdf'
import { Campaign, Post } from '@prisma/client'
import { format } from 'date-fns'

type CampaignWithPosts = Campaign & { posts: Post[] }

export function exportToPDF(campaign: CampaignWithPosts): ArrayBuffer {
  const doc = new jsPDF()
  let yPos = 20

  const addText = (text: string, fontSize = 12, isBold = false) => {
    if (yPos > 280) {
      doc.addPage()
      yPos = 20
    }
    doc.setFontSize(fontSize)
    doc.setFont('helvetica', isBold ? 'bold' : 'normal')
    const lines = doc.splitTextToSize(text, 170)
    doc.text(lines, 20, yPos)
    yPos += (lines.length * fontSize * 0.5) + 5
  }

  // Title
  addText(campaign.name, 24, true)
  yPos += 10

  // Campaign info
  addText(`Campaign Period: ${format(campaign.startDate, 'MMM d, yyyy')} - ${format(campaign.endDate, 'MMM d, yyyy')}`, 10)
  addText(`Post Count: ${campaign.postCount} posts`, 10)
  addText(`Status: ${campaign.status}`, 10)
  yPos += 10

  // Objectives
  addText('Campaign Objectives', 16, true)
  const objectives = campaign.objectives as any[]
  objectives.forEach(obj => addText(`• ${obj}`, 10))
  yPos += 5

  // Audience
  addText('Target Audience', 16, true)
  const audience = campaign.audience as any[]
  audience.forEach(aud => addText(`• ${aud}`, 10))
  yPos += 5

  // Products
  addText('Product Focus', 16, true)
  const products = campaign.products as any[]
  products.forEach(prod => addText(`• ${prod}`, 10))
  yPos += 10

  // Posts
  addText('Content Calendar', 18, true)
  yPos += 5

  campaign.posts.forEach((post, index) => {
    addText(`Post ${index + 1}: ${post.title}`, 14, true)
    addText(`Date: ${format(post.scheduledDate, 'EEEE, MMM d, yyyy')}`, 9)
    addText(`Type: ${post.postType} | ${post.contentDimension}`, 9)
    yPos += 3

    addText('Copy:', 10, true)
    addText(post.copy, 9)
    yPos += 3

    addText('Visual Concept:', 10, true)
    addText(post.visualConcept, 9)
    yPos += 3

    const hashtags = post.hashtags as string[]
    addText(`Hashtags: ${hashtags.join(' ')}`, 9)
    yPos += 3

    addText(`CTA: ${post.cta}`, 9)
    yPos += 10
  })

  return doc.output('arraybuffer')
}
