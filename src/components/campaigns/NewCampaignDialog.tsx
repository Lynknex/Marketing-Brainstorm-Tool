'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function NewCampaignDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    if (!name.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        }),
      })

      if (!response.ok) throw new Error('Failed to create campaign')

      const { campaign } = await response.json()
      router.push(`/campaigns/${campaign.id}/brainstorm`)
      router.refresh()
    } catch (error) {
      console.error('Error creating campaign:', error)
      alert('Failed to create campaign')
    } finally {
      setLoading(false)
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
      >
        ➕ New Campaign
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-2xl max-w-md w-full p-6 space-y-4">
        <h2 className="text-xl font-bold">Create New Campaign</h2>
        <p className="text-sm text-muted-foreground">Start a new marketing campaign with AI-powered brainstorming</p>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Campaign Name</label>
          <input
            id="name"
            type="text"
            placeholder="e.g., April 2026 LinkedIn Campaign"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:border-primary focus:outline-none"
            autoFocus
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={loading}
            className="px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreate}
            disabled={!name.trim() || loading}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
          >
            {loading ? 'Creating...' : 'Create Campaign'}
          </button>
        </div>
      </div>
    </div>
  )
}
