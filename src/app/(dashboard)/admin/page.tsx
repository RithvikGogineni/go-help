'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Building2, HandHeart, DollarSign, TrendingUp,
  AlertTriangle, CheckCircle, XCircle, Search, Filter,
  MoreVertical, MapPin, BarChart3, PieChart, ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { mockAdminStats, mockOrganizations, mockVolunteers, mockHelpRequests } from '@/mock/data';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold">Admin Dashboard</h1>
            </div>
            <p className="text-gray-400">
              Manage users, organizations, and monitor platform activity
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 -mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StaggerItem>
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Active Users</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {mockAdminStats.activeUsers.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-yellow-600">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+{mockAdminStats.newUsersThisMonth} this month</span>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Organizations</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {mockOrganizations.length}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-yellow-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-yellow-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>{mockOrganizations.filter(o => o.verified).length} verified</span>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Donations</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${(mockAdminStats.donationTotals / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-yellow-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12% this month</span>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Requests Completed</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {mockAdminStats.completedRequestsThisMonth}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <HandHeart className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-yellow-600">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>This month</span>
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
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-8">
              <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
              <TabsTrigger value="users" className="rounded-lg">Users</TabsTrigger>
              <TabsTrigger value="organizations" className="rounded-lg">Organizations</TabsTrigger>
              <TabsTrigger value="requests" className="rounded-lg">Help Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Requests by Parish */}
                <FadeIn>
                  <Card className="border-0 shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-yellow-9000" />
                        Requests by Parish
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(mockAdminStats.requestsByParish)
                          .sort(([,a], [,b]) => b - a)
                          .slice(0, 8)
                          .map(([parish, count]) => (
                            <div key={parish} className="flex items-center gap-4">
                              <span className="text-sm text-gray-600 w-32">{parish}</span>
                              <div className="flex-1">
                                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(count / 1250) * 100}%` }}
                                    className="h-full bg-yellow-500 rounded-full"
                                  />
                                </div>
                              </div>
                              <span className="text-sm font-medium w-12 text-right">{count}</span>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>

                {/* Request Types */}
                <FadeIn delay={0.1}>
                  <Card className="border-0 shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-orange-9000" />
                        Request Types
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(mockAdminStats.requestTypes)
                          .sort(([,a], [,b]) => b - a)
                          .slice(0, 8)
                          .map(([type, count]) => (
                            <div key={type} className="flex items-center gap-4">
                              <span className="text-sm text-gray-600 w-32 capitalize">{type.replace('_', ' ')}</span>
                              <div className="flex-1">
                                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(count / 2200) * 100}%` }}
                                    className="h-full bg-orange-500 rounded-full"
                                  />
                                </div>
                              </div>
                              <span className="text-sm font-medium w-12 text-right">{count}</span>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              </div>
            </TabsContent>

            <TabsContent value="users">
              <FadeIn>
                <Card className="border-0 shadow-soft">
                  <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <CardTitle>All Users</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search users..." className="pl-9 rounded-xl w-64" />
                      </div>
                      <Button variant="outline" size="icon" className="rounded-xl">
                        <Filter className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Parish</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockVolunteers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={user.avatar} />
                                  <AvatarFallback className="bg-yellow-100 text-yellow-700">
                                    {user.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{user.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="rounded-full capitalize">
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.parish}</TableCell>
                            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge className="rounded-full bg-yellow-100 text-yellow-700">
                                Active
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" className="rounded-full">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </FadeIn>
            </TabsContent>

            <TabsContent value="organizations">
              <FadeIn>
                <Card className="border-0 shadow-soft">
                  <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <CardTitle>Organizations</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search organizations..." className="pl-9 rounded-xl w-64" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Organization</TableHead>
                          <TableHead>Parish</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Volunteers</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockOrganizations.map((org) => (
                          <TableRow key={org.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={org.avatar} />
                                  <AvatarFallback className="bg-yellow-100 text-yellow-700">
                                    {org.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{org.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{org.parish}</TableCell>
                            <TableCell>
                              {org.verified ? (
                                <Badge className="rounded-full bg-yellow-100 text-yellow-700">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="rounded-full">
                                  Pending
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{org.impactStats.volunteersEngaged}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {!org.verified && (
                                  <Button size="sm" className="rounded-full gradient-primary">
                                    Verify
                                  </Button>
                                )}
                                <Button variant="ghost" size="icon" className="rounded-full">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </FadeIn>
            </TabsContent>

            <TabsContent value="requests">
              <FadeIn>
                <Card className="border-0 shadow-soft">
                  <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <CardTitle>Help Requests</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search requests..." className="pl-9 rounded-xl w-64" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Request</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Parish</TableHead>
                          <TableHead>Urgency</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockHelpRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                                  <HandHeart className="w-4 h-4 text-yellow-600" />
                                </div>
                                <div>
                                  <p className="font-medium capitalize">{request.type} Assistance</p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(request.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="capitalize">{request.requesterType}</TableCell>
                            <TableCell>{request.parish}</TableCell>
                            <TableCell>
                              <Badge className={`rounded-full ${
                                request.urgency === 'urgent' ? 'bg-red-100 text-red-700' :
                                request.urgency === 'medium' ? 'bg-orange-100 text-orange-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {request.urgency}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="rounded-full capitalize">
                                {request.status.replace('_', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="rounded-full">
                                Review
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </FadeIn>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
