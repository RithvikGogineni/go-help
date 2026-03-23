'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart, Target, Users, Shield, Lightbulb, Globe,
  Award, TrendingUp, HandHeart, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

const values = [
  {
    icon: Heart,
    title: 'Community First',
    description: 'We believe in the power of community. Every action, no matter how small, contributes to the greater good of Jamaica.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Transparency',
    description: 'We ensure all organizations are verified and all donations and volunteer hours are tracked with complete transparency.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Lightbulb,
    title: 'Empowerment',
    description: 'We empower individuals to take action and create change. Everyone has something valuable to contribute.',
    color: 'from-orange-500 to-orange-500',
  },
  {
    icon: Target,
    title: 'Impact Driven',
    description: 'We focus on measurable outcomes. Every volunteer hour and donation creates real, tangible impact.',
    color: 'from-blue-500 to-indigo-500',
  },
];

const team = [
  {
    name: 'Bhagavathi Katamaraju Ediga',
    role: 'Founder & CEO',
    bio: 'huh? I\'m an student',
    avatar: 'https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE=',
  },
  {
    name: 'Rithvik Gogineni',
    role: 'Founder & CEO',
    bio: 'huh? I\'m an student',
    avatar: 'https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE=',
  },
  {
    name: 'Ahalia Foreman',
    role: 'Founder & CEO',
    bio: 'huh? I\'m an student',
    avatar: 'https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE=',
  },
];

const partners = [
  { name: 'Jamaica Red Cross', category: 'Emergency Response' },
  { name: 'Food for the Poor', category: 'Food Security' },
  { name: 'Mustard Seed Communities', category: 'Elderly & Disabled Care' },
  { name: 'UNICEF Jamaica', category: 'Children\'s Rights' },
  { name: 'Heart Foundation of Jamaica', category: 'Health' },
  { name: 'Jamaica Environment Trust', category: 'Environment' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 lg:py-32 gradient-hero">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl">
            <Badge className="mb-6 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              About Us
            </Badge>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Building a more caring{' '}
              <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Jamaica
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              GoHelp was born from a simple belief: that every Jamaican has something to give,
              and every community has needs that can be met when we come together.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
                    alt="Community volunteers in Jamaica"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Users className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">8,500+</p>
                      <p className="text-sm text-gray-500">Active Volunteers</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Badge variant="secondary" className="mb-4 rounded-full">The Challenge</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                The problem we are solving
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-400">
                <p className="leading-relaxed">
                  Despite the strong community spirit in Jamaica, there was no centralized platform
                  connecting volunteers with opportunities. NGOs struggled to find reliable volunteers,
                  while passionate individuals couldn&apos;t easily discover ways to help.
                </p>
                <p className="leading-relaxed">
                  Families in need often didn&apos;t know where to turn for assistance. The existing
                  solutions were fragmented, inefficient, and lacked transparency.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 font-bold">!</span>
                    </div>
                    <p className="text-sm">No centralized volunteer matching system</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 font-bold">!</span>
                    </div>
                    <p className="text-sm">Families don&apos;t know where to find help</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 font-bold">!</span>
                    </div>
                    <p className="text-sm">No way to track volunteer impact</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 font-bold">!</span>
                    </div>
                    <p className="text-sm">Donations lack transparency</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 lg:py-32 bg-yellow-50/50 dark:bg-yellow-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn className="order-2 lg:order-1">
              <Badge variant="secondary" className="mb-4 rounded-full">Our Solution</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Uniting Jamaica through service
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-400">
                <p className="leading-relaxed">
                  GoHelp is Jamaica&apos;s first comprehensive volunteer matching platform. We connect
                  three key groups: volunteers looking to give back, NGOs needing support, and
                  families seeking assistance.
                </p>
                <p className="leading-relaxed">
                  Our platform makes it easy to find opportunities, track volunteer hours,
                  manage donations, and measure real impact across all 14 parishes.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-yellow-600" />
                    </div>
                    <p className="text-sm font-medium">Smart matching algorithm</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4 text-yellow-600" />
                    </div>
                    <p className="text-sm font-medium">Verified organizations</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-4 h-4 text-yellow-600" />
                    </div>
                    <p className="text-sm font-medium">Island-wide coverage</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                      <HandHeart className="w-4 h-4 text-yellow-600" />
                    </div>
                    <p className="text-sm font-medium">Direct impact tracking</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="order-1 lg:order-2">
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80"
                    alt="Jamaican volunteers working together"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4 rounded-full">Our Values</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What we stand for
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              These core values guide everything we do at GoHelp.
            </p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card className="h-full border-0 shadow-soft hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <value.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-32 bg-gray-50/50 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4 rounded-full">Our Team</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet the people behind GoHelp
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Passionate Jamaicans dedicated to making a difference.
            </p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <Card className="h-full border-0 shadow-soft overflow-hidden group">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4 rounded-full">Partners</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by leading organizations
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              We partner with Jamaica&apos;s most impactful NGOs and charities.
            </p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <StaggerItem key={partner.name}>
                <Card className="h-full border-0 shadow-soft hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {partner.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {partner.category}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-600 via-orange-600 to-cyan-700 p-8 lg:p-16">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              </div>

              <div className="relative z-10 max-w-2xl mx-auto text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Join us in building a better Jamaica
                </h2>
                <p className="text-yellow-900 text-lg mb-8">
                  Whether you&apos;re looking to volunteer, request help, or partner with us,
                  we&apos;d love to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-white text-yellow-700 hover:bg-yellow-50"
                  >
                    <Link href="/signup">
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full border-2 border-white text-gray-800/80 hover:bg-white/0"
                  >
                    <Link href="/contact">
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
