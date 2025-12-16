-- Add pongal_images column to gallery_images table
ALTER TABLE gallery_images
ADD COLUMN IF NOT EXISTS pongal_images BOOLEAN DEFAULT FALSE;

-- Optional: Add an index for better query performance
CREATE INDEX IF NOT EXISTS idx_gallery_images_pongal ON gallery_images(pongal_images) WHERE pongal_images = TRUE;

-- Example: Update existing images to mark them as pongal images
-- UPDATE gallery_images SET pongal_images = TRUE WHERE category = 'pongal';
-- Or manually set specific images:
-- UPDATE gallery_images SET pongal_images = TRUE WHERE id IN ('your-image-id-1', 'your-image-id-2');
