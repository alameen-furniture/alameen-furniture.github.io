-- Add UPDATE and DELETE protection policies on enquiry-images storage bucket
CREATE POLICY "Only admins can update enquiry images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'enquiry-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Only admins can delete enquiry images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'enquiry-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);