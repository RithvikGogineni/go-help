'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, Volunteer, Organization, PersonInNeed } from '@/types';
import { mockVolunteers, mockOrganizations } from '@/mock/data';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('gohelp_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Store user when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('gohelp_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gohelp_user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock login - find user by email
    const mockUser = mockVolunteers.find(v => v.email === email) || 
                     mockOrganizations.find(o => o.email === email);
    
    if (mockUser) {
      setUser(mockUser);
    } else {
      // Create a demo volunteer if email not found
      const demoUser: Volunteer = {
        ...mockVolunteers[0],
        id: 'demo-user',
        email,
        name: email.split('@')[0],
      };
      setUser(demoUser);
    }
    setIsLoading(false);
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const baseUser = {
      id: `new-${Date.now()}`,
      email,
      name,
      role,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let newUser: User;
    
    if (role === 'volunteer') {
      newUser = {
        ...baseUser,
        role: 'volunteer',
        bio: '',
        skills: [],
        availability: 'flexible',
        totalHours: 0,
        badges: [],
        completedOpportunities: 0,
        upcomingEvents: [],
      } as Volunteer;
    } else if (role === 'organization') {
      newUser = {
        ...baseUser,
        role: 'organization',
        mission: '',
        description: '',
        address: '',
        parish: 'Kingston',
        verified: false,
        teamSize: 0,
        impactStats: { volunteersEngaged: 0, peopleHelped: 0, eventsHosted: 0 },
        needs: [],
      } as Organization;
    } else {
      newUser = {
        ...baseUser,
        role: 'person_in_need',
        requests: [],
      } as PersonInNeed;
    }
    
    setUser(newUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gohelp_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData, updatedAt: new Date() });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
