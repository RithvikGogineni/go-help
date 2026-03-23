'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, ArrowRight, ArrowLeft, Check, User, Users, Building,
  Utensils, Home, BookOpen, HeartHandshake, Stethoscope, 
  MessageCircle, Car, Briefcase, AlertCircle, MapPin, Camera,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FadeIn } from '@/components/animations/FadeIn';
import { parishes, opportunityTypes } from '@/mock/data';

const requesterTypes = [
  { id: 'individual', label: 'Individual', icon: User, description: 'I need help for myself' },
  { id: 'family', label: 'Family', icon: Users, description: 'My family needs help' },
  { id: 'community', label: 'Community', icon: Building, description: 'My community needs help' },
];

const helpTypes = [
  { id: 'food', label: 'Food & Nutrition', icon: Utensils, description: 'Meals, groceries, food packages' },
  { id: 'shelter', label: 'Shelter & Housing', icon: Home, description: 'Emergency shelter, housing assistance' },
  { id: 'education', label: 'School Supplies', icon: BookOpen, description: 'Books, uniforms, tuition help' },
  { id: 'elderly', label: 'Elderly Support', icon: HeartHandshake, description: 'Caregiving, companionship' },
  { id: 'medical', label: 'Medical Support', icon: Stethoscope, description: 'Healthcare, medication, transport' },
  { id: 'counseling', label: 'Counseling', icon: MessageCircle, description: 'Mental health, emotional support' },
  { id: 'transportation', label: 'Transportation', icon: Car, description: 'Rides to appointments, errands' },
  { id: 'employment', label: 'Job Support', icon: Briefcase, description: 'Resume help, job training' },
];

const urgencyLevels = [
  { id: 'low', label: 'Low', description: 'Within the next few weeks', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'medium', label: 'Medium', description: 'Within the next week', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: 'urgent', label: 'Urgent', description: 'As soon as possible', color: 'bg-red-100 text-red-700 border-red-200' },
];

export default function RequestHelpPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    requesterType: '',
    helpType: '',
    parish: '',
    address: '',
    urgency: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    description: '',
    images: [] as string[],
  });

  const updateFormData = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setError('');
  };

  const handleNext = () => {
    // Validate current step
    if (step === 1 && !formData.requesterType) {
      setError('Please select who needs help');
      return;
    }
    if (step === 2 && !formData.helpType) {
      setError('Please select the type of help needed');
      return;
    }
    if (step === 3 && !formData.parish) {
      setError('Please select your parish');
      return;
    }
    if (step === 4 && !formData.urgency) {
      setError('Please select the urgency level');
      return;
    }
    if (step === 5) {
      if (!formData.contactName || !formData.contactPhone) {
        setError('Please provide your name and phone number');
        return;
      }
      if (!formData.description) {
        setError('Please describe your situation');
        return;
      }
    }

    if (step < 6) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-hero p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center relative z-10"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Request Submitted!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for reaching out. We&apos;ve received your request and will connect you 
            with volunteers and organizations in your area who can help.
          </p>
          <div className="space-y-3">
            <Button 
              className="w-full rounded-xl gradient-primary" 
              onClick={() => router.push('/dashboard')}
            >
              View Your Request
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full rounded-xl"
              onClick={() => router.push('/organizations')}
            >
              Browse Organizations
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/20 py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <Badge className="mb-4 rounded-full">Request Help</Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              We&apos;re here to help
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Tell us what you need and we&apos;ll connect you with volunteers and organizations 
              who can assist you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-16 lg:top-20 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Step {step} of 6
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {Math.round((step / 6) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 6) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6"
                  >
                    <Alert variant="destructive" className="rounded-xl">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Who needs help?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Select the option that best describes your situation.
                    </p>
                    <div className="grid gap-4">
                      {requesterTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => updateFormData('requesterType', type.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                            formData.requesterType === type.id
                              ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              formData.requesterType === type.id
                                ? 'bg-yellow-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                            }`}>
                              <type.icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {type.label}
                              </h3>
                              <p className="text-sm text-gray-500">{type.description}</p>
                            </div>
                            {formData.requesterType === type.id && (
                              <Check className="w-5 h-5 text-yellow-9000 ml-auto" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      What type of help do you need?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Select the category that best describes your need.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {helpTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => updateFormData('helpType', type.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                            formData.helpType === type.id
                              ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              formData.helpType === type.id
                                ? 'bg-yellow-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                            }`}>
                              <type.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {type.label}
                              </h3>
                              <p className="text-xs text-gray-500">{type.description}</p>
                            </div>
                            {formData.helpType === type.id && (
                              <Check className="w-5 h-5 text-yellow-9000" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Where are you located?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      This helps us connect you with nearby volunteers and organizations.
                    </p>
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="parish">Parish</Label>
                        <Select value={formData.parish} onValueChange={(value) => updateFormData('parish', value)}>
                          <SelectTrigger className="mt-2 rounded-xl h-12">
                            <SelectValue placeholder="Select your parish" />
                          </SelectTrigger>
                          <SelectContent>
                            {parishes.map(parish => (
                              <SelectItem key={parish} value={parish}>{parish}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="address">Address (Optional)</Label>
                        <Input
                          id="address"
                          placeholder="Enter your address or nearest landmark"
                          value={formData.address}
                          onChange={(e) => updateFormData('address', e.target.value)}
                          className="mt-2 rounded-xl h-12"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      How urgent is your request?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      This helps us prioritize and respond appropriately.
                    </p>
                    <div className="space-y-4">
                      {urgencyLevels.map((level) => (
                        <button
                          key={level.id}
                          onClick={() => updateFormData('urgency', level.id)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                            formData.urgency === level.id
                              ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={level.color}>{level.label}</Badge>
                              </div>
                              <p className="text-sm text-gray-500">{level.description}</p>
                            </div>
                            {formData.urgency === level.id && (
                              <Check className="w-5 h-5 text-yellow-9000" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      How can we reach you?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Provide your contact information so volunteers can get in touch.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="contactName">Full Name *</Label>
                        <Input
                          id="contactName"
                          placeholder="Your full name"
                          value={formData.contactName}
                          onChange={(e) => updateFormData('contactName', e.target.value)}
                          className="mt-2 rounded-xl h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactPhone">Phone Number *</Label>
                        <Input
                          id="contactPhone"
                          type="tel"
                          placeholder="(876) 555-0100"
                          value={formData.contactPhone}
                          onChange={(e) => updateFormData('contactPhone', e.target.value)}
                          className="mt-2 rounded-xl h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactEmail">Email (Optional)</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.contactEmail}
                          onChange={(e) => updateFormData('contactEmail', e.target.value)}
                          className="mt-2 rounded-xl h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Describe your situation *</Label>
                        <Textarea
                          id="description"
                          placeholder="Please provide details about what you need help with..."
                          value={formData.description}
                          onChange={(e) => updateFormData('description', e.target.value)}
                          className="mt-2 rounded-xl min-h-[120px]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 6 && (
                  <motion.div
                    key="step6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Review your request
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Please review your information before submitting.
                    </p>
                    <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Requester Type</span>
                        <span className="font-medium capitalize">{formData.requesterType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Help Type</span>
                        <span className="font-medium">
                          {helpTypes.find(t => t.id === formData.helpType)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Location</span>
                        <span className="font-medium">{formData.parish}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Urgency</span>
                        <span className="font-medium capitalize">{formData.urgency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Contact</span>
                        <span className="font-medium">{formData.contactName}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <Button
                    variant="outline"
                    className="rounded-xl h-12 px-6"
                    onClick={handleBack}
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
                <Button
                  className="flex-1 rounded-xl h-12 gradient-primary"
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : step === 6 ? (
                    <>
                      Submit Request
                      <Heart className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
