"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Youtube, Mail, MapPin } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Mail, href: "mailto:aatm@vit.ac.in", label: "Email" },
];

const quickLinks = [
  { href: "#about", label: "About Us" },
  { href: "#events", label: "Events" },
  { href: "#team", label: "Our Team" },
  { href: "#gallery", label: "Gallery" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-beige">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-full bg-gold flex items-center justify-center">
                  <span className="text-charcoal font-serif font-bold text-xl">ஆ</span>
                </div>
                <div>
                  <p className="font-serif text-xl font-semibold text-beige">
                    Arignar Anna Thamizh Mandram
                  </p>
                  <p className="text-sm text-beige/60">VIT Chennai</p>
                </div>
              </div>
              <p className="text-beige/70 leading-relaxed max-w-md mb-6">
                Celebrating 13 years of preserving and promoting Tamil language, literature,
                and culture at VIT Chennai. A journey of heritage, creativity, and community.
              </p>
              <p className="font-tamil text-gold text-lg">
                &quot;தமிழ் என்றால் சரித்திரம், தமிழ் என்றால் பெருமை&quot;
              </p>
            </div>

            <div>
              <h4 className="font-serif text-lg font-semibold mb-6 text-gold">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-beige/70 hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg font-semibold mb-6 text-gold">Connect</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                  <p className="text-beige/70 text-sm">
                    VIT Chennai Campus<br />
                    Vandalur-Kelambakkam Road<br />
                    Chennai - 600127
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="h-10 w-10 rounded-full bg-beige/10 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-beige/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-beige/50 text-sm">
              © 2016–2026 Arignar Anna Thamizh Mandram, VIT Chennai. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-beige/50 text-sm">Celebrating</span>
              <span className="px-3 py-1 bg-gold/20 rounded-full text-gold text-sm font-semibold">
                10 Years
              </span>
              <span className="text-beige/50 text-sm">of Legacy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
