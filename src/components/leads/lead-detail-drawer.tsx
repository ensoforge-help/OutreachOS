'use client'

import type { Business } from '@/types/business'
import type { Contact } from '@/types/contact'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { StatusBadge } from '@/components/ui/status-badge'
import { ScoreBadge } from '@/components/ui/score-badge'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  Building2,
  Globe,
  Phone,
  MapPin,
  Star,
  Smartphone,
  BookOpen,
  ShoppingCart,
  Mail,
  Shield,
  Lightbulb,
} from 'lucide-react'

interface LeadDetailDrawerProps {
  business: Business | null
  contact?: Contact
  open: boolean
  onClose: () => void
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-1.5">
      <span className="text-muted-foreground mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <span className="text-kpi-label block">{label}</span>
        <span className="text-body-small text-foreground">{value}</span>
      </div>
    </div>
  )
}

export function LeadDetailDrawer({ business, contact, open, onClose }: LeadDetailDrawerProps) {
  if (!business) return null

  const opportunity = business.leadScore >= 80
    ? {
        summary: business.hasWebsite
          ? 'Website improvements detected. Potential for digital upgrade services.'
          : 'No online presence detected. High-potential prospect for web development.',
        reason: business.hasWebsite
          ? `The business website appears to need improvements in ${[
              !business.hasOnlineOrdering && 'online ordering',
              !business.hasOnlineBooking && 'online booking',
              business.mobileExperience === 'poor' && 'mobile experience',
              !business.hasContactPage && 'contact page',
            ].filter(Boolean).join(', ')}.`
          : 'The business does not have a website, missing out on online discoverability and customer engagement.',
      }
    : {
        summary: 'Moderate opportunity. Further enrichment recommended.',
        reason: 'The lead score indicates moderate potential. Additional data collection may reveal better opportunities.',
      }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[420px] sm:w-[480px] overflow-y-auto bg-[#0D0D0F] border-border">
        <SheetHeader>
          <SheetTitle className="text-section-title">{business.name}</SheetTitle>
        </SheetHeader>

        <div className="space-y-5 mt-4">
          {/* Business Info */}
          <section>
            <h4 className="text-table-header mb-2">
              Business Information
            </h4>
            <div className="space-y-0.5">
              <DetailRow icon={<Building2 className="w-3.5 h-3.5" />} label="Category" value={business.category} />
              <DetailRow icon={<MapPin className="w-3.5 h-3.5" />} label="Address" value={`${business.address}, ${business.city}`} />
              {business.phone && <DetailRow icon={<Phone className="w-3.5 h-3.5" />} label="Phone" value={business.phone} />}
              {business.website && <DetailRow icon={<Globe className="w-3.5 h-3.5" />} label="Website" value={business.website} />}
              {business.rating && (
                <DetailRow
                  icon={<Star className="w-3.5 h-3.5" />}
                  label="Rating"
                  value={`${business.rating} ★ (${business.reviewCount} reviews)`}
                />
              )}
            </div>
          </section>

          <Separator className="bg-border" />

          {/* Website Analysis */}
          {business.hasWebsite && (
            <>
              <section>
                <h4 className="text-table-header mb-2">
                  Website Analysis
                </h4>
                <div className="space-y-0.5">
                  <DetailRow icon={<Globe className="w-3.5 h-3.5" />} label="Status" value={<StatusBadge status={business.websiteStatus || 'good'} />} />
                  <DetailRow icon={<Smartphone className="w-3.5 h-3.5" />} label="Mobile" value={<StatusBadge status={business.mobileExperience === 'good' ? 'good' : 'needs-improvement'} />} />
                  <DetailRow icon={<Mail className="w-3.5 h-3.5" />} label="Contact Page" value={business.hasContactPage ? 'Yes' : 'No'} />
                  <DetailRow icon={<BookOpen className="w-3.5 h-3.5" />} label="Online Booking" value={business.hasOnlineBooking ? 'Yes' : 'No'} />
                  <DetailRow icon={<ShoppingCart className="w-3.5 h-3.5" />} label="Online Ordering" value={business.hasOnlineOrdering ? 'Yes' : 'No'} />
                  {business.detectedTechnology && business.detectedTechnology.length > 0 && (
                    <div className="flex items-start gap-3 py-1.5">
                      <span className="text-muted-foreground mt-0.5"><Globe className="w-3.5 h-3.5" /></span>
                      <div>
                        <span className="text-kpi-label block">Technology</span>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {business.detectedTechnology.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-[10px] h-5">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
              <Separator className="bg-border" />
            </>
          )}

          {/* Contact */}
          {contact && (
            <>
              <section>
                <h4 className="text-table-header mb-2">
                  Contact
                </h4>
                <div className="space-y-0.5">
                  {contact.name && <DetailRow icon={<Building2 className="w-3.5 h-3.5" />} label="Name" value={contact.name} />}
                  <DetailRow icon={<Mail className="w-3.5 h-3.5" />} label="Email" value={contact.email} />
                  {contact.jobTitle && <DetailRow icon={<Building2 className="w-3.5 h-3.5" />} label="Title" value={contact.jobTitle} />}
                  <DetailRow icon={<Shield className="w-3.5 h-3.5" />} label="Verification" value={<StatusBadge status={contact.verificationStatus} />} />
                  <DetailRow icon={<Shield className="w-3.5 h-3.5" />} label="Confidence" value={`${contact.confidence}%`} />
                </div>
              </section>
              <Separator className="bg-border" />
            </>
          )}

          {/* Opportunity */}
          <section>
            <h4 className="text-table-header mb-2">
              Opportunity
            </h4>
            <div className="rounded-lg border border-border bg-card p-3 space-y-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                <span className="text-card-title flex items-center gap-2">
                  Lead Score: <ScoreBadge score={business.leadScore} />
                </span>
              </div>
              <p className="text-body-small text-foreground">{opportunity.summary}</p>
              <p className="text-kpi-label">{opportunity.reason}</p>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  )
}
