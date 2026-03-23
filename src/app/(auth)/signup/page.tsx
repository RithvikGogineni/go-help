'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft,
  Chrome, AlertCircle, User, Building2, HandHeart,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import { FadeIn } from '@/components/animations/FadeIn';

const roles = [
  {
    id: 'volunteer' as UserRole,
    title: 'Volunteer',
    description: 'I want to help others and find volunteer opportunities',
    icon: User,
    color: 'bg-yellow-500',
  },
  {
    id: 'organization' as UserRole,
    title: 'Organization',
    description: 'I represent an NGO, charity, or community group',
    icon: Building2,
    color: 'bg-blue-500',
  },
  {
    id: 'person_in_need' as UserRole,
    title: 'Need Help',
    description: 'I or my family need assistance',
    icon: HandHeart,
    color: 'bg-orange-500',
  },
];

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreed) {
      setError('Please agree to the terms and conditions');
      return;
    }

    try {
      await signup(email, password, name, selectedRole!);
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    if (!selectedRole) {
      setError('Please select an account type first');
      return;
    }
    try {
      await signup('google@example.com', 'password', 'Google User', selectedRole);
      router.push('/dashboard');
    } catch (err) {
      setError('Google sign-up failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl" />
      </div>

      <FadeIn className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <img
              src="/logo.png"
              alt="GoHelp Logo"
              className="h-[200px] w-auto"
            />
          </Link>

          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                {step === 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 -ml-2"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                )}
                <CardTitle className="text-2xl font-bold">
                  {step === 1 ? 'Create an account' : 'Complete your profile'}
                </CardTitle>
              </div>
              <CardDescription>
                {step === 1
                  ? 'Select how you want to use GoHelp'
                  : 'Fill in your details to get started'}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-3"
                  >
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => handleRoleSelect(role.id)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all hover:border-yellow-300 hover:shadow-md ${selectedRole === role.id
                            ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                            : 'border-gray-200 dark:border-gray-700'
                          }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl ${role.color} flex items-center justify-center flex-shrink-0`}>
                            <role.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {role.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {role.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    {/* Google Sign Up */}
                    <Button
                      variant="outline"
                      className="w-full rounded-full h-12"
                      onClick={handleGoogleSignUp}
                      disabled={isLoading}
                    >
                      <Chrome className="w-5 h-5 mr-2" />
                      Continue with Google
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">
                          Or sign up with email
                        </span>
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <Alert variant="destructive" className="rounded-xl">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="rounded-xl h-12"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 rounded-xl h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 pr-10 rounded-xl h-12"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="rounded-xl h-12"
                          required
                        />
                      </div>

                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => setAgreed(!agreed)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${agreed
                              ? 'bg-yellow-500 border-yellow-500'
                              : 'border-gray-300 dark:border-gray-600'
                            }`}
                        >
                          {agreed && <Check className="w-3 h-3 text-white" />}
                        </button>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          I agree to the{' '}
                          <Link href="#" className="text-yellow-600 hover:text-yellow-700">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link href="#" className="text-yellow-600 hover:text-yellow-700">
                            Privacy Policy
                          </Link>
                        </p>
                      </div>

                      <Button
                        type="submit"
                        className="w-full rounded-xl h-12 gradient-primary hover:opacity-90"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            Create account
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-yellow-600 hover:text-yellow-700"
                >
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </FadeIn>
    </div>
  );
}
