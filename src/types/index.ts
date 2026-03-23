// GoHelp Type Definitions

export type UserRole = 'volunteer' | 'organization' | 'person_in_need' | 'admin';

export type Parish = 
  | 'Kingston' | 'St. Andrew' | 'St. Catherine' | 'Clarendon' | 'Manchester'
  | 'St. Elizabeth' | 'Westmoreland' | 'Hanover' | 'St. James' | 'Trelawny'
  | 'St. Ann' | 'St. Mary' | 'Portland' | 'St. Thomas' | 'St. Mary';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  parish?: Parish;
  createdAt: Date;
  updatedAt: Date;
}

export interface Volunteer extends User {
  role: 'volunteer';
  bio: string;
  skills: string[];
  availability: 'weekdays' | 'weekends' | 'evenings' | 'flexible';
  totalHours: number;
  badges: Badge[];
  completedOpportunities: number;
  upcomingEvents: string[];
}

export interface Organization extends User {
  role: 'organization';
  mission: string;
  description: string;
  address: string;
  parish: Parish;
  verified: boolean;
  website?: string;
  teamSize: number;
  impactStats: {
    volunteersEngaged: number;
    peopleHelped: number;
    eventsHosted: number;
  };
  needs: string[];
  donationLink?: string;
}

export interface PersonInNeed extends User {
  role: 'person_in_need';
  requests: HelpRequest[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  color: string;
}

export type OpportunityType = 
  | 'food' | 'shelter' | 'education' | 'elderly' | 'medical' 
  | 'counseling' | 'transportation' | 'employment' | 'environment' | 'other';

export type OpportunityUrgency = 'low' | 'medium' | 'urgent';

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  organizationId: string;
  organizationName: string;
  organizationAvatar?: string;
  type: OpportunityType;
  parish: Parish;
  address?: string;
  location?: {
    lat: number;
    lng: number;
  };
  isRemote: boolean;
  urgency: OpportunityUrgency;
  date: Date;
  endDate?: Date;
  time?: string;
  duration?: string;
  skillsRequired: string[];
  spotsAvailable: number;
  spotsFilled: number;
  requirements: string[];
  createdAt: Date;
  image?: string;
}

export type RequestStatus = 'pending' | 'in_review' | 'matched' | 'in_progress' | 'completed' | 'cancelled';

export interface HelpRequest {
  id: string;
  userId: string;
  requesterType: 'individual' | 'family' | 'community';
  type: OpportunityType;
  description: string;
  parish: Parish;
  address?: string;
  location?: {
    lat: number;
    lng: number;
  };
  urgency: OpportunityUrgency;
  status: RequestStatus;
  images?: string[];
  contactPhone?: string;
  contactEmail?: string;
  assignedOrganizationId?: string;
  assignedVolunteerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type DonationType = 'money' | 'goods' | 'services';

export interface Donation {
  id: string;
  donorId?: string;
  donorName?: string;
  donorEmail?: string;
  type: DonationType;
  amount?: number;
  currency?: string;
  items?: string;
  serviceType?: string;
  organizationId?: string;
  causeId?: string;
  message?: string;
  isAnonymous: boolean;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface Cause {
  id: string;
  title: string;
  description: string;
  organizationId: string;
  organizationName: string;
  goal: number;
  raised: number;
  image?: string;
  endDate?: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'workshop' | 'training' | 'community' | 'fundraiser';
  category: string;
  date: Date;
  time: string;
  duration: string;
  parish: Parish;
  address: string;
  location?: {
    lat: number;
    lng: number;
  };
  maxAttendees: number;
  registeredAttendees: number;
  image?: string;
  organizerId: string;
  organizerName: string;
  skills: string[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  recipientId: string;
  content: string;
  attachments?: string[];
  read: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    role: UserRole;
  }[];
  lastMessage: Message;
  unreadCount: number;
  updatedAt: Date;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  hours: number;
  opportunities: number;
  badges: number;
  parish: Parish;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  content: string;
  rating: number;
  parish: Parish;
}

export interface PlatformStats {
  totalVolunteers: number;
  familiesHelped: number;
  ngosPartnered: number;
  donationsDelivered: number;
}

export interface AdminStats {
  activeUsers: number;
  donationTotals: number;
  requestsByParish: Record<Parish, number>;
  requestTypes: Record<OpportunityType, number>;
  newUsersThisMonth: number;
  completedRequestsThisMonth: number;
}

export interface Report {
  id: string;
  reporterId: string;
  reportedId: string;
  type: 'user' | 'request' | 'opportunity' | 'organization';
  reason: string;
  description: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
  createdAt: Date;
}
