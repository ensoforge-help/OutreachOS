'use client'

import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

function SettingsSection({ title, description, children }: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-section-title">{title}</h3>
        {description && <p className="text-body-small text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function SettingsField({ label, description, children }: {
  label: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-8">
      <div className="flex-1">
        <Label className="text-kpi-label font-medium">{label}</Label>
        {description && <p className="text-kpi-label text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <div className="w-[260px] shrink-0">{children}</div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-8">
      {/* Workspace */}
      <SettingsSection title="Workspace" description="General workspace settings">
        <SettingsField label="Workspace Name" description="Display name for your workspace">
          <Input defaultValue="OutreachOS" className="h-8 text-body bg-card border-border" />
        </SettingsField>
        <SettingsField label="Timezone" description="Used for scheduling and analytics">
          <Select defaultValue="asia-kolkata">
            <SelectTrigger className="h-8 text-body bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asia-kolkata">Asia/Kolkata (IST)</SelectItem>
              <SelectItem value="utc">UTC</SelectItem>
              <SelectItem value="us-eastern">US/Eastern</SelectItem>
              <SelectItem value="europe-london">Europe/London</SelectItem>
            </SelectContent>
          </Select>
        </SettingsField>
        <SettingsField label="Default Sending Schedule" description="When to send approved emails">
          <Select defaultValue="weekday-morning">
            <SelectTrigger className="h-8 text-body bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekday-morning">Weekdays, 9 AM – 12 PM</SelectItem>
              <SelectItem value="weekday-afternoon">Weekdays, 2 PM – 5 PM</SelectItem>
              <SelectItem value="anytime">Anytime</SelectItem>
            </SelectContent>
          </Select>
        </SettingsField>
      </SettingsSection>

      <Separator className="bg-border" />

      {/* AI */}
      <SettingsSection title="AI" description="AI email generation configuration">
        <SettingsField label="AI Provider" description="Provider for email generation">
          <Select defaultValue="openrouter">
            <SelectTrigger className="h-8 text-body bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openrouter">OpenRouter</SelectItem>
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="gemini">Google Gemini</SelectItem>
            </SelectContent>
          </Select>
        </SettingsField>
        <SettingsField label="Model" description="AI model for draft generation">
          <Input defaultValue="gpt-4o" className="h-8 text-body bg-card border-border" />
        </SettingsField>
        <SettingsField label="Temperature" description="Creativity level (0.0 – 1.0)">
          <Input type="number" defaultValue="0.7" step="0.1" min="0" max="1" className="h-8 text-body bg-card border-border" />
        </SettingsField>
      </SettingsSection>

      <Separator className="bg-border" />

      {/* Email */}
      <SettingsSection title="Email" description="Email sending configuration">
        <SettingsField label="Sender Name" description="Displayed in recipient's inbox">
          <Input defaultValue="OutreachOS" className="h-8 text-body bg-card border-border" />
        </SettingsField>
        <SettingsField label="Sender Email" description="From address for outreach emails">
          <Input defaultValue="hello@outreachos.com" className="h-8 text-body bg-card border-border" />
        </SettingsField>
        <SettingsField label="Daily Sending Limit" description="Maximum emails per day">
          <Input type="number" defaultValue="50" className="h-8 text-body bg-card border-border" />
        </SettingsField>
      </SettingsSection>

      <Separator className="bg-border" />

      {/* Automation */}
      <SettingsSection title="Automation" description="Automation pipeline settings">
        <SettingsField label="Default Lead Limit" description="Max leads per campaign">
          <Input type="number" defaultValue="100" className="h-8 text-body bg-card border-border" />
        </SettingsField>
        <SettingsField label="Website Analysis" description="Analyze business websites automatically">
          <Switch defaultChecked />
        </SettingsField>
        <SettingsField label="Email Verification" description="Verify discovered emails">
          <Switch defaultChecked />
        </SettingsField>
        <SettingsField label="AI Draft Generation" description="Auto-generate email drafts">
          <Switch defaultChecked />
        </SettingsField>
      </SettingsSection>

      <Separator className="bg-border" />

      {/* Safety */}
      <SettingsSection title="Safety" description="Safety controls and limits">
        <SettingsField label="Require Approval" description="Human approval before first contact">
          <Switch defaultChecked />
        </SettingsField>
        <SettingsField label="Respect Suppression List" description="Never contact suppressed businesses">
          <Switch defaultChecked />
        </SettingsField>
        <SettingsField label="Maximum Daily Sends" description="Hard limit on daily email volume">
          <Input type="number" defaultValue="100" className="h-8 text-body bg-card border-border" />
        </SettingsField>
      </SettingsSection>

      {/* Save button */}
      <div className="flex justify-end pb-8">
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}
