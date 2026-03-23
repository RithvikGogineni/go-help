'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, Users, Search, Filter, ArrowRight,
  CheckCircle, BookOpen, Heart, Leaf, Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { mockEvents } from '@/mock/data';

const eventCategories = [
  { id: 'workshop', label: 'Workshops', icon: BookOpen },
  { id: 'training', label: 'Training', icon: CheckCircle },
  { id: 'community', label: 'Community', icon: Heart },
  { id: 'fundraiser', label: 'Fundraisers', icon: Flame },
];

const skillCategories = [
  { id: 'first-aid', label: 'First Aid', icon: Heart },
  { id: 'mentorship', label: 'Mentorship', icon: Users },
  { id: 'teaching', label: 'Teaching', icon: BookOpen },
  { id: 'counseling', label: 'Counseling', icon: Heart },
  { id: 'disaster', label: 'Disaster Response', icon: Flame },
  { id: 'environment', label: 'Environment', icon: Leaf },
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingEvents = mockEvents.filter(e => new Date(e.date) >= new Date());
  const pastEvents = mockEvents.filter(e => new Date(e.date) < new Date());

  const filteredEvents = (activeTab === 'upcoming' ? upcomingEvents : pastEvents).filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/20 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 rounded-full">Events & Workshops</Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Learn, connect, and make an impact
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Join workshops, training sessions, and community events across Jamaica. 
              Build skills and connect with fellow volunteers.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Skill Categories */}
      <section className="py-12 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Browse by Skill Category
            </h2>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {skillCategories.map((category) => (
                <StaggerItem key={category.id}>
                  <button className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-yellow-300 hover:shadow-md transition-all text-center group">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                      <category.icon className="w-6 h-6 text-yellow-600 dark:text-yellow-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {category.label}
                    </span>
                  </button>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <FadeIn>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl h-12 w-full md:w-80"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                  <TabsTrigger value="upcoming" className="rounded-lg">
                    Upcoming ({upcomingEvents.length})
                  </TabsTrigger>
                  <TabsTrigger value="past" className="rounded-lg">
                    Past Events
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </FadeIn>
          </div>

          {filteredEvents.length > 0 ? (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <StaggerItem key={event.id}>
                  <Card className="h-full overflow-hidden border-0 shadow-soft hover:shadow-xl transition-all duration-300 group bg-white dark:bg-gray-900">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="rounded-full bg-white/90 text-gray-900">
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 text-white/90 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="rounded-full mb-3">
                        {event.category}
                      </Badge>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                        {event.description}
                      </p>
                      <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time} • {event.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.parish}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{event.registeredAttendees}/{event.maxAttendees} registered</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs">
                            {event.organizerName.charAt(0)}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {event.organizerName}
                          </span>
                        </div>
                        {activeTab === 'upcoming' && (
                          <Button size="sm" className="rounded-full gradient-primary">
                            Register
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Calendar className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No events found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search query
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
