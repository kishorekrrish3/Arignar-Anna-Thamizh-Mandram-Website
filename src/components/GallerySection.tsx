"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "./Section";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ImageIcon, ArrowRight } from "lucide-react";
import { getGalleryImages } from "@/lib/api/gallery";
import type { GalleryImage } from "@/lib/supabase";
import { LoadingSkeleton } from "./ui/LoadingSkeleton";
import { EmptyState } from "./ui/EmptyState";

const MAX_IMAGES_DISPLAY = 8;

export function GallerySection() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    async function fetchGalleryImages() {
      setIsLoading(true);
      try {
        const data = await getGalleryImages();
        setGalleryImages(data);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGalleryImages();
  }, []);

  // Only show first 8 images on homepage
  const displayImages = galleryImages.slice(0, MAX_IMAGES_DISPLAY);
  const hasMoreImages = galleryImages.length > MAX_IMAGES_DISPLAY;

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? displayImages.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === displayImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <Section id="gallery" dark className="relative">
      <div className="absolute inset-0 cultural-pattern opacity-5" />

      <div className="relative z-10">
        <SectionHeader
          eyebrow="Memories"
          title="Our Gallery"
          subtitle="Capturing moments of cultural celebration, artistic expression, and community bonding"
          light
        />

        {isLoading ? (
          <LoadingSkeleton count={8} className="grid grid-cols-2 md:grid-cols-4 gap-4" />
        ) : galleryImages.length === 0 ? (
          <EmptyState
            icon={ImageIcon}
            title="No Gallery Images"
            description="Check back soon for photos from our events and celebrations!"
          />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
              {displayImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group cursor-pointer overflow-hidden rounded-xl"
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image.image_url}
                    alt={image.title || "Gallery image"}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>

            {/* View More Button */}
            {hasMoreImages && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex justify-center mt-10"
              >
                <Link
                  href="/gallery"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-charcoal border-2 border-gold text-gold font-semibold rounded-full hover:bg-gold hover:text-charcoal hover:shadow-lg hover:shadow-gold/25 transition-all duration-300 hover:scale-105"
                >
                  <span>View More</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </>
        )}

        <AnimatePresence>
          {selectedImage !== null && displayImages[selectedImage] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="absolute top-6 right-6 p-2 text-beige hover:text-gold transition-colors"
                aria-label="Close"
              >
                <X className="h-8 w-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-6 p-2 text-beige hover:text-gold transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-6 p-2 text-beige hover:text-gold transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-4xl aspect-video mx-6"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={displayImages[selectedImage].image_url}
                  alt={displayImages[selectedImage].title || "Gallery image"}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}