import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from 'recharts';
import {
  TrendingUp,
  Users,
  DollarSign,
  Layers,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  Gem,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Flame,
  Lock
} from 'lucide-react';
import { CyberThreatRadar } from './CyberThreatRadar';
import { SecurityPlaybooks } from './SecurityPlaybooks';

interface OverviewDashboardProps {
  onNavigateToBilling: () => void;
  showToast?: (msg: string) => void;
}

// Sample time series data for Subscription & Revenue Growth
const MONTHLY_GROWTH_DATA = [
  { month: 'Jan', freeUsers: 420, plusUsers: 180, premiumUsers: 60, mrr: 3120, activeHours: 1240 },
  { month: 'Feb', freeUsers: 510, plusUsers: 220, premiumUsers: 85, mrr: 4000, activeHours: 1480 },
  { month: 'Mar', freeUsers: 650, plusUsers: 290, premiumUsers: 110, mrr: 5240, activeHours: 1890 },
  { month: 'Apr', freeUsers: 780, plusUsers: 360, premiumUsers: 145, mrr: 6640, activeHours: 2300 },
  { month: 'May', freeUsers: 940, plusUsers: 450, premiumUsers: 190, mrr: 8440, activeHours: 2950 },
  { month: 'Jun', freeUsers: 1120, plusUsers: 560, premiumUsers: 240, mrr: 10560, activeHours: 3700 },
  { month: 'Jul', freeUsers: 1300, plusUsers: 690, premiumUsers: 310, mrr: 13240, activeHours: 4400 },
  { month: 'Aug', freeUsers: 1540, plusUsers: 840, premiumUsers: 390, mrr: 16320, activeHours: 5280 }
];

// Activity trends across days of the week
const WEEKLY_ACTIVITY_DATA = [
  { day: 'Sen', docEdits: 145, apiCalls: 890, teamMeetings: 28, aiPrompts: 320 },
  { day: 'Sel', docEdits: 198, apiCalls: 1120, teamMeetings: 35, aiPrompts: 410 },
  { day: 'Rab', docEdits: 230, apiCalls: 1450, teamMeetings: 42, aiPrompts: 560 },
  { day: 'Kam', docEdits: 215, apiCalls: 1380, teamMeetings: 38, aiPrompts: 490 },
  { day: 'Jum', docEdits: 180, apiCalls: 1040, teamMeetings: 22, aiPrompts: 380 },
  { day: 'Sab', docEdits: 75, apiCalls: 450, teamMeetings: 8, aiPrompts: 160 },
  { day: 'Min', docEdits: 60, apiCalls: 380, teamMeetings: 5, aiPrompts: 130 }
];

// Plan distribution data
const PLAN_DISTRIBUTION_DATA = [
  { name: 'Free Tier', value: 1540, color: '#94a3b8' },
  { name: 'Plus Plan ($12)', value: 840, color: '#2563eb' },
  { name: 'Premium Plan ($16)', value: 390, color: '#38bdf8' },
  { name: 'AI Add-on Users', value: 480, color: '#a855f7' }
];

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ 
  onNavigateToBilling,
  showToast = () => {}
}) => {
  const [timeRange, setTimeRange] = useState<'8m' | '30d' | '7d'>('8m');
  const [activeMetricTab, setActiveMetricTab] = useState<'revenue' | 'users' | 'activity'>('revenue');

  return (
    <div id="overview-dashboard" className="flex-1 overflow-y-auto bg-[#f8fafc] dark:bg-slate-950 px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6 transition-colors">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Cyber Defense &amp; Workspace Analytics
            </h1>
            <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Telemetry Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Pantau telemetri pertahanan siber global, mitigasi ancaman otomatis, dan pertumbuhan langganan secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time range selector */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shadow-2xs text-xs font-medium">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${timeRange === '7d' ? 'bg-slate-900 dark:bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              7 Hari
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${timeRange === '30d' ? 'bg-slate-900 dark:bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              30 Hari
            </button>
            <button
              onClick={() => setTimeRange('8m')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${timeRange === '8m' ? 'bg-slate-900 dark:bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              8 Bulan
            </button>
          </div>

          <button
            onClick={onNavigateToBilling}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <Gem className="w-3.5 h-3.5 fill-white" />
            <span>Kelola Paket</span>
          </button>
        </div>
      </div>

      {/* Real-time Cyber Threat Radar & SIEM Telemetry Feed */}
      <CyberThreatRadar />

      {/* KPI Cards Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: MRR */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Monthly Recurring Revenue</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">$16,320</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +23.2%
            </span>
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">vs $13,240 bulan lalu</span>
        </div>

        {/* Card 2: Total Subscribers */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Berlangganan Aktif</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">1,230</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.5%
            </span>
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">840 Plus • 390 Premium</span>
        </div>

        {/* Card 3: Team Activity Hours */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Jam Kolaborasi Tim</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">5,280 jam</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +20.0%
            </span>
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Rata-rata 4.3 jam/user</span>
        </div>

        {/* Card 4: AI & Add-on Conversions */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">AI Add-on Users</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">480 Akun</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +34.1%
            </span>
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">39% adopsi pengguna berbayar</span>
        </div>
      </div>

      {/* Main Charts Section (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Subscription Growth & Revenue Chart (2 cols wide) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Pertumbuhan Pendapatan &amp; Pengguna Berbayar</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Visualisasi kenaikan MRR dan peningkatan adopsi paket Plus &amp; Premium.</p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => setActiveMetricTab('revenue')}
                className={`px-3 py-1 rounded-lg transition-colors ${activeMetricTab === 'revenue' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold' : 'text-slate-600 dark:text-slate-400'}`}
              >
                MRR ($)
              </button>
              <button
                onClick={() => setActiveMetricTab('users')}
                className={`px-3 py-1 rounded-lg transition-colors ${activeMetricTab === 'users' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Pengguna
              </button>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {activeMetricTab === 'revenue' ? (
                <AreaChart data={MONTHLY_GROWTH_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.25} vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: '1px solid #334155', fontSize: '12px' }}
                    formatter={(val: number) => [`$${val.toLocaleString()}`, 'Total MRR']}
                  />
                  <Area
                    type="monotone"
                    dataKey="mrr"
                    stroke="#2563eb"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorMrr)"
                  />
                </AreaChart>
              ) : (
                <AreaChart data={MONTHLY_GROWTH_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.25} vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: '1px solid #334155', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="plusUsers" name="Plus Plan" stackId="1" stroke="#2563eb" fill="#3b82f6" />
                  <Area type="monotone" dataKey="premiumUsers" name="Premium Plan" stackId="1" stroke="#0f172a" fill="#475569" />
                  <Area type="monotone" dataKey="freeUsers" name="Free Tier" stackId="1" stroke="#cbd5e1" fill="#94a3b8" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Plan Distribution Pie Chart (1 col wide) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between transition-colors">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Distribusi Paket Pelanggan</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Komposisi akun aktif di seluruh tingkatan workspace.</p>

            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PLAN_DISTRIBUTION_DATA}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {PLAN_DISTRIBUTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: '1px solid #334155', fontSize: '12px' }}
                    formatter={(value: number) => [`${value} Akun`, 'Jumlah']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            {PLAN_DISTRIBUTION_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workspace Activity Trends (Bar & Composed Chart) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Tren Aktivitas &amp; Interaksi Workspace Mingguan</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Jumlah pengeditan dokumen, panggilan API, meeting video, dan prompt asisten AI.</p>
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Diperbarui 5 menit lalu</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEEKLY_ACTIVITY_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.25} vertical={false} />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: '1px solid #334155', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="apiCalls" name="API Calls" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="aiPrompts" name="AI Prompts" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="docEdits" name="Dokumen Diedit" fill="#0284c7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Automated Incident Response Playbooks (SOAR) */}
      <SecurityPlaybooks showToast={showToast} />
    </div>
  );
};
