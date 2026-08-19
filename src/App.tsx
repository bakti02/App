import React, { useState, useEffect } from 'react';
import { IconRail } from './components/IconRail';
import { Sidebar } from './components/Sidebar';
import { BillingView } from './components/BillingView';
import { OverviewDashboard } from './components/OverviewDashboard';
import { AnalyticsView } from './components/AnalyticsView';
import { OtherViews } from './components/OtherViews';
import { MarketplaceView } from './components/MarketplaceView';
import { ActionCenterView } from './components/ActionCenterView';
import { AssetsCloudView } from './components/AssetsCloudView';
import { RiskExposureView } from './components/RiskExposureView';
import { AttackPathsView } from './components/AttackPathsView';
import { IdentityView } from './components/IdentityView';
import { ComplianceTrustView } from './components/ComplianceTrustView';
import { EvidenceView } from './components/EvidenceView';
import { RegulatoryIntelligenceView } from './components/RegulatoryIntelligenceView';
import { ReportsView } from './components/ReportsView';
import { DataExplorerView } from './components/DataExplorerView';
import { PqcReadinessView } from './components/PqcReadinessView';
import { MigrationCenterView } from './components/MigrationCenterView';
import { DeveloperApiView } from './components/DeveloperApiView';
import { DeveloperSdkView } from './components/DeveloperSdkView';
import { GithubConnectView } from './components/GithubConnectView';
import { OrganizationView } from './components/OrganizationView';
import { SettingsView } from './components/SettingsView';
import { UpgradeModal } from './components/UpgradeModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { NavigationSection, PlanTier, BillingCycle, AddOnItem } from './types';
import { Menu, X, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function MainAppContent() {
  const [currentSection, setCurrentSection] = useState<NavigationSection>('overview');
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
        setIsCommandPaletteOpen((prev) => !prev);
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

  const renderActiveView = () => {
    switch (currentSection) {
      case 'marketplace':
        return (
          <MarketplaceView
            onNavigateToBilling={() => setCurrentSection('billing')}
            showToast={showToast}
          />
        );
      case 'action-center':
        return <ActionCenterView showToast={showToast} />;
      case 'assets-cloud':
        return <AssetsCloudView showToast={showToast} />;
      case 'risk-exposure':
        return <RiskExposureView showToast={showToast} />;
      case 'attack-paths':
        return <AttackPathsView showToast={showToast} />;
      case 'identity':
        return <IdentityView showToast={showToast} />;
      case 'compliance':
        return <ComplianceTrustView showToast={showToast} />;
      case 'evidence':
        return <EvidenceView showToast={showToast} />;
      case 'regulatory':
        return <RegulatoryIntelligenceView showToast={showToast} />;
      case 'reports':
        return <ReportsView showToast={showToast} />;
      case 'data-explorer':
        return <DataExplorerView showToast={showToast} />;
      case 'pqc-readiness':
        return <PqcReadinessView showToast={showToast} />;
      case 'migration-center':
        return <MigrationCenterView showToast={showToast} />;
      case 'pqc-api':
        return <DeveloperApiView showToast={showToast} />;
      case 'pqc-sdk':
        return <DeveloperSdkView showToast={showToast} />;
      case 'github-connect':
        return <GithubConnectView showToast={showToast} />;
      case 'organization':
      case 'members':
        return <OrganizationView showToast={showToast} />;
      case 'settings':
      case 'preference':
        return <SettingsView showToast={showToast} />;
      case 'analytics':
        return <AnalyticsView showToast={showToast} />;
      case 'billing':
        return (
          <BillingView
            onUpgradePlan={handleUpgradePlan}
            activeAddons={activeAddons}
            onToggleAddon={handleToggleAddon}
            showToast={showToast}
          />
        );
      case 'overview':
      default:
        return (
          <OverviewDashboard
            onNavigateToBilling={() => setCurrentSection('billing')}
            onNavigateToAnalytics={() => setCurrentSection('analytics')}
            onUpgrade={handleUpgradePlan}
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            showToast={showToast}
          />
        );
    }
  };

  return (
    <div className="h-screen w-screen flex bg-slate-100 dark:bg-slate-950 overflow-hidden font-sans antialiased text-slate-900 dark:text-slate-100 select-none transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 dark:border-slate-600 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main App Canvas: Window-like Card Container matching the design system */}
      <div className="flex-1 flex overflow-hidden bg-[#f8fafc] dark:bg-slate-950 sm:m-3 sm:rounded-3xl sm:border sm:border-slate-200/80 dark:sm:border-slate-800/90 sm:shadow-xl shadow-slate-200/50 dark:shadow-black/50 transition-colors duration-200">
        {/* 1. Left Icon Rail (Desktop) */}
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
              setCurrentSection('organization');
              showToast('Buka formulir undangan untuk menambahkan anggota ke organisasi.');
            }}
          />
        </div>

        {/* Mobile Navigation Drawer with Smooth Animation */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
                onClick={() => setMobileSidebarOpen(false)}
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ x: '-100%', opacity: 0.7 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 26, stiffness: 280 }}
                className="relative z-50 flex h-full bg-white dark:bg-slate-900 shadow-2xl overflow-hidden"
              >
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
                <div className="relative flex flex-col h-full">
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
                  {/* Quick Close Button */}
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="absolute top-4 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Tutup Menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 3. Main Dynamic Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-200">
          {/* Mobile Top Header Bar */}
          <div className="lg:hidden h-14 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-4 flex items-center justify-between shrink-0">
            <button
              id="mobile-hamburger-btn"
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-sm text-slate-900 dark:text-white capitalize">
              {currentSection.replace('-', ' ')}
            </span>
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="p-2 -mr-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg"
            >
              <Sparkles className="w-5 h-5" />
            </button>
          </div>

          {/* Active View Switcher */}
          {renderActiveView()}
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

      <AiAssistantModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />

      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectSection={(sec) => setCurrentSection(sec)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}
