'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Clock, Users, Filter, SlidersHorizontal,
  ChevronDown, X, Heart, ArrowRight
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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { mockOpportunities, parishes, opportunityTypes } from '@/mock/data';
import { OpportunityUrgency } from '@/types';

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParish, setSelectedParish] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('');
  const [isRemote, setIsRemote] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  const filteredOpportunities = mockOpportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.organizationName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesParish = !selectedParish || opp.parish === selectedParish;
    const matchesType = !selectedType || opp.type === selectedType;
    const matchesUrgency = !selectedUrgency || opp.urgency === selectedUrgency;
    const matchesRemote = isRemote === null || opp.isRemote === isRemote;
    
    return matchesSearch && matchesParish && matchesType && matchesUrgency && matchesRemote;
  });

  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'urgent':
        const urgencyOrder = { urgent: 0, medium: 1, low: 2 };
        return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
      case 'closest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSelectedParish('');
    setSelectedType('');
    setSelectedUrgency('');
    setIsRemote(null);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedParish || selectedType || selectedUrgency || isRemote !== null;

  const getUrgencyColor = (urgency: OpportunityUrgency) => {
    switch (urgency) {
      case 'urgent':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200';
      default:
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200';
    }
  };

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

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Type of Help</h3>
        <div className="space-y-2">
          {opportunityTypes.map(type => (
            <div key={type.value} className="flex items-center space-x-2">
              <Checkbox 
                id={type.value}
                checked={selectedType === type.value}
                onCheckedChange={() => setSelectedType(selectedType === type.value ? '' : type.value)}
              />
              <Label htmlFor={type.value} className="text-sm cursor-pointer">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Urgency</h3>
        <Select value={selectedUrgency || "all"} onValueChange={(v) => setSelectedUrgency(v === "all" ? "" : v)}>
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Any Urgency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Urgency</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Work Type</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="inperson"
              checked={isRemote === false}
              onCheckedChange={(checked) => setIsRemote(checked ? false : null)}
            />
            <Label htmlFor="inperson" className="text-sm cursor-pointer">In-person</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remote"
              checked={isRemote === true}
              onCheckedChange={(checked) => setIsRemote(checked ? true : null)}
            />
            <Label htmlFor="remote" className="text-sm cursor-pointer">Remote</Label>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <Button 
          variant="outline" 
          className="w-full rounded-xl"
          onClick={clearFilters}
        >
          <X className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/20 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Volunteer Opportunities
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
              Find meaningful ways to make a difference. Browse opportunities by location, 
              skills, and causes you care about.
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
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl h-12"
              />
            </div>

            {/* Sort (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 rounded-xl h-12">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="urgent">Most Urgent</SelectItem>
                  <SelectItem value="closest">Closest Date</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="rounded-xl h-12" asChild>
                <Link href="/request-help">
                  Request Help
                </Link>
              </Button>
            </div>

            {/* Mobile Filters */}
            <div className="flex lg:hidden items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-1 rounded-xl h-12">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-2 w-5 h-5 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center">
                        !
                      </span>
                    )}
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
                  <SlidersHorizontal className="w-4 h-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="urgent">Most Urgent</SelectItem>
                  <SelectItem value="closest">Closest Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-sm text-gray-500">Active filters:</span>
              {selectedParish && (
                <Badge variant="secondary" className="rounded-full gap-1">
                  {selectedParish}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedParish('')} />
                </Badge>
              )}
              {selectedType && (
                <Badge variant="secondary" className="rounded-full gap-1">
                  {opportunityTypes.find(t => t.value === selectedType)?.label}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedType('')} />
                </Badge>
              )}
              {selectedUrgency && (
                <Badge variant="secondary" className="rounded-full gap-1 capitalize">
                  {selectedUrgency}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedUrgency('')} />
                </Badge>
              )}
              {isRemote !== null && (
                <Badge variant="secondary" className="rounded-full gap-1">
                  {isRemote ? 'Remote' : 'In-person'}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setIsRemote(null)} />
                </Badge>
              )}
              <button 
                onClick={clearFilters}
                className="text-sm text-yellow-600 hover:text-yellow-700"
              >
                Clear all
              </button>
            </div>
          )}
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

            {/* Opportunities Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing <span className="font-semibold text-gray-900 dark:text-white">{sortedOpportunities.length}</span> opportunities
                </p>
              </div>

              {sortedOpportunities.length > 0 ? (
                <StaggerContainer className="grid md:grid-cols-2 gap-6">
                  {sortedOpportunities.map((opp) => (
                    <StaggerItem key={opp.id}>
                      <Link href={`/opportunities/${opp.id}`}>
                        <Card className="h-full overflow-hidden border-0 shadow-soft hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white dark:bg-gray-900">
                          <div className="relative aspect-video overflow-hidden">
                            <img 
                              src={opp.image} 
                              alt={opp.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                              <Badge className={`rounded-full ${getUrgencyColor(opp.urgency)}`}>
                                {opp.urgency.charAt(0).toUpperCase() + opp.urgency.slice(1)}
                              </Badge>
                              {opp.isRemote && (
                                <Badge variant="secondary" className="rounded-full">
                                  Remote
                                </Badge>
                              )}
                            </div>
                            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Heart className="w-5 h-5 text-white" />
                            </button>
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                              <img 
                                src={opp.organizationAvatar} 
                                alt={opp.organizationName}
                                className="w-5 h-5 rounded-full object-cover"
                              />
                              <span>{opp.organizationName}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                              {opp.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                              {opp.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{opp.parish}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{opp.duration}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="w-4 h-4 text-yellow-9000" />
                                <span className="text-gray-600 dark:text-gray-400">
                                  {opp.spotsFilled}/{opp.spotsAvailable} spots filled
                                </span>
                              </div>
                              <span className="text-yellow-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Apply
                                <ArrowRight className="w-4 h-4" />
                              </span>
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
                    No opportunities found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearFilters} variant="outline" className="rounded-full">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
