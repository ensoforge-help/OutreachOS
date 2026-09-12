-- 04_seed.sql
-- Initial Seed Data for OutreachOS

-- Insert a Campaign
INSERT INTO public.campaigns (id, name, category, location, radius, min_rating, website_requirement, email_requirement, lead_limit, status)
VALUES 
  ('c0000000-0000-0000-0000-000000000001', 'Mumbai Restaurants Q3', 'Restaurant', 'Bandra West, Mumbai', 5, 4.0, 'any', 'verified-only', 100, 'running');

-- Insert Businesses
INSERT INTO public.businesses (id, campaign_id, name, category, address, city, phone, website, has_website, rating, review_count, website_status, mobile_experience, has_contact_page, has_online_booking, has_online_ordering, lead_score, status)
VALUES
  ('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Spice Garden Restaurant', 'Restaurant', '42 Linking Road', 'Bandra West, Mumbai', '+91 22 2640 1234', 'https://spicegarden.example.com', true, 4.3, 287, 'needs-improvement', 'poor', true, false, false, 85, 'ready'),
  ('b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'Bombay Bites Cafe', 'Cafe', '15 Carter Road', 'Bandra West, Mumbai', '+91 22 2641 5678', NULL, false, 4.7, 156, 'missing', 'unknown', false, false, false, 92, 'ready');

-- Insert Contacts
INSERT INTO public.contacts (id, business_id, name, email, job_title, source, confidence, verification_status)
VALUES
  ('cnt00000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Rahul Sharma', 'rahul@spicegarden.example.com', 'Owner', 'website', 95, 'verified'),
  ('cnt00000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 'Priya Desai', 'hello@bombaybites.in', 'Manager', 'provider', 80, 'unverified');

-- Insert Emails
INSERT INTO public.emails (id, business_id, contact_id, campaign_id, subject, body, ai_score, opportunity_summary, status)
VALUES
  ('e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'cnt00000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'A quick idea for Spice Garden Restaurant', 'Hi Rahul, I noticed your mobile experience could use some tweaks...', 92, 'Website exists but lacks mobile optimization.', 'pending');

-- Insert System Logs
INSERT INTO public.system_logs (action, type, status, message, duration)
VALUES
  ('Scraping Mumbai Restaurants Q3', 'scraping', 'success', 'Found 142 potential leads in Bandra West', '45s'),
  ('Enriching contacts for Spice Garden', 'enrichment', 'success', 'Found 1 verified email address', '2.3s');
