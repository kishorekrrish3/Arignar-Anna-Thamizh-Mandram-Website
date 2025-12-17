"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Section, SectionHeader } from "./Section";
import { Trophy, Award, Star, Users, Calendar, Mic } from "lucide-react";
import { getAchievements } from "@/lib/api/achievements";
import type { Achievement } from "@/lib/supabase";
import { CardSkeleton } from "./ui/LoadingSkeleton";
import { EmptyState } from "./ui/EmptyState";

const stats = [
  { value: 13, suffix: "+", label: "Years of Legacy", icon: Calendar },
  { value: 300, suffix: "+", label: "Events Organized", icon: Star },
  { value: 8000, suffix: "+", label: "Lives Touched", icon: Users },
  { value: 5, suffix: "+", label: "Awards Won", icon: Trophy },
];

// Icon mapping for achievements
const iconMap: Record<string, typeof Trophy> = {
  trophy: Trophy,
  award: Award,
  star: Star,
  mic: Mic,
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const statCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 12,
    },
  },
};

const timelineItemVariants = {
  hidden: (isLeft: boolean) => ({
    opacity: 0,
    x: isLeft ? -50 : 50,
    scale: 0.95,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
      duration: 0.8,
    },
  },
};

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    async function fetchAchievements() {
      setIsLoading(true);
      try {
        const data = await getAchievements();
        setAchievements(data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAchievements();
  }, []);

  // Get icon component from category or default to Trophy
  const getIcon = (category: string | null) => {
    if (!category) return Trophy;
    const key = category.toLowerCase();
    return iconMap[key] || Trophy;
  };

  return (
    <Section id="achievements">
      <SectionHeader
        eyebrow="Our Legacy"
        title="A Decade of Achievements"
        subtitle="Celebrating milestones that mark our journey of cultural excellence"
      />

      {/* Stats Grid with Staggered Animation */}
      <motion.div
        ref={statsRef}
        variants={containerVariants}
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={statCardVariants}
            whileHover={{
              scale: 1.05,
              y: -8,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-maroon/10 to-gold/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              className="relative p-8 text-center bg-white rounded-2xl border border-border group-hover:border-gold/30 group-hover:shadow-xl transition-all duration-300"
              whileHover={{ boxShadow: "0 20px 40px -15px rgba(196, 160, 82, 0.3)" }}
            >
              <motion.div
                className="h-14 w-14 rounded-full bg-maroon/10 flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="h-7 w-7 text-maroon" />
              </motion.div>
              <p className="font-serif text-4xl md:text-5xl font-bold text-maroon mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-charcoal-light">{stat.label}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Timeline Section */}
      <div className="relative">
        {/* Animated Timeline Line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent hidden lg:block origin-top"
        />

        {isLoading ? (
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="lg:w-1/2">
                <CardSkeleton />
              </div>
            ))}
          </div>
        ) : achievements.length === 0 ? (
          <EmptyState
            icon={Trophy}
            title="No Achievements Yet"
            description="Stay tuned for our upcoming accomplishments and awards!"
          />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8 lg:space-y-0"
          >
            {achievements.map((achievement, index) => {
              const IconComponent = getIcon(achievement.category);
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={achievement.id}
                  custom={isLeft}
                  variants={timelineItemVariants}
                  className={`relative lg:w-1/2 ${isLeft ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:ml-auto"}`}
                >
                  {/* Timeline Dot with Pulse Animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="hidden lg:block absolute top-6 w-4 h-4 rounded-full bg-gold border-4 border-beige"
                    style={{ [isLeft ? "right" : "left"]: "-8px" }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      className="absolute inset-0 rounded-full bg-gold/50"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      y: -4,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    className="p-6 bg-white rounded-2xl border border-border hover:border-gold/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className={`flex items-center gap-4 mb-4 ${isLeft ? "lg:flex-row-reverse" : ""}`}>
                      <motion.div
                        whileHover={{ rotate: 12 }}
                        className="h-12 w-12 rounded-xl bg-maroon flex items-center justify-center flex-shrink-0"
                      >
                        <IconComponent className="h-6 w-6 text-beige" />
                      </motion.div>
                      <div className={isLeft ? "lg:text-right" : ""}>
                        <span className="text-gold font-serif text-lg font-semibold">{achievement.year}</span>
                        <h4 className="font-serif text-xl font-semibold text-charcoal">{achievement.title}</h4>
                      </div>
                    </div>
                    {achievement.description && (
                      <p className="text-charcoal-light">{achievement.description}</p>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Bottom Quote Section */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 15,
          duration: 0.8
        }}
        whileHover={{ scale: 1.02 }}
        className="mt-20 p-8 lg:p-12 bg-gradient-to-r from-maroon to-maroon-light rounded-3xl text-center text-beige overflow-hidden relative"
      >
        {/* Subtle animated background pattern */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='none' stroke='%23fff' stroke-width='0.5'/%3E%3C/svg%3E\")",
            backgroundSize: "60px 60px",
          }}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-tamil text-2xl mb-4 relative z-10"
        >
          &quot;தமிழின் சிறப்பை உலகிற்கு எடுத்துச் செல்வோம்&quot;
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-beige/80 text-lg max-w-2xl mx-auto relative z-10"
        >
          Our journey is not just about awards and recognition. It&apos;s about the countless
          moments of cultural exchange, the friendships forged, and the pride in our heritage
          that we carry forward.
        </motion.p>
      </motion.div>
    </Section>
  );
}

