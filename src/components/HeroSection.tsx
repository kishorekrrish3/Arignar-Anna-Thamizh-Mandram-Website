"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-beige">
      <div className="absolute inset-0 cultural-pattern opacity-30" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-maroon/5 rounded-full blur-3xl" />

      <div className="absolute top-20 left-10 opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border border-gold/30 rounded-full"
        />
      </div>
      <div className="absolute bottom-32 right-16 opacity-20">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border border-maroon/30 rounded-full"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maroon/10 border border-maroon/20">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-maroon">2016 — 2026</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-charcoal mb-6 leading-[1.1]"
        >
          <span className="block">10 Years of</span>
          <span className="block text-maroon">Tamil Heritage</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-tamil text-2xl sm:text-3xl md:text-4xl text-gold mb-4"
        >
          அறிஞர் அண்ணா தமிழ் மன்றம்
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-charcoal-light max-w-2xl mx-auto mb-4"
        >
          Arignar Anna Thamizh Mandram, VIT Chennai
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg text-charcoal-light/80 max-w-xl mx-auto mb-12 italic"
        >
          &ldquo;Where language becomes legacy, and culture finds its voice&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#about"
            className="group flex items-center gap-2 px-8 py-4 bg-charcoal text-beige font-medium rounded-full hover:bg-charcoal/90 transition-all duration-300"
          >
            Explore Our Journey
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#pongal"
            className="group flex items-center gap-2 px-8 py-4 bg-maroon text-beige font-medium rounded-full hover:bg-maroon-light transition-all duration-300"
          >
            <span className="font-tamil">பொங்கல் திருவிழா</span>
            <span>2026</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "10+", label: "Years" },
            { value: "50+", label: "Events" },
            { value: "1000+", label: "Members" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              className="text-center"
            >
              <p className="font-serif text-3xl md:text-4xl font-semibold text-maroon">
                {stat.value}
              </p>
              <p className="text-sm text-charcoal-light mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-charcoal-light"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-charcoal-light to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
