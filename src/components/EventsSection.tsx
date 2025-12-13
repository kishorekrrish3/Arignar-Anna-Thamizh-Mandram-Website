"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader, AnimatedCard } from "./Section";
import { Calendar, MapPin, Users, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const upcomingEvents = [
  {
    title: "Tamil Literature Workshop",
    date: "February 2026",
    location: "Auditorium Hall",
    attendees: "200+",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
    category: "Workshop",
  },
  {
    title: "Thirukkural Recitation",
    date: "March 2026",
    location: "Open Air Theatre",
    attendees: "500+",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    category: "Competition",
  },
  {
    title: "Tamil Film Festival",
    date: "April 2026",
    location: "Mega Hall",
    attendees: "1000+",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    category: "Festival",
  },
];

const pastEvents = [
  {
    title: "Pongal Thiruvizha 2025",
    year: "2025",
    highlight: "Record 5000+ attendees",
  },
  {
    title: "Tamil New Year Celebration",
    year: "2024",
    highlight: "Traditional music & dance",
  },
  {
    title: "Bharathiyar Birth Anniversary",
    year: "2024",
    highlight: "Poetry recitation event",
  },
  {
    title: "Classical Tamil Symposium",
    year: "2023",
    highlight: "Distinguished guests & scholars",
  },
];

export function EventsSection() {
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

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {upcomingEvents.map((event, index) => (
            <AnimatedCard key={event.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative bg-beige-dark rounded-2xl overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-charcoal text-xs font-medium rounded-full">
                    {event.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-charcoal mb-4 group-hover:text-maroon transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-sm text-charcoal-light">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gold" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gold" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gold" />
                      <span>{event.attendees} expected</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatedCard>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedCard>
            <div>
              <h3 className="font-serif text-3xl font-semibold text-beige mb-6">
                Past Highlights
              </h3>
              <div className="space-y-4">
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={event.title}
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
                      <p className="text-sm text-beige/60">{event.highlight}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gold font-serif">{event.year}</span>
                      <ArrowUpRight className="h-4 w-4 text-beige/40 group-hover:text-gold transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
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
