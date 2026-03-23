'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  ArrowRight, Users, HandHeart, Building2,
  Star, MapPin, Clock, Search, ChevronRight,
  Sparkles, Globe, Shield, Zap, TrendingUp, Calendar, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ReactBits Components (Removed for AI-like UI cleanup)

// ─── Data ───────────────────────────────────────────────────────────
const stats = [
  { value: 5200, suffix: '+', label: 'Volunteers Active', icon: Users, gradient: 'from-amber-400 to-orange-500' },
  { value: 340, suffix: '+', label: 'Partner NGOs', icon: Building2, gradient: 'from-emerald-400 to-teal-500' },
  { value: 18000, suffix: '+', label: 'Families Helped', icon: HandHeart, gradient: 'from-rose-400 to-pink-500' },
  { value: 96, suffix: '%', label: 'Satisfaction Rate', icon: Star, gradient: 'from-violet-400 to-purple-500' },
];

const steps = [
  {
    num: '01',
    title: 'Sign Up',
    desc: 'Create your account and tell us about your skills, interests, and availability.',
    icon: Sparkles,
    gradient: 'from-amber-400 to-yellow-500',
    bg: 'bg-amber-50',
  },
  {
    num: '02',
    title: 'Discover',
    desc: 'Browse volunteer opportunities matched to your profile and location.',
    icon: Search,
    gradient: 'from-emerald-400 to-green-500',
    bg: 'bg-emerald-50',
  },
  {
    num: '03',
    title: 'Connect',
    desc: 'Join organizations, coordinate with teams, and start making an impact.',
    icon: Globe,
    gradient: 'from-gray-400 to-black',
    bg: 'bg-sky-50',
  },
  {
    num: '04',
    title: 'Impact',
    desc: 'Track your contributions, earn badges, and see the difference you make.',
    icon: Zap,
    gradient: 'from-cyan-400 to-green-500',
    bg: 'bg-violet-50',
  },
];

const opportunities = [
  {
    title: 'Beach Cleanup Drive',
    org: 'Jamaica Ocean Alliance',
    location: 'Montego Bay',
    category: 'Environment',
    urgency: 'This Weekend',
    spots: 12,
    gradient: 'from-cyan-500 to-blue-600',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop',
  },
  {
    title: 'Youth Tutoring Program',
    org: 'Education First JA',
    location: 'Kingston',
    category: 'Education',
    urgency: 'Ongoing',
    spots: 8,
    gradient: 'from-amber-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=250&fit=crop',
  },
  {
    title: 'Community Garden Build',
    org: 'Green Jamaica',
    location: 'Port Antonio',
    category: 'Agriculture',
    urgency: 'Next Month',
    spots: 20,
    gradient: 'from-emerald-500 to-green-600',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop',
  },
  {
    title: 'Senior Care Visits',
    org: 'Heart to Heart JA',
    location: 'Ocho Rios',
    category: 'Healthcare',
    urgency: 'Weekly',
    spots: 5,
    gradient: 'from-rose-500 to-pink-600',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop',
  },
];

const testimonials = [
  {
    name: 'Keisha Brown',
    role: 'Volunteer, 2 years',
    text: 'GoHelp changed my life. I found a community that truly cares and the platform makes it effortless to give back.',
    avatarIcon: Globe,
    rating: 5,
  },
  {
    name: 'Marcus Thompson',
    role: 'NGO Director',
    text: 'We tripled our volunteer base in just 6 months. The matching algorithm is incredibly effective.',
    avatarIcon: Building2,
    rating: 5,
  },
  {
    name: 'Sarah Chen',
    role: 'First-time Volunteer',
    text: 'I was nervous to start, but the onboarding was so smooth. Now I volunteer every weekend!',
    avatarIcon: Sparkles,
    rating: 5,
  },
  {
    name: 'Devon Williams',
    role: 'Community Leader',
    text: 'Finally a platform that understands Jamaica. Local focus with world-class technology.',
    avatarIcon: MapPin,
    rating: 5,
  },
];

const orgs = [
  { name: 'Jamaica Red Cross', members: 1200, category: 'Disaster Relief', icon: Shield, gradient: 'from-red-400 to-rose-500' },
  { name: 'Green Jamaica Foundation', members: 850, category: 'Environment', icon: Zap, gradient: 'from-emerald-400 to-green-500' },
  { name: 'Youth Upliftment Project', members: 650, category: 'Education', icon: Award, gradient: 'from-amber-400 to-yellow-500' },
  { name: 'Island Care Network', members: 430, category: 'Healthcare', icon: HandHeart, gradient: 'from-teal-400 to-cyan-500' },
];

// ─── Page ───────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-white dark:bg-[#0A0A0A]">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-white dark:bg-[#050505]">
        {/* Highly Saturated Honey & Leaf Mesh Gradient */}
        <div className="absolute inset-0 opacity-100 dark:opacity-80" style={{
          background: `
            radial-gradient(circle at 10% 20%, rgba(255, 200, 0, 0.7) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(57, 255, 20, 0.45) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.4) 0%, transparent 70%),
            linear-gradient(to bottom, #FFFEFA, #F2F8EB)
          `
        }} />


        {/* Enhanced honeycomb pattern */}
        <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='30' viewBox='0 0 52 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 1L26 8.5L26 23.5L13 31L0 23.5L0 8.5L13 1ZM39 1L52 8.5L52 23.5L39 31L26 23.5L26 8.5L39 1ZM13 16L26 23.5L26 38.5L13 46L0 38.5L0 23.5L13 16ZM39 16L52 23.5L52 38.5L39 46L26 38.5L26 23.5L39 16Z' fill='%23F5C842' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '42px 24px'
        }} />

        {/* Grain/Noise layer for depth */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

        {/* Radiant radial glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-yellow-400/10 blur-[160px] rounded-full pointer-events-none mix-blend-screen overflow-visible" />

        {/* Floating subtle glows (refined) */}
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-10"
            >
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-xl shadow-sm">
                <div className="w-2 h-2 rounded-full bg-yellow-dark" />
                <span className="text-sm font-semibold text-foreground/80 tracking-wide">
                  Jamaica&apos;s #1 Volunteer Platform
                </span>
              </div>
            </motion.div>

            {/* Main heading */}
            <div className="mb-4">
              <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-black text-gray-800/80 tracking-[-0.03em] leading-[0.95] text-center">
                Make a Real Difference
              </h1>
            </div>

            {/* Gradient subheading */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-4xl sm:text-6xl lg:text-[5.5rem] font-black tracking-[-0.03em] leading-[0.95] mb-10 bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 bg-clip-text text-transparent"
            >
              in Your Community
            </motion.h2>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="max-w-2xl mx-auto mb-14"
            >
              <p className="md:text-xl text-gray-800/80 text-xl font-medium leading-relaxed">
                Connect with NGOs, find meaningful volunteer opportunities, and create lasting impact across Jamaica — all in one powerful platform.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center"
            >
              <Link href="/opportunities">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-[#0D0D0D] font-bold text-lg rounded-xl shadow-2xl shadow-amber-500/25">
                    Start Volunteering
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>

              <Link href="/request-help">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 px-8 py-4 rounded-xl border border-white/15 text-gray-900/80 font-semibold text-lg hover:bg-white/[0.06] hover:border-white/25 backdrop-blur-md transition-all duration-300 cursor-pointer"
                >
                  Request Help
                  <Shield className="w-5 h-5 text-gray-800/80" />
                </motion.div>
              </Link>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="mt-24 flex flex-wrap justify-center gap-x-16 gap-y-6"
            >
              {stats.slice(0, 3).map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-black text-gray-800/80 tabular-nums">
                    {stat.value.toLocaleString()}
                    <span className="bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">{stat.suffix}</span>
                  </div>
                  <p className="text-sm text-gray-800/80 mt-1 font-medium tracking-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white dark:from-[#0A0A0A] to-transparent z-10" />
      </section>

      {/* ═══════════════════ STATS ═══════════════════ */}
      <section className="py-16 lg:py-20 relative -mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-6 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-500 hover:-translate-y-1">
                  {/* Gradient accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-80`} />

                  <div className={`w-11 h-11 mb-4 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-1 tabular-nums">
                    {stat.value.toLocaleString()}
                    <span className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>{stat.suffix}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section className="py-20 lg:py-28 relative">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/80 dark:from-transparent dark:via-transparent dark:to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm font-semibold mb-4 tracking-wide">
                HOW IT WORKS
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-5 tracking-tight">
                Four Simple Steps
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                From sign-up to impact — your volunteering journey starts here.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`relative overflow-hidden rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-7 h-full hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-500 hover:-translate-y-1`}>
                  {/* Large faded number */}
                  <div className="absolute -top-2 -right-2 text-[5rem] font-black text-gray-100 dark:text-white/[0.04] leading-none select-none pointer-events-none">
                    {step.num}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[58%] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════ OPPORTUNITIES ═══════════════════ */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-4 tracking-wide">
                FEATURED
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                Volunteer Opportunities
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Hand-picked ways to make a difference this week.
              </p>
            </motion.div>
            <Link href="/opportunities" className="group flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold hover:gap-3 transition-all duration-300 text-sm uppercase tracking-wider">
              View All
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {opportunities.map((opp, i) => (
              <motion.div
                key={opp.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 h-full hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-500 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={opp.image}
                      alt={opp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${opp.gradient} text-white shadow-lg`}>
                        {opp.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/90 dark:bg-black/70 text-gray-800 dark:text-white backdrop-blur-sm shadow-lg">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {opp.urgency}
                      </span>
                    </div>

                    {/* Bottom gradient info */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white text-xs font-medium opacity-80">{opp.org}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{opp.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        {opp.location}
                      </span>
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <Users className="w-3.5 h-3.5" />
                        {opp.spots} spots
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-[#050505]">
        {/* Simplified background */}
        <div className="absolute inset-0 bg-white/[0.02]" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.1] text-amber-400 text-sm font-semibold mb-4 tracking-wide">
                TESTIMONIALS
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight">
                Voices of <span className="bg-gradient-to-r from-amber-300 to-emerald-300 bg-clip-text text-transparent">Change</span>
              </h2>
              <p className="text-lg text-white/40 max-w-xl mx-auto">
                Hear from the people making Jamaica a better place.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-6 h-full hover:bg-white/[0.07] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-1">
                  {/* Gradient glow on hover */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/0 group-hover:bg-amber-500/10 rounded-full blur-3xl transition-all duration-700" />

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-emerald-500/20 flex items-center justify-center text-lg ring-1 ring-white/10">
                      <t.avatarIcon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-white/30">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ ORGANIZATIONS ═══════════════════ */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 text-sm font-semibold mb-4 tracking-wide">
                PARTNERS
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                Trusted Organizations
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Join forces with Jamaica&apos;s most impactful nonprofits.
              </p>
            </motion.div>
            <Link href="/organizations" className="group flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold hover:gap-3 transition-all duration-300 text-sm uppercase tracking-wider">
              See All
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {orgs.map((org, i) => (
              <motion.div
                key={org.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-6 h-full hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-500 hover:-translate-y-1">
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${org.gradient}`} />

                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${org.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <org.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{org.name}</h3>
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${org.gradient} text-white mb-3 shadow-sm`}>
                    {org.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{org.members.toLocaleString()} members</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-[#050505]">
        {/* Simplified background */}
        <div className="absolute inset-0 bg-white/[0.02]" />

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.1] text-emerald-400 text-sm font-semibold mb-8 tracking-wide">
              JOIN THE MOVEMENT
            </span>

            <div className="mb-8">
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight">
                Ready to Change the World?
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-white/40 mb-14 max-w-2xl mx-auto leading-relaxed">
              Whether you have an hour or a lifetime to give, your contribution matters.
              Join thousands of Jamaicans building a brighter future together.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link href="/signup">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-400 to-yellow-300 text-[#0D0D0D] font-bold text-lg rounded-xl shadow-2xl shadow-amber-500/25">
                    Join GoHelp Today
                    <img src="/bee.png" alt="" className="w-10 h-auto" aria-hidden="true" />
                  </div>
                </motion.div>
              </Link>

              <Link href="/about">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 px-10 py-5 rounded-xl border border-white/15 text-white font-semibold text-lg hover:bg-white/[0.06] hover:border-white/25 backdrop-blur-md transition-all duration-300 cursor-pointer"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5 text-white/60" />
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
