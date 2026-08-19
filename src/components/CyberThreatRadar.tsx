import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Activity,
  Globe,
  Radio,
  Wifi,
  AlertTriangle,
  Zap,
  Terminal,
  Play,
  Pause,
  Filter,
  CheckCircle,
  XCircle,
  Lock,
  Server
} from 'lucide-react';

interface ThreatEvent {
  id: string;
  timestamp: string;
  sourceIp: string;
  country: string;
  countryCode: string;
  attackType: string;
  targetEndpoint: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  actionTaken: 'Blocked by WAF' | 'Quarantined' | 'Rate Limited' | 'Challenge Passed';
}

const INITIAL_THREATS: ThreatEvent[] = [
  {
    id: 'THR-8821',
    timestamp: '00:02:14',
    sourceIp: '185.220.101.5',
    country: 'Frankfurt, DE',
    countryCode: 'DE',
    attackType: 'SQL Injection (CVE-2024-3400)',
    targetEndpoint: '/api/v1/auth/session',
    severity: 'Critical',
    actionTaken: 'Blocked by WAF'
  },
  {
    id: 'THR-8820',
    timestamp: '00:02:08',
    sourceIp: '194.26.29.112',
    country: 'Saint Petersburg, RU',
    countryCode: 'RU',
    attackType: 'SSH Distributed Brute-Force',
    targetEndpoint: 'port:22 / sshd',
    severity: 'High',
    actionTaken: 'Quarantined'
  },
  {
    id: 'THR-8819',
    timestamp: '00:01:52',
    sourceIp: '45.154.255.89',
    country: 'Amsterdam, NL',
    countryCode: 'NL',
    attackType: 'Layer 7 HTTP Flood (DDoS)',
    targetEndpoint: '/graphql/query',
    severity: 'Critical',
    actionTaken: 'Blocked by WAF'
  },
  {
    id: 'THR-8818',
    timestamp: '00:01:30',
    sourceIp: '103.145.74.2',
    country: 'Jakarta, ID',
    countryCode: 'ID',
    attackType: 'API Scraping Botnet',
    targetEndpoint: '/v2/pricing/catalog',
    severity: 'Medium',
    actionTaken: 'Rate Limited'
  },
  {
    id: 'THR-8817',
    timestamp: '00:01:10',
    sourceIp: '89.248.165.74',
    country: 'London, UK',
    countryCode: 'GB',
    attackType: 'JWT Signature Replay Attempt',
    targetEndpoint: '/api/admin/config',
    severity: 'High',
    actionTaken: 'Blocked by WAF'
  }
];

export const CyberThreatRadar: React.FC = () => {
  const [threats, setThreats] = useState<ThreatEvent[]>(INITIAL_THREATS);
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [threatStats, setThreatStats] = useState({
    totalBlocked: 14892,
    activeProbes: 38,
    ddosAbsorption: '99.98%',
    socResponseTime: '0.42 ms'
  });

  // Simulated live event feed ticker
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      const attackPool = [
        { type: 'XSS Cross-Site Scripting Payload', sev: 'High' as const, act: 'Blocked by WAF' as const, ep: '/search?q=' },
        { type: 'Path Traversal (../../etc/passwd)', sev: 'Critical' as const, act: 'Blocked by WAF' as const, ep: '/download/file' },
        { type: 'Credential Stuffing Bot Attack', sev: 'High' as const, act: 'Quarantined' as const, ep: '/api/v1/login' },
        { type: 'Zero-Day Header Anomaly', sev: 'Medium' as const, act: 'Rate Limited' as const, ep: '/webhook/stripe' }
      ];
      const randomAttack = attackPool[Math.floor(Math.random() * attackPool.length)];
      const randomIp = `${Math.floor(Math.random() * 200 + 20)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

      const newEvent: ThreatEvent = {
        id: `THR-${Math.floor(Math.random() * 9000 + 1000)}`,
        timestamp: new Date().toLocaleTimeString(),
        sourceIp: randomIp,
        country: 'Global Edge Node',
        countryCode: 'EDGE',
        attackType: randomAttack.type,
        targetEndpoint: randomAttack.ep,
        severity: randomAttack.sev,
        actionTaken: randomAttack.act
      };

      setThreats((prev) => [newEvent, ...prev.slice(0, 7)]);
      setThreatStats((prev) => ({
        ...prev,
        totalBlocked: prev.totalBlocked + 1
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  const filteredThreats = selectedSeverity === 'all'
    ? threats
    : threats.filter((t) => t.severity.toLowerCase() === selectedSeverity.toLowerCase());

  return (
    <div id="cyber-threat-radar" className="bg-slate-950 text-slate-100 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-6">
      {/* Top Header & Live Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-500/30 text-blue-400">
            <Radio className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <h3 className="text-sm font-bold tracking-wide uppercase text-white font-mono">
                GLOBAL THREAT RADAR &amp; SIEM TELEMETRY
              </h3>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono px-2 py-0.5 rounded-full font-bold">
                100% DEFENSE ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Pemantauan waktu nyata serangan siber global yang diblokir oleh WAF, IPS, dan Botnet Filter.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
              isLiveStreaming
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/60'
                : 'bg-slate-900 text-slate-400 border border-slate-700'
            }`}
          >
            {isLiveStreaming ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isLiveStreaming ? 'LIVE STREAMING' : 'PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Cyber KPI Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="bg-slate-900/90 border border-slate-800/90 p-3 rounded-xl">
          <span className="text-slate-400 text-[11px] block">TOTAL ANCAMAN DIBLOKIR</span>
          <span className="text-lg font-bold text-white tracking-tight mt-0.5 block">
            {threatStats.totalBlocked.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold">+127 dalam 1 jam</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/90 p-3 rounded-xl">
          <span className="text-slate-400 text-[11px] block">PROBE ANOMALI AKTIF</span>
          <span className="text-lg font-bold text-amber-400 tracking-tight mt-0.5 block">
            {threatStats.activeProbes} IP Terisolasi
          </span>
          <span className="text-[10px] text-slate-400">Zero-Trust Honeypot</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/90 p-3 rounded-xl">
          <span className="text-slate-400 text-[11px] block">ABSORPSI DDOS LAYER 7</span>
          <span className="text-lg font-bold text-blue-400 tracking-tight mt-0.5 block">
            {threatStats.ddosAbsorption}
          </span>
          <span className="text-[10px] text-slate-400">Global Edge Anycast</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/90 p-3 rounded-xl">
          <span className="text-slate-400 text-[11px] block">SOC MITIGASI LATENSI</span>
          <span className="text-lg font-bold text-emerald-400 tracking-tight mt-0.5 block">
            {threatStats.socResponseTime}
          </span>
          <span className="text-[10px] text-slate-400">Automated eBPF Filter</span>
        </div>
      </div>

      {/* Live Threat Incident Feed Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono font-bold text-slate-300 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            TELEMETRI SERANGAN SIBER REAL-TIME (SIEM EVENT STREAM):
          </span>

          <div className="flex items-center gap-1 font-mono text-[11px]">
            <span className="text-slate-400 mr-1">Filter:</span>
            {['all', 'critical', 'high', 'medium'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-2 py-0.5 rounded capitalize ${
                  selectedSeverity === sev
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800/60 font-mono text-xs">
          {filteredThreats.map((threat) => (
            <div
              key={threat.id}
              className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-500 font-semibold">{threat.timestamp}</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    threat.severity === 'Critical'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : threat.severity === 'High'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-blue-950 text-blue-300 border border-blue-800'
                  }`}
                >
                  {threat.severity}
                </span>
                <div>
                  <span className="font-bold text-slate-100">{threat.attackType}</span>
                  <span className="text-slate-400 text-[11px] block sm:inline sm:ml-2">
                    Target: <code className="text-blue-300">{threat.targetEndpoint}</code>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-[11px] text-slate-400">{threat.sourceIp} ({threat.country})</span>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded">
                  {threat.actionTaken} ✓
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
