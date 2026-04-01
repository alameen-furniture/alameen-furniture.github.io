
-- Make the enquiry-images bucket private
UPDATE storage.buckets SET public = false WHERE id = 'enquiry-images';

-- Drop the old permissive SELECT policy on storage objects
DROP POLICY IF EXISTS "Allow public access to enquiry images" ON storage.objects;

-- Drop old permissive INSERT policy
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;

-- Create restrictive upload policy: only allow image MIME types, max path format
CREATE POLICY "Allow image uploads to enquiry-images"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'enquiry-images'
  AND (storage.extension(name) IN ('jpg', 'jpeg', 'png', 'webp', 'gif'))
);

-- Allow admins to read images via signed URLs
CREATE POLICY "Admins can view enquiry images"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'enquiry-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Allow service role (edge functions) to manage all objects in the bucket
-- (handled automatically by service_role key, no policy needed)

-- Tighten the enquiry insert RLS: add basic constraints via a trigger
CREATE OR REPLACE FUNCTION public.validate_enquiry()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF length(NEW.name) > 200 THEN
    RAISE EXCEPTION 'Name too long';
  END IF;
  IF length(NEW.phone) > 20 THEN
    RAISE EXCEPTION 'Phone too long';
  END IF;
  IF NEW.email IS NOT NULL AND length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'Email too long';
  END IF;
  IF NEW.requirement IS NOT NULL AND length(NEW.requirement) > 2000 THEN
    RAISE EXCEPTION 'Requirement too long';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_enquiry
BEFORE INSERT ON public.enquiries
FOR EACH ROW EXECUTE FUNCTION public.validate_enquiry();
