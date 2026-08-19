import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Gem,
  Users,
  Layers,
  Bell,
  Sparkles,
  User,
  SlidersHorizontal,
  ShieldCheck,
  Lock,
  Code2,
  ArrowRight,
  BarChart3,
  Cloud,
  ShieldAlert,
  FileCheck2,
  Atom,
  ShoppingBag,
  CheckSquare,
  Sun,
  Moon,
  Laptop,
  Palette
} from 'lucide-react';
import { NavigationSection } from '../types';
import { useTheme } from '../context/ThemeContext';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (section: NavigationSection) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectSection
}) => {
  const [query, setQuery] = useState('');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchableItems: Array<{
    id: string;
    title: string;
    category: string;
    icon: React.ElementType;
    action: () => void;
  }> = [
    {
      id: 'theme-dark',
      title: 'Tema: Beralih ke Mode Gelap (Dark Mode)',
      category: 'Tampilan & Tema',
      icon: Moon,
      action: () => {
        setTheme('dark');
        onClose();
      }
    },
    {
      id: 'theme-light',
      title: 'Tema: Beralih ke Mode Terang (Light Mode)',
      category: 'Tampilan & Tema',
      icon: Sun,
      action: () => {
        setTheme('light');
        onClose();
      }
    },
    {
      id: 'theme-system',
      title: 'Tema: Ikuti Pengaturan Sistem (Auto Sync)',
      category: 'Tampilan & Tema',
      icon: Laptop,
      action: () => {
        setTheme('system');
        onClose();
      }
    },
    {
      id: 'overview',
      title: 'Overview Dashboard (Metrik & Statistik SOC)',
      category: 'Dashboard',
      icon: Layers,
      action: () => {
        onSelectSection('overview');
        onClose();
      }
    },
    {
      id: 'analytics',
      title: 'Analytics & Telemetri (Tren Serangan & PQC)',
      category: 'Dashboard',
      icon: BarChart3,
      action: () => {
        onSelectSection('analytics');
        onClose();
      }
    },
    {
      id: 'action-center',
      title: 'Action Center (Tindakan Keamanan Prioritas)',
      category: 'Dashboard',
      icon: CheckSquare,
      action: () => {
        onSelectSection('action-center');
        onClose();
      }
    },
    {
      id: 'marketplace',
      title: 'All Services Catalog (Marketplace Layanan)',
      category: 'Marketplace',
      icon: ShoppingBag,
      action: () => {
        onSelectSection('marketplace');
        onClose();
      }
    },
    {
      id: 'assets-cloud',
      title: 'Assets & Cloud (Multi-Cloud Inventory & Kube)',
      category: 'Security',
      icon: Cloud,
      action: () => {
        onSelectSection('assets-cloud');
        onClose();
      }
    },
    {
      id: 'risk-exposure',
      title: 'Risk & Exposure (Analisis CVE & Posture)',
      category: 'Security',
      icon: ShieldAlert,
      action: () => {
        onSelectSection('risk-exposure');
        onClose();
      }
    },
    {
      id: 'compliance',
      title: 'Compliance & Trust (SOC 2, ISO 27001, BSSN)',
      category: 'Trust',
      icon: FileCheck2,
      action: () => {
        onSelectSection('compliance');
        onClose();
      }
    },
    {
      id: 'pqc-readiness',
      title: 'PQC Readiness (Post-Quantum Cryptography)',
      category: 'Quantum',
      icon: Atom,
      action: () => {
        onSelectSection('pqc-readiness');
        onClose();
      }
    },
    {
      id: 'billing',
      title: 'Billing & Plan (Pilihan Paket, Stripe & Xendit)',
      category: 'Commercial',
      icon: Gem,
      action: () => {
        onSelectSection('billing');
        onClose();
      }
    },
    {
      id: 'settings',
      title: 'Settings (Konfigurasi Tenant & Global Theme)',
      category: 'Account',
      icon: Palette,
      action: () => {
        onSelectSection('settings');
        onClose();
      }
    },
    {
      id: 'notifications',
      title: 'Notifications (Log Peringatan Keamanan)',
      category: 'Dashboard',
      icon: Bell,
      action: () => {
        onSelectSection('notifications');
        onClose();
      }
    },
    {
      id: 'members',
      title: 'Members & Roles (RBAC Organisasi)',
      category: 'Organization',
      icon: Users,
      action: () => {
        onSelectSection('organization');
        onClose();
      }
    }
  ];

  const filtered = searchableItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik navigasi, aksi, atau 'dark' / 'light' untuk tema..."
            className="flex-1 text-sm bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 block">{item.title}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">{item.category}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
              Tidak ada hasil untuk "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
