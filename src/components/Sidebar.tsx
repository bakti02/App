import React from 'react';
import {
  Search,
  LayoutGrid,
  Users,
  Layers,
  Gem,
  Bell,
  Sparkles,
  User,
  SlidersHorizontal,
  ShieldCheck,
  Lock,
  Code2,
  Boxes,
  FileSpreadsheet,
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
  const workplaceItems = [
    { id: 'overview' as NavigationSection, label: 'Overview', icon: LayoutGrid },
    { id: 'members' as NavigationSection, label: 'Members', icon: Users },
    { id: 'projects' as NavigationSection, label: 'Projects', icon: Layers },
    { id: 'billing' as NavigationSection, label: 'Billing', icon: Gem },
    { id: 'notifications' as NavigationSection, label: 'Notifications', icon: Bell },
    { id: 'integrations' as NavigationSection, label: 'Integrations', icon: Sparkles }
  ];

  const accountItems = [
    { id: 'profile' as NavigationSection, label: 'Profile', icon: User },
    { id: 'preference' as NavigationSection, label: 'Preference', icon: SlidersHorizontal },
    { id: 'security' as NavigationSection, label: 'Security', icon: ShieldCheck },
    { id: 'passwords' as NavigationSection, label: 'Passwords', icon: Lock },
    { id: 'api' as NavigationSection, label: 'API', icon: Code2 }
  ];

  const teamItems = [
    { id: 'team-goodwriter' as NavigationSection, label: 'GoodWriter', icon: Boxes },
    { id: 'team-invoicer' as NavigationSection, label: 'Invoicer', icon: FileSpreadsheet }
  ];

  return (
    <div 
      id="sidebar-panel" 
      className="w-64 bg-white border-r border-slate-200/90 flex flex-col h-full py-4 px-3 select-none shrink-0"
    >
      {/* Search Input Box with ⌘K Badge */}
      <div className="px-1 mb-4">
        <button
          id="sidebar-search-btn"
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-slate-400 text-xs font-medium transition-all group shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
            <span className="text-slate-500 group-hover:text-slate-800 text-[13px]">Search</span>
          </div>
          <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 rounded shadow-xs">
            ⌘ K
          </kbd>
        </button>
      </div>

      {/* Navigation Scrollable Body */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-1 custom-scrollbar">
        {/* SECTION: WORKPLACE */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Workplace
          </div>
          <div className="space-y-0.5">
            {workplaceItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => onSelectSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 stroke-[1.9] ${isActive ? 'text-slate-900' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION: MY ACCOUNT */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            My Account
          </div>
          <div className="space-y-0.5">
            {accountItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => onSelectSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 stroke-[1.9] ${isActive ? 'text-slate-900' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION: TEAM */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Team
          </div>
          <div className="space-y-0.5">
            {teamItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => onSelectSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 stroke-[1.9] ${isActive ? 'text-slate-900' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <button
              id="add-new-team-btn"
              onClick={onAddNewTeam || (() => onSelectSection('members'))}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[2] text-slate-400" />
              <span>Add new team</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
