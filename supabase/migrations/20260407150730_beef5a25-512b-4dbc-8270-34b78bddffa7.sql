
-- Drop and recreate the insert policy with image_url origin validation
DROP POLICY IF EXISTS "Allow validated anonymous inserts" ON public.enquiries;

CREATE POLICY "Allow validated anonymous inserts"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (name IS NOT NULL) AND (length(name) > 0) AND (length(name) <= 200)
  AND (phone IS NOT NULL) AND (length(phone) >= 7) AND (length(phone) <= 20)
  AND ((email IS NULL) OR ((length(email) <= 255) AND (email ~~ '%@%.%'::text)))
  AND ((requirement IS NULL) OR (length(requirement) <= 2000))
  AND ((image_url IS NULL) OR (
    length(image_url) <= 1000
    AND image_url LIKE '%/storage/v1/object/enquiry-images/%'
  ))
);
