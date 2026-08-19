export type NavigationSection = 
  | 'overview' 
  | 'members' 
  | 'projects' 
  | 'billing' 
  | 'notifications' 
  | 'integrations'
  | 'profile'
  | 'preference'
  | 'security'
  | 'passwords'
  | 'api'
  | 'team-goodwriter'
  | 'team-invoicer';

export type BillingCycle = 'monthly' | 'annually';

export interface PlanFeature {
  id: string;
  name: string;
  included: boolean;
}

export interface PlanTier {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  badgeType?: 'popular' | 'valuable' | 'discount';
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  isCurrent?: boolean;
  buttonLabel: string;
  buttonVariant: 'outline' | 'primary';
}

export interface AddOnItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number;
  iconType: 'ai-rainbow' | 'assistant-dark';
  isAdded?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Member' | 'Editor' | 'Viewer';
  avatar: string;
  status: 'active' | 'invited';
}

export interface InvoiceItem {
  id: string;
  date: string;
  amount: string;
  plan: string;
  status: 'Paid' | 'Pending';
  downloadUrl: string;
}
