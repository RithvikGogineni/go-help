'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  MapPin, Users, Globe, Mail, ArrowLeft, CheckCircle, Heart,
  Calendar, ExternalLink, ArrowRight, Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { mockOrganizations, mockOpportunities } from '@/mock/data';
import { OpportunityUrgency } from '@/types';

export default function OrganizationDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('about');

  // Find organization by ID
  const organization = mockOrganizations.find(o => o.id === params.id) || mockOrganizations[0];
  
  // Get organization's opportunities
  const orgOpportunities = mockOpportunities.filter(o => o.organizationId === organization.id);

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

  return (
    <div className="min-h-screen pb-20">
      {/* Back Navigation */}
      <div className="bg-gray-50/50 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/organizations" 
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to organizations
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/20 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <FadeIn>
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src={organization.avatar} 
                  alt={organization.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
            
            <div className="flex-1">
              <FadeIn delay={0.1}>
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                    {organization.name}
                  </h1>
                  {organization.verified && (
                    <Badge className="rounded-full bg-yellow-100 text-yellow-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 max-w-2xl">
                  {organization.mission}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-yellow-9000" />
                    <span>{organization.address}, {organization.parish}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-yellow-9000" />
                    <span>{organization.teamSize} team members</span>
                  </div>
                  {organization.website && (
                    <a 
                      href={organization.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2} className="flex-shrink-0">
              <div className="flex flex-col gap-3">
                <Button className="rounded-full gradient-primary px-8">
                  <Heart className="w-4 h-4 mr-2" />
                  Follow
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <a href={`mailto:${organization.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </a>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StaggerItem>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {organization.impactStats.volunteersEngaged.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Volunteers Engaged</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {organization.impactStats.peopleHelped.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">People Helped</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {organization.impactStats.eventsHosted}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Events Hosted</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {orgOpportunities.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Open Opportunities</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Tabs Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="about" className="space-y-8">
            <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
              <TabsTrigger value="about" className="rounded-lg">About</TabsTrigger>
              <TabsTrigger value="opportunities" className="rounded-lg">
                Opportunities ({orgOpportunities.length})
              </TabsTrigger>
              <TabsTrigger value="needs" className="rounded-lg">Current Needs</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-8">
              <FadeIn>
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    About {organization.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                    {organization.description}
                  </p>
                </div>
              </FadeIn>

              <Separator />

              <FadeIn delay={0.1}>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Contact Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Card className="border-0 shadow-soft">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <a href={`mailto:${organization.email}`} className="text-yellow-600 hover:underline">
                            {organization.email}
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-soft">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="text-gray-900 dark:text-white">{organization.address}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </FadeIn>
            </TabsContent>

            <TabsContent value="opportunities">
              {orgOpportunities.length > 0 ? (
                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orgOpportunities.map((opp) => (
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
                            <div className="absolute bottom-4 left-4">
                              <Badge className={`rounded-full ${getUrgencyColor(opp.urgency)}`}>
                                {opp.urgency.charAt(0).toUpperCase() + opp.urgency.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                              {opp.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                              {opp.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{opp.parish}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(opp.date).toLocaleDateString()}</span>
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
                    <Calendar className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No open opportunities
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Check back soon for new opportunities
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="needs">
              <FadeIn>
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Current Needs
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {organization.name} is currently looking for support in these areas:
                  </p>
                  
                  <div className="space-y-4">
                    {organization.needs.map((need, index) => (
                      <Card key={index} className="border-0 shadow-soft">
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 dark:text-white">{need}</p>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-full" asChild>
                            <Link href="/request-help">
                              Help
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {organization.donationLink && (
                    <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        Support with a donation
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Your contribution helps {organization.name} continue their important work.
                      </p>
                      <Button className="rounded-full gradient-primary" asChild>
                        <a href={organization.donationLink} target="_blank" rel="noopener noreferrer">
                          Make a Donation
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </FadeIn>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
