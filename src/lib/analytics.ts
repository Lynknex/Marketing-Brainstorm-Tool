// Analytics tracking - replace with your preferred service (PostHog, Mixpanel, etc.)
export const analytics = {
  track: (event: string, properties?: Record<string, unknown>) => {
    if (typeof window === 'undefined') return
    if (process.env.NODE_ENV !== 'production') return
    console.debug('[Analytics]', event, properties)
  },

  page: (name: string) => {
    if (typeof window === 'undefined') return
    if (process.env.NODE_ENV !== 'production') return
    console.debug('[Analytics] Page:', name)
  },
}

export const trackCampaignEvent = {
  created: (campaignId: string, name: string) =>
    analytics.track('Campaign Created', { campaignId, name }),

  brainstormCompleted: (campaignId: string) =>
    analytics.track('Brainstorm Completed', { campaignId }),

  exported: (campaignId: string, format: string) =>
    analytics.track('Campaign Exported', { campaignId, format }),
}
