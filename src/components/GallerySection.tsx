"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "./Section";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    alt: "Cultural Performance",
    category: "Performances",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    alt: "Traditional Dance",
    category: "Dance",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    alt: "Event Celebration",
    category: "Events",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
    alt: "Team Gathering",
    category: "Community",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    alt: "Art Exhibition",
    category: "Art",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&q=80",
    alt: "Stage Performance",
    category: "Performances",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
    alt: "Festival Lights",
    category: "Events",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    alt: "Cultural Event",
    category: "Events",
    span: "col-span-2 row-span-1",
  },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.alt}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group cursor-pointer overflow-hidden rounded-xl ${image.span}`}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-3 py-1 bg-gold/90 text-charcoal text-xs font-medium rounded-full">
                  {image.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImage !== null && (
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
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  fill
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
