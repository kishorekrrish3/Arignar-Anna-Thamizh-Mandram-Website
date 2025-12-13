"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Section, SectionHeader, AnimatedCard } from "./Section";
import { Trophy, Award, Star, Users, Calendar, Mic } from "lucide-react";

const stats = [
  { value: 10, suffix: "+", label: "Years of Legacy", icon: Calendar },
  { value: 50, suffix: "+", label: "Events Organized", icon: Star },
  { value: 5000, suffix: "+", label: "Lives Touched", icon: Users },
  { value: 25, suffix: "+", label: "Awards Won", icon: Trophy },
];

const milestones = [
  {
    year: "2017",
    title: "Best Cultural Club Award",
    description: "Recognized as the best cultural organization at VIT Chennai",
    icon: Trophy,
  },
  {
    year: "2019",
    title: "University Excellence Award",
    description: "Awarded for outstanding contribution to campus culture",
    icon: Award,
  },
  {
    year: "2022",
    title: "Digital Innovation Award",
    description: "Recognized for successful virtual cultural events during pandemic",
    icon: Star,
  },
  {
    year: "2024",
    title: "Inter-University Champions",
    description: "Won the state-level Tamil literary competition",
    icon: Mic,
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function AchievementsSection() {
  return (
    <Section id="achievements">
      <SectionHeader
        eyebrow="Our Legacy"
        title="A Decade of Achievements"
        subtitle="Celebrating milestones that mark our journey of cultural excellence"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {stats.map((stat, index) => (
          <AnimatedCard key={stat.label} delay={index * 0.1}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-maroon/10 to-gold/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-8 text-center">
                <div className="h-14 w-14 rounded-full bg-maroon/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-7 w-7 text-maroon" />
                </div>
                <p className="font-serif text-4xl md:text-5xl font-bold text-maroon mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-charcoal-light">{stat.label}</p>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent hidden lg:block" />

        <div className="space-y-8 lg:space-y-0">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative lg:w-1/2 ${index % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:ml-auto"}`}
            >
              <div className="hidden lg:block absolute top-6 w-4 h-4 rounded-full bg-gold border-4 border-beige" 
                style={{ [index % 2 === 0 ? "right" : "left"]: "-8px" }} />
              
              <div className="p-6 bg-white rounded-2xl border border-border hover:border-gold/50 hover:shadow-lg transition-all duration-300">
                <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                  <div className="h-12 w-12 rounded-xl bg-maroon flex items-center justify-center flex-shrink-0">
                    <milestone.icon className="h-6 w-6 text-beige" />
                  </div>
                  <div className={index % 2 === 0 ? "lg:text-right" : ""}>
                    <span className="text-gold font-serif text-lg font-semibold">{milestone.year}</span>
                    <h4 className="font-serif text-xl font-semibold text-charcoal">{milestone.title}</h4>
                  </div>
                </div>
                <p className="text-charcoal-light">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 p-8 lg:p-12 bg-gradient-to-r from-maroon to-maroon-light rounded-3xl text-center text-beige"
      >
        <p className="font-tamil text-2xl mb-4">
          &quot;தமிழின் சிறப்பை உலகிற்கு எடுத்துச் செல்வோம்&quot;
        </p>
        <p className="text-beige/80 text-lg max-w-2xl mx-auto">
          Our journey is not just about awards and recognition. It&apos;s about the countless 
          moments of cultural exchange, the friendships forged, and the pride in our heritage 
          that we carry forward.
        </p>
      </motion.div>
    </Section>
  );
}
