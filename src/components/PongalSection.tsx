"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCard } from "./Section";
import { Music, Users, Utensils, Star, Sparkles, ImageIcon, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { getPongalGalleryImages } from "@/lib/api/gallery";
import type { GalleryImage } from "@/lib/supabase";

const highlights = [
  { icon: Music, label: "Cultural Arts", description: "Parai & Silambam Showcase" },
  { icon: Utensils, label: "Samathuva Pongal", description: "Unified celebration" },
  { icon: Sparkles, label: "Campus Vibe", description: "Grand festive decorations" },
  { icon: Users, label: "Massive Audience", description: "5000+ attendees" },
];

// Number of images to show in the front grid (collapsed)
// Layout: Hero (3 cols) + 2+1 + 1+1+1 + 2+1 = 8 images total
const FRONT_GRID_COUNT = 8;

// Get bento grid classes based on index for collapsed view
// Pattern: Row 1: full width hero | Row 2: 2+1 | Row 3: 1+1+1 | Row 4: 2+1
const getBentoClasses = (index: number): { colSpan: string; aspectRatio: string } => {
  switch (index) {
    case 0: // Hero - full width
      return { colSpan: 'col-span-2 md:col-span-3', aspectRatio: '21/9' };
    case 1: // Row 2 - large
      return { colSpan: 'md:col-span-2', aspectRatio: '16/9' };
    case 2: // Row 2 - small
      return { colSpan: 'col-span-1', aspectRatio: '3/4' };
    case 3: // Row 3 - equal
    case 4:
    case 5:
      return { colSpan: 'col-span-1', aspectRatio: '4/3' };
    case 6: // Row 4 - large
      return { colSpan: 'md:col-span-2', aspectRatio: '16/9' };
    case 7: // Row 4 - small
      return { colSpan: 'col-span-1', aspectRatio: '3/4' };
    default:
      return { colSpan: 'col-span-1', aspectRatio: '4/3' };
  }
};

export function PongalSection() {
  const [pongalImages, setPongalImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Fetch images from Supabase
  useEffect(() => {
    async function fetchPongalImages() {
      setIsLoading(true);
      try {
        const images = await getPongalGalleryImages();

        // Sort images to prioritize group photos as hero element
        const sortedImages = [...images].sort((a, b) => {
          const aIsGroup = (a.title?.toLowerCase().includes('group') || a.description?.toLowerCase().includes('group')) ? 1 : 0;
          const bIsGroup = (b.title?.toLowerCase().includes('group') || b.description?.toLowerCase().includes('group')) ? 1 : 0;
          return bIsGroup - aIsGroup; // Group photos first
        });

        setPongalImages(sortedImages);
      } catch (error) {
        console.error("Error fetching pongal images:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPongalImages();
  }, []);

  // Determine which images to display
  const displayImages = isExpanded ? pongalImages : pongalImages.slice(0, FRONT_GRID_COUNT);
  const hasMoreImages = pongalImages.length > FRONT_GRID_COUNT;
  const remainingCount = pongalImages.length - FRONT_GRID_COUNT;

  // Lightbox navigation
  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? pongalImages.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === pongalImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage, pongalImages.length]);

  return (
    <section id="pongal" className="relative overflow-hidden">
      <div className="relative min-h-screen bg-gradient-to-br from-maroon via-maroon-light to-maroon py-20 lg:py-32">
        {/* Background Pattern */}
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23C4A052'/%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px',
            backgroundRepeat: 'repeat'
          }}
        />

        <div className="absolute top-20 right-20 w-64 h-64 bg-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gold/10 rounded-full blur-2xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-6">
              <Star className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold">13th Anniversary Edition • January 2026</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-beige mb-4">
              Pongal Thiruvizha
            </h2>
            <p className="font-tamil text-3xl md:text-4xl text-gold mb-6">
              பொங்கல் திருவிழா 2026
            </p>
            <p className="text-xl text-beige/80 max-w-3xl mx-auto leading-relaxed">
              A celebration to remember. Three days of cultural grandeur,
              unity, and Tamil heritage came alive at VIT Chennai.
            </p>
          </motion.div>

          {/* Modern Grid Gallery */}
          <AnimatedCard className="mb-8">
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-3 rounded-3xl border-2 border-gold/20 pointer-events-none" />
              <div className="absolute -inset-6 rounded-3xl border border-gold/10 pointer-events-none" />

              {/* Glow Effect */}
              <div className="absolute -inset-8 bg-gold/15 blur-3xl rounded-3xl -z-10" />

              {/* Grid Container */}
              <div className="relative rounded-2xl overflow-hidden bg-charcoal/30 shadow-2xl p-4">
                {isLoading ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {[...Array(FRONT_GRID_COUNT)].map((_, index) => (
                      <div
                        key={index}
                        className={`relative bg-beige/10 rounded-xl animate-pulse ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                          }`}
                        style={{
                          aspectRatio: index === 0 ? '16/10' : '4/3',
                        }}
                      />
                    ))}
                  </div>
                ) : pongalImages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-96 gap-4 bg-gradient-to-br from-maroon/40 to-gold/20 rounded-xl">
                    <ImageIcon className="h-16 w-16 text-beige/40" />
                    <p className="text-beige/60 text-center px-4">Celebration memories coming soon</p>
                  </div>
                ) : (
                  <motion.div
                    layout
                    className={`grid gap-3 md:gap-4 ${isExpanded
                        ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' // Uniform grid when expanded
                        : 'grid-cols-2 md:grid-cols-3' // Bento grid when collapsed
                      }`}
                  >
                    <AnimatePresence mode="popLayout">
                      {displayImages.map((image, index) => {
                        // Get bento layout classes for collapsed view
                        const bentoClasses = !isExpanded ? getBentoClasses(index) : null;
                        // Find the actual index in the full array for lightbox
                        const fullIndex = isExpanded ? index : pongalImages.findIndex(img => img.id === image.id);

                        return (
                          <motion.div
                            key={image.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                            className={`relative group cursor-pointer overflow-hidden rounded-xl ${bentoClasses ? bentoClasses.colSpan : ''
                              }`}
                            style={{
                              aspectRatio: bentoClasses ? bentoClasses.aspectRatio : '4/3',
                            }}
                            onClick={() => setSelectedImage(fullIndex)}
                          >
                            <Image
                              src={image.image_url}
                              alt={image.title || "Pongal Celebration"}
                              fill
                              sizes={index === 0 && !isExpanded ? "100vw" : "(max-width: 768px) 50vw, 33vw"}
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              priority={index < 3}
                            />

                            {/* Shine effect on hover */}
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                            {/* Border glow on hover */}
                            <div className="absolute inset-0 rounded-xl ring-2 ring-gold/0 group-hover:ring-gold/50 transition-all duration-300" />
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>
            </div>
          </AnimatedCard>

          {/* View More / Show Less Button */}
          {hasMoreImages && !isLoading && pongalImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center mb-16"
            >
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-charcoal/50 border-2 border-gold text-gold font-semibold rounded-full hover:bg-gold hover:text-charcoal hover:shadow-lg hover:shadow-gold/25 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <span>
                  {isExpanded ? 'Show Less' : `View More`}
                  {!isExpanded && remainingCount > 0 && (
                    <span className="ml-2 opacity-70">+{remainingCount} photos</span>
                  )}
                </span>
                <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${isExpanded ? 'rotate-90' : ''}`} />
              </button>
            </motion.div>
          )}

          {/* Highlights - Memory Blocks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h3 className="font-serif text-2xl md:text-3xl text-beige/90 mb-2">Moments That Made It Special</h3>
            <div className="w-24 h-0.5 bg-gold/50 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {highlights.map((item, index) => (
              <AnimatedCard key={item.label} delay={index * 0.1}>
                <div className="p-6 rounded-2xl bg-beige/10 backdrop-blur-sm border border-beige/10 text-center hover:bg-beige/15 hover:border-gold/20 transition-all duration-300 group">
                  <div className="h-14 w-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/30 transition-colors">
                    <item.icon className="h-7 w-7 text-gold" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-beige mb-1">{item.label}</h4>
                  <p className="text-sm text-beige/60">{item.description}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* Post-Event Description + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="p-8 rounded-3xl bg-gradient-to-br from-beige/5 to-gold/5 border border-beige/10 backdrop-blur-sm mb-8">
              <p className="text-beige/80 text-lg leading-relaxed italic">
                &ldquo;From the rhythmic beats of Parai to the warmth of Samathuva Pongal,
                this year&apos;s celebration united thousands in a vibrant tribute to our Tamil heritage.
                Thank you for making Pongal Thiruvizha 2026 truly unforgettable.&rdquo;
              </p>
              <p className="text-gold text-sm mt-4 font-medium">— Arignar Anna Thamizh Mandram</p>
            </div>

            <a
              href="#gallery"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold/90 text-charcoal font-semibold rounded-full hover:bg-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:scale-105"
            >
              <Sparkles className="h-5 w-5" />
              View Past Celebrations
            </a>
          </motion.div>
        </div>
      </div>

      {/* Lightbox - Same pattern as GallerySection */}
      <AnimatePresence>
        {selectedImage !== null && pongalImages[selectedImage] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
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

            {/* Previous Button */}
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

            {/* Next Button */}
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

            {/* Image Container */}
            <motion.div
              key={pongalImages[selectedImage].id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl mx-6"
              style={{ aspectRatio: '16/10' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={pongalImages[selectedImage].image_url}
                alt={pongalImages[selectedImage].title || "Pongal Celebration"}
                fill
                sizes="100vw"
                className="object-contain"
              />

              {/* Image Info */}
              {(pongalImages[selectedImage].title || pongalImages[selectedImage].description) && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/90 to-transparent">
                  {pongalImages[selectedImage].title && (
                    <p className="text-beige font-serif font-semibold text-lg">{pongalImages[selectedImage].title}</p>
                  )}
                  {pongalImages[selectedImage].description && (
                    <p className="text-beige/70 text-sm mt-1">{pongalImages[selectedImage].description}</p>
                  )}
                </div>
              )}
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-charcoal/70 rounded-full text-beige/80 text-sm backdrop-blur-sm">
              {selectedImage + 1} / {pongalImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}