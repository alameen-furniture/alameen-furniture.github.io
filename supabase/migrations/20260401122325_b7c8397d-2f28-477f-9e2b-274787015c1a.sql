
-- Fix search path on validate_enquiry function
ALTER FUNCTION public.validate_enquiry() SET search_path = 'public';

-- Replace overly permissive INSERT policy with one that requires name and phone
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.enquiries;

CREATE POLICY "Allow validated anonymous inserts"
ON public.enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (
  name IS NOT NULL AND length(name) > 0
  AND phone IS NOT NULL AND length(phone) > 0
);
