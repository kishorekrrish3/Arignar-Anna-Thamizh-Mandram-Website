"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { AnimatedCard } from "./Section";
import { Music, Users, Utensils, Star, Sparkles, ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { getPongalGalleryImages } from "@/lib/api/gallery";
import type { GalleryImage } from "@/lib/supabase";

const highlights = [
  { icon: Music, label: "Cultural Arts", description: "Parai & Silambam Showcase" },
  { icon: Utensils, label: "Samathuva Pongal", description: "Unified celebration" },
  { icon: Sparkles, label: "Campus Vibe", description: "Grand festive decorations" },
  { icon: Users, label: "Massive Audience", description: "5000+ attendees" },
];

export function PongalSection() {
  const [pongalImages, setPongalImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch images from Supabase
  useEffect(() => {
    async function fetchPongalImages() {
      setIsLoading(true);
      try {
        const images = await getPongalGalleryImages();
        setPongalImages(images);
      } catch (error) {
        console.error("Error fetching pongal images:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPongalImages();
  }, []);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (pongalImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pongalImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [pongalImages.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + pongalImages.length) % pongalImages.length);
  }, [pongalImages.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % pongalImages.length);
  }, [pongalImages.length]);

  return (
    <section id="pongal" className="relative overflow-hidden">
      <div className="relative min-h-screen bg-gradient-to-br from-maroon via-maroon-light to-maroon py-20 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="pongal-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1" fill="currentColor" className="text-gold" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#pongal-pattern)" />
            </svg>
          </div>
        </div>

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

          {/* Central Gallery Showcase */}
          <AnimatedCard className="mb-16">
            <div className="relative w-full max-w-5xl mx-auto" style={{ aspectRatio: '16/9' }}>
              {/* Decorative Frame */}
              <div className="absolute -inset-3 rounded-3xl border-2 border-gold/20 pointer-events-none" />
              <div className="absolute -inset-6 rounded-3xl border border-gold/10 pointer-events-none" />

              {/* Glow Effect */}
              <div className="absolute -inset-8 bg-gold/15 blur-3xl rounded-3xl -z-10" />

              {/* Carousel Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-charcoal/30 shadow-2xl">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-beige/10">
                    <div className="animate-pulse text-beige/60 text-lg">Loading memories...</div>
                  </div>
                ) : pongalImages.length === 0 ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-maroon/40 to-gold/20">
                    <ImageIcon className="h-16 w-16 text-beige/40" />
                    <p className="text-beige/60 text-center px-4">Celebration memories coming soon</p>
                  </div>
                ) : (
                  <>
                    {/* Images */}
                    {pongalImages.map((image, index) => (
                      <div
                        key={image.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                          }`}
                      >
                        <Image
                          src={image.image_url}
                          alt={image.title || "Pongal Celebration"}
                          fill
                          sizes="(max-width: 1024px) 100vw, 80vw"
                          className="object-cover"
                          style={{
                            animation: index === currentIndex ? 'kenburns 8s ease-out forwards' : 'none'
                          }}
                          priority={index === 0}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-transparent to-maroon/20" />

                        {/* Image Title */}
                        {image.title && (
                          <div className="absolute bottom-8 left-8 right-8">
                            <p className="text-beige font-serif text-xl md:text-2xl font-semibold drop-shadow-lg">
                              {image.title}
                            </p>
                            {image.description && (
                              <p className="text-beige/80 text-sm mt-2 drop-shadow-md">{image.description}</p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Navigation Buttons */}
                    {pongalImages.length > 1 && (
                      <>
                        <button
                          onClick={goToPrevious}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-beige/20 border border-beige/30 text-beige hover:bg-beige/30 backdrop-blur-sm transition-all hover:scale-105"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          onClick={goToNext}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-beige/20 border border-beige/30 text-beige hover:bg-beige/30 backdrop-blur-sm transition-all hover:scale-105"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                          {pongalImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-gold w-8'
                                : 'bg-beige/40 hover:bg-beige/60'
                                }`}
                              aria-label={`Go to slide ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </AnimatedCard>

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
    </section>
  );
}