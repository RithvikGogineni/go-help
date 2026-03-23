'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, User, LogOut, Bell, ChevronDown,
  LayoutDashboard, Calendar, Award, Building2, MessageSquare,
  HandHeart, Search, Sun, Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';

// Theme Toggle Component
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark');
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full">
        <Moon className="w-5 h-5 text-gray-600" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hidden sm:flex rounded-full"
      onClick={toggleTheme}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-600" />
        )}
      </motion.div>
    </Button>
  );
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/opportunities', label: 'Opportunities' },
  { href: '/organizations', label: 'Organizations' },
  { href: '/donations', label: 'Donate' },
  { href: '/events', label: 'Events' },
];

const dashboardLinks = {
  volunteer: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/opportunities', label: 'Find Opportunities', icon: Search },
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/recognition', label: 'Recognition', icon: Award },
    { href: '/messages', label: 'Messages', icon: MessageSquare },
  ],
  organization: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/opportunities/new', label: 'Post Opportunity', icon: HandHeart },
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/messages', label: 'Messages', icon: MessageSquare },
  ],
  person_in_need: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/request-help', label: 'Request Help', icon: HandHeart },
    { href: '/organizations', label: 'Organizations', icon: Building2 },
    { href: '/messages', label: 'Messages', icon: MessageSquare },
  ],
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'glass-neo shadow-lg'
          : 'bg-transparent'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <img
                  src="/logo.png"
                  alt="GoHelp Logo"
                  className="h-30 w-auto"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl ${isActive(link.href)
                    ? 'text-[#8BC34A] dark:text-[#C7E69E]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 neu-pressed rounded-xl -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <ThemeToggle />

              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <Button variant="ghost" size="icon" className="relative rounded-full">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFE167] rounded-full" />
                  </Button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2 pl-2 pr-3 rounded-full">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback className="bg-[#C7E69E]/30 text-[#689F38]">
                            {user?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden sm:inline text-sm font-medium max-w-[100px] truncate">
                          {user?.name}
                        </span>
                        <ChevronDown className="w-4 h-4 hidden sm:block" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {user?.role?.replace('_', ' ')}
                        </p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Button variant="ghost" asChild className="rounded-full">
                    <Link href="/login">Sign in</Link>
                  </Button>
                  <Button asChild className="rounded-full gradient-primary hover:opacity-90 shadow-glow hover:shadow-lg transition-shadow">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
          >
            <div className="glass-frost border-b border-white/20 dark:border-gray-800 px-4 py-6 shadow-xl">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${isActive(link.href)
                      ? 'neu-pressed text-[#8BC34A] dark:text-[#C7E69E]'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <Button variant="outline" asChild className="w-full rounded-xl">
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        Sign in
                      </Link>
                    </Button>
                    <Button asChild className="w-full rounded-xl gradient-primary">
                      <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
