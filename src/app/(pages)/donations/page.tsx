'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Heart, ArrowRight, Wallet, Package, Wrench, CheckCircle,
  CreditCard, Lock, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { mockCauses } from '@/mock/data';

const donationTypes = [
  {
    id: 'money',
    title: 'Money',
    description: 'Make a financial contribution to support our causes',
    icon: Wallet,
    color: 'bg-yellow-500',
  },
  {
    id: 'goods',
    title: 'Goods',
    description: 'Donate food, clothing, school supplies, and other items',
    icon: Package,
    color: 'bg-orange-500',
  },
  {
    id: 'services',
    title: 'Services',
    description: 'Offer your professional skills and time',
    icon: Wrench,
    color: 'bg-blue-500',
  },
];

const predefinedAmounts = [1000, 2500, 5000, 10000, 25000];

export default function DonationsPage() {
  const [selectedType, setSelectedType] = useState('money');
  const [amount, setAmount] = useState<number | ''>('');
  const [customAmount, setCustomAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleAmountSelect = (amt: number) => {
    setAmount(amt);
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setAmount(value ? parseInt(value) : '');
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/20 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 rounded-full">Donate</Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Support Jamaica&apos;s communities
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              Your donation helps connect volunteers with those in need, supports local NGOs, 
              and creates lasting change across all 14 parishes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-600">
                  <AnimatedCounter value={45} suffix="M+" prefix="$" />
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Raised</p>
              </div>
              <div className="w-px bg-gray-300 dark:bg-gray-700" />
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">
                  <AnimatedCounter value={127} />
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Organizations</p>
              </div>
              <div className="w-px bg-gray-300 dark:bg-gray-700" />
              <div className="text-center">
                <p className="text-3xl font-bold text-rose-600">
                  <AnimatedCounter value={12580} />
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Families Helped</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <FadeIn>
                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6 lg:p-8">
                    <Tabs defaultValue="money" className="space-y-8">
                      <TabsList className="grid grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                        {donationTypes.map((type) => (
                          <TabsTrigger 
                            key={type.id} 
                            value={type.id}
                            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                          >
                            <type.icon className="w-4 h-4 mr-2" />
                            {type.title}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      <TabsContent value="money" className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                            Select an amount (JMD)
                          </h3>
                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                            {predefinedAmounts.map((amt) => (
                              <button
                                key={amt}
                                onClick={() => handleAmountSelect(amt)}
                                className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                                  amount === amt
                                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-yellow-300'
                                }`}
                              >
                                ${amt.toLocaleString()}
                              </button>
                            ))}
                          </div>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <Input
                              type="number"
                              placeholder="Custom amount"
                              value={customAmount}
                              onChange={(e) => handleCustomAmount(e.target.value)}
                              className="pl-8 rounded-xl h-12"
                            />
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            Your Information
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <Input placeholder="First Name" className="rounded-xl h-12" />
                            <Input placeholder="Last Name" className="rounded-xl h-12" />
                          </div>
                          <Input type="email" placeholder="Email address" className="rounded-xl h-12" />
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setIsAnonymous(!isAnonymous)}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                isAnonymous 
                                  ? 'bg-yellow-500 border-yellow-500' 
                                  : 'border-gray-300 dark:border-gray-600'
                              }`}
                            >
                              {isAnonymous && <CheckCircle className="w-3 h-3 text-white" />}
                            </button>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Make this donation anonymous
                            </span>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            Payment Details
                          </h3>
                          <div className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-center">
                            <CreditCard className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">
                              Secure payment processing would be integrated here
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Lock className="w-4 h-4" />
                            <span>Your payment information is secure and encrypted</span>
                          </div>
                        </div>

                        <Button 
                          className="w-full rounded-xl h-14 gradient-primary text-lg"
                          disabled={!amount}
                        >
                          Donate {amount ? `$${amount.toLocaleString()} JMD` : ''}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </TabsContent>

                      <TabsContent value="goods" className="space-y-6">
                        <div className="text-center py-12">
                          <Package className="w-16 h-16 text-orange-9000 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Donate Goods
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            Contact organizations directly to arrange donation drop-offs 
                            for food, clothing, school supplies, and more.
                          </p>
                          <Button asChild className="rounded-full gradient-primary">
                            <Link href="/organizations">
                              Browse Organizations
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="services" className="space-y-6">
                        <div className="text-center py-12">
                          <Wrench className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Offer Your Services
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            Sign up as a volunteer to offer your professional skills 
                            and services to organizations in need.
                          </p>
                          <Button asChild className="rounded-full gradient-primary">
                            <Link href="/signup">
                              Become a Volunteer
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>

            {/* Right Column - Featured Causes */}
            <div className="lg:col-span-1">
              <FadeIn delay={0.1}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Featured Causes
                </h2>
                <div className="space-y-4">
                  {mockCauses.map((cause) => {
                    const progress = (cause.raised / cause.goal) * 100;
                    return (
                      <Card key={cause.id} className="border-0 shadow-soft overflow-hidden">
                        <div className="aspect-video relative">
                          <img 
                            src={cause.image} 
                            alt={cause.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <p className="text-white font-semibold text-sm">{cause.title}</p>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-500 mb-2">by {cause.organizationName}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                Raised: <strong className="text-yellow-600">${cause.raised.toLocaleString()}</strong>
                              </span>
                              <span className="text-gray-500">
                                Goal: ${cause.goal.toLocaleString()}
                              </span>
                            </div>
                            <Progress value={progress} className="h-2" />
                            <p className="text-xs text-gray-500 text-right">{Math.round(progress)}% funded</p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
