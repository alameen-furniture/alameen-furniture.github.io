
-- Add image_url column to enquiries
ALTER TABLE public.enquiries ADD COLUMN image_url text;

-- Create storage bucket for enquiry images
INSERT INTO storage.buckets (id, name, public) VALUES ('enquiry-images', 'enquiry-images', true);

-- Allow anyone to upload to enquiry-images bucket
CREATE POLICY "Allow public uploads" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'enquiry-images');

-- Allow public reads
CREATE POLICY "Allow public reads" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'enquiry-images');
