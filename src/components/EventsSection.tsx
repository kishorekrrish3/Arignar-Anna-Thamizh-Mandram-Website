"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeader, AnimatedCard } from "./Section";
import { Calendar, MapPin, Users, ArrowUpRight, CalendarX } from "lucide-react";
import Image from "next/image";
import { getUpcomingEvents, getPastEvents } from "@/lib/api/events";
import type { Event } from "@/lib/supabase";
import { LoadingSkeleton } from "./ui/LoadingSkeleton";
import { EmptyState } from "./ui/EmptyState";

export function EventsSection() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      try {
        const [upcoming, past] = await Promise.all([
          getUpcomingEvents(),
          getPastEvents(4),
        ]);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);
  return (
    <Section id="events" dark className="relative">
      <div className="absolute inset-0 cultural-pattern opacity-10" />

      <div className="relative z-10">
        <SectionHeader
          eyebrow="What We Do"
          title="Events & Celebrations"
          subtitle="From intimate literary gatherings to grand cultural festivals, we create experiences that resonate with Tamil heritage"
          light
        />

        {isLoading ? (
          <LoadingSkeleton count={3} className="grid lg:grid-cols-3 gap-8 mb-20" />
        ) : upcomingEvents.length === 0 ? (
          <div className="mb-20">
            <EmptyState
              icon={CalendarX}
              title="No Upcoming Events"
              description="Check back soon for exciting Tamil cultural events and celebrations!"
            />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {upcomingEvents.slice(0, 3).map((event, index) => (
              <AnimatedCard key={event.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative bg-beige-dark rounded-2xl overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    {event.image_url ? (
                      <Image
                        src={event.image_url}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-maroon/20 to-gold/20 flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-maroon/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                    {event.category && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-charcoal text-xs font-medium rounded-full">
                        {event.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-charcoal mb-4 group-hover:text-maroon transition-colors">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="text-sm text-charcoal-light mb-4 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    <div className="space-y-2 text-sm text-charcoal-light">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gold" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                          day: 'numeric'
                        })}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gold" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedCard>
            <div>
              <h3 className="font-serif text-3xl font-semibold text-beige mb-6">
                Past Highlights
              </h3>
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-16 bg-beige/5 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : pastEvents.length === 0 ? (
                <p className="text-beige/60">No past events to display yet.</p>
              ) : (
                <div className="space-y-4">
                  {pastEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group flex items-center justify-between p-4 rounded-xl bg-beige/5 hover:bg-beige/10 border border-beige/10 transition-colors cursor-pointer"
                    >
                      <div>
                        <p className="font-medium text-beige group-hover:text-gold transition-colors">
                          {event.title}
                        </p>
                        {event.description && (
                          <p className="text-sm text-beige/60 line-clamp-1">{event.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gold font-serif">
                          {new Date(event.date).getFullYear()}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-beige/40 group-hover:text-gold transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 to-maroon/20 rounded-3xl blur-xl" />
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-maroon to-maroon-light text-beige text-center">
                <p className="text-sm uppercase tracking-widest text-gold mb-4">Flagship Event</p>
                <h3 className="font-serif text-4xl font-bold mb-2">Pongal Thiruvizha</h3>
                <p className="font-tamil text-2xl text-gold mb-6">பொங்கல் திருவிழா</p>
                <p className="text-beige/80 mb-8 max-w-sm mx-auto">
                  The grandest Tamil cultural celebration at VIT Chennai. Join us for three days of
                  traditional festivities, performances, and community bonding.
                </p>
                <a
                  href="#pongal"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-charcoal font-medium rounded-full hover:bg-gold-muted transition-colors"
                >
                  Learn More
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </Section>
  );
}