import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Save,
  CheckCircle2,
  Bell,
  Globe,
  Lock,
  Radio,
  Server,
  Sun,
  Moon,
  Laptop,
  Palette,
  Eye,
  Sparkles
} from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';

export const SettingsView: React.FC<{ showToast?: (msg: string) => void }> = ({
  showToast = (_msg: string) => {}
}) => {
  const { theme, setTheme, isDark, toggleTheme } = useTheme();

  const [tenantName, setTenantName] = useState('NusaSec Enterprise Core');
  const [timezone, setTimezone] = useState('Asia/Jakarta (WIB)');
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [siemWebhook, setSiemWebhook] = useState('https://siem.internal.company.com/webhook/nusasec');
  const [enforceMfa, setEnforceMfa] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Pengaturan tenant dan preferensi tema global berhasil disimpan.');
  };

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    const label = newTheme === 'dark' ? 'Mode Gelap (Dark)' : newTheme === 'light' ? 'Mode Terang (Light)' : 'Sesuai Sistem Operasi';
    showToast(`Tema aplikasi dialihkan ke ${label}.`);
  };

  return (
    <div id="settings-view" className="flex-1 overflow-y-auto bg-[#f8fafc] dark:bg-slate-950 px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6 transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 font-mono">
              NusaSec Core Configuration
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Tenant Settings &amp; Security Baseline
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Kustomisasi tema tampilan visual workspace, zona waktu audit, parameter sesi SOC, dan kebijakan otentikasi.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-98"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      {/* SECTION 1: GLOBAL THEME & APPEARANCE (NEW HIGHLIGHT) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-5 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Tema &amp; Tampilan Visual Global</span>
                <span className="text-[10px] bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-700 font-mono">
                  Tailwind CSS
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pilih mode tema workspace untuk kenyamanan visual saat memantau ancaman dan analitik SOC.
              </p>
            </div>
          </div>

          {/* Quick 1-Click Toggle */}
          <div className="flex items-center gap-3 self-start sm:self-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => handleThemeChange('light')}
              className={`p-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold ${
                theme === 'light'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Aktifkan Mode Terang"
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Light</span>
            </button>

            <button
              type="button"
              onClick={() => handleThemeChange('dark')}
              className={`p-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold ${
                theme === 'dark'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Aktifkan Mode Gelap"
            >
              <Moon className="w-4 h-4 text-blue-400" />
              <span>Dark</span>
            </button>

            <button
              type="button"
              onClick={() => handleThemeChange('system')}
              className={`p-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold ${
                theme === 'system'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Ikuti Setelan Perangkat Sistem"
            >
              <Laptop className="w-4 h-4 text-slate-500 dark:text-slate-300" />
              <span>Sistem</span>
            </button>
          </div>
        </div>

        {/* Visual Theme Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Light Mode Card */}
          <div
            onClick={() => handleThemeChange('light')}
            className={`p-4.5 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden group ${
              theme === 'light'
                ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 ring-2 ring-blue-600/20 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {theme === 'light' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Mode Terang (Light)</h4>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Tampilan bersih &amp; kontras tinggi siang hari</span>
              </div>
            </div>

            {/* Preview Mini UI */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-[10px]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">NusaSec Dashboard</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <div className="h-2 w-3/4 bg-slate-200 rounded"></div>
              <div className="h-2 w-1/2 bg-blue-300 rounded"></div>
            </div>
          </div>

          {/* 2. Dark Mode Card */}
          <div
            onClick={() => handleThemeChange('dark')}
            className={`p-4.5 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden group ${
              theme === 'dark'
                ? 'border-blue-600 bg-slate-800/80 ring-2 ring-blue-600/20 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {theme === 'dark' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-950 text-blue-400 flex items-center justify-center border border-indigo-900">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Mode Gelap (Dark SOC)</h4>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Eye-care &amp; suasana ruang kendali keamanan</span>
              </div>
            </div>

            {/* Preview Mini UI */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-[10px]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">NusaSec SOC Night</span>
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              </div>
              <div className="h-2 w-3/4 bg-slate-800 rounded"></div>
              <div className="h-2 w-1/2 bg-indigo-500 rounded"></div>
            </div>
          </div>

          {/* 3. System Adaptive Card */}
          <div
            onClick={() => handleThemeChange('system')}
            className={`p-4.5 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden group ${
              theme === 'system'
                ? 'border-blue-600 bg-blue-50/40 dark:bg-slate-800/80 ring-2 ring-blue-600/20 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {theme === 'system' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                <Laptop className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Otomatis Sistem (Auto)</h4>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Sinkronisasi otomatis dengan preferensi OS Anda</span>
              </div>
            </div>

            {/* Preview Mini UI */}
            <div className="p-3 bg-gradient-to-r from-slate-100 to-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1.5 text-[10px]">
              <div className="flex items-center justify-between text-slate-800 dark:text-slate-200 font-bold">
                <span className="bg-white/80 dark:bg-black/60 px-1 rounded">Auto Sync</span>
                <span className="text-xs">🌓</span>
              </div>
              <div className="h-2 w-3/4 bg-white/40 rounded"></div>
              <div className="h-2 w-1/2 bg-blue-400/60 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: SETTINGS FORM CARD */}
      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-6 transition-colors">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Identitas Tenant &amp; Regional
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Nama Tenant Organisasi</label>
              <input
                type="text"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Zona Waktu Audit Default</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Asia/Jakarta (WIB)">Asia/Jakarta (WIB - UTC+7)</option>
                <option value="Asia/Makassar (WITA)">Asia/Makassar (WITA - UTC+8)</option>
                <option value="Asia/Jayapura (WIT)">Asia/Jayapura (WIT - UTC+9)</option>
                <option value="UTC">UTC (Coordinated Universal Time)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Policies */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Kebijakan Akses &amp; Integrasi SIEM
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">SIEM Event Webhook (Splunk / QRadar / Microsoft Sentinel)</label>
              <input
                type="text"
                value={siemWebhook}
                onChange={(e) => setSiemWebhook(e.target.value)}
                placeholder="https://siem-collector.internal/api/events"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Wajibkan MFA (FIDO2 / TOTP) untuk Semua Anggota</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Mencegah akses tanpa token otentikasi lapis kedua.</div>
              </div>
              <input
                type="checkbox"
                checked={enforceMfa}
                onChange={(e) => setEnforceMfa(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
