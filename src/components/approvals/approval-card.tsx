'use client'

import { useState } from 'react'
import type { EmailDraft } from '@/types/email'
import { Button } from '@/components/ui/button'
import { ScoreBadge } from '@/components/ui/score-badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Check, X, Pencil, CalendarClock, Lightbulb } from 'lucide-react'

interface ApprovalCardProps {
  draft: EmailDraft
  onApprove: () => void
  onReject: () => void
  onEdit: (subject: string, body: string) => void
}

export function ApprovalCard({ draft, onApprove, onReject, onEdit }: ApprovalCardProps) {
  const [editing, setEditing] = useState(false)
  const [subject, setSubject] = useState(draft.subject)
  const [body, setBody] = useState(draft.body)

  function handleSaveEdit() {
    onEdit(subject, body)
    setEditing(false)
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between p-4 pb-3">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-foreground">{draft.businessName}</h3>
          <p className="text-xs text-muted-foreground">
            {draft.contactName && `${draft.contactName} · `}{draft.contactEmail}
          </p>
          <p className="text-xs text-muted-foreground">{draft.campaignName}</p>
        </div>
        <div className="text-right space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground">Lead Score</span>
            <ScoreBadge score={draft.score} className="text-sm font-semibold" />
          </div>
        </div>
      </div>

      {/* Opportunity */}
      <div className="mx-4 mb-3 rounded-md bg-primary/5 border border-primary/10 p-2.5 flex items-start gap-2">
        <Lightbulb className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
        <span className="text-xs text-muted-foreground">{draft.opportunity}</span>
      </div>

      <Separator className="bg-border" />

      {/* Email Content */}
      <div className="p-4 space-y-3">
        {editing ? (
          <>
            <div className="space-y-1.5">
              <label className="text-[11px] text-muted-foreground">Subject</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="h-8 text-sm bg-[#0D0D0F] border-border"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] text-muted-foreground">Body</label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={8}
                className="text-sm bg-[#0D0D0F] border-border resize-none"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <span className="text-[11px] text-muted-foreground">Subject</span>
              <p className="text-sm font-medium text-foreground mt-0.5">{draft.subject}</p>
            </div>
            <div>
              <span className="text-[11px] text-muted-foreground">Body</span>
              <div className="mt-1 text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                {draft.body}
              </div>
            </div>
          </>
        )}
      </div>

      <Separator className="bg-border" />

      {/* Actions */}
      <div className="flex items-center justify-between p-3">
        <div>
          {editing ? (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
              <Button size="sm" onClick={handleSaveEdit}>Save Changes</Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
              <Pencil className="w-3.5 h-3.5 mr-1.5" />
              Edit
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="destructive" size="sm" onClick={onReject}>
            <X className="w-3.5 h-3.5 mr-1.5" />
            Reject
          </Button>
          <Button variant="outline" size="sm" onClick={onApprove}>
            <CalendarClock className="w-3.5 h-3.5 mr-1.5" />
            Approve & Schedule
          </Button>
          <Button size="sm" onClick={onApprove}>
            <Check className="w-3.5 h-3.5 mr-1.5" />
            Approve
          </Button>
        </div>
      </div>
    </div>
  )
}
