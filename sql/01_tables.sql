-- 01_tables.sql
-- Core Table Definitions for OutreachOS

-- 1. CAMPAIGNS
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  radius INTEGER,
  min_rating NUMERIC(3,1),
  website_requirement TEXT,
  email_requirement TEXT,
  lead_limit INTEGER,
  status campaign_status DEFAULT 'running'::campaign_status,
  schedule_time TEXT,
  
  -- Counters (could also be views/aggregates later)
  leads_count INTEGER DEFAULT 0,
  emails_found INTEGER DEFAULT 0,
  verified_emails INTEGER DEFAULT 0,
  pending_approvals INTEGER DEFAULT 0,
  sent_emails INTEGER DEFAULT 0,
  replies INTEGER DEFAULT 0,
  reply_rate NUMERIC(5,2) DEFAULT 0.00,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BUSINESSES (Leads)
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  address TEXT,
  city TEXT,
  phone TEXT,
  website TEXT,
  has_website BOOLEAN DEFAULT false,
  rating NUMERIC(3,1),
  review_count INTEGER DEFAULT 0,
  
  -- Website Analysis
  website_status website_status,
  mobile_experience experience_status,
  has_contact_page BOOLEAN DEFAULT false,
  has_online_booking BOOLEAN DEFAULT false,
  has_online_ordering BOOLEAN DEFAULT false,
  detected_technology TEXT[],
  
  -- Internal Meta
  lead_score INTEGER DEFAULT 0,
  status lead_status DEFAULT 'new'::lead_status,
  
  -- Discovery Provider Data
  provider TEXT,
  provider_id TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  business_status TEXT,
  metadata JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(provider, provider_id)
);

-- 2.1 CAMPAIGN BUSINESSES (Many-to-Many)
CREATE TABLE IF NOT EXISTS public.campaign_businesses (
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  discovered_at TIMESTAMPTZ DEFAULT NOW(),
  discovery_provider TEXT,
  PRIMARY KEY (campaign_id, business_id)
);

-- 2.2 DISCOVERY RUNS
CREATE TABLE IF NOT EXISTS public.discovery_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  status TEXT NOT NULL, -- 'running', 'completed', 'failed'
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  found_count INTEGER DEFAULT 0,
  new_count INTEGER DEFAULT 0,
  duplicate_count INTEGER DEFAULT 0,
  error_count INTEGER DEFAULT 0,
  error_message TEXT
);

-- 3. CONTACTS
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT NOT NULL,
  job_title TEXT,
  source contact_source DEFAULT 'manual'::contact_source,
  confidence INTEGER DEFAULT 0,
  verification_status verification_status DEFAULT 'unverified'::verification_status,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure unique email per business
  UNIQUE(business_id, email)
);

-- 4. EMAILS
CREATE TABLE IF NOT EXISTS public.emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  
  -- AI / Meta
  ai_score INTEGER DEFAULT 0,
  opportunity_summary TEXT,
  
  status email_status DEFAULT 'pending'::email_status,
  
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SYSTEM LOGS
CREATE TABLE IF NOT EXISTS public.system_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL,
  type TEXT NOT NULL, -- e.g., 'scraping', 'ai', 'email', 'system'
  status TEXT NOT NULL, -- e.g., 'success', 'error', 'running'
  message TEXT NOT NULL,
  duration TEXT,
  metadata JSONB,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

