'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Users, CheckCircle, Filter, ArrowRight,
  Building2, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { mockOrganizations, parishes } from '@/mock/data';

export default function OrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParish, setSelectedParish] = useState<string>('');
  const [sortBy, setSortBy] = useState('name');

  const filteredOrganizations = mockOrganizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.mission.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesParish = !selectedParish || org.parish === selectedParish;
    
    return matchesSearch && matchesParish;
  });

  const sortedOrganizations = [...filteredOrganizations].sort((a, b) => {
    switch (sortBy) {
      case 'volunteers':
        return b.impactStats.volunteersEngaged - a.impactStats.volunteersEngaged;
      case 'impact':
        return b.impactStats.peopleHelped - a.impactStats.peopleHelped;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Location (Parish)</h3>
        <Select value={selectedParish || "all"} onValueChange={(v) => setSelectedParish(v === "all" ? "" : v)}>
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="All Parishes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Parishes</SelectItem>
            {parishes.map(parish => (
              <SelectItem key={parish} value={parish}>{parish}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/20 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Partner Organizations
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
              Discover trusted NGOs, charities, and community organizations making a difference across Jamaica.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="sticky top-16 lg:top-20 z-30 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search organizations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl h-12"
              />
            </div>

            {/* Sort (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 rounded-xl h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="volunteers">Most Volunteers</SelectItem>
                  <SelectItem value="impact">Most Impact</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Filters */}
            <div className="flex lg:hidden items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-1 rounded-xl h-12">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="flex-1 rounded-xl h-12">
                  <Filter className="w-4 h-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="volunteers">Most Volunteers</SelectItem>
                  <SelectItem value="impact">Most Impact</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-36 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-lg">Filters</h2>
                  <Filter className="w-5 h-5 text-gray-400" />
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* Organizations Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing <span className="font-semibold text-gray-900 dark:text-white">{sortedOrganizations.length}</span> organizations
                </p>
              </div>

              {sortedOrganizations.length > 0 ? (
                <StaggerContainer className="grid gap-6">
                  {sortedOrganizations.map((org) => (
                    <StaggerItem key={org.id}>
                      <Link href={`/organizations/${org.id}`}>
                        <Card className="overflow-hidden border-0 shadow-soft hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white dark:bg-gray-900">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                              {/* Avatar */}
                              <div className="flex-shrink-0">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden">
                                  <img 
                                    src={org.avatar} 
                                    alt={org.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                                        {org.name}
                                      </h3>
                                      {org.verified && (
                                        <Badge variant="secondary" className="rounded-full bg-yellow-100 text-yellow-700">
                                          <CheckCircle className="w-3 h-3 mr-1" />
                                          Verified
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                      <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{org.parish}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span>{org.teamSize} team members</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                                  {org.mission}
                                </p>

                                {/* Stats */}
                                <div className="flex flex-wrap gap-6 text-sm">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                                      <Users className="w-4 h-4 text-yellow-600" />
                                    </div>
                                    <div>
                                      <p className="font-semibold text-gray-900 dark:text-white">
                                        {org.impactStats.volunteersEngaged.toLocaleString()}
                                      </p>
                                      <p className="text-gray-500">Volunteers</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                      <Building2 className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <div>
                                      <p className="font-semibold text-gray-900 dark:text-white">
                                        {org.impactStats.peopleHelped.toLocaleString()}
                                      </p>
                                      <p className="text-gray-500">People Helped</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                      <Star className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                      <p className="font-semibold text-gray-900 dark:text-white">
                                        {org.impactStats.eventsHosted}
                                      </p>
                                      <p className="text-gray-500">Events</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Arrow */}
                              <div className="flex-shrink-0 self-center">
                                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900/30 transition-colors">
                                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-600 transition-colors" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No organizations found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try adjusting your search query
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
