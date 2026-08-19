import React, { useState, useEffect } from 'react';
import { Search, X, Gem, Users, Layers, Bell, Sparkles, User, SlidersHorizontal, ShieldCheck, Lock, Code2, ArrowRight } from 'lucide-react';
import { NavigationSection } from '../types';

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

  const searchableItems: Array<{ id: NavigationSection; title: string; category: string; icon: React.ElementType }> = [
    { id: 'billing', title: 'Billing & Plan (Pilihan Paket & Upgrade)', category: 'Workplace', icon: Gem },
    { id: 'overview', title: 'Workplace Overview (Metrik & Statistik)', category: 'Workplace', icon: Layers },
    { id: 'members', title: 'Members (Daftar & Undang Tim)', category: 'Workplace', icon: Users },
    { id: 'projects', title: 'Projects (Daftar Proyek & Tugas)', category: 'Workplace', icon: Layers },
    { id: 'notifications', title: 'Notifications (Log & Pemberitahuan)', category: 'Workplace', icon: Bell },
    { id: 'integrations', title: 'Integrations & Add-ons', category: 'Workplace', icon: Sparkles },
    { id: 'profile', title: 'User Profile & Akun', category: 'My Account', icon: User },
    { id: 'preference', title: 'Preferences & Pengaturan', category: 'My Account', icon: SlidersHorizontal },
    { id: 'security', title: 'Security & 2-Factor Auth', category: 'My Account', icon: ShieldCheck },
    { id: 'passwords', title: 'Passwords & Kredensial', category: 'My Account', icon: Lock },
    { id: 'api', title: 'API Keys & Webhooks', category: 'My Account', icon: Code2 }
  ];

  const filtered = searchableItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-3.5 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari navigasi, menu, atau pengaturan..."
            className="flex-1 text-sm bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-md">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectSection(item.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-white text-slate-700 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-900 block">{item.title}</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">{item.category}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600" />
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              Tidak ada hasil untuk "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
