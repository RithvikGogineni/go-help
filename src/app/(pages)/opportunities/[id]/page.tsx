'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  MapPin, Clock, Calendar, Users, ArrowLeft, Heart, Share2,
  CheckCircle, AlertCircle, Building2, Phone, Mail, Globe,
  ArrowRight, Bookmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { mockOpportunities, mockOrganizations } from '@/mock/data';
import { OpportunityUrgency } from '@/types';

export default function OpportunityDetailPage() {
  const params = useParams();
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Find opportunity by ID
  const opportunity = mockOpportunities.find(o => o.id === params.id) || mockOpportunities[0];
  const organization = mockOrganizations.find(o => o.id === opportunity.organizationId);

  // Get similar opportunities
  const similarOpportunities = mockOpportunities
    .filter(o => o.id !== opportunity.id && (o.type === opportunity.type || o.parish === opportunity.parish))
    .slice(0, 3);

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

  const fillProgress = (opportunity.spotsFilled / opportunity.spotsAvailable) * 100;

  return (
    <div className="min-h-screen pb-20">
      {/* Back Navigation */}
      <div className="bg-gray-50/50 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/opportunities" 
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to opportunities
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 lg:h-96">
        <img 
          src={opportunity.image} 
          alt={opportunity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <FadeIn>
              <Badge className={`mb-4 ${getUrgencyColor(opportunity.urgency)}`}>
                {opportunity.urgency.charAt(0).toUpperCase() + opportunity.urgency.slice(1)} Priority
              </Badge>
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                {opportunity.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <img 
                    src={opportunity.organizationAvatar} 
                    alt={opportunity.organizationName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{opportunity.organizationName}</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{opportunity.parish}</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <FadeIn>
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  About this opportunity
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                  {opportunity.description}
                </p>
              </section>
            </FadeIn>

            <Separator />

            <FadeIn delay={0.1}>
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {opportunity.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-9000 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>

            <Separator />

            <FadeIn delay={0.2}>
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Skills Needed
                </h2>
                <div className="flex flex-wrap gap-2">
                  {opportunity.skillsRequired.map((skill) => (
                    <Badge key={skill} variant="secondary" className="rounded-full px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Organization Info */}
            <Separator />

            <FadeIn delay={0.3}>
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  About the Organization
                </h2>
                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img 
                        src={organization?.avatar} 
                        alt={organization?.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                          {organization?.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          {organization?.parish} • {organization?.verified && 'Verified Organization'}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                          {organization?.mission}
                        </p>
                        <Button variant="outline" size="sm" className="rounded-full" asChild>
                          <Link href={`/organizations/${organization?.id}`}>
                            View Profile
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </FadeIn>

            {/* Similar Opportunities */}
            {similarOpportunities.length > 0 && (
              <>
                <Separator />
                <FadeIn delay={0.4}>
                  <section>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Similar Opportunities
                    </h2>
                    <StaggerContainer className="grid sm:grid-cols-2 gap-4">
                      {similarOpportunities.map((opp) => (
                        <StaggerItem key={opp.id}>
                          <Link href={`/opportunities/${opp.id}`}>
                            <Card className="h-full border-0 shadow-soft hover:shadow-md transition-shadow cursor-pointer">
                              <CardContent className="p-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                                  {opp.title}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <MapPin className="w-4 h-4" />
                                  <span>{opp.parish}</span>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </section>
                </FadeIn>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <FadeIn>
                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6 space-y-6">
                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {opportunity.spotsFilled} of {opportunity.spotsAvailable} spots filled
                        </span>
                        <span className="text-sm font-medium text-yellow-600">
                          {Math.round(fillProgress)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${fillProgress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full gradient-primary rounded-full"
                        />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {new Date(opportunity.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {opportunity.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {opportunity.duration}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-rose-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {opportunity.address || opportunity.parish}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Actions */}
                    <div className="space-y-3">
                      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full rounded-xl h-12 gradient-primary hover:opacity-90">
                            Apply Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Apply for this opportunity</DialogTitle>
                            <DialogDescription>
                              Your application will be sent to {opportunity.organizationName}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              By applying, you agree to:
                            </p>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-yellow-9000 mt-0.5" />
                                <span>Show up on time for the scheduled date</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-yellow-9000 mt-0.5" />
                                <span>Complete any required training or preparation</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-yellow-9000 mt-0.5" />
                                <span>Follow the organization&apos;s guidelines</span>
                              </li>
                            </ul>
                          </div>
                          <div className="flex gap-3">
                            <Button 
                              variant="outline" 
                              className="flex-1 rounded-xl"
                              onClick={() => setIsApplyDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              className="flex-1 rounded-xl gradient-primary"
                              onClick={() => {
                                setIsApplyDialogOpen(false);
                                // Show success toast
                              }}
                            >
                              Confirm Application
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          className="flex-1 rounded-xl h-12"
                          onClick={() => setIsBookmarked(!isBookmarked)}
                        >
                          <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-yellow-500 text-yellow-9000' : ''}`} />
                          {isBookmarked ? 'Saved' : 'Save'}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 rounded-xl h-12"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Contact Card */}
              <FadeIn delay={0.1}>
                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Contact Organizer
                    </h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full rounded-xl justify-start" asChild>
                        <a href={`mailto:${organization?.email}`}>
                          <Mail className="w-4 h-4 mr-2" />
                          Email Organization
                        </a>
                      </Button>
                      {organization?.website && (
                        <Button variant="outline" className="w-full rounded-xl justify-start" asChild>
                          <a href={organization.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="w-4 h-4 mr-2" />
                            Visit Website
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
