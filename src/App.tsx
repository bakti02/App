import React, { useState, useEffect } from 'react';
import { IconRail } from './components/IconRail';
import { Sidebar } from './components/Sidebar';
import { BillingView } from './components/BillingView';
import { OtherViews } from './components/OtherViews';
import { UpgradeModal } from './components/UpgradeModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { NavigationSection, PlanTier, BillingCycle, AddOnItem } from './types';
import { Menu, X, CheckCircle2, Sparkles } from 'lucide-react';

export default function App() {
  const [currentSection, setCurrentSection] = useState<NavigationSection>('billing');
  const [activeAddons, setActiveAddons] = useState<string[]>([]);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedPlanForUpgrade, setSelectedPlanForUpgrade] = useState<PlanTier | null>(null);
  const [upgradeCycle, setUpgradeCycle] = useState<BillingCycle>('monthly');
  const [upgradeSeats, setUpgradeSeats] = useState<number>(1);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global ⌘K keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleUpgradePlan = (plan: PlanTier, cycle: BillingCycle, seats: number) => {
    setSelectedPlanForUpgrade(plan);
    setUpgradeCycle(cycle);
    setUpgradeSeats(seats);
    setIsUpgradeModalOpen(true);
  };

  const handleToggleAddon = (addon: AddOnItem) => {
    if (activeAddons.includes(addon.id)) {
      setActiveAddons(activeAddons.filter((id) => id !== addon.id));
      showToast(`Add-on "${addon.title}" telah dihapus.`);
    } else {
      setActiveAddons([...activeAddons, addon.id]);
      showToast(`Add-on "${addon.title}" berhasil ditambahkan ke paket!`);
    }
  };

  const handleConfirmUpgradeSuccess = (planName: string) => {
    showToast(`Selamat! Workspace Anda berhasil di-upgrade ke paket ${planName}! 🎉`);
  };

  return (
    <div className="h-screen w-screen flex bg-slate-100 overflow-hidden font-sans antialiased text-slate-900 select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main App Canvas: Window-like Card Container matching the screenshot */}
      <div className="flex-1 flex overflow-hidden bg-[#f8fafc] sm:m-3 sm:rounded-3xl sm:border sm:border-slate-200/80 sm:shadow-xl shadow-slate-200/50">
        {/* 1. Left Icon Rail (Always visible on Desktop) */}
        <div className="hidden md:flex">
          <IconRail
            currentSection={currentSection}
            onSelectSection={(sec) => {
              setCurrentSection(sec);
              setMobileSidebarOpen(false);
            }}
            onOpenNotifications={() => setCurrentSection('notifications')}
          />
        </div>

        {/* 2. Secondary Sidebar Menu (Desktop) */}
        <div className="hidden lg:flex">
          <Sidebar
            currentSection={currentSection}
            onSelectSection={(sec) => {
              setCurrentSection(sec);
              setMobileSidebarOpen(false);
            }}
            onOpenSearch={() => setIsCommandPaletteOpen(true)}
            onAddNewTeam={() => {
              setCurrentSection('members');
              showToast('Buka formulir undangan untuk menambahkan anggota ke tim baru.');
            }}
          />
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            <div 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" 
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative z-50 flex h-full bg-white shadow-2xl">
              <IconRail
                currentSection={currentSection}
                onSelectSection={(sec) => {
                  setCurrentSection(sec);
                  setMobileSidebarOpen(false);
                }}
                onOpenNotifications={() => {
                  setCurrentSection('notifications');
                  setMobileSidebarOpen(false);
                }}
              />
              <Sidebar
                currentSection={currentSection}
                onSelectSection={(sec) => {
                  setCurrentSection(sec);
                  setMobileSidebarOpen(false);
                }}
                onOpenSearch={() => {
                  setIsCommandPaletteOpen(true);
                  setMobileSidebarOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* 3. Main Dynamic Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Mobile Top Header Bar */}
          <div className="lg:hidden h-14 bg-white border-b border-slate-200/80 px-4 flex items-center justify-between shrink-0">
            <button
              id="mobile-hamburger-btn"
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-sm text-slate-900">
              {currentSection === 'billing' ? 'Billing & Plan' : currentSection}
            </span>
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="p-2 -mr-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
            >
              <Sparkles className="w-5 h-5" />
            </button>
          </div>

          {/* Active View Switcher */}
          {currentSection === 'billing' ? (
            <BillingView
              onUpgradePlan={handleUpgradePlan}
              onToggleAddon={handleToggleAddon}
              onOpenAiAssistant={() => setIsAiModalOpen(true)}
              activeAddons={activeAddons}
            />
          ) : (
            <OtherViews
              currentSection={currentSection}
              onNavigateToBilling={() => setCurrentSection('billing')}
            />
          )}
        </div>
      </div>

      {/* Modals & Dialogs */}
      <UpgradeModal
        plan={selectedPlanForUpgrade}
        billingCycle={upgradeCycle}
        seats={upgradeSeats}
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onConfirmSuccess={handleConfirmUpgradeSuccess}
      />

      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectSection={(sec) => setCurrentSection(sec)}
      />
    </div>
  );
}
