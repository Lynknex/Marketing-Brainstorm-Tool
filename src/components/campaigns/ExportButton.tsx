'use client'

import { useState } from 'react'

interface ExportButtonProps {
  campaignId: string
  campaignName: string
}

export function ExportButton({ campaignId, campaignName }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (format: 'markdown' | 'pdf') => {
    setIsExporting(true)
    try {
      const url = `/api/campaigns/${campaignId}/export?format=${format}`
      window.open(url, '_blank')
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => handleExport('markdown')}
        disabled={isExporting}
        className="px-4 py-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 transition-colors text-sm font-medium"
      >
        📄 Export Markdown
      </button>
      <button
        type="button"
        onClick={() => handleExport('pdf')}
        disabled={isExporting}
        className="px-4 py-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 transition-colors text-sm font-medium"
      >
        📑 Export PDF
      </button>
    </div>
  )
}
