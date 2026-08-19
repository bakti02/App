import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Zap,
  CheckCircle2,
  Wrench,
  Search,
  Filter,
  Layers,
  ArrowUpRight,
  Check
} from 'lucide-react';
import { RiskFinding } from '../types';
import { RISK_FINDINGS_DATA } from '../data/mockData';

interface RiskExposureViewProps {
  showToast?: (msg: string) => void;
}

export const RiskExposureView: React.FC<RiskExposureViewProps> = ({
  showToast = (_msg: string) => {}
}) => {
  const [findings, setFindings] = useState<RiskFinding[]>(RISK_FINDINGS_DATA);
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleRemediate = (id: string, title: string) => {
    setFindings((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: 'RESOLVED' } : f))
    );
    showToast(`Remediasi untuk "${title}" berhasil dieksekusi melalui Core Remediation Lifecycle.`);
  };

  const filteredFindings = findings.filter((f) => {
    const matchSev = severityFilter === 'all' || f.severity === severityFilter;
    const matchSearch =
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.cve && f.cve.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchSev && matchSearch;
  });

  return (
    <div id="risk-exposure-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              NusaSec Risk Engine &amp; CVE Telemetry
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Risk &amp; Exposure Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Pemetaan kerentanan aktif, vektor paparan publik, serta kalkulasi dampak keparahan CVSS pada aset cloud.
          </p>
        </div>

        <button
          onClick={() => showToast('Memulai pemindaian ulang Zero-Day & CVE pada seluruh aset cloud...')}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all"
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Jalankan Audit Risiko Realtime</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-slate-500 text-[11px] block">TEMUAN KRITIS (CVSS &gt; 9.0)</span>
          <span className="text-xl font-bold text-rose-600 mt-1 block">
            {findings.filter((f) => f.severity === 'CRITICAL' && f.status !== 'RESOLVED').length} CVE
          </span>
          <span className="text-[10px] text-rose-600 font-bold">Harus Diperbaiki Segera</span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-slate-500 text-[11px] block">SEVERITY TINGGI</span>
          <span className="text-xl font-bold text-amber-600 mt-1 block">
            {findings.filter((f) => f.severity === 'HIGH' && f.status !== 'RESOLVED').length} CVE
          </span>
          <span className="text-[10px] text-slate-500">Exposure Vector Terbatas</span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-slate-500 text-[11px] block">RATA-RATA SKOR RISIKO</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">22.4 / 100</span>
          <span className="text-[10px] text-emerald-600 font-bold">Posture Sangat Baik</span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-slate-500 text-[11px] block">STATUS REMEDIASI</span>
          <span className="text-xl font-bold text-emerald-600 mt-1 block">
            {findings.filter((f) => f.status === 'RESOLVED').length} Selesai
          </span>
          <span className="text-[10px] text-emerald-700">Audit Verifikasi Berhasil</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-1 overflow-x-auto">
          <span className="text-slate-400 mr-2 font-mono">Tingkat Keparahan:</span>
          {['all', 'CRITICAL', 'HIGH', 'MEDIUM'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 rounded-lg uppercase transition-colors ${
                severityFilter === sev
                  ? 'bg-slate-900 text-white font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari CVE / nama aset / vektor..."
            className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Findings List */}
      <div className="space-y-4">
        {filteredFindings.map((finding) => (
          <div
            key={finding.id}
            className={`bg-white border rounded-2xl p-5 shadow-2xs transition-all space-y-3 ${
              finding.status === 'RESOLVED'
                ? 'border-slate-200 bg-slate-50/60 opacity-80'
                : finding.severity === 'CRITICAL'
                ? 'border-rose-200'
                : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-bold text-xs bg-slate-100 text-slate-900 px-2 py-0.5 rounded">
                  {finding.cve || finding.id}
                </span>

                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                    finding.severity === 'CRITICAL'
                      ? 'bg-rose-100 text-rose-800'
                      : finding.severity === 'HIGH'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  CVSS {finding.cvss} ({finding.severity})
                </span>

                <span className="text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {finding.provider.toUpperCase()}
                </span>

                <h3 className="text-sm sm:text-base font-bold text-slate-900">{finding.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                {finding.status === 'RESOLVED' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                    <Check className="w-3.5 h-3.5" />
                    Telah Diremediasi
                  </span>
                ) : (
                  <button
                    onClick={() => handleRemediate(finding.id, finding.title)}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all active:scale-98"
                  >
                    <Wrench className="w-3.5 h-3.5 text-amber-400" />
                    <span>1-Click Auto Remediation</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">TARGET ASET:</span>
                <span className="font-bold text-slate-900">{finding.asset}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">VEKTOR PAPARAN (EXPOSURE VECTOR):</span>
                <span className="text-blue-600 font-semibold">{finding.exposureVector}</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-blue-50/40 p-3 rounded-xl border border-blue-100">
              💡 <strong className="text-slate-900">Rencana Remediasi Resmi:</strong> {finding.remediationPlan}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 font-mono">
              <span>Terdeteksi: {finding.detectedAt}</span>
              <span>Dampak Bisnis: <strong className="text-slate-700">{finding.businessCriticality}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
