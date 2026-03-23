'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Camera, Save, CheckCircle,
  Briefcase, Award, Clock, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { FadeIn } from '@/components/animations/FadeIn';
import { useAuth } from '@/context/AuthContext';
import { mockVolunteers, parishes, skillCategories } from '@/mock/data';

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    parish: user?.parish || '',
    bio: (user as any)?.bio || '',
  });

  if (!user) {
    router.push('/login');
    return null;
  }

  const volunteerData = user.role === 'volunteer' 
    ? mockVolunteers.find(v => v.id === user.id) || mockVolunteers[0]
    : null;

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateUser(formData as Partial<typeof user>);
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/20 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <Avatar className="w-32 h-32 ring-4 ring-white dark:ring-gray-800">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-yellow-100 text-yellow-700 text-3xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center shadow-lg hover:bg-yellow-500 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {user.name}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <Badge className="rounded-full capitalize">
                    {user.role.replace('_', ' ')}
                  </Badge>
                  {user.parish && (
                    <Badge variant="secondary" className="rounded-full">
                      <MapPin className="w-3 h-3 mr-1" />
                      {user.parish}
                    </Badge>
                  )}
                  <Badge variant="outline" className="rounded-full">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>
              <div>
                {isEditing ? (
                  <Button 
                    className="rounded-full gradient-primary"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Save Changes
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="rounded-full"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
              <TabsTrigger value="profile" className="rounded-lg">Profile</TabsTrigger>
              {volunteerData && (
                <TabsTrigger value="volunteering" className="rounded-lg">Volunteering</TabsTrigger>
              )}
              <TabsTrigger value="settings" className="rounded-lg">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <FadeIn>
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          disabled={!isEditing}
                          className="mt-2 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={!isEditing}
                          className="mt-2 rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          disabled={!isEditing}
                          className="mt-2 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="parish">Parish</Label>
                        <select
                          id="parish"
                          value={formData.parish}
                          onChange={(e) => setFormData({ ...formData, parish: e.target.value })}
                          disabled={!isEditing}
                          className="mt-2 w-full h-10 rounded-xl border border-input bg-background px-3"
                        >
                          <option value="">Select Parish</option>
                          {parishes.map(p => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        disabled={!isEditing}
                        className="mt-2 rounded-xl min-h-[100px]"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </TabsContent>

            {volunteerData && (
              <TabsContent value="volunteering" className="space-y-6">
                <FadeIn>
                  <Card className="border-0 shadow-soft">
                    <CardHeader>
                      <CardTitle>Volunteering Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                          <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {volunteerData.totalHours}
                          </p>
                          <p className="text-sm text-gray-500">Hours</p>
                        </div>
                        <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                          <CheckCircle className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {volunteerData.completedOpportunities}
                          </p>
                          <p className="text-sm text-gray-500">Completed</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                          <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {volunteerData.badges.length}
                          </p>
                          <p className="text-sm text-gray-500">Badges</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                          <Star className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            4.9
                          </p>
                          <p className="text-sm text-gray-500">Rating</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <Card className="border-0 shadow-soft">
                    <CardHeader>
                      <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {volunteerData.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="rounded-full px-3 py-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <Card className="border-0 shadow-soft">
                    <CardHeader>
                      <CardTitle>Badges</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                        {volunteerData.badges.map((badge) => (
                          <div 
                            key={badge.id}
                            className={`w-16 h-16 rounded-2xl ${badge.color} flex items-center justify-center mx-auto`}
                            title={badge.name}
                          >
                            <Award className="w-8 h-8 text-white" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              </TabsContent>
            )}

            <TabsContent value="settings" className="space-y-6">
              <FadeIn>
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates about opportunities</p>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-full">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive text message updates</p>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-full">
                        Disabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Public Profile</p>
                        <p className="text-sm text-gray-500">Make your profile visible to others</p>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-full">
                        Enabled
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.1}>
                <Card className="border-0 shadow-soft border-red-100 dark:border-red-900/30">
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Delete Account</p>
                        <p className="text-sm text-gray-500">Permanently delete your account and data</p>
                      </div>
                      <Button variant="destructive" className="rounded-full">
                        Delete
                      </Button>
                    </div>
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
