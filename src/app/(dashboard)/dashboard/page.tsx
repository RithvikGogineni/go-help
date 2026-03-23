'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Heart, Clock, Calendar, Award, TrendingUp, Users, 
  MapPin, ArrowRight, Bell, HandHeart, Building2, MessageSquare,
  AlertTriangle, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { useAuth } from '@/context/AuthContext';
import { 
  mockVolunteers, mockOpportunities, mockOrganizations, 
  mockHelpRequests, mockEvents 
} from '@/mock/data';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) return null;

  // Render different dashboards based on role
  switch (user.role) {
    case 'volunteer':
      return <VolunteerDashboard user={user} />;
    case 'organization':
      return <OrganizationDashboard user={user} />;
    case 'person_in_need':
      return <PersonInNeedDashboard user={user} />;
    default:
      return <VolunteerDashboard user={user} />;
  }
}

function VolunteerDashboard({ user }: { user: any }) {
  const volunteerData = mockVolunteers.find(v => v.id === user.id) || mockVolunteers[0];
  const upcomingOpportunities = mockOpportunities.slice(0, 3);
  const upcomingEvents = mockEvents.slice(0, 2);

  return (
    <div className="min-h-screen pb-20">
      {/* Welcome Header */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/20 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 ring-4 ring-white dark:ring-gray-800">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-yellow-100 text-yellow-700 text-xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user.name.split(' ')[0]}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  You&apos;ve volunteered {volunteerData.totalHours} hours this year
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="rounded-full relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
              </Button>
              <Button asChild className="rounded-full gradient-primary">
                <Link href="/opportunities">
                  <HandHeart className="w-4 h-4 mr-2" />
                  Find Opportunities
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StaggerItem>
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {volunteerData.totalHours}
                      </p>
                      <p className="text-sm text-gray-500">Hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {volunteerData.completedOpportunities}
                      </p>
                      <p className="text-sm text-gray-500">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Award className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {volunteerData.badges.length}
                      </p>
                      <p className="text-sm text-gray-500">Badges</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        #{Math.floor(Math.random() * 100) + 1}
                      </p>
                      <p className="text-sm text-gray-500">Ranking</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recommended Opportunities */}
              <FadeIn>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Recommended for You
                  </h2>
                  <Button variant="ghost" size="sm" className="rounded-full" asChild>
                    <Link href="/opportunities">
                      View All
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {upcomingOpportunities.map((opp) => (
                    <Link key={opp.id} href={`/opportunities/${opp.id}`}>
                      <Card className="border-0 shadow-soft hover:shadow-md transition-shadow group">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <img 
                              src={opp.image} 
                              alt={opp.title}
                              className="w-24 h-24 rounded-xl object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-yellow-600 transition-colors">
                                {opp.title}
                              </h3>
                              <p className="text-sm text-gray-500">{opp.organizationName}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {opp.parish}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(opp.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <Button size="sm" className="rounded-full gradient-primary opacity-0 group-hover:opacity-100 transition-opacity">
                              Apply
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </FadeIn>

              {/* Upcoming Events */}
              <FadeIn delay={0.1}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Upcoming Events
                  </h2>
                  <Button variant="ghost" size="sm" className="rounded-full" asChild>
                    <Link href="/events">
                      View All
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {upcomingEvents.map((event) => (
                    <Link key={event.id} href={`/events/${event.id}`}>
                      <Card className="border-0 shadow-soft hover:shadow-md transition-shadow group h-full">
                        <CardContent className="p-4">
                          <Badge variant="secondary" className="rounded-full mb-2">
                            {event.category}
                          </Badge>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(event.date).toLocaleDateString()} • {event.time}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Badges */}
              <FadeIn delay={0.2}>
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Badges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {volunteerData.badges.map((badge) => (
                        <div 
                          key={badge.id}
                          className={`w-12 h-12 rounded-xl ${badge.color} flex items-center justify-center`}
                          title={badge.name}
                        >
                          <Award className="w-6 h-6 text-white" />
                        </div>
                      ))}
                      {[...Array(6 - volunteerData.badges.length)].map((_, i) => (
                        <div 
                          key={i}
                          className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
                        >
                          <Award className="w-6 h-6 text-gray-300" />
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 rounded-full" asChild>
                      <Link href="/recognition">
                        View All Badges
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Quick Links */}
              <FadeIn delay={0.3}>
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start rounded-xl" asChild>
                      <Link href="/profile">
                        <Users className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start rounded-xl" asChild>
                      <Link href="/messages">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Messages
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start rounded-xl" asChild>
                      <Link href="/recognition">
                        <Award className="w-4 h-4 mr-2" />
                        Leaderboard
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function OrganizationDashboard({ user }: { user: any }) {
  const orgData = mockOrganizations.find(o => o.id === user.id) || mockOrganizations[0];
  const orgOpportunities = mockOpportunities.filter(o => o.organizationId === orgData.id);

  return (
    <div className="min-h-screen pb-20">
      {/* Welcome Header */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/20 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-white dark:ring-gray-800">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h1>
                <div className="flex items-center gap-2">
                  {orgData.verified && (
                    <Badge className="rounded-full bg-yellow-100 text-yellow-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <span className="text-gray-600 dark:text-gray-400">{orgData.parish}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/profile">
                  Edit Profile
                </Link>
              </Button>
              <Button className="rounded-full gradient-primary" asChild>
                <Link href="/opportunities/new">
                  <HandHeart className="w-4 h-4 mr-2" />
                  Post Opportunity
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StaggerItem>
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Users className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {orgData.impactStats.volunteersEngaged}
                      </p>
                      <p className="text-sm text-gray-500">Volunteers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {orgData.impactStats.peopleHelped}
                      </p>
                      <p className="text-sm text-gray-500">People Helped</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {orgData.impactStats.eventsHosted}
                      </p>
                      <p className="text-sm text-gray-500">Events</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <HandHeart className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {orgOpportunities.length}
                      </p>
                      <p className="text-sm text-gray-500">Active Posts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Active Opportunities */}
            <div className="lg:col-span-2 space-y-8">
              <FadeIn>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Active Opportunities
                  </h2>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {orgOpportunities.length > 0 ? (
                    orgOpportunities.map((opp) => (
                      <Card key={opp.id} className="border-0 shadow-soft">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {opp.title}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {new Date(opp.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge className={opp.urgency === 'urgent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}>
                              {opp.urgency}
                            </Badge>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-gray-500">Applications</span>
                              <span className="font-medium">{opp.spotsFilled}/{opp.spotsAvailable}</span>
                            </div>
                            <Progress value={(opp.spotsFilled / opp.spotsAvailable) * 100} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="border-0 shadow-soft">
                      <CardContent className="p-8 text-center">
                        <HandHeart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No active opportunities</p>
                        <Button className="mt-4 rounded-full gradient-primary" asChild>
                          <Link href="/opportunities/new">Post First Opportunity</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Needs */}
              <FadeIn delay={0.1}>
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">Current Needs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {orgData.needs.map((need, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <AlertTriangle className="w-4 h-4 text-orange-9000" />
                          {need}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Quick Actions */}
              <FadeIn delay={0.2}>
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start rounded-xl" asChild>
                      <Link href="/messages">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        View Messages
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start rounded-xl" asChild>
                      <Link href="/donations">
                        <Heart className="w-4 h-4 mr-2" />
                        Donation Settings
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PersonInNeedDashboard({ user }: { user: any }) {
  return (
    <div className="min-h-screen pb-20">
      {/* Welcome Header */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/20 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Welcome, {user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                We&apos;re here to help you. Check the status of your requests below.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/organizations">
                  <Building2 className="w-4 h-4 mr-2" />
                  Find Organizations
                </Link>
              </Button>
              <Button className="rounded-full gradient-primary" asChild>
                <Link href="/request-help">
                  <HandHeart className="w-4 h-4 mr-2" />
                  New Request
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* My Requests */}
              <FadeIn>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    My Requests
                  </h2>
                  <Button variant="ghost" size="sm" className="rounded-full" asChild>
                    <Link href="/request-help">
                      New Request
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {mockHelpRequests.slice(0, 2).map((request) => (
                    <Card key={request.id} className="border-0 shadow-soft">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <Badge className={`mb-2 ${
                              request.status === 'matched' 
                                ? 'bg-yellow-100 text-yellow-700' 
                                : request.status === 'pending'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </Badge>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Assistance
                            </h3>
                            <p className="text-sm text-gray-500">
                              Submitted {new Date(request.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-full">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </FadeIn>

              {/* Nearby Organizations */}
              <FadeIn delay={0.1}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Organizations Near You
                  </h2>
                  <Button variant="ghost" size="sm" className="rounded-full" asChild>
                    <Link href="/organizations">
                      View All
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {mockOrganizations.slice(0, 4).map((org) => (
                    <Link key={org.id} href={`/organizations/${org.id}`}>
                      <Card className="border-0 shadow-soft hover:shadow-md transition-shadow group">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={org.avatar} 
                              alt={org.name}
                              className="w-12 h-12 rounded-xl object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-yellow-600 transition-colors">
                                {org.name}
                              </h3>
                              <p className="text-sm text-gray-500">{org.parish}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Help Status */}
              <FadeIn delay={0.2}>
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">Request Status Guide</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-orange-600">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Pending</p>
                        <p className="text-xs text-gray-500">Your request is being reviewed</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-blue-600">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">In Review</p>
                        <p className="text-xs text-gray-500">An organization is reviewing</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-yellow-600">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Matched</p>
                        <p className="text-xs text-gray-500">A volunteer has been assigned</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Quick Links */}
              <FadeIn delay={0.3}>
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full rounded-full gradient-primary" asChild>
                      <Link href="/request-help">
                        <HandHeart className="w-4 h-4 mr-2" />
                        Request Help
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full rounded-full" asChild>
                      <Link href="/messages">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Messages
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
