-- 00_enums.sql
-- Define all ENUM types used in the OutreachOS database

-- Website Status
CREATE TYPE website_status AS ENUM ('good', 'needs-improvement', 'missing');

-- Lead Status
CREATE TYPE lead_status AS ENUM ('new', 'enriched', 'ready', 'contacted', 'replied', 'suppressed');

-- Campaign Status
CREATE TYPE campaign_status AS ENUM ('running', 'paused', 'scheduled', 'completed');

-- Contact Source
CREATE TYPE contact_source AS ENUM ('website', 'provider', 'manual');

-- Verification Status
CREATE TYPE verification_status AS ENUM ('verified', 'unverified', 'invalid');

-- Email Status
CREATE TYPE email_status AS ENUM ('pending', 'approved', 'rejected', 'scheduled', 'sent', 'delivered', 'opened', 'replied', 'bounced');

-- General Status (for website experience, etc.)
CREATE TYPE experience_status AS ENUM ('good', 'poor', 'unknown');
