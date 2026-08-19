import { PlanTier, AddOnItem, TeamMember, InvoiceItem } from '../types';

export const PLANS_DATA: PlanTier[] = [
  {
    id: 'free',
    name: 'Free',
    subtitle: 'Everything free',
    monthlyPrice: 0,
    annualPrice: 0,
    isCurrent: true,
    buttonLabel: 'Your current plan',
    buttonVariant: 'outline',
    features: [
      'Free plan features',
      '1 GB storage',
      'One workspace',
      '1:1 audio and video meetings',
      'Time tracking',
      'AI compatible',
      'Two-factor authentication',
      'Data exports for all messages',
      'SMS 2-factor authentication'
    ]
  },
  {
    id: 'plus',
    name: 'Plus',
    subtitle: 'Everything you needed',
    badge: 'MOST POPULAR',
    badgeType: 'popular',
    monthlyPrice: 12,
    annualPrice: 10,
    isCurrent: false,
    buttonLabel: 'Upgrade now',
    buttonVariant: 'primary',
    features: [
      'Everything in free plan',
      'Unlimited timeline views',
      'Unlimited teams',
      'Private docs',
      'Google single sign-on (SSO)',
      'Custom workflow steps',
      'Custom user groups',
      'Premium workflows',
      'Custom templates'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    subtitle: 'Power team with scale',
    badge: 'MOST VALUABLE',
    badgeType: 'valuable',
    monthlyPrice: 16,
    annualPrice: 13,
    isCurrent: false,
    buttonLabel: 'Upgrade now',
    buttonVariant: 'primary',
    features: [
      'Everything in plus plan',
      'Priority support',
      'Custom terms of service',
      'Data loss prevention',
      'Workflow builder',
      'Custom analytics data set',
      'Conditional logic in forms',
      'Custom permissions (ACL)',
      'Advanced capacity planning'
    ]
  }
];

export const ADDONS_DATA: AddOnItem[] = [
  {
    id: 'ai-addon',
    title: 'Add AI to your paid plan for just $4',
    subtitle: 'Get instant answers to your questions, pull insights from hundreds of pages at once.',
    badge: 'NEW',
    monthlyPrice: 4,
    annualPrice: 3.5,
    iconType: 'ai-rainbow',
    isAdded: false
  },
  {
    id: 'workflow-assistant',
    title: 'Personalized workflow assistant for $2',
    subtitle: 'Get instant workflow assistant, pull insights from hundreds of members.',
    monthlyPrice: 2,
    annualPrice: 1.8,
    iconType: 'assistant-dark',
    isAdded: false
  }
];

export const TEAM_MEMBERS_DATA: TeamMember[] = [
  {
    id: '1',
    name: 'Nurlaela Azwini',
    email: 'nurlaelaazwini66@gmail.com',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'active'
  },
  {
    id: '2',
    name: 'Alex Morgan',
    email: 'alex.morgan@workspace.io',
    role: 'Editor',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    status: 'active'
  },
  {
    id: '3',
    name: 'Sarah Connor',
    email: 'sarah.c@goodwriter.co',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    status: 'active'
  },
  {
    id: '4',
    name: 'David Chen',
    email: 'david.chen@invoicer.dev',
    role: 'Viewer',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    status: 'invited'
  }
];

export const INVOICES_DATA: InvoiceItem[] = [
  {
    id: 'INV-2026-003',
    date: 'Aug 01, 2026',
    amount: '$0.00',
    plan: 'Free Workspace Tier',
    status: 'Paid',
    downloadUrl: '#'
  },
  {
    id: 'INV-2026-002',
    date: 'Jul 01, 2026',
    amount: '$0.00',
    plan: 'Free Workspace Tier',
    status: 'Paid',
    downloadUrl: '#'
  },
  {
    id: 'INV-2026-001',
    date: 'Jun 01, 2026',
    amount: '$0.00',
    plan: 'Free Workspace Tier',
    status: 'Paid',
    downloadUrl: '#'
  }
];
