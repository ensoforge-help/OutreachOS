'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ApprovalCard } from '@/components/approvals/approval-card'
import { EmptyState } from '@/components/ui/empty-state'
import { CheckCircle } from 'lucide-react'
import type { EmailDraft } from '@/types/email'

interface ApprovalsClientViewProps {
  initialDrafts: EmailDraft[]
}

export function ApprovalsClientView({ initialDrafts }: ApprovalsClientViewProps) {
  const router = useRouter()
  const [drafts, setDrafts] = useState<EmailDraft[]>(initialDrafts)

  async function handleApprove(id: string) {
    try {
      const res = await fetch(`/api/emails/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'scheduled' })
      })
      if (!res.ok) throw new Error('Failed to approve')
      setDrafts((prev) => prev.filter((d) => d.id !== id))
      router.refresh()
    } catch (error) {
      console.error(error)
      // In a real app, show a toast notification here
    }
  }

  async function handleReject(id: string) {
    try {
      const res = await fetch(`/api/emails/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'failed' }) // or whatever terminal status applies
      })
      if (!res.ok) throw new Error('Failed to reject')
      setDrafts((prev) => prev.filter((d) => d.id !== id))
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  async function handleEdit(id: string, subject: string, body: string) {
    try {
      const res = await fetch(`/api/emails/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, body })
      })
      if (!res.ok) throw new Error('Failed to update')
      setDrafts((prev) =>
        prev.map((d) => (d.id === id ? { ...d, subject, body } : d))
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          Pending Approval — <span className="text-foreground font-medium">{drafts.length}</span>
        </span>
      </div>

      {drafts.length === 0 ? (
        <EmptyState
          icon={<CheckCircle className="w-6 h-6 text-emerald-400" />}
          title="All caught up"
          description="No pending approvals at the moment."
        />
      ) : (
        <div className="space-y-4">
          {drafts.map((draft) => (
            <ApprovalCard
              key={draft.id}
              draft={draft as any} // Using any temporarily if the DB types don't perfectly match dummy data types yet
              onApprove={() => handleApprove(draft.id)}
              onReject={() => handleReject(draft.id)}
              onEdit={(subject, body) => handleEdit(draft.id, subject, body)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
