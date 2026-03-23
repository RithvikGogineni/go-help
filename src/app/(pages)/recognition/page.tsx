'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Medal, Star, Flame, Award, TrendingUp, Users,
  Heart, Share2, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { mockLeaderboard, mockBadges, mockVolunteers } from '@/mock/data';

const Confetti = () => {
  const colors = ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: -20, 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            opacity: 1,
            rotate: 0
          }}
          animate={{ 
            y: typeof window !== 'undefined' ? window.innerHeight + 20 : 800,
            rotate: Math.random() * 360,
            opacity: 0
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            ease: 'linear',
            delay: Math.random() * 2
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
        />
      ))}
    </div>
  );
};

export default function RecognitionPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeframe, setTimeframe] = useState('monthly');

  const handleCelebrate = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const topThree = mockLeaderboard.slice(0, 3);
  const restOfLeaderboard = mockLeaderboard.slice(3);

  return (
    <div className="min-h-screen pb-20 relative">
      {showConfetti && <Confetti />}

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-50 via-orange-50 to-rose-50 dark:from-orange-950/30 dark:via-orange-950/20 dark:to-rose-950/30 py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-300/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Celebrating Our Heroes
            </motion.div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Volunteer{' '}
              <span className="bg-gradient-to-r from-orange-500 to-orange-500 bg-clip-text text-transparent">
                Recognition
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Celebrating the incredible volunteers who dedicate their time and energy 
              to making Jamaica a better place for everyone.
            </p>

            <Button 
              className="rounded-full gradient-warm hover:opacity-90"
              onClick={handleCelebrate}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Celebrate Volunteers
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Top Volunteers Podium */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Top Helpers This Month
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our highest performing volunteers across Jamaica
            </p>
          </FadeIn>

          <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8">
            {/* 2nd Place */}
            {topThree[1] && (
              <FadeIn delay={0.1} className="order-2 md:order-1">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="relative mb-4">
                    <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden ring-4 ring-gray-300 dark:ring-gray-600">
                      <img 
                        src={topThree[1].avatar} 
                        alt={topThree[1].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{topThree[1].name}</h3>
                  <p className="text-sm text-gray-500">{topThree[1].parish}</p>
                  <p className="text-orange-600 font-bold mt-1">{topThree[1].hours} hrs</p>
                </motion.div>
              </FadeIn>
            )}

            {/* 1st Place */}
            {topThree[0] && (
              <FadeIn className="order-1 md:order-2 mb-4 md:mb-8">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="relative mb-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-6 left-1/2 -translate-x-1/2"
                    >
                      <Trophy className="w-12 h-12 text-orange-9000 fill-orange-500" />
                    </motion.div>
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden ring-4 ring-orange-400">
                      <img 
                        src={topThree[0].avatar} 
                        alt={topThree[0].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-lg">
                      1
                    </div>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">{topThree[0].name}</h3>
                  <p className="text-sm text-gray-500">{topThree[0].parish}</p>
                  <p className="text-orange-600 font-bold text-lg mt-1">{topThree[0].hours} hrs</p>
                  <Badge className="mt-2 rounded-full bg-orange-100 text-orange-700">
                    <Star className="w-3 h-3 mr-1 fill-orange-500" />
                    Champion
                  </Badge>
                </motion.div>
              </FadeIn>
            )}

            {/* 3rd Place */}
            {topThree[2] && (
              <FadeIn delay={0.2} className="order-3">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="relative mb-4">
                    <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden ring-4 ring-orange-400">
                      <img 
                        src={topThree[2].avatar} 
                        alt={topThree[2].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{topThree[2].name}</h3>
                  <p className="text-sm text-gray-500">{topThree[2].parish}</p>
                  <p className="text-orange-600 font-bold mt-1">{topThree[2].hours} hrs</p>
                </motion.div>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-12 bg-gray-50/50 dark:bg-gray-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Full Leaderboard
              </h2>
              <Tabs value={timeframe} onValueChange={setTimeframe}>
                <TabsList className="bg-white dark:bg-gray-800">
                  <TabsTrigger value="weekly" className="rounded-lg">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly" className="rounded-lg">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly" className="rounded-lg">Yearly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </FadeIn>

          <StaggerContainer className="space-y-3">
            {restOfLeaderboard.map((entry, index) => (
              <StaggerItem key={entry.userId}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="bg-white dark:bg-gray-900 rounded-xl p-4 flex items-center gap-4 shadow-soft"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-600 dark:text-gray-400">
                    {entry.rank}
                  </div>
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={entry.avatar} />
                    <AvatarFallback className="bg-yellow-100 text-yellow-700">
                      {entry.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                      {entry.name}
                    </h4>
                    <p className="text-sm text-gray-500">{entry.parish}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-bold text-yellow-600">{entry.hours}</p>
                      <p className="text-gray-500">hours</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-blue-600">{entry.opportunities}</p>
                      <p className="text-gray-500">tasks</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-orange-600">{entry.badges}</p>
                      <p className="text-gray-500">badges</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Badges Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <Badge className="mb-4 rounded-full">Achievement System</Badge>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Earn Badges
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Complete milestones and unlock achievements
            </p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBadges.map((badge) => (
              <StaggerItem key={badge.id}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-soft border-2 border-transparent hover:border-yellow-200 dark:hover:border-yellow-800 transition-all"
                >
                  <div className={`w-16 h-16 rounded-2xl ${badge.color} flex items-center justify-center mb-4`}>
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {badge.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {badge.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl p-8 lg:p-12 text-center text-white">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Want to see your name on the leaderboard?
              </h2>
              <p className="text-yellow-900 mb-8 max-w-xl mx-auto">
                Join thousands of volunteers making a difference in Jamaica. 
                Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="rounded-full bg-white text-yellow-700 hover:bg-yellow-50">
                  <Heart className="w-4 h-4 mr-2" />
                  Start Volunteering
                </Button>
                <Button variant="outline" className="rounded-full border-2 border-white text-white hover:bg-white/10">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share This Page
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
