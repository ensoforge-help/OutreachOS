-- 02_triggers.sql
-- Trigger functions for OutreachOS

-- Reusable function to update the updated_at column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach triggers to all tables with updated_at

CREATE TRIGGER set_campaigns_updated_at
BEFORE UPDATE ON public.campaigns
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER set_businesses_updated_at
BEFORE UPDATE ON public.businesses
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER set_contacts_updated_at
BEFORE UPDATE ON public.contacts
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER set_emails_updated_at
BEFORE UPDATE ON public.emails
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Function to increment campaign leads_count
CREATE OR REPLACE FUNCTION increment_campaign_leads_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.campaigns
    SET leads_count = leads_count + 1,
        updated_at = NOW()
    WHERE id = NEW.campaign_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to increment leads_count when a business is linked to a campaign
CREATE TRIGGER trigger_increment_campaign_leads
AFTER INSERT ON public.campaign_businesses
FOR EACH ROW
EXECUTE FUNCTION increment_campaign_leads_count();
