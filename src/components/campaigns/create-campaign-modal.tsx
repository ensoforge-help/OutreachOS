'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BUSINESS_CATEGORIES, LOCATIONS } from '@/lib/constants'

interface CreateCampaignModalProps {
  open: boolean
  onClose: () => void
}

export function CreateCampaignModal({ open, onClose }: CreateCampaignModalProps) {
  const [name, setName] = useState('')

  function handleCreate() {
    // Frontend only — just close
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-[#0D0D0F] border-border">
        <DialogHeader>
          <DialogTitle>Create Campaign</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label className="text-xs">Campaign Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Mumbai Restaurants"
              className="h-9 text-sm bg-card border-border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs">Business Category</Label>
              <Select defaultValue="Restaurant">
                <SelectTrigger className="h-9 text-sm bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BUSINESS_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Location</Label>
              <Select defaultValue="Mumbai">
                <SelectTrigger className="h-9 text-sm bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs">Radius (km)</Label>
              <Input type="number" defaultValue="25" className="h-9 text-sm bg-card border-border" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Minimum Rating</Label>
              <Input type="number" defaultValue="3.5" step="0.5" className="h-9 text-sm bg-card border-border" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs">Website Requirement</Label>
              <Select defaultValue="any">
                <SelectTrigger className="h-9 text-sm bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="required">Required</SelectItem>
                  <SelectItem value="missing-only">Missing Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Email Requirement</Label>
              <Select defaultValue="verified-only">
                <SelectTrigger className="h-9 text-sm bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="verified-only">Verified Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Lead Limit</Label>
            <Input type="number" defaultValue="100" className="h-9 text-sm bg-card border-border" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create Campaign</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
