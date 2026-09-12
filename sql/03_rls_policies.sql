-- 03_rls_policies.sql
-- Row Level Security for OutreachOS

-- Enable RLS on all tables
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;

-- Note: Since this is an internal CRM tool, we allow all authenticated users full access.
-- If you need multitenancy or specific roles, you would update these policies using auth.uid().

CREATE POLICY "Allow all actions for authenticated users on campaigns"
ON public.campaigns FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Allow all actions for authenticated users on businesses"
ON public.businesses FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Allow all actions for authenticated users on contacts"
ON public.contacts FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Allow all actions for authenticated users on emails"
ON public.emails FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Allow all actions for authenticated users on system_logs"
ON public.system_logs FOR ALL TO authenticated
USING (true) WITH CHECK (true);
