import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Download,
  Search,
  ExternalLink,
  ShieldCheck,
  Award,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { ComplianceFramework } from '../types';
import { COMPLIANCE_FRAMEWORKS_DATA } from '../data/mockData';

export const ComplianceTrustView: React.FC<{ showToast?: (msg: string) => void }> = ({
  showToast = (_msg: string) => {}
}) => {
  const [frameworks] = useState<ComplianceFramework[]>(COMPLIANCE_FRAMEWORKS_DATA);
  const [selectedFramework, setSelectedFramework] = useState<ComplianceFramework>(COMPLIANCE_FRAMEWORKS_DATA[0]);

  const handleDownloadDossier = (code: string) => {
    showToast(`Mengunduh Berkas Audit Resmi & Bukti Kepatuhan ${code} (PDF)...`);
  };

  return (
    <div id="compliance-trust-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              NusaSec Trust &amp; Continuous Compliance Plane
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Compliance Frameworks &amp; Audit Readiness
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Pemetaan kepatuhan berkelanjutan terhadap standar internasional (SOC 2, ISO 27001) dan regulasi nasional (UU PDP No. 27/2022).
          </p>
        </div>

        <button
          onClick={() => handleDownloadDossier(selectedFramework.code)}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-98"
        >
          <Download className="w-4 h-4" />
          <span>Ekspor Berkas Audit Lengkap</span>
        </button>
      </div>

      {/* Framework Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {frameworks.map((fw) => {
          const isSelected = selectedFramework.id === fw.id;
          return (
            <button
              key={fw.id}
              onClick={() => setSelectedFramework(fw)}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-emerald-950 text-white border-emerald-700 shadow-lg'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                    isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {fw.jurisdiction}
                </span>
                <span className={`text-xs font-bold ${isSelected ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  ✓ Compliant
                </span>
              </div>

              <div>
                <h3 className={`font-bold text-sm sm:text-base ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {fw.code}
                </h3>
                <div className={`text-2xl font-bold font-mono mt-1 ${isSelected ? 'text-emerald-300' : 'text-slate-900'}`}>
                  {fw.complianceScore}%
                </div>
              </div>

              <div className={`text-[11px] pt-2 border-t font-mono flex items-center justify-between w-full ${
                isSelected ? 'border-emerald-800/80 text-emerald-200' : 'border-slate-100 text-slate-500'
              }`}>
                <span>{fw.passedRules} dari {fw.totalRules} Aturan Lolos</span>
                <span>Audit: {fw.lastAudit}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Framework Deep Dive Detail */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">{selectedFramework.name}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Yurisdiksi Hukum: <strong>{selectedFramework.jurisdiction}</strong> | Cakupan Bukti (Evidence Coverage): <strong>{selectedFramework.evidenceCoverage}%</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-xl font-bold">
              Status: 100% Audit Ready
            </span>
          </div>
        </div>

        {/* Rule Categories Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
            <span className="text-slate-500 text-[11px] block">ATURAN MEMENUHI SYARAT (PASSED)</span>
            <span className="text-xl font-bold text-emerald-600 block">{selectedFramework.passedRules} Kontrol</span>
            <span className="text-[10px] text-slate-400">Terverifikasi hash kriptografi</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
            <span className="text-slate-500 text-[11px] block">GAP AUDIT (FAILED / OPEN)</span>
            <span className="text-xl font-bold text-rose-600 block">{selectedFramework.failedRules} Kontrol</span>
            <span className="text-[10px] text-rose-600">Dalam proses remediasi</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
            <span className="text-slate-500 text-[11px] block">CAKUPAN BUKTI ELEKTRONIK</span>
            <span className="text-xl font-bold text-blue-600 block">{selectedFramework.evidenceCoverage}%</span>
            <span className="text-[10px] text-slate-400">SHA256 Provenance Lock</span>
          </div>
        </div>

        {/* Disclaimer per Product Spec */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
          ⚖️ <strong>Catatan Kepatuhan NusaSec:</strong> Evaluasi teknis ini dihasilkan secara otomatis dari data plane cloud posture dan pengujian kontrol keamanan siber. Hasil evaluasi tidak menggantikan nasihat hukum formal dari konsultan hukum berlisensi.
        </div>
      </div>
    </div>
  );
};
