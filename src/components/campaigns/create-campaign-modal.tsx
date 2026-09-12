'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [category, setCategory] = useState(BUSINESS_CATEGORIES[0])
  const [location, setLocation] = useState(LOCATIONS[0])
  const [radius, setRadius] = useState('25')
  const [minRating, setMinRating] = useState('3.5')
  const [websiteRequirement, setWebsiteRequirement] = useState('any')
  const [emailRequirement, setEmailRequirement] = useState('verified-only')
  const [leadLimit, setLeadLimit] = useState('100')

  async function handleCreate() {
    if (!name) return

    setLoading(true)
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category,
          location,
          radius: parseInt(radius, 10),
          min_rating: parseFloat(minRating),
          website_requirement: websiteRequirement,
          email_requirement: emailRequirement,
          lead_limit: parseInt(leadLimit, 10)
        })
      })

      if (!res.ok) throw new Error('Failed to create')
      
      router.refresh() // Trigger a server re-fetch
      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
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
              <Select value={category} onValueChange={(val) => val && setCategory(val)}>
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
              <Select value={location} onValueChange={(val) => val && setLocation(val)}>
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
              <Input type="number" value={radius} onChange={e => setRadius(e.target.value)} className="h-9 text-sm bg-card border-border" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Minimum Rating</Label>
              <Input type="number" value={minRating} onChange={e => setMinRating(e.target.value)} step="0.5" className="h-9 text-sm bg-card border-border" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs">Website Requirement</Label>
              <Select value={websiteRequirement} onValueChange={(val) => val && setWebsiteRequirement(val)}>
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
              <Select value={emailRequirement} onValueChange={(val) => val && setEmailRequirement(val)}>
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
            <Input type="number" value={leadLimit} onChange={e => setLeadLimit(e.target.value)} className="h-9 text-sm bg-card border-border" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleCreate} disabled={loading}>{loading ? 'Creating...' : 'Create Campaign'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
