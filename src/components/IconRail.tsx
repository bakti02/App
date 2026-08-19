import React from 'react';
import {
  Home,
  ShoppingBag,
  Cloud,
  ShieldAlert,
  GitFork,
  FileCheck2,
  Atom,
  Code2,
  CreditCard,
  Settings,
  Bell,
  Sun,
  Moon
} from 'lucide-react';
import { NavigationSection } from '../types';
import { useTheme } from '../context/ThemeContext';

interface IconRailProps {
  currentSection: NavigationSection;
  onSelectSection: (section: NavigationSection) => void;
  onOpenNotifications?: () => void;
  unreadCount?: number;
}

export const IconRail: React.FC<IconRailProps> = ({
  currentSection,
  onSelectSection,
  onOpenNotifications,
  unreadCount = 3
}) => {
  const { isDark, toggleTheme } = useTheme();

  const topNavItems = [
    { icon: Home, section: 'overview' as NavigationSection, label: 'Overview' },
    { icon: ShoppingBag, section: 'marketplace' as NavigationSection, label: 'Marketplace' },
    { icon: Cloud, section: 'assets-cloud' as NavigationSection, label: 'Assets & Cloud' },
    { icon: ShieldAlert, section: 'risk-exposure' as NavigationSection, label: 'Risk & Exposure' },
    { icon: GitFork, section: 'attack-paths' as NavigationSection, label: 'Attack Paths' },
    { icon: FileCheck2, section: 'compliance' as NavigationSection, label: 'Compliance & Trust' },
    { icon: Atom, section: 'pqc-readiness' as NavigationSection, label: 'PQC Quantum' },
    { icon: Code2, section: 'pqc-api' as NavigationSection, label: 'Developer API' },
    { icon: CreditCard, section: 'billing' as NavigationSection, label: 'Billing & Plans' },
    { icon: Settings, section: 'settings' as NavigationSection, label: 'Settings' }
  ];

  return (
    <aside 
      id="icon-rail" 
      className="w-16 bg-white dark:bg-slate-900 border-r border-slate-200/90 dark:border-slate-800 flex flex-col items-center justify-between py-4 select-none shrink-0 z-20 transition-colors duration-200"
    >
      {/* Top Logo and Action Icons */}
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Brand Mark: Black rounded button with 3 vertical bars */}
        <button
          id="brand-logo-btn"
          onClick={() => onSelectSection('overview')}
          className="w-10 h-10 bg-slate-950 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-xl flex items-center justify-center transition-transform active:scale-95 shadow-sm group"
          title="NusaSec Customer Tower"
        >
          <div className="flex items-center gap-1">
            <span className="w-1 h-4 bg-white rounded-full"></span>
            <span className="w-1 h-5 bg-blue-400 rounded-full"></span>
            <span className="w-1 h-4 bg-white rounded-full"></span>
          </div>
        </button>

        <div className="w-8 h-px bg-slate-200/80 dark:bg-slate-800 my-1"></div>

        {/* Primary Vertical Navigation Icons */}
        <div className="flex flex-col items-center gap-1 w-full px-2">
          {topNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.section ||
              (item.section === 'settings' && currentSection === 'preference') ||
              (item.section === 'billing' && currentSection === 'pricing');

            return (
              <button
                key={item.section}
                id={`icon-rail-${item.section}`}
                onClick={() => onSelectSection(item.section)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 relative group ${
                  isActive
                    ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title={item.label}
              >
                <Icon className={`w-5 h-5 stroke-[1.8] ${isActive ? 'text-white' : ''}`} />
                
                {/* Tooltip on Hover */}
                <div className="absolute left-14 bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-md border border-slate-700">
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Icons: Quick Theme Toggle, Notifications & User Avatar */}
      <div className="flex flex-col items-center gap-3 w-full px-2">
        {/* Quick Theme Toggle Icon */}
        <button
          id="icon-rail-theme-toggle"
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={isDark ? 'Beralih ke Mode Terang (Light)' : 'Beralih ke Mode Gelap (Dark)'}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-400 stroke-[1.8]" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600 stroke-[1.8]" />
          )}
        </button>

        <button
          id="icon-rail-notifications"
          onClick={() => {
            if (onOpenNotifications) onOpenNotifications();
            else onSelectSection('notifications');
          }}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
          title="Notifications & Alerts"
        >
          <Bell className="w-5 h-5 stroke-[1.8]" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-600 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
          )}
        </button>

        {/* User Avatar */}
        <button
          id="icon-rail-user-profile"
          onClick={() => onSelectSection('organization')}
          className="w-9 h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-xs transition-transform hover:scale-105 active:scale-95"
          title="Organization & SOC Profile (Nurlaela Azwini)"
        >
          <div className="w-full h-full rounded-[8px] bg-slate-900 dark:bg-slate-950 flex items-center justify-center text-white font-bold text-xs">
            NA
          </div>
        </button>
      </div>
    </aside>
  );
};
