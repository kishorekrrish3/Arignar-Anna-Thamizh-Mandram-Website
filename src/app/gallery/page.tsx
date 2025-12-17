"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ImageIcon, ArrowLeft } from "lucide-react";
import { getGalleryImages } from "@/lib/api/gallery";
import type { GalleryImage } from "@/lib/supabase";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";

export default function GalleryPage() {
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

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImage === null) return;

            if (e.key === "ArrowLeft") {
                handlePrev();
            } else if (e.key === "ArrowRight") {
                handleNext();
            } else if (e.key === "Escape") {
                setSelectedImage(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImage]);

    return (
        <main className="min-h-screen bg-charcoal">
            {/* Background Pattern */}
            <div className="fixed inset-0 cultural-pattern opacity-5 pointer-events-none" />

            <div className="relative z-10 px-4 py-20 md:px-8 lg:px-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    {/* Back Button */}
                    <Link
                        href="/#gallery"
                        className="group inline-flex items-center gap-2 text-beige/70 hover:text-gold transition-colors mb-8"
                    >
                        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>

                    {/* Title */}
                    <div className="text-center">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-gold uppercase tracking-widest text-sm font-medium"
                        >
                            Memories
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-beige mt-3"
                        >
                            Our Gallery
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-beige/60 mt-4 max-w-2xl mx-auto"
                        >
                            Capturing moments of cultural celebration, artistic expression, and community bonding
                        </motion.p>
                    </div>
                </motion.div>

                {/* Gallery Grid */}
                {isLoading ? (
                    <LoadingSkeleton count={12} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" />
                ) : galleryImages.length === 0 ? (
                    <EmptyState
                        icon={ImageIcon}
                        title="No Gallery Images"
                        description="Check back soon for photos from our events and celebrations!"
                    />
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]"
                    >
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={image.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: Math.min(index * 0.03, 0.5) }}
                                className="relative group cursor-pointer overflow-hidden rounded-xl"
                                onClick={() => setSelectedImage(index)}
                            >
                                <Image
                                    src={image.image_url}
                                    alt={image.title || "Gallery image"}
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Image count */}
                {!isLoading && galleryImages.length > 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-center text-beige/40 mt-8"
                    >
                        Showing {galleryImages.length} {galleryImages.length === 1 ? 'image' : 'images'}
                    </motion.p>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage !== null && galleryImages[selectedImage] && (
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
                            className="absolute top-6 right-6 p-2 text-beige hover:text-gold transition-colors z-10"
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
                            className="absolute left-6 p-2 text-beige hover:text-gold transition-colors z-10"
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
                            className="absolute right-6 p-2 text-beige hover:text-gold transition-colors z-10"
                            aria-label="Next"
                        >
                            <ChevronRight className="h-8 w-8" />
                        </button>

                        {/* Image */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-video mx-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={galleryImages[selectedImage].image_url}
                                alt={galleryImages[selectedImage].title || "Gallery image"}
                                fill
                                sizes="100vw"
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Image Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-beige/60 text-sm">
                            {selectedImage + 1} / {galleryImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
