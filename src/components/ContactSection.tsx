"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeader, AnimatedCard } from "./Section";
import { Send, Users, Calendar, Mail } from "lucide-react";

const joinReasons = [
  {
    icon: Users,
    title: "Be Part of a Community",
    description: "Connect with fellow Tamil enthusiasts and build lifelong friendships",
  },
  {
    icon: Calendar,
    title: "Organize Events",
    description: "Lead and participate in cultural celebrations and literary events",
  },
  {
    icon: Mail,
    title: "Develop Skills",
    description: "Enhance your leadership, communication, and organizational abilities",
  },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          reason: formData.year || 'Not specified',
          message: formData.message || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit registration');
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", year: "", message: "" });
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <SectionHeader
        eyebrow="Get Involved"
        title="Join the Mandram"
        subtitle="Become part of our vibrant community and help us preserve and celebrate Tamil heritage"
      />

      <div className="grid lg:grid-cols-2 gap-16">
        <AnimatedCard>
          <div>
            <h3 className="font-serif text-2xl text-charcoal mb-8">Why Join Us?</h3>
            <div className="space-y-6 mb-12">
              {joinReasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="h-12 w-12 rounded-xl bg-maroon/10 flex items-center justify-center flex-shrink-0">
                    <reason.icon className="h-6 w-6 text-maroon" />
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal mb-1">{reason.title}</h4>
                    <p className="text-sm text-charcoal-light">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 bg-beige-dark rounded-2xl">
              <p className="font-serif text-lg text-charcoal mb-2">Reach Us Directly</p>
              <p className="text-charcoal-light text-sm mb-4">
                For any queries, feel free to contact us at:
              </p>
              <a
                href="mailto:thamizhmandram.forum@gmail.com"
                className="text-maroon hover:text-maroon-light transition-colors font-medium"
              >
                thamizhmandram.forum@gmail.com
              </a>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.2}>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-maroon/5 to-gold/5 rounded-3xl" />
            <div className="relative bg-white p-8 rounded-2xl shadow-sm">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal mb-2">Thank You!</h3>
                  <p className="text-charcoal-light">
                    We&apos;ve received your application. Our team will get back to you soon.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-maroon hover:text-maroon-light transition-colors font-medium"
                  >
                    Submit Another Response
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-serif text-2xl text-charcoal mb-6">Registration Form</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-beige focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-colors"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-beige focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-colors"
                          placeholder="you@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-beige focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Year of Study</label>
                      <select
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-beige focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-colors"
                      >
                        <option value="">Select year</option>
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                        <option value="pg">Post Graduate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Why do you want to join AATM?
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-beige focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-colors resize-none"
                        placeholder="Tell us about your interest in Tamil culture..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-maroon text-beige font-medium rounded-xl hover:bg-maroon-light transition-colors disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </AnimatedCard>
      </div>
    </Section>
  );
}