"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader, AnimatedCard } from "./Section";
import Image from "next/image";

const officeBearers = [
  {
    name: "Priya Shankar",
    role: "President",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    quote: "Leading with passion for Tamil culture",
  },
  {
    name: "Karthik Raja",
    role: "Vice President",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    quote: "Building bridges through heritage",
  },
  {
    name: "Ananya Devi",
    role: "Secretary",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    quote: "Organizing for excellence",
  },
  {
    name: "Surya Prakash",
    role: "Treasurer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    quote: "Managing our cultural investments",
  },
];

const coreCommittee = [
  { name: "Meera K.", role: "Events Head" },
  { name: "Arjun V.", role: "Cultural Head" },
  { name: "Lakshmi S.", role: "PR Head" },
  { name: "Vijay M.", role: "Design Head" },
  { name: "Deepa R.", role: "Media Head" },
  { name: "Ravi K.", role: "Sports Head" },
];

export function TeamSection() {
  return (
    <Section id="team">
      <SectionHeader
        eyebrow="Our People"
        title="The Team Behind the Vision"
        subtitle="Dedicated individuals who work tirelessly to preserve and promote Tamil culture at VIT Chennai"
      />

      <div className="mb-20">
        <h3 className="font-serif text-2xl text-charcoal text-center mb-12">Office Bearers</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {officeBearers.map((member, index) => (
            <AnimatedCard key={member.name} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm text-beige/80 italic">&ldquo;{member.quote}&rdquo;</p>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-serif text-xl font-semibold text-charcoal">{member.name}</h4>
                  <p className="text-sm text-maroon font-medium">{member.role}</p>
                </div>
              </motion.div>
            </AnimatedCard>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-maroon/5 via-gold/5 to-maroon/5 rounded-3xl" />
        <div className="relative bg-white p-8 lg:p-12 rounded-2xl">
          <h3 className="font-serif text-2xl text-charcoal text-center mb-8">Core Committee</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {coreCommittee.map((member, index) => (
              <AnimatedCard key={member.name} delay={index * 0.05}>
                <div className="text-center p-4 rounded-xl hover:bg-beige-dark transition-colors">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-maroon to-maroon-light flex items-center justify-center mx-auto mb-3">
                    <span className="text-beige font-serif text-xl font-semibold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="font-medium text-charcoal text-sm">{member.name}</h4>
                  <p className="text-xs text-charcoal-light">{member.role}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 text-center"
      >
        <p className="text-charcoal-light mb-4">Want to be part of our team?</p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-maroon text-beige font-medium rounded-full hover:bg-maroon-light transition-colors"
        >
          Join the Mandram
        </a>
      </motion.div>
    </Section>
  );
}
