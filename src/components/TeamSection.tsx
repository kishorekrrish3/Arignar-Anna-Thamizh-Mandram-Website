"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader, AnimatedCard } from "./Section";
import Image from "next/image";
import { User, Calendar, ChevronDown } from "lucide-react";
import { getTeamByYear } from "@/lib/api/team";
import type { TeamMember } from "@/lib/supabase";
import { CardSkeleton } from "./ui/LoadingSkeleton";
import { EmptyState } from "./ui/EmptyState";

// Years in reverse order (latest first)
const YEARS = [2025, 2024, 2023, 2022, 2021, 2020] as const;
type Year = (typeof YEARS)[number];
const LATEST_YEAR = 2025;

export function TeamSection() {
  const [selectedYear, setSelectedYear] = useState<Year>(2025);
  const [officeBearers, setOfficeBearers] = useState<TeamMember[]>([]);
  const [coreCommittee, setCoreCommittee] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  // Check if selected year is the latest year
  const isLatestYear = selectedYear === LATEST_YEAR;

  // For non-latest years, combine office bearers and core committee
  const allMembers = [...officeBearers, ...coreCommittee];

  useEffect(() => {
    async function fetchTeamByYear() {
      setIsLoading(true);
      try {
        const { officeBearers: bearers, coreCommittee: committee } =
          await getTeamByYear(selectedYear);
        setOfficeBearers(bearers);
        setCoreCommittee(committee);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTeamByYear();
  }, [selectedYear]);

  const handleYearChange = (year: Year) => {
    setSelectedYear(year);
    setIsMobileDropdownOpen(false);
  };

  return (
    <Section id="team">
      <SectionHeader
        eyebrow="Our People"
        title="The Team Behind the Vision"
        subtitle="Dedicated individuals who work tirelessly to preserve and promote Tamil culture at VIT Chennai"
      />

      {/* Year Tab Switcher */}
      <div className="mb-12">
        {/* Desktop Tab Switcher */}
        <div className="hidden sm:flex justify-center">
          <div className="inline-flex bg-beige-dark/50 backdrop-blur-sm p-1.5 rounded-2xl gap-1 shadow-lg border border-gold/20">
            {YEARS.map((year) => (
              <motion.button
                key={year}
                onClick={() => handleYearChange(year)}
                className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${selectedYear === year
                  ? "text-beige"
                  : "text-charcoal hover:text-maroon"
                  }`}
                whileHover={{ scale: selectedYear === year ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {selectedYear === year && (
                  <motion.div
                    layoutId="activeYearTab"
                    className="absolute inset-0 bg-gradient-to-r from-maroon to-maroon-light rounded-xl shadow-lg"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {year}
                  {year === LATEST_YEAR && (
                    <span className="ml-1 px-2 py-0.5 text-xs bg-gold/20 rounded-full text-gold-dark">
                      Latest
                    </span>
                  )}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className="sm:hidden relative">
          <motion.button
            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-maroon to-maroon-light text-beige rounded-xl shadow-lg"
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-3 font-medium">
              <Calendar className="h-5 w-5" />
              Team {selectedYear}
              {selectedYear === LATEST_YEAR && (
                <span className="px-2 py-0.5 text-xs bg-gold/30 rounded-full">
                  Latest
                </span>
              )}
            </span>
            <motion.div
              animate={{ rotate: isMobileDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isMobileDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gold/20 overflow-hidden z-50"
              >
                {YEARS.map((year) => (
                  <motion.button
                    key={year}
                    onClick={() => handleYearChange(year)}
                    className={`w-full flex items-center justify-between px-5 py-4 transition-colors ${selectedYear === year
                      ? "bg-maroon/10 text-maroon"
                      : "text-charcoal hover:bg-beige-dark/50"
                      }`}
                    whileHover={{ x: selectedYear === year ? 0 : 4 }}
                  >
                    <span className="flex items-center gap-3 font-medium">
                      <Calendar className="h-4 w-4" />
                      {year}
                    </span>
                    {year === LATEST_YEAR && (
                      <span className="px-2 py-0.5 text-xs bg-gold/20 rounded-full text-gold-dark">
                        Latest
                      </span>
                    )}
                    {selectedYear === year && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="w-1.5 h-6 bg-maroon rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Team Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {isLatestYear ? (
            // ========== LATEST YEAR (2025): Show Office Bearers + Core Committee separately ==========
            <>
              {/* Office Bearers Section - Full Size Cards */}
              <div className="mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center justify-center gap-4 mb-10"
                >
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
                  <h3 className="font-serif text-2xl md:text-3xl text-charcoal text-center">
                    Office Bearers
                  </h3>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
                </motion.div>

                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <CardSkeleton key={i} />
                    ))}
                  </div>
                ) : officeBearers.length === 0 ? (
                  <EmptyState
                    icon={User}
                    title={`No Office Bearers for ${selectedYear}`}
                    description="Team information for this year will be updated soon!"
                  />
                ) : (
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {officeBearers.map((member, index) => (
                      <motion.div
                        key={member.id}
                        variants={{
                          hidden: { opacity: 0, y: 30, scale: 0.9 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                              delay: index * 0.05,
                            },
                          },
                        }}
                        className="w-full max-w-xs"
                      >
                        <AnimatedCard delay={0}>
                          <motion.div
                            whileHover={{ y: -8 }}
                            className="group relative"
                          >
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-lg">
                              {member.image_url ? (
                                <Image
                                  src={member.image_url}
                                  alt={member.name}
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                  className="object-cover transition-all duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-maroon/20 to-gold/20 flex items-center justify-center">
                                  <User className="h-24 w-24 text-maroon/40" />
                                </div>
                              )}
                            </div>
                            <div className="text-center">
                              <h4 className="font-serif text-lg md:text-xl font-semibold text-charcoal group-hover:text-maroon transition-colors">
                                {member.name}
                              </h4>
                              <p className="text-sm text-maroon font-medium mt-1">
                                {member.role}
                              </p>
                            </div>
                          </motion.div>
                        </AnimatedCard>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Core Committee Section - Grid Layout */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-maroon/5 via-gold/5 to-maroon/5 rounded-3xl" />
                <div className="relative bg-white/80 backdrop-blur-sm p-6 md:p-8 lg:p-12 rounded-2xl shadow-xl border border-gold/10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-center gap-4 mb-10"
                  >
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-maroon/50" />
                    <h3 className="font-serif text-xl md:text-2xl text-charcoal text-center">
                      Core Committee
                    </h3>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-maroon/50" />
                  </motion.div>

                  {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-64 bg-beige-dark/50 rounded-2xl animate-pulse"
                        />
                      ))}
                    </div>
                  ) : coreCommittee.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-charcoal-light text-lg">
                        Core committee members for {selectedYear} will be listed
                        soon.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                      {coreCommittee.map((member, index) => (
                        <AnimatedCard key={member.id} delay={index * 0.03} className="h-full">
                          <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="h-full flex flex-col items-center justify-center text-center p-5 md:p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-white to-beige-dark/30 hover:from-beige-dark/50 hover:to-white transition-all duration-300 shadow-sm hover:shadow-lg group"
                          >
                            <div className="h-28 w-28 md:h-36 md:w-36 lg:h-40 lg:w-40 rounded-full bg-gradient-to-br from-maroon to-maroon-light flex items-center justify-center mx-auto mb-4 overflow-hidden relative shadow-md group-hover:shadow-xl transition-shadow">
                              {member.image_url ? (
                                <Image
                                  src={member.image_url}
                                  alt={member.name}
                                  fill
                                  sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 160px"
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              ) : (
                                <span className="text-beige font-serif text-3xl md:text-4xl lg:text-5xl font-semibold">
                                  {member.name.charAt(0)}
                                </span>
                              )}
                            </div>
                            <h4 className="font-medium text-charcoal text-base md:text-lg group-hover:text-maroon transition-colors break-words text-balance">
                              {member.name}
                            </h4>
                            <p className="text-xs md:text-sm text-charcoal-light mt-1.5 break-words text-balance">
                              {member.role}
                            </p>
                          </motion.div>
                        </AnimatedCard>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            // ========== PREVIOUS YEARS (2024-2021): Combined Grid as "Core Team of {Year}" ==========
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-maroon/5 via-gold/5 to-maroon/5 rounded-3xl" />
              <div className="relative bg-white/80 backdrop-blur-sm p-6 md:p-8 lg:p-12 rounded-2xl shadow-xl border border-gold/10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center justify-center gap-4 mb-10"
                >
                  <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-gold" />
                  <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-charcoal text-center">
                    Core Team of {selectedYear}
                  </h3>
                  <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-gold" />
                </motion.div>

                {isLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-64 bg-beige-dark/50 rounded-2xl animate-pulse"
                      />
                    ))}
                  </div>
                ) : allMembers.length === 0 ? (
                  <EmptyState
                    icon={User}
                    title={`No Team Members for ${selectedYear}`}
                    description="Team information for this year will be updated soon!"
                  />
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                    {allMembers.map((member, index) => (
                      <AnimatedCard key={member.id} delay={index * 0.03} className="h-full">
                        <motion.div
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          className="h-full flex flex-col items-center justify-center text-center p-5 md:p-6 rounded-2xl cursor-pointer bg-gradient-to-br from-white to-beige-dark/30 hover:from-beige-dark/50 hover:to-white transition-all duration-300 shadow-sm hover:shadow-lg group"
                        >
                          <div className="h-28 w-28 md:h-36 md:w-36 lg:h-40 lg:w-40 rounded-full bg-gradient-to-br from-maroon to-maroon-light flex items-center justify-center mx-auto mb-4 overflow-hidden relative shadow-md group-hover:shadow-xl transition-shadow">
                            {member.image_url ? (
                              <Image
                                src={member.image_url}
                                alt={member.name}
                                fill
                                sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 160px"
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <span className="text-beige font-serif text-3xl md:text-4xl lg:text-5xl font-semibold">
                                {member.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <h4 className="font-medium text-charcoal text-base md:text-lg group-hover:text-maroon transition-colors break-words text-balance">
                            {member.name}
                          </h4>
                          <p className="text-xs md:text-sm text-charcoal-light mt-1.5 break-words text-balance">
                            {member.role}
                          </p>
                        </motion.div>
                      </AnimatedCard>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Join CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 text-center"
      >
        <p className="text-charcoal-light mb-4">Want to be part of our team?</p>
        <motion.a
          href="https://chat.whatsapp.com/HMsWJFUxLJAFAOvez1lZcD"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-maroon to-maroon-light text-beige font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Join the Mandram
        </motion.a>
      </motion.div>
    </Section>
  );
}
