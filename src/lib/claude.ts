import Anthropic from '@anthropic-ai/sdk'

export const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
  ...(process.env.ANTHROPIC_BASE_URL && { baseURL: process.env.ANTHROPIC_BASE_URL }),
})

export async function generateCampaignDesign(
  config: {
    objectives: string[]
    audience: string[]
    frequency: string
    contentMix: string
    products: string[]
    holidays: any[]
    kpis: string[]
    startDate: Date
    endDate: Date
  }
): Promise<{ designSpec: string; posts: any[] }> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY environment variable is required')
  }

  const prompt = buildCampaignPrompt(config)

  const message = await claude.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 16000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const response = message.content[0].type === 'text'
    ? message.content[0].text
    : ''

  return parseCampaignResponse(response)
}

function buildCampaignPrompt(config: any): string {
  return `You are an expert marketing strategist. Create a comprehensive LinkedIn campaign design based on these requirements:

**Campaign Period:** ${config.startDate.toLocaleDateString()} to ${config.endDate.toLocaleDateString()}

**Objectives:**
${config.objectives.map((obj: string) => `- ${obj}`).join('\n')}

**Target Audience:**
${config.audience.map((aud: string) => `- ${aud}`).join('\n')}

**Posting Frequency:** ${config.frequency} (${getPostCount(config.frequency, config.startDate, config.endDate)} posts)

**Content Mix:** ${config.contentMix}

**Product Focus:**
${config.products.map((prod: string) => `- ${prod}`).join('\n')}

**Key Holidays:**
${config.holidays.map((h: any) => `- ${h.name} (${h.date})`).join('\n')}

**Success Metrics:**
${config.kpis.map((kpi: string) => `- ${kpi}`).join('\n')}

Generate a complete campaign design including:
1. Strategic approach and weekly themes
2. Detailed post concepts (one per scheduled day)
3. For each post: date, type, title, copy, visual concept, hashtags, CTA
4. Content pillars and storytelling framework
5. Performance tracking guidelines

Format as structured JSON with this schema:
{
  "strategy": { "approach": "", "weeklyThemes": [] },
  "posts": [
    {
      "date": "YYYY-MM-DD",
      "type": "text|image|video",
      "title": "",
      "copy": "",
      "visualConcept": "",
      "hashtags": [],
      "cta": "",
      "productFocus": "",
      "holidayTieIn": "",
      "contentDimension": ""
    }
  ],
  "contentPillars": [],
  "trackingGuidelines": ""
}`
}

function getPostCount(frequency: string, start: Date, end: Date): number {
  const weeks = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7))
  const postsPerWeek = {
    conservative: 3.5,
    moderate: 6,
    aggressive: 7,
  }[frequency] || 3.5

  return Math.floor(weeks * postsPerWeek)
}

function parseCampaignResponse(response: string): { designSpec: string; posts: any[] } {
  // Extract JSON from Claude's response
  const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) ||
                    response.match(/\{[\s\S]*\}/)

  if (!jsonMatch) {
    throw new Error('Could not parse campaign design from AI response')
  }

  const design = JSON.parse(jsonMatch[1] || jsonMatch[0])

  return {
    designSpec: response,
    posts: design.posts || [],
  }
}
