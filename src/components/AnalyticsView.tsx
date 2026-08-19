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
  BarChart3,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Activity,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Atom,
  Lock,
  Globe,
  Server,
  Cloud,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  SlidersHorizontal,
  Layers,
  Cpu
} from 'lucide-react';

interface AnalyticsViewProps {
  showToast?: (msg: string) => void;
  onNavigateToBilling?: () => void;
  onNavigateToMigration?: () => void;
}

// 1. Time-series Threat & Traffic Telemetry Data
const THREAT_TRAFFIC_SERIES_30D = [
  { date: '01 Agu', cleanRequests: 62000, blockedAttacks: 1420, botScrapes: 820, ddosMitigated: 210 },
  { date: '05 Agu', cleanRequests: 74000, blockedAttacks: 1890, botScrapes: 1040, ddosMitigated: 340 },
  { date: '09 Agu', cleanRequests: 89000, blockedAttacks: 2450, botScrapes: 1320, ddosMitigated: 580 },
  { date: '13 Agu', cleanRequests: 95000, blockedAttacks: 3120, botScrapes: 1680, ddosMitigated: 1200 },
  { date: '17 Agu', cleanRequests: 112000, blockedAttacks: 2840, botScrapes: 1450, ddosMitigated: 410 },
  { date: '21 Agu', cleanRequests: 128000, blockedAttacks: 3680, botScrapes: 1980, ddosMitigated: 890 },
  { date: '25 Agu', cleanRequests: 142000, blockedAttacks: 4120, botScrapes: 2240, ddosMitigated: 620 },
  { date: '29 Agu', cleanRequests: 158000, blockedAttacks: 3950, botScrapes: 2100, ddosMitigated: 480 }
];

const THREAT_TRAFFIC_SERIES_7D = [
  { date: 'Sen', cleanRequests: 135000, blockedAttacks: 3400, botScrapes: 1850, ddosMitigated: 420 },
  { date: 'Sel', cleanRequests: 148000, blockedAttacks: 3920, botScrapes: 2100, ddosMitigated: 510 },
  { date: 'Rab', cleanRequests: 162000, blockedAttacks: 4580, botScrapes: 2600, ddosMitigated: 890 },
  { date: 'Kam', cleanRequests: 155000, blockedAttacks: 4210, botScrapes: 2340, ddosMitigated: 640 },
  { date: 'Jum', cleanRequests: 142000, blockedAttacks: 3870, botScrapes: 1990, ddosMitigated: 490 },
  { date: 'Sab', cleanRequests: 98000, blockedAttacks: 2150, botScrapes: 1120, ddosMitigated: 280 },
  { date: 'Min', cleanRequests: 92000, blockedAttacks: 1980, botScrapes: 980, ddosMitigated: 210 }
];

// 2. Attack Classification Distribution
const ATTACK_VECTORS_DATA = [
  { name: 'SQL Injection / XSS', value: 38, count: '14,240', color: '#2563eb' },
  { name: 'Brute-Force SSH / Auth', value: 26, count: '9,740', color: '#f59e0b' },
  { name: 'Malicious API Fuzzing', value: 18, count: '6,740', color: '#8b5cf6' },
  { name: 'DDoS Layer 7 Flood', value: 12, count: '4,490', color: '#ef4444' },
  { name: 'Bad Bot & Scrapers', value: 6, count: '2,250', color: '#06b6d4' }
];

// 3. Multi-Cloud Posture & Vulnerabilities Comparison
const CLOUD_POSTURE_COMPARISON = [
  { provider: 'AWS Production', critical: 1, high: 3, medium: 8, low: 14, score: 95.8 },
  { provider: 'Azure Enterprise', critical: 0, high: 2, medium: 5, low: 9, score: 98.1 },
  { provider: 'GCP Analytics Core', critical: 2, high: 4, medium: 7, low: 11, score: 92.4 }
];

// 4. Compliance Evolution Trend
const COMPLIANCE_TREND_DATA = [
  { month: 'Q4 2025', iso27001: 82.0, soc2: 84.5, uupdp: 78.0, nistCsf: 76.5 },
  { month: 'Q1 2026', iso27001: 88.5, soc2: 89.2, uupdp: 83.4, nistCsf: 82.1 },
  { month: 'Q2 2026', iso27001: 93.1, soc2: 94.0, uupdp: 89.6, nistCsf: 87.8 },
  { month: 'Q3 2026 (Live)', iso27001: 96.4, soc2: 98.2, uupdp: 94.0, nistCsf: 91.5 }
];

// 5. Post-Quantum (PQC) Transition Velocity Data
const PQC_TRANSITION_TIMELINE = [
  { period: 'Mar 26', classical: 88, hybrid: 10, quantumSafe: 2 },
  { period: 'Apr 26', classical: 76, hybrid: 18, quantumSafe: 6 },
  { period: 'Mei 26', classical: 62, hybrid: 26, quantumSafe: 12 },
  { period: 'Jun 26', classical: 48, hybrid: 35, quantumSafe: 17 },
  { period: 'Jul 26', classical: 36, hybrid: 42, quantumSafe: 22 },
  { period: 'Agu 26 (Now)', classical: 24, hybrid: 48, quantumSafe: 28 }
];

// 6. Cryptographic Latency Benchmark (Classical vs PQC)
const CRYPTO_BENCHMARK_DATA = [
  { algorithm: 'ECDH X25519 (Classical)', keyGenUs: 14.2, encapUs: 38.6, decapUs: 34.1, keySizeBytes: 32 },
  { algorithm: 'ML-KEM-768 (NIST PQC)', keyGenUs: 21.8, encapUs: 46.2, decapUs: 42.7, keySizeBytes: 1184 },
  { algorithm: 'RSA-4096 (Classical)', keyGenUs: 8240.0, encapUs: 148.0, decapUs: 1920.0, keySizeBytes: 512 },
  { algorithm: 'ML-DSA-65 (NIST Sign)', keyGenUs: 184.2, encapUs: 290.4, decapUs: 142.1, keySizeBytes: 1952 }
];

// 7. Regional Traffic & Ingress Origins
const GEOGRAPHIC_INGRESS_DATA = [
  { region: 'Indonesia (ID)', requests: '1.24M', blocked: '12.4K', riskRate: '0.98%', status: 'Normal' },
  { region: 'Singapura (SG)', requests: '840K', blocked: '4.8K', riskRate: '0.57%', status: 'Normal' },
  { region: 'Amerika Serikat (US)', requests: '490K', blocked: '18.2K', riskRate: '3.71%', status: 'Elevated' },
  { region: 'Uni Eropa (DE/NL)', requests: '320K', blocked: '6.1K', riskRate: '1.90%', status: 'Normal' },
  { region: 'Asia Timur (JP/KR)', requests: '280K', blocked: '2.9K', riskRate: '1.03%', status: 'Normal' }
];

// 8. Top Targeted Microservices / Endpoints
const TARGETED_ENDPOINTS = [
  { endpoint: '/api/v1/auth/oauth2/token', service: 'IAM Core Gateway', hits: '412,890', blockedThreats: '3,840', cvssRisk: 'Critical', actionTaken: 'Auto-rate-limit & WAF Rule #4092' },
  { endpoint: '/api/v2/pqc/compute/encapsulate', service: 'Quantum Vault Ingress', hits: '189,450', blockedThreats: '128', cvssRisk: 'Low', actionTaken: 'Zero Trust Enforced' },
  { endpoint: '/api/v1/cloud/assets/inventory', service: 'Cloud Asset Telemetry', hits: '94,200', blockedThreats: '1,420', cvssRisk: 'High', actionTaken: 'JWT Scope Verification' },
  { endpoint: '/graphql/query/evidence-vault', service: 'Compliance Ledger', hits: '62,100', blockedThreats: '390', cvssRisk: 'Medium', actionTaken: 'Query Depth Limit' }
];

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  showToast = (_msg: string) => {},
  onNavigateToBilling,
  onNavigateToMigration
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [activeTab, setActiveTab] = useState<'threats' | 'cloud-posture' | 'compliance' | 'pqc'>('threats');
  const [selectedCloudScope, setSelectedCloudScope] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    showToast('Memperbarui agregasi telemetri analitik dari seluruh sensor cloud...');
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Data analitik berhasil disinkronkan dengan 3 cloud provider dan SIEM live stream.');
    }, 900);
  };

  const handleExport = (format: 'pdf' | 'csv') => {
    showToast(`Mengekspor Laporan Eksekutif Analitik Keamanan (${format.toUpperCase()}). Unduhan akan segera dimulai.`);
  };

  const activeThreatData = timeRange === '7d' ? THREAT_TRAFFIC_SERIES_7D : THREAT_TRAFFIC_SERIES_30D;

  return (
    <div id="analytics-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* 1. Header & Global Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              NusaSec Telemetry &amp; Intelligence Analytics Engine
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Analitik Keamanan, Kepatuhan &amp; Kuantum
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Pusat intelijen terpadu untuk analisis tren serangan siber, dispersi risiko multi-cloud, dan kecepatan adopsi kriptografi pasca-kuantum (PQC).
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Cloud Scope Filter */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-2xs">
            <Cloud className="w-3.5 h-3.5 text-slate-400 mr-1.5 shrink-0" />
            <select
              value={selectedCloudScope}
              onChange={(e) => {
                setSelectedCloudScope(e.target.value);
                showToast(`Filter cloud diubah ke: ${e.target.value === 'all' ? 'Semua Cloud Provider' : e.target.value}`);
              }}
              className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Cloud (AWS, Azure, GCP)</option>
              <option value="aws">AWS Production (us-east-1)</option>
              <option value="azure">Azure Enterprise (southeastasia)</option>
              <option value="gcp">GCP Analytics Core (asia-southeast2)</option>
            </select>
          </div>

          {/* Time Range Selector */}
          <div className="flex bg-slate-200/80 p-0.5 rounded-xl text-xs font-semibold text-slate-600">
            {(['7d', '30d', '90d', '1y'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeRange === r
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'hover:text-slate-900 text-slate-600'
                }`}
              >
                {r === '7d' ? '7 Hari' : r === '30d' ? '30 Hari' : r === '90d' ? '3 Bulan' : '1 Tahun'}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl transition-all shadow-2xs"
            title="Refresh Data Telemetri"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
          </button>

          {/* Export Dropdown / Button */}
          <button
            onClick={() => handleExport('pdf')}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all"
          >
            <Download className="w-3.5 h-3.5 text-slate-300" />
            <span>Ekspor PDF</span>
          </button>
        </div>
      </div>

      {/* 2. Top Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Security Posture Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Skor Postur Keamanan</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">95.4</span>
            <span className="text-xs text-slate-400 font-semibold">/ 100</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+3.8% MoM (Sangat Aman)</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '95.4%' }}></div>
          </div>
        </div>

        {/* Card 2: Mean Time To Remediation (MTTR) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rata-Rata Waktu Resolusi (MTTR)</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">32.4</span>
            <span className="text-xs text-slate-500 font-medium">Menit</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-24.6% lebih cepat dari SLA</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '82%' }}></div>
          </div>
        </div>

        {/* Card 3: Threats Mitigated Efficiency */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Efektivitas WAF &amp; Mitigasi</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">99.96%</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>37.4K serangan siber dinetralkan</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-purple-600 h-full rounded-full" style={{ width: '99.96%' }}></div>
          </div>
        </div>

        {/* Card 4: Post-Quantum Transition Velocity */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">PQC Crypto Agility Index</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Atom className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">76.0%</span>
            <span className="text-xs text-indigo-600 font-bold">Hybrid PQC</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-indigo-700 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% transisi ML-KEM-768</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full" style={{ width: '76%' }}></div>
          </div>
        </div>
      </div>

      {/* 3. Tabbed Analytics Navigation */}
      <div className="flex border-b border-slate-200/80 gap-2 sm:gap-6 overflow-x-auto text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('threats')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'threats'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Tren Serangan &amp; Telemetri WAF</span>
        </button>

        <button
          onClick={() => setActiveTab('cloud-posture')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'cloud-posture'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Cloud className="w-4 h-4" />
          <span>Postur Multi-Cloud &amp; Drift CVE</span>
        </button>

        <button
          onClick={() => setActiveTab('compliance')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'compliance'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Evolusi Kepatuhan &amp; Audit Trust</span>
        </button>

        <button
          onClick={() => setActiveTab('pqc')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'pqc'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Atom className="w-4 h-4" />
          <span>Kriptografi Kuantum (PQC Horizon)</span>
        </button>
      </div>

      {/* 4. Tab Contents */}

      {/* TAB 1: THREAT VELOCITY & TRAFFIC */}
      {activeTab === 'threats' && (
        <div className="space-y-6">
          {/* Main Area Chart: Clean vs Blocked Requests */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">Volumetrik Trafik Ingress vs Serangan Terblokir</h3>
                <p className="text-xs text-slate-500">Perbandingan request valid dan ancaman siber yang berhasil diintersepsi firewall.</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-blue-500"></span> Request Bersih
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-rose-500"></span> Ancaman Terblokir
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-amber-500"></span> Bot &amp; DDoS
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeThreatData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cleanTrafficGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="blockedTrafficGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="cleanRequests" name="Request Bersih" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#cleanTrafficGrad)" />
                  <Area type="monotone" dataKey="blockedAttacks" name="Serangan Diblokir" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#blockedTrafficGrad)" />
                  <Area type="monotone" dataKey="botScrapes" name="Bot Scraper" stroke="#f59e0b" strokeWidth={1.5} fillOpacity={0.1} fill="#f59e0b" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grid: Attack Classification & Top Targeted Endpoints */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Donut Chart: Attack Classification */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Distribusi Vektor Ancaman</h3>
                <p className="text-xs text-slate-500 mb-3">Klasifikasi tipe serangan berdasarkan deteksi signature WAF &amp; SIEM.</p>
                
                <div className="h-52 w-full relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ATTACK_VECTORS_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {ATTACK_VECTORS_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xl font-extrabold text-slate-900">37.4K</span>
                    <span className="text-[10px] text-slate-400 font-medium">Total Ancaman</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-2 pt-3 border-t border-slate-100">
                {ATTACK_VECTORS_DATA.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-700 font-medium">{item.name}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900">{item.count} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Targeted Endpoints Table */}
            <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Endpoint &amp; Microservices Paling Rentan Ditargetkan</h3>
                  <p className="text-xs text-slate-500">Analisis beban request serta tindakan mitigasi otomatis pada layer gateway.</p>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                  Zero Trust Protected
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold text-[10px] border-b border-slate-100">
                    <tr>
                      <th className="py-2.5 px-3">Endpoint API / Layanan</th>
                      <th className="py-2.5 px-3">Beban Trafik</th>
                      <th className="py-2.5 px-3">Ancaman Dinonaktifkan</th>
                      <th className="py-2.5 px-3">Tingkat Risiko</th>
                      <th className="py-2.5 px-3 text-right">Tindakan WAF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {TARGETED_ENDPOINTS.map((ep, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-3">
                          <span className="font-mono font-bold text-slate-900 block">{ep.endpoint}</span>
                          <span className="text-[11px] text-slate-400">{ep.service}</span>
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-700">{ep.hits} req</td>
                        <td className="py-3 px-3 font-mono font-bold text-rose-600">{ep.blockedThreats}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            ep.cvssRisk === 'Critical' ? 'bg-rose-100 text-rose-800' :
                            ep.cvssRisk === 'High' ? 'bg-amber-100 text-amber-800' :
                            ep.cvssRisk === 'Medium' ? 'bg-blue-100 text-blue-800' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {ep.cvssRisk}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            {ep.actionTaken}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MULTI-CLOUD POSTURE & CVE DRIFT */}
      {activeTab === 'cloud-posture' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bar Chart: Vulnerabilities by Cloud Provider */}
            <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Distribusi Kerentanan &amp; Misconfig per Cloud</h3>
                  <p className="text-xs text-slate-500">Perbandingan temuan CVE Critical, High, Medium di AWS, Azure, dan GCP.</p>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-rose-600" /> Kritis</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500" /> Tinggi</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-500" /> Sedang</span>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CLOUD_POSTURE_COMPARISON} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="provider" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                    />
                    <Bar dataKey="critical" name="Kritis (CVSS 9.0+)" fill="#e11d48" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="high" name="Tinggi (CVSS 7.0-8.9)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="medium" name="Sedang (CVSS 4.0-6.9)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Cloud Health Leaderboard */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Skor Kepatuhan CIS per Provider</h3>
                <p className="text-xs text-slate-500 mb-3">Evaluasi konfigurasi CSPM berdasarkan benchmark CIS v8.</p>

                <div className="space-y-4">
                  {CLOUD_POSTURE_COMPARISON.map((cp, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">{cp.provider}</span>
                        <span className="font-extrabold text-sm text-slate-900">{cp.score}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            cp.score >= 95 ? 'bg-emerald-500' : cp.score >= 90 ? 'bg-blue-600' : 'bg-amber-500'
                          }`}
                          style={{ width: `${cp.score}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>{cp.critical} Isu Kritis Aktif</span>
                        <span>{cp.high + cp.medium + cp.low} Minor Audit</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => showToast('Memulai sinkronisasi konfigurasi CSPM otomatis...')}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Sinkronkan Postur Cloud
              </button>
            </div>
          </div>

          {/* Regional Threat Origin Matrix */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Matriks Telemetri Trafik Regional &amp; Tingkat Paparan</h3>
                <p className="text-xs text-slate-500">Distribusi asal request ingress geografis dan rasio pemblokiran anomali.</p>
              </div>
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-blue-600" /> Global Edge CDN Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {GEOGRAPHIC_INGRESS_DATA.map((geo, idx) => (
                <div key={idx} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2">
                  <span className="font-bold text-xs text-slate-900 block">{geo.region}</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-extrabold text-slate-900">{geo.requests}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      geo.status === 'Elevated' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {geo.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-200/60">
                    <span>Terblokir: <strong className="text-rose-600">{geo.blocked}</strong></span>
                    <span>Rasio: {geo.riskRate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COMPLIANCE & TRUST EVOLUTION */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">Lintasan Skor Kepatuhan Regulasi &amp; Standar Industri</h3>
                <p className="text-xs text-slate-500">Progres pemenuhan kontrol otomatis untuk ISO 27001, SOC 2 Type II, dan UU PDP No. 27/2022.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-600" /> ISO 27001</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-600" /> SOC 2 Type II</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-indigo-600" /> UU PDP No. 27/2022</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500" /> NIST CSF</span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={COMPLIANCE_TREND_DATA} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="iso27001" name="ISO 27001" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="soc2" name="SOC 2 Type II" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="uupdp" name="UU PDP No. 27/2022" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="nistCsf" name="NIST CSF" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Audit Verification Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Integritas Bukti Audit</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">99.8% Segar</div>
              <p className="text-xs text-slate-500">142 dari 144 kontrol kepatuhan diverifikasi otomatis dengan cryptographic SHA-256 hash.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kepatuhan UU PDP (ID)</span>
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">94.0% Selesai</div>
              <p className="text-xs text-slate-500">Pemberitahuan insiden &lt;72 jam dan enkripsi data pribadi telah diaktifkan di seluruh database.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kesiapan Audit Eksternal</span>
                <FileCheck2 className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-extrabold text-emerald-700">Audit-Ready ✓</div>
              <p className="text-xs text-slate-500">Paket bukti SOC 2 Type II siap diunduh untuk auditor eksternal tanpa pengumpulan manual.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: POST-QUANTUM (PQC) & CRYPTO AGILITY */}
      {activeTab === 'pqc' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transition Timeline Stacked Area Chart */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Kecepatan Transisi Aset ke Kriptografi Pasca-Kuantum</h3>
                <p className="text-xs text-slate-500">Migrasi bertahap dari algoritma Klasik (RSA/ECC) menuju Hybrid &amp; Pure Post-Quantum (ML-KEM/ML-DSA).</p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PQC_TRANSITION_TIMELINE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="period" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="quantumSafe" stackId="1" name="Pure Quantum-Safe" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="hybrid" stackId="1" name="Hybrid PQC (NIST)" stroke="#6366f1" fill="#6366f1" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="classical" stackId="1" name="Klasik Rentan (RSA/ECC)" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
                <span>Target Transisi 2026: <strong>85% Hybrid PQC</strong></span>
                {onNavigateToMigration && (
                  <button
                    onClick={onNavigateToMigration}
                    className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                  >
                    Buka Migration Center <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Cryptographic Latency Benchmark Comparison */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Benchmark Kinerja Algoritma Kriptografi (Latency μs)</h3>
                <p className="text-xs text-slate-500">Pengukuran overhead enkapsulasi/dekapsulasi ML-KEM-768 vs Klasik ECDH.</p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CRYPTO_BENCHMARK_DATA} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="algorithm" tick={{ fontSize: 9, fill: '#1e293b', fontWeight: 600 }} axisLine={false} tickLine={false} width={130} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                    />
                    <Bar dataKey="encapUs" name="Enkapsulasi / Sign (μs)" fill="#6366f1" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="decapUs" name="Dekapsulasi / Verify (μs)" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="p-3 bg-indigo-50/80 rounded-xl border border-indigo-100 text-xs text-indigo-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Kesimpulan Benchmark:</strong> ML-KEM-768 hanya menambahkan overhead ~7.6 mikrodetik dibanding ECDH X25519, menjadikannya siap pakai untuk transmisi TLS 1.3 tanpa dampak performa terasa.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. AI Predictive Risk Forecast & Recommendation Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-5 sm:p-6 rounded-2xl border border-slate-700/80 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0 text-indigo-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white">Rekomendasi Prediktif AI Security Engine</h4>
              <span className="text-[10px] bg-indigo-500/30 text-indigo-200 font-mono px-2 py-0.2 rounded-full border border-indigo-400/30">
                PROAKTIF
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Berdasarkan pola telemetri 30 hari terakhir, terdeteksi kenaikan 18% upaya credential stuffing pada IAM Core Gateway. Direkomendasikan menerapkan rotasi token JWT setiap 15 menit dan memperkuat proteksi TLS 1.3 Hybrid PQC.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={() => showToast('Menerapkan rekomendasi hardening WAF otomatis ke seluruh ingress API...')}
            className="w-full md:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" /> Terapkan Hardening Otomatis
          </button>
        </div>
      </div>
    </div>
  );
};
