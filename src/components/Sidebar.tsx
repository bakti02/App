import React from 'react';
import {
  Search,
  LayoutGrid,
  ShoppingBag,
  CheckSquare,
  BarChart3,
  Bell,
  Cloud,
  ShieldAlert,
  GitFork,
  Fingerprint,
  FileCheck2,
  FileText,
  BookOpen,
  PieChart,
  Database,
  Atom,
  Binary,
  Code2,
  Package,
  Github,
  CreditCard,
  Building2,
  Settings,
  Plus
} from 'lucide-react';
import { NavigationSection } from '../types';

interface SidebarProps {
  currentSection: NavigationSection;
  onSelectSection: (section: NavigationSection) => void;
  onOpenSearch: () => void;
  searchQuery?: string;
  onAddNewTeam?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSelectSection,
  onOpenSearch,
  onAddNewTeam
}) => {
  // Navigation structure based on NusaSec Customer Tower Taxonomy
  const navigationGroups = [
    {
      group: 'MARKETPLACE',
      items: [
        { id: 'marketplace' as NavigationSection, label: 'All Services', icon: ShoppingBag, badge: 'Catalog' }
      ]
    },
    {
      group: 'DASHBOARD',
      items: [
        { id: 'overview' as NavigationSection, label: 'Overview', icon: LayoutGrid },
        { id: 'action-center' as NavigationSection, label: 'Action Center', icon: CheckSquare, badge: '4 New' },
        { id: 'analytics' as NavigationSection, label: 'Analytics', icon: BarChart3 },
        { id: 'notifications' as NavigationSection, label: 'Notifications', icon: Bell }
      ]
    },
    {
      group: 'SECURITY (NusaSec Secure)',
      items: [
        { id: 'assets-cloud' as NavigationSection, label: 'Assets & Cloud', icon: Cloud },
        { id: 'risk-exposure' as NavigationSection, label: 'Risk & Exposure', icon: ShieldAlert, badge: '3 CVSS' },
        { id: 'attack-paths' as NavigationSection, label: 'Attack Paths', icon: GitFork },
        { id: 'identity' as NavigationSection, label: 'Identity', icon: Fingerprint }
      ]
    },
    {
      group: 'TRUST (NusaSec Trust)',
      items: [
        { id: 'compliance' as NavigationSection, label: 'Compliance', icon: FileCheck2, badge: '96.4%' },
        { id: 'evidence' as NavigationSection, label: 'Evidence', icon: FileText },
        { id: 'regulatory' as NavigationSection, label: 'Regulatory', icon: BookOpen },
        { id: 'reports' as NavigationSection, label: 'Reports', icon: PieChart }
      ]
    },
    {
      group: 'DATA INTELLIGENCE',
      items: [
        { id: 'data-explorer' as NavigationSection, label: 'Data Explorer', icon: Database }
      ]
    },
    {
      group: 'QUANTUM (NusaSec Quantum)',
      items: [
        { id: 'pqc-readiness' as NavigationSection, label: 'PQC Readiness', icon: Atom, badge: 'NIST PQC' },
        { id: 'migration-center' as NavigationSection, label: 'Migration Center', icon: Binary }
      ]
    },
    {
      group: 'DEVELOPER',
      items: [
        { id: 'pqc-api' as NavigationSection, label: 'PQC API', icon: Code2 },
        { id: 'pqc-sdk' as NavigationSection, label: 'PQC SDK', icon: Package },
        { id: 'github-connect' as NavigationSection, label: 'GitHub Connect', icon: Github }
      ]
    },
    {
      group: 'COMMERCIAL & ACCOUNT',
      items: [
        { id: 'billing' as NavigationSection, label: 'Billing & Usage', icon: CreditCard },
        { id: 'organization' as NavigationSection, label: 'Organization (RBAC)', icon: Building2 },
        { id: 'settings' as NavigationSection, label: 'Settings', icon: Settings }
      ]
    }
  ];

  return (
    <div 
      id="sidebar-panel" 
      className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200/90 dark:border-slate-800 flex flex-col h-full py-4 px-3 select-none shrink-0 transition-colors duration-200"
    >
      {/* Brand Header */}
      <div className="px-3 pb-3 mb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-slate-950 dark:bg-blue-600 flex items-center justify-center text-white font-bold text-[11px] shadow-2xs">
            N
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <span>NusaSec Core</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">Tenant: nusasec-prod-88</p>
          </div>
        </div>
      </div>

      {/* Search Input Box with ⌘K Badge */}
      <div className="px-1 mb-3">
        <button
          id="sidebar-search-btn"
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-slate-400 text-xs font-medium transition-all group shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
            <span className="text-slate-500 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white text-[13px]">Search</span>
          </div>
          <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-xs">
            ⌘ K
          </kbd>
        </button>
      </div>

      {/* Navigation Scrollable Body */}
      <div className="flex-1 overflow-y-auto space-y-5 pr-1 custom-scrollbar">
        {navigationGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <div className="px-3 mb-1.5 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase font-mono">
              {group.group}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id || 
                  (item.id === 'organization' && currentSection === 'members') ||
                  (item.id === 'settings' && currentSection === 'preference');
                
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => onSelectSection(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-[13px] font-medium transition-colors ${
                      isActive
                        ? 'bg-slate-900 dark:bg-blue-600 text-white font-semibold shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 stroke-[1.9] ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase shrink-0 font-mono ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
