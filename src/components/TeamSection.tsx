"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeader, AnimatedCard } from "./Section";
import Image from "next/image";
import { User, Users } from "lucide-react";
import { getOfficeBearers, getCoreCommittee } from "@/lib/api/team";
import type { TeamMember } from "@/lib/supabase";
import { CardSkeleton } from "./ui/LoadingSkeleton";
import { EmptyState } from "./ui/EmptyState";

export function TeamSection() {
  const [officeBearers, setOfficeBearers] = useState<TeamMember[]>([]);
  const [coreCommittee, setCoreCommittee] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTeamMembers() {
      setIsLoading(true);
      try {
        const [bearers, committee] = await Promise.all([
          getOfficeBearers(),
          getCoreCommittee(),
        ]);
        setOfficeBearers(bearers);
        setCoreCommittee(committee);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTeamMembers();
  }, []);

  return (
    <Section id="team">
      <SectionHeader
        eyebrow="Our People"
        title="The Team Behind the Vision"
        subtitle="Dedicated individuals who work tirelessly to preserve and promote Tamil culture at VIT Chennai"
      />

      <div className="mb-20">
        <h3 className="font-serif text-2xl text-charcoal text-center mb-12">Office Bearers</h3>
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : officeBearers.length === 0 ? (
          <EmptyState
            icon={User}
            title="No Office Bearers Listed"
            description="Team information will be updated soon!"
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {officeBearers.map((member, index) => (
              <AnimatedCard key={member.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                    {member.image_url ? (
                      <>
                        <Image
                          src={member.image_url}
                          alt={member.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {member.bio && (
                          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-sm text-beige/80 italic line-clamp-2">&ldquo;{member.bio}&rdquo;</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-maroon/20 to-gold/20 flex items-center justify-center">
                        <User className="h-24 w-24 text-maroon/40" />
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h4 className="font-serif text-xl font-semibold text-charcoal">{member.name}</h4>
                    <p className="text-sm text-maroon font-medium">{member.role}</p>
                  </div>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-maroon/5 via-gold/5 to-maroon/5 rounded-3xl" />
        <div className="relative bg-white p-8 lg:p-12 rounded-2xl">
          <h3 className="font-serif text-2xl text-charcoal text-center mb-8">Core Committee</h3>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-32 bg-beige-dark rounded-xl animate-pulse" />
              ))}
            </div>
          ) : coreCommittee.length === 0 ? (
            <p className="text-center text-charcoal-light">Core committee members will be listed soon.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {coreCommittee.map((member, index) => (
                <AnimatedCard key={member.id} delay={index * 0.05}>
                  <div className="text-center p-4 rounded-xl hover:bg-beige-dark transition-colors">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-maroon to-maroon-light flex items-center justify-center mx-auto mb-3 overflow-hidden relative">
                      {member.image_url ? (
                        <Image
                          src={member.image_url}
                          alt={member.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-beige font-serif text-2xl font-semibold">
                          {member.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <h4 className="font-medium text-charcoal text-sm">{member.name}</h4>
                    <p className="text-xs text-charcoal-light">{member.role}</p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          )}
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
