"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedCard } from "./Section";
import { Calendar, Clock, MapPin, Music, Users, Utensils, Palette, Star, Sparkles, ImageIcon } from "lucide-react";
import Image from "next/image";
import { getPongalGalleryImages } from "@/lib/api/gallery";
import type { GalleryImage } from "@/lib/supabase";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const highlights = [
  { icon: Music, label: "Cultural Arts", description: "Parai & Silambam Showcase" },
  { icon: Utensils, label: "Samathuva Pongal", description: "Unified celebration" },
  { icon: Sparkles, label: "Campus Vibe", description: "Grand festive decorations" },
  { icon: Users, label: "Massive Audience", description: "5000+ attendees" },
];

const schedule = [
  { day: "Day 1", title: "January 6, 2026", activities: ["Kho Kho", "Tug of War", "Sattam Pesu"] },
  { day: "Day 2", title: "January 7, 2026", activities: ["History of Pongal - Showcase", "Silambam"] },
  { day: "Day 3", title: "January 8, 2026", activities: ["Cultural Performances", "Samathuva Pongal", "Parai", "Uriyadi", "Kanaiyazhi Release"] },
];

export function PongalSection() {
  const [pongalImages, setPongalImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <section id="pongal" className="relative overflow-hidden">
      <div className="relative min-h-screen bg-gradient-to-br from-maroon via-maroon-light to-maroon py-20 lg:py-32">
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-6">
              <Star className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold">Special 13th Anniversary Edition</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-beige mb-4">
              Pongal Thiruvizha
            </h2>
            <p className="font-tamil text-3xl md:text-4xl text-gold mb-6">
              பொங்கல் திருவிழா 2026
            </p>
            <p className="text-xl text-beige/80 max-w-2xl mx-auto">
              The grandest Tamil harvest festival celebration at VIT Chennai.
              A three-day extravaganza of culture, tradition, and community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {highlights.map((item, index) => (
              <AnimatedCard key={item.label} delay={index * 0.1}>
                <div className="p-6 rounded-2xl bg-beige/10 backdrop-blur-sm border border-beige/10 text-center hover:bg-beige/15 transition-colors">
                  <div className="h-12 w-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-beige">{item.label}</h4>
                  <p className="text-m text-beige/60">{item.description}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-stretch mb-16">
            <AnimatedCard className="lg:col-span-2">
              <div className="relative h-full">
                <div className="absolute -inset-4 bg-gold/20 blur-3xl aspect-video rounded-3xl" />
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  {isLoading ? (
                    <div className="w-full h-full bg-beige/10 flex items-center justify-center">
                      <div className="animate-pulse text-beige/60">Loading images...</div>
                    </div>
                  ) : pongalImages.length === 0 ? (
                    <div className="w-full h-full bg-gradient-to-br from-maroon/40 to-gold/20 flex flex-col items-center justify-center gap-4">
                      <ImageIcon className="h-16 w-16 text-beige/40" />
                      <p className="text-beige/60 text-center px-4">No Pongal celebration images available yet</p>
                    </div>
                  ) : (
                    <Carousel
                      className="w-full h-full"
                      plugins={[
                        Autoplay({
                          delay: 4000,
                          stopOnInteraction: false,
                        }),
                      ]}
                    >
                      <CarouselContent className="h-full">
                        {pongalImages.map((image) => (
                          <CarouselItem key={image.id} className="h-full">
                            <div className="relative w-full h-full group">
                              <div className="relative w-full h-full overflow-hidden">
                                <Image
                                  src={image.image_url}
                                  alt={image.title || "Pongal Celebration"}
                                  fill
                                  sizes="(max-width: 1024px) 100vw, 66vw"
                                  className="object-cover transition-transform duration-[8000ms] ease-out group-hover:scale-110"
                                  style={{
                                    animation: 'kenburns 8s ease-out infinite'
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-transparent to-transparent" />
                              {image.title && (
                                <div className="absolute bottom-6 left-6 right-6">
                                  <p className="text-beige font-serif text-lg md:text-xl font-semibold">
                                    {image.title}
                                  </p>
                                  {image.description && (
                                    <p className="text-beige/80 text-sm mt-1">{image.description}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-4 bg-beige/20 border-beige/30 text-beige hover:bg-beige/30 backdrop-blur-sm" />
                      <CarouselNext className="right-4 bg-beige/20 border-beige/30 text-beige hover:bg-beige/30 backdrop-blur-sm" />
                    </Carousel>
                  )}
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <div>
                <h3 className="font-serif text-3xl font-semibold text-beige mb-8">Event Schedule</h3>
                <div className="space-y-6">
                  {schedule.map((day, index) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-6 border-l-2 border-gold/30"
                    >
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-gold" />
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-gold/20 rounded-full text-gold text-sm font-medium">
                          {day.day}
                        </span>
                        <span className="font-serif text-xl text-beige">{day.title}</span>
                        {/* <span className="text-beige/60 text-sm">{day.date}</span> */}
                      </div>
                      <ul className="space-y-1">
                        {day.activities.map((activity) => (
                          <li key={activity} className="flex items-center gap-2 text-beige/70 text-m">
                            <Clock className="h-3 w-3 text-gold" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-beige/70 text-lg mb-6">Join us in celebrating our Tamil heritage!</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="px-8 py-4 bg-gold text-charcoal font-medium rounded-full hover:bg-gold-muted transition-colors"
              >
                Register Now
              </a>
              <a
                href="#gallery"
                className="px-8 py-4 bg-beige/10 text-beige font-medium rounded-full border border-beige/20 hover:bg-beige/20 transition-colors"
              >
                View Past Celebrations
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}