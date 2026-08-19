import React from 'react';
import {
  Home,
  BarChart2,
  Users,
  Folder,
  Layers,
  Calendar,
  Inbox,
  Settings,
  Bell
} from 'lucide-react';
import { NavigationSection } from '../types';

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
  unreadCount = 2
}) => {
  const topNavItems = [
    { icon: Home, section: 'overview' as NavigationSection, label: 'Home' },
    { icon: BarChart2, section: 'overview' as NavigationSection, label: 'Analytics' },
    { icon: Users, section: 'members' as NavigationSection, label: 'Team Members' },
    { icon: Folder, section: 'projects' as NavigationSection, label: 'Projects' },
    { icon: Layers, section: 'billing' as NavigationSection, label: 'Workspaces & Plans' },
    { icon: Calendar, section: 'projects' as NavigationSection, label: 'Calendar' },
    { icon: Inbox, section: 'notifications' as NavigationSection, label: 'Inbox' },
    { icon: Settings, section: 'preference' as NavigationSection, label: 'Settings' }
  ];

  return (
    <aside 
      id="icon-rail" 
      className="w-16 bg-white border-r border-slate-200/90 flex flex-col items-center justify-between py-4 select-none shrink-0 z-20"
    >
      {/* Top Logo and Action Icons */}
      <div className="flex flex-col items-center gap-5 w-full">
        {/* Brand Mark: Black rounded button with 3 vertical bars */}
        <button
          id="brand-logo-btn"
          onClick={() => onSelectSection('overview')}
          className="w-10 h-10 bg-slate-950 hover:bg-slate-800 rounded-xl flex items-center justify-center transition-transform active:scale-95 shadow-sm"
          title="Workspace Home"
        >
          <div className="flex items-center gap-1">
            <span className="w-1 h-4 bg-white rounded-full"></span>
            <span className="w-1 h-5 bg-white rounded-full"></span>
            <span className="w-1 h-4 bg-white rounded-full"></span>
          </div>
        </button>

        {/* Vertical Icon List */}
        <div className="flex flex-col items-center gap-3.5 w-full px-2">
          {topNavItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = currentSection === item.section;
            return (
              <button
                key={idx}
                id={`icon-rail-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onSelectSection(item.section)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors relative group ${
                  isActive
                    ? 'text-slate-900 bg-slate-100 font-semibold'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5 stroke-[1.8]" />
                
                {/* Floating tooltip */}
                <span className="absolute left-14 bg-slate-900 text-white text-[11px] font-medium px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md z-50">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Icons: Notifications & Gradient Avatar */}
      <div className="flex flex-col items-center gap-4 w-full px-2">
        <button
          id="icon-rail-notifications"
          onClick={() => {
            if (onOpenNotifications) onOpenNotifications();
            else onSelectSection('notifications');
          }}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5 stroke-[1.8]" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
          )}
        </button>

        {/* Gradient Avatar Square from image */}
        <button
          id="icon-rail-user-profile"
          onClick={() => onSelectSection('profile')}
          className="w-9 h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-rose-500 via-amber-400 to-indigo-600 shadow-sm transition-transform hover:scale-105 active:scale-95"
          title="My Account Profile"
        >
          <div className="w-full h-full rounded-[10px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
            NA
          </div>
        </button>
      </div>
    </aside>
  );
};
