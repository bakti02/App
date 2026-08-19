import React, { useState } from 'react';
import {
  Users,
  LayoutGrid,
  Layers,
  Bell,
  Sparkles,
  User,
  SlidersHorizontal,
  ShieldCheck,
  Lock,
  Code2,
  Boxes,
  FileSpreadsheet,
  Plus,
  Trash2,
  Mail,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  Download,
  Copy,
  Check,
  AlertTriangle,
  ShieldAlert,
  Terminal,
  Activity,
  Globe,
  Server,
  Key,
  Eye,
  EyeOff,
  RefreshCw,
  Zap,
  Cpu,
  CheckCircle,
  XCircle,
  Search,
  Sliders,
  ExternalLink,
  Radio,
  FileText
} from 'lucide-react';
import { NavigationSection, TeamMember } from '../types';
import { TEAM_MEMBERS_DATA } from '../data/mockData';
import { VulnerabilityScannerSandbox } from './VulnerabilityScannerSandbox';

interface OtherViewsProps {
  currentSection: NavigationSection;
  onNavigateToBilling: () => void;
  showToast?: (msg: string) => void;
}

export const OtherViews: React.FC<OtherViewsProps> = ({
  currentSection,
  onNavigateToBilling,
  showToast = (_msg: string) => {}
}) => {
  // Members State
  const [members, setMembers] = useState<TeamMember[]>([
    ...TEAM_MEMBERS_DATA,
    {
      id: 'soc-1',
      name: 'Dr. Sarah Vance',
      email: 's.vance@cybershield.io',
      role: 'Admin',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      status: 'active'
    },
    {
      id: 'soc-2',
      name: 'Alex Rivera (SecOps)',
      email: 'a.rivera@cybershield.io',
      role: 'Editor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      status: 'active'
    }
  ]);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'Member' | 'Editor' | 'Admin'>('Editor');

  // Security Defense State
  const [wafEnabled, setWafEnabled] = useState(true);
  const [ddosProtection, setDdosProtection] = useState(true);
  const [zeroTrustEnforced, setZeroTrustEnforced] = useState(true);
  const [botMitigation, setBotMitigation] = useState(true);
  const [blacklistedIps, setBlacklistedIps] = useState<string[]>([
    '185.220.101.5 (Tor Exit Node)',
    '194.26.29.112 (Brute-force Scanner)',
    '45.154.255.89 (Known Malicious Botnet)'
  ]);
  const [newIpToBlock, setNewIpToBlock] = useState('');

  // Scanning State
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [lastScanResult, setLastScanResult] = useState('0 Kerentanan Kritis Terdeteksi');

  // Secrets & Vault State
  const [showSecret1, setShowSecret1] = useState(false);
  const [showSecret2, setShowSecret2] = useState(false);
  const [vaultSecrets, setVaultSecrets] = useState([
    { id: '1', name: 'PROD_KMS_MASTER_KEY', value: 'kms_live_89f0a7b4419cb2e', env: 'Production', rotated: '3 hari lalu' },
    { id: '2', name: 'FIREWALL_JWT_SECRET', value: 'jwt_sec_991823abce128fa', env: 'Global Edge', rotated: '12 hari lalu' },
    { id: '3', name: 'DATABASE_ENCRYPTION_SALT', value: 'salt_aes256_gcm_f99a0', env: 'EU-West-1', rotated: '1 bulan lalu' }
  ]);

  // Integrations State
  const [integrations, setIntegrations] = useState([
    { id: 'aws', name: 'AWS CloudTrail & GuardDuty', category: 'Cloud Infrastructure', connected: true, logo: '☁️', desc: 'Analisis telemetri ancaman cloud real-time' },
    { id: 'splunk', name: 'Splunk SIEM / SOAR', category: 'Security Analytics', connected: true, logo: '📊', desc: 'Penerusan log keamanan & audit kepatuhan SOC 2' },
    { id: 'cloudflare', name: 'Cloudflare Magic WAN / WAF', category: 'Edge Protection', connected: true, logo: '🛡️', desc: 'Mitigasi DDoS Layer 3/4/7 dan proteksi bot' },
    { id: 'slack', name: 'Slack SecOps Incident Channel', category: 'Alerting & On-Call', connected: true, logo: '💬', desc: 'Notifikasi instan untuk insiden P1 dan P2' },
    { id: 'github', name: 'GitHub CodeQL & Secret Scanning', category: 'DevSecOps', connected: false, logo: '🐙', desc: 'Pemindaian otomatis kode sumber dan CVE dependencies' },
    { id: 'datadog', name: 'Datadog Security Monitoring', category: 'Observability', connected: false, logo: '🐶', desc: 'Pemantauan anomali beban kerja kontainer Kubernetes' }
  ]);

  // AI Threat Intel Generator State
  const [intelPrompt, setIntelPrompt] = useState('Analisis indikator ancaman (IOC) ransomware APT29 terbaru');
  const [intelResult, setIntelResult] = useState<string | null>(null);
  const [isGeneratingIntel, setIsGeneratingIntel] = useState(false);

  // API State
  const [apiKey] = useState('sk_live_sec_9928f01a8837bcde209a3994_prod');
  const [copiedKey, setCopiedKey] = useState(false);

  // Notifications / Incident Logs
  const [threatAlerts, setThreatAlerts] = useState([
    { id: 'INC-901', time: '5 menit lalu', severity: 'High', title: 'Serangan Brute Force SSH Diblokir', ip: '194.26.29.112', status: 'Mitigated' },
    { id: 'INC-900', time: '42 menit lalu', severity: 'Critical', title: 'Percobaan SQL Injection pada /api/v1/auth', ip: '45.154.255.89', status: 'Blocked by WAF' },
    { id: 'INC-899', time: '2 jam lalu', severity: 'Medium', title: 'Anomali Login dari Lokasi Baru (Frankfurt)', ip: '82.165.197.1', status: '2FA Verified' },
    { id: 'INC-898', time: '5 jam lalu', severity: 'Low', title: 'Sertifikat SSL/TLS Berhasil Diperbarui Otomatis', ip: 'Edge CDN', status: 'Resolved' }
  ]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberEmail.trim()) return;
    const newM: TeamMember = {
      id: Date.now().toString(),
      name: newMemberEmail.split('@')[0],
      email: newMemberEmail.trim(),
      role: newMemberRole,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      status: 'invited'
    };
    setMembers([...members, newM]);
    setNewMemberEmail('');
    showToast(`Undangan berhasil dikirim ke ${newM.email}`);
  };

  const handleBlockIp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIpToBlock.trim()) return;
    setBlacklistedIps([...blacklistedIps, newIpToBlock.trim()]);
    setNewIpToBlock('');
    showToast(`IP ${newIpToBlock} telah dimasukkan ke daftar blokir WAF firewall.`);
  };

  const handleTriggerScan = () => {
    setIsScanning(true);
    setScanProgress(20);
    showToast('Memulai pemindaian kerentanan mendalam (Deep Vulnerability & CVE Scan)...');
    
    setTimeout(() => setScanProgress(60), 700);
    setTimeout(() => {
      setScanProgress(100);
      setIsScanning(false);
      setLastScanResult('Pemindaian Selesai: 0 Ancaman Kritis, 2 Rekomendasi Hardening');
      showToast('Pemindaian sistem selesai. Semua endpoint aman.');
    }, 1500);
  };

  const handleToggleIntegration = (id: string) => {
    setIntegrations(integrations.map(item => {
      if (item.id === id) {
        const nextState = !item.connected;
        showToast(`${item.name} berhasil ${nextState ? 'dihubungkan' : 'diputuskan'}.`);
        return { ...item, connected: nextState };
      }
      return item;
    }));
  };

  const handleGenerateIntel = () => {
    setIsGeneratingIntel(true);
    setTimeout(() => {
      setIsGeneratingIntel(false);
      setIntelResult(`[LAPORAN INTELIJEN KEAMANAN SIBER - CYBERSHIELD]
Target Analisis: ${intelPrompt}
Tingkat Ancaman: HIGH (MITRE ATT&CK T1059 / T1078)
Tindakan Mitigasi Otomatis:
1. Blokir rentang IP Command & Control (C2) pada gateway WAF.
2. Wajibkan rotasi kunci API dan token sesi admin.
3. Terapkan audit akses Zero Trust untuk semua port database.
Status: Tindakan pengamanan otomatis aktif.`);
      showToast('Analisis intelijen ancaman berhasil dibuat oleh AI Security Engine.');
    }, 900);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full">
      {/* 1. MEMBERS & ACCESS CONTROL VIEW */}
      {currentSection === 'members' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                <span className="text-[12px] font-bold uppercase tracking-wider text-slate-800">
                  SECURITY OPERATIONS CENTER (SOC) &amp; ACCESS CONTROL
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Manajemen Tim &amp; Role RBAC</h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Kelola hak akses analis keamanan, otentikasi MFA/2FA, dan batasan sesi per pengguna.
              </p>
            </div>
          </div>

          {/* Invite Member Box */}
          <form onSubmit={handleInvite} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="flex-1 relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                id="invite-member-email"
                type="email"
                required
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="analis.soc@perusahaan.com"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50 focus:bg-white"
              />
            </div>
            <select
              value={newMemberRole}
              onChange={(e) => setNewMemberRole(e.target.value as any)}
              className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-white text-slate-700 font-semibold"
            >
              <option value="Admin">SOC Admin (Full Access)</option>
              <option value="Editor">SecOps Engineer (Read/Write)</option>
              <option value="Member">Auditor / Viewer (Read Only)</option>
            </select>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Undang Analis</span>
            </button>
          </form>

          {/* Members Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Analis &amp; Email</th>
                  <th className="py-3 px-4">Peran Keamanan</th>
                  <th className="py-3 px-4">Status 2FA / MFA</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                      <div>
                        <span className="font-bold text-slate-900 block">{m.name}</span>
                        <span className="text-slate-500 text-xs">{m.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg font-bold text-xs border border-slate-200">
                        {m.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Hardware MFA Aktif
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {m.role !== 'Admin' && (
                        <button 
                          onClick={() => {
                            setMembers(members.filter(x => x.id !== m.id));
                            showToast(`Akses untuk ${m.name} telah dicabut.`);
                          }}
                          className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Cabut Akses Pengguna"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. SECURITY DEFENSE CENTER VIEW */}
      {currentSection === 'security' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span className="text-[12px] font-bold uppercase tracking-wider text-slate-800">
                  CYBERSHIELD THREAT PREVENTION CENTER
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Perlindungan Siber &amp; Firewall WAF</h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Pusat kontrol mitigasi serangan siber, proteksi DDoS Layer 7, dan aturan pemblokiran IP cerdas.
              </p>
            </div>

            <button
              onClick={handleTriggerScan}
              disabled={isScanning}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Sedang Memindai...' : 'Pindai Kerentanan Sekarang'}</span>
            </button>
          </div>

          {/* Defense Rules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Web Application Firewall (WAF)</h4>
                  <p className="text-xs text-slate-500">Blokir otomatis injeksi SQL, XSS, dan exploit Zero-Day.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setWafEnabled(!wafEnabled);
                  showToast(`WAF Firewall ${!wafEnabled ? 'Diaktifkan' : 'Dinonaktifkan'}`);
                }}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  wafEnabled ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${wafEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Mitigasi Serangan DDoS Otomatis</h4>
                  <p className="text-xs text-slate-500">Kapasitas penyerapan trafik hingga 3.2 Tbps di edge CDN.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setDdosProtection(!ddosProtection);
                  showToast(`Proteksi DDoS ${!ddosProtection ? 'Diaktifkan' : 'Dinonaktifkan'}`);
                }}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  ddosProtection ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${ddosProtection ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Arsitektur Zero Trust Network (ZTNA)</h4>
                  <p className="text-xs text-slate-500">Verifikasi berkelanjutan untuk setiap request microservice.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setZeroTrustEnforced(!zeroTrustEnforced);
                  showToast(`Zero Trust ${!zeroTrustEnforced ? 'Diaktifkan' : 'Dinonaktifkan'}`);
                }}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  zeroTrustEnforced ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${zeroTrustEnforced ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">AI Bot Mitigation &amp; Scraping Filter</h4>
                  <p className="text-xs text-slate-500">Blokir otomatis scraper agresif dan crawler tanpa izin.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setBotMitigation(!botMitigation);
                  showToast(`Bot Mitigation ${!botMitigation ? 'Diaktifkan' : 'Dinonaktifkan'}`);
                }}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  botMitigation ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${botMitigation ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Blacklist IP Manager */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Daftar Hitam Alamat IP (IP Blacklist)</h3>
            <form onSubmit={handleBlockIp} className="flex gap-2">
              <input
                type="text"
                value={newIpToBlock}
                onChange={(e) => setNewIpToBlock(e.target.value)}
                placeholder="Masukkan IP berbahaya (misal: 198.51.100.4)..."
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold"
              >
                Blokir IP
              </button>
            </form>

            <div className="space-y-2">
              {blacklistedIps.map((ip, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="font-mono font-semibold text-rose-700 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    {ip}
                  </span>
                  <button
                    onClick={() => {
                      setBlacklistedIps(blacklistedIps.filter((_, i) => i !== idx));
                      showToast(`IP ${ip} telah dihapus dari blacklist.`);
                    }}
                    className="text-slate-400 hover:text-slate-700 font-semibold text-[11px]"
                  >
                    Buka Blokir
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. PROJECTS & VULNERABILITY ASSESSMENTS VIEW */}
      {currentSection === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                <span className="text-[12px] font-bold uppercase tracking-wider text-slate-800">
                  SECURITY AUDITS &amp; WORKSPACES
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Proyek Audit &amp; Uji Penetrasi</h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Pelacakan repositori aset, pemindaian kerentanan aplikasi, dan status kepatuhan standar industri.
              </p>
            </div>

            <button
              onClick={() => showToast('Membuat repositori audit keamanan baru...')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Buat Proyek Audit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Core API Gateway</span>
                <span className="text-xs text-slate-400">Pemindaian: 10 menit lalu</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">Penetration Testing &amp; Fuzzing</h3>
              <p className="text-xs text-slate-500">Uji ketahanan endpoint autentikasi OAuth2 dan proteksi token anti-replay.</p>
              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                <span className="text-slate-600 font-medium">100% Endpoint Lolos Uji</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Grade A+ (Secure)</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Kubernetes Cluster</span>
                <span className="text-xs text-slate-400">Pemindaian: 1 jam lalu</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">Cloud Security Posture (CSPM)</h3>
              <p className="text-xs text-slate-500">Pemeriksaan konfigurasi IAM, kebijakan network egress, dan hardening Docker.</p>
              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                <span className="text-slate-600 font-medium">CIS Benchmark Compliance</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">98.4% Terpenuhi</span>
              </div>
            </div>
          </div>

          {/* Interactive Vulnerability Sandbox & 1-Click Auto Patcher */}
          <VulnerabilityScannerSandbox showToast={showToast} />
        </div>
      )}

      {/* 4. INTEGRATIONS VIEW */}
      {currentSection === 'integrations' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                <span className="text-[12px] font-bold uppercase tracking-wider text-slate-800">
                  SIEM, CLOUD &amp; DEVSECOPS ECOSYSTEM
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Integrasi Ekosistem Keamanan</h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Hubungkan telemetri keamanan dengan penyedia cloud, SIEM, dan pipeline CI/CD Anda.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <span className="text-2xl p-2 bg-slate-50 rounded-xl border border-slate-100">{item.logo}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.2 rounded">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <span className={`inline-flex items-center gap-1 font-semibold ${item.connected ? 'text-emerald-700' : 'text-slate-400'}`}>
                    <span className={`w-2 h-2 rounded-full ${item.connected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                    {item.connected ? 'Terhubung & Aktif' : 'Belum Terhubung'}
                  </span>

                  <button
                    onClick={() => handleToggleIntegration(item.id)}
                    className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                      item.connected
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                    }`}
                  >
                    {item.connected ? 'Putuskan' : 'Hubungkan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. NOTIFICATIONS & SIEM AUDIT LOGS VIEW */}
      {currentSection === 'notifications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                <span className="text-[12px] font-bold uppercase tracking-wider text-slate-800">
                  REAL-TIME SIEM LOGS &amp; ALERTS
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Log Insiden &amp; Peringatan Siber</h1>
              <p className="text-xs sm:text-sm text-slate-500">Pencatatan riwayat mitigasi ancaman otomatis dan audit kepatuhan.</p>
            </div>
            <button
              onClick={() => showToast('Semua notifikasi ditandai telah dibaca.')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Tandai Semua Terbaca
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-2xs overflow-hidden">
            {threatAlerts.map((alert) => (
              <div key={alert.id} className="p-4 sm:p-5 flex items-start justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    alert.severity === 'Critical' ? 'bg-rose-50 text-rose-600' :
                    alert.severity === 'High' ? 'bg-amber-50 text-amber-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-slate-900">{alert.title}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full uppercase ${
                        alert.severity === 'Critical' ? 'bg-rose-100 text-rose-800' :
                        alert.severity === 'High' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-mono">
                      Sumber IP: {alert.ip} • ID: {alert.id}
                    </p>
                    <span className="text-[11px] text-slate-400 mt-1 block">{alert.time}</span>
                  </div>
                </div>

                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg shrink-0">
                  {alert.status} ✓
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. PASSWORDS & KMS SECRETS VAULT VIEW */}
      {currentSection === 'passwords' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                <span className="text-[12px] font-bold uppercase tracking-wider text-slate-800">
                  HARDWARE SECURITY MODULE &amp; SECRETS VAULT
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Brankas Kunci Enkripsi &amp; KMS</h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Penyimpanan rahasia terenkripsi AES-256 GCM tingkat militer dengan rotasi otomatis.
              </p>
            </div>

            <button
              onClick={() => showToast('Membuka formulir pembuatan secret baru...')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Tambah Kunci Enkripsi
            </button>
          </div>

          <div className="space-y-3">
            {vaultSecrets.map((secret, idx) => (
              <div key={secret.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-slate-900">{secret.name}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.2 rounded">
                        {secret.env}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Rotasi Terakhir: {secret.rotated}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-700">
                    {idx === 0 && showSecret1 ? secret.value : idx === 1 && showSecret2 ? secret.value : '••••••••••••••••••••••••'}
                  </div>
                  <button
                    onClick={() => {
                      if (idx === 0) setShowSecret1(!showSecret1);
                      if (idx === 1) setShowSecret2(!showSecret2);
                    }}
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
                    title="Tampilkan Nilai Kunci"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(secret.value);
                      showToast(`Kunci ${secret.name} berhasil disalin ke clipboard.`);
                    }}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
                  >
                    Salin
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. API CREDENTIALS VIEW */}
      {currentSection === 'api' && (
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-800">
                DEVELOPER SECURITY SDK &amp; WEBHOOKS
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Kunci API &amp; Webhook Keamanan</h1>
            <p className="text-xs sm:text-sm text-slate-500">Integrasikan mesin inspeksi siber ke aplikasi web backend Anda.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">Live Production Secret API Key</label>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  readOnly
                  value={apiKey}
                  className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 font-mono"
                />
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(apiKey);
                    setCopiedKey(true);
                    showToast('Secret API Key disalin.');
                    setTimeout(() => setCopiedKey(false), 2000);
                  }}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey ? 'Tersalin' : 'Salin Kunci'}</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-900 block">HTTP Header Autentikasi:</span>
              <code className="font-mono text-blue-700 block">Authorization: Bearer sk_live_sec_...</code>
            </div>
          </div>
        </div>
      )}

      {/* 8. GOODWRITER THREAT INTEL AI ENGINE VIEW */}
      {currentSection === 'team-goodwriter' && (
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-800">
                AI CYBER THREAT INTELLIGENCE &amp; ADVISORY
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">GoodWriter Cyber Intel Engine</h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Generator intelijen ancaman siber, analisis malware AI, dan rekomendasi respons insiden otomatis.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">Prompt Analisis Intelijen Siber:</label>
              <textarea
                rows={3}
                value={intelPrompt}
                onChange={(e) => setIntelPrompt(e.target.value)}
                className="w-full p-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50 font-medium"
              />
            </div>

            <button
              onClick={handleGenerateIntel}
              disabled={isGeneratingIntel}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGeneratingIntel ? 'Menganalisis Telemetri Siber...' : 'Hasilkan Laporan Intelijen AI'}</span>
            </button>

            {intelResult && (
              <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl border border-slate-800 whitespace-pre-wrap leading-relaxed">
                {intelResult}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9. INVOICER COMPLIANCE & BILLING LEDGER VIEW */}
      {currentSection === 'team-invoicer' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                <span className="text-[12px] font-bold uppercase tracking-wider text-slate-800">
                  COMPLIANCE, SLA &amp; AUDIT LEDGER
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Invoicer &amp; Audit Kepatuhan</h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Pencatatan SLA jaminan keamanan 99.99%, laporan bukti SOC 2 Type II, dan tagihan kepatuhan otomatis.
              </p>
            </div>

            <button
              onClick={() => showToast('Mengunduh paket bukti kepatuhan SOC 2 Type II...')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Unduh Dokumen SOC 2
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Status Kepatuhan Audit Regulasi:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block">SOC 2 Type II</span>
                <span className="font-bold text-emerald-700 text-sm">Certified ✓</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block">ISO/IEC 27001</span>
                <span className="font-bold text-emerald-700 text-sm">Compliant ✓</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block">GDPR &amp; HIPAA</span>
                <span className="font-bold text-emerald-700 text-sm">Verified ✓</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. PROFILE & PREFERENCE VIEW */}
      {(currentSection === 'profile' || currentSection === 'preference') && (
        <div className="space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {currentSection === 'profile' ? 'Profil SOC Analyst' : 'Preferensi Operasional Keamanan'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">Konfigurasi akun dan izin operasional Anda.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-900 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                NA
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Nurlaela Azwini</h3>
                <p className="text-xs text-slate-500">nurlaelaazwini66@gmail.com • Lead Security Architect</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block">Level Izin Akses (Security Clearance):</span>
                <span className="font-bold text-slate-900 text-sm">Level 4 (Super Admin)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block">Otentikasi Perangkat:</span>
                <span className="font-bold text-emerald-700 text-sm">YubiKey 5 FIDO2 Terverifikasi</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-600">Ingin menambah kapasitas kursi SOC atau add-on keamanan?</span>
              <button
                onClick={onNavigateToBilling}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Kelola Paket Billing &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
