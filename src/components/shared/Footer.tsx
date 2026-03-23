'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Facebook, Twitter, Instagram, Linkedin,
  Mail, Phone, MapPin
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';

const footerLinks = {
  platform: [
    { label: 'About Us', href: '/about' },
    { label: 'How It Works', href: '/about#how-it-works' },
    { label: 'For Organizations', href: '/about#organizations' },
    { label: 'For Volunteers', href: '/about#volunteers' },
  ],
  getInvolved: [
    { label: 'Find Opportunities', href: '/opportunities' },
    { label: 'Request Help', href: '/request-help' },
    { label: 'Donate', href: '/donations' },
    { label: 'Events', href: '/events' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Glass background */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute inset-0 glass-frost" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <FadeIn className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <img
                  src="/logo.png"
                  alt="GoHelp Logo"
                  className="h-[200px] w-auto"
                />
              </Link>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
                Connecting volunteers, NGOs, and families in need across Jamaica.
                Building stronger communities through the power of giving.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full neu-convex flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#8BC34A] transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </FadeIn>

            {/* Platform Links */}
            <FadeIn delay={0.1}>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Platform
              </h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-[#8BC34A] dark:hover:text-[#C7E69E] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>

            {/* Get Involved Links */}
            <FadeIn delay={0.2}>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Get Involved
              </h3>
              <ul className="space-y-3">
                {footerLinks.getInvolved.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-[#8BC34A] dark:hover:text-[#C7E69E] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>

            {/* Support Links */}
            <FadeIn delay={0.3}>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-[#8BC34A] dark:hover:text-[#C7E69E] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="py-6 border-t border-white/20 dark:border-gray-800">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            <a href="mailto:hello@gohelp.jm" className="flex items-center gap-2 px-4 py-2 rounded-full glass-tinted hover:text-yellow-600 transition-colors duration-300">
              <Mail className="w-4 h-4" />
              hello@gohelp.jm
            </a>
            <a href="tel:+18765550100" className="flex items-center gap-2 px-4 py-2 rounded-full glass-tinted hover:text-yellow-600 transition-colors duration-300">
              <Phone className="w-4 h-4" />
              (876) 555-0100
            </a>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full glass-tinted">
              <MapPin className="w-4 h-4" />
              Kingston, Jamaica
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/20 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} GoHelp Jamaica. All rights reserved.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
            Made with <img src="/logo.png" alt="GoHelp" className="h-20 w-auto" /> for Jamaica
          </p>
        </div>
      </div>
    </footer>
  );
}
