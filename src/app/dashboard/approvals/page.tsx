'use client'

import { useState } from 'react'
import { emailDrafts } from '@/data/dummy-emails'
import { ApprovalCard } from '@/components/approvals/approval-card'
import { EmptyState } from '@/components/ui/empty-state'
import { CheckCircle } from 'lucide-react'

export default function ApprovalsPage() {
  const [drafts, setDrafts] = useState(
    emailDrafts.filter((e) => e.status === 'pending')
  )

  function handleApprove(id: string) {
    setDrafts((prev) => prev.filter((d) => d.id !== id))
  }

  function handleReject(id: string) {
    setDrafts((prev) => prev.filter((d) => d.id !== id))
  }

  function handleEdit(id: string, subject: string, body: string) {
    setDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, subject, body } : d))
    )
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
              draft={draft}
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
