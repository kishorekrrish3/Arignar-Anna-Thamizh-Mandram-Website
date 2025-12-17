"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader, AnimatedCard } from "./Section";
import { BookOpen, Users, Globe, Heart } from "lucide-react";

const timelineEvents = [
  { year: "2014", title: "Foundation", description: "Arignar Anna Thamizh Mandram officially launched at VIT Chennai" },
  { year: "2017", title: "Recognition", description: "Accorded official FFCS academic status by the university" },
  { year: "2021", title: "Digital Wave", description: "Hosted Muthamizh Thiruvizha with 770+ online participants" },
  { year: "2024", title: "Innovation", description: "First AI & Tamil technical collaboration with AI Club" },
  { year: "2024", title: "Excellence", description: "Honored as 'Best Literary Club of the Year'" },
  { year: "2025", title: "Global Stage", description: "International Pongal Thiruvizha with 30+ international delegates" },
];

const values = [
  {
    icon: BookOpen,
    title: "Literature",
    description: "Preserving the rich literary heritage of Tamil through poetry, prose, and classical texts",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building bridges between students through shared cultural experiences and traditions",
  },
  {
    icon: Globe,
    title: "Heritage",
    description: "Connecting modern youth with ancient wisdom spanning over 2000 years of Tamil culture",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Igniting love for mother tongue among the next generation of leaders and thinkers",
  },
];

export function AboutSection() {
  return (
    <Section id="about" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <SectionHeader
        eyebrow="Our Story"
        title="A Decade of Cultural Excellence"
        subtitle="From a small group of passionate students to one of VIT Chennai's most vibrant cultural organizations"
      />

      <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
        <AnimatedCard>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-charcoal-light">
              <span className="font-serif text-3xl text-maroon float-left mr-3 mt-1">&ldquo;</span>
              Arignar Anna Thamizh Mandram stands as a beacon of Tamil culture at VIT Chennai.
              Named after the visionary leader C.N. Annadurai, our mandram embodies his ideals
              of linguistic pride and cultural preservation.
            </p>
            <p className="text-lg leading-relaxed text-charcoal-light">
              For ten years, we have been the custodians of Tamil heritage within our campus,
              organizing events that range from classical literature discussions to contemporary
              cultural celebrations. Our flagship event, Pongal Thiruvizha, has become a hallmark
              of campus life, bringing together thousands of students in celebration of Tamil traditions.
            </p>
            <blockquote className="border-l-4 border-gold pl-6 py-2 my-8">
              <p className="font-tamil text-xl text-maroon">
                &quot;அன்பிலார் எல்லாம் தமக்குரியர் அன்புடையார்<br />என்பும் உரியர் பிறர்க்கு.&quot;
              </p>
              <cite className="text-sm text-charcoal-light mt-2 block">— திருவள்ளுவர்</cite>
            </blockquote>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.2}>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-maroon/5 to-gold/5 rounded-3xl" />
            <div className="relative bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="font-serif text-2xl text-charcoal mb-6">Our Journey</h3>
              <div className="space-y-0">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={`${event.year}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 pb-8 last:pb-0"
                  >
                    <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-maroon" />
                    {index !== timelineEvents.length - 1 && (
                      <div className="absolute left-[5px] top-3 w-0.5 h-full bg-border" />
                    )}
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-lg font-semibold text-gold">
                        {event.year}
                      </span>
                      <span className="font-medium text-charcoal">{event.title}</span>
                    </div>
                    <p className="text-sm text-charcoal-light mt-1">{event.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, index) => (
          <AnimatedCard key={value.title} delay={index * 0.1}>
            <div className="group p-6 bg-white rounded-2xl border border-border hover:border-gold/50 hover:shadow-lg transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-maroon/10 flex items-center justify-center mb-4 group-hover:bg-maroon group-hover:text-beige transition-colors duration-300">
                <value.icon className="h-6 w-6 text-maroon group-hover:text-beige transition-colors duration-300" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-charcoal mb-2">
                {value.title}
              </h4>
              <p className="text-sm text-charcoal-light leading-relaxed">
                {value.description}
              </p>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </Section>
  );
}
