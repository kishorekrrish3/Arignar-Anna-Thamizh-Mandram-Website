"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeader, AnimatedCard } from "./Section";
import Image from "next/image";
import { BookOpen, ExternalLink, FileText } from "lucide-react";
import { getKanaiyazhiEditions } from "@/lib/api/kanaiyazhi";
import type { KanaiyazhiEdition } from "@/lib/supabase";
import { CardSkeleton } from "./ui/LoadingSkeleton";
import { EmptyState } from "./ui/EmptyState";

export function KanaiyazhiSection() {
    const [editions, setEditions] = useState<KanaiyazhiEdition[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchEditions() {
            setIsLoading(true);
            try {
                const data = await getKanaiyazhiEditions();
                setEditions(data);
            } catch (error) {
                console.error("Error fetching Kanaiyazhi editions:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchEditions();
    }, []);

    const handleViewPdf = (pdfUrl: string) => {
        window.open(pdfUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <Section id="kanaiyazhi" className="relative bg-gradient-to-b from-beige to-beige-dark">
            <div className="absolute inset-0 cultural-pattern opacity-20" />

            <div className="relative z-10">
                <SectionHeader
                    eyebrow="Our Magazine"
                    title="Kanaiyazhi"
                    subtitle="A student-crafted literary magazine showcasing Tamil literature, writings, arts, and poetry from our talented community"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="font-tamil text-2xl text-gold">கணையாழி</p>
                    <p className="text-charcoal-light mt-2">The Arrow of Expression</p>
                </motion.div>

                {isLoading ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <CardSkeleton key={i} />
                        ))}
                    </div>
                ) : editions.length === 0 ? (
                    <EmptyState
                        icon={BookOpen}
                        title="No Editions Available"
                        description="Stay tuned for upcoming editions of Kanaiyazhi!"
                    />
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {editions.map((edition, index) => (
                            <AnimatedCard key={edition.id} delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="group relative bg-white rounded-2xl overflow-hidden border border-border hover:border-gold/50 hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Cover Image */}
                                    <div className="relative aspect-[3/4] overflow-hidden">
                                        <Image
                                            src={edition.cover_image_url}
                                            alt={`${edition.title} Cover`}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Edition Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-gold text-charcoal text-sm font-medium rounded-full shadow-lg">
                                                Edition #{edition.edition_number}
                                            </span>
                                        </div>

                                        {/* Featured Badge */}
                                        {edition.is_featured && (
                                            <div className="absolute top-4 right-4">
                                                <span className="px-3 py-1 bg-maroon text-beige text-xs font-medium rounded-full">
                                                    Latest
                                                </span>
                                            </div>
                                        )}

                                        {/* Hover Overlay with View Button */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button
                                                onClick={() => handleViewPdf(edition.pdf_url)}
                                                className="flex items-center gap-2 px-6 py-3 bg-gold text-charcoal font-medium rounded-full hover:bg-gold-muted transition-colors shadow-lg"
                                            >
                                                <FileText className="h-5 w-5" />
                                                View Magazine
                                                <ExternalLink className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="font-serif text-xl font-semibold text-charcoal mb-1 group-hover:text-maroon transition-colors">
                                            {edition.title}
                                        </h3>
                                        {edition.subtitle && (
                                            <p className="text-sm text-charcoal-light mb-2">{edition.subtitle}</p>
                                        )}
                                        <div className="flex items-center gap-2 text-sm text-charcoal-light">
                                            <BookOpen className="h-4 w-4 text-gold" />
                                            <span>
                                                {edition.month ? `${edition.month} ` : ""}{edition.year}
                                                {edition.page_count && ` • ${edition.page_count} pages`}
                                            </span>
                                        </div>
                                        {edition.description && (
                                            <p className="text-sm text-charcoal-light mt-3 line-clamp-2">
                                                {edition.description}
                                            </p>
                                        )}

                                        {/* View Button (Mobile) */}
                                        <button
                                            onClick={() => handleViewPdf(edition.pdf_url)}
                                            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-maroon text-beige font-medium rounded-lg hover:bg-maroon-light transition-colors lg:hidden"
                                        >
                                            <FileText className="h-4 w-4" />
                                            Read Now
                                            <ExternalLink className="h-4 w-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatedCard>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-charcoal-light mb-4">
                        Interested in contributing to our next edition?
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-maroon text-beige font-medium rounded-full hover:bg-maroon-light transition-colors"
                    >
                        Submit Your Work
                    </a>
                </motion.div>
            </div>
        </Section>
    );
}
