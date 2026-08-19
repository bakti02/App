import React, { useState } from 'react';
import {
  Atom,
  AlertTriangle,
  CheckCircle2,
  Zap,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Binary,
  Layers
} from 'lucide-react';
import { PqcAsset } from '../types';
import { PQC_ASSETS_DATA } from '../data/mockData';

export const PqcReadinessView: React.FC<{
  onNavigateToMigration: () => void;
  showToast?: (msg: string) => void;
}> = ({ onNavigateToMigration, showToast = (_msg: string) => {} }) => {
  const [assets, setAssets] = useState<PqcAsset[]>(PQC_ASSETS_DATA);

  const handleScanCbom = () => {
    showToast('Menjalankan CBOM (Cryptographic Bill of Materials) Deep Scanner...');
    setTimeout(() => {
      showToast('Pemindaian CBOM selesai: 3 inventaris kriptografi terpetakan.');
    }, 1000);
  };

  return (
    <div id="pqc-readiness-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              NusaSec Quantum Fortress Plane
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            PQC Readiness &amp; Cryptographic Bill of Materials (CBOM)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Inventaris seluruh algoritma kriptografi (RSA, ECC vs NIST PQC ML-KEM/ML-DSA) dan evaluasi kerentanan terhadap Shor's Algorithm.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleScanCbom}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Pindai Ulang CBOM</span>
          </button>
          <button
            onClick={onNavigateToMigration}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-98"
          >
            <Binary className="w-4 h-4" />
            <span>Buka Migration Center</span>
          </button>
        </div>
      </div>

      {/* Quantum Readiness Score Card */}
      <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-purple-900/50 shadow-xl space-y-4 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono font-semibold">
              <Atom className="w-3.5 h-3.5" />
              NIST FIPS 203 / 204 STANDARDIZATION READY
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-white">
              Indeks Kesiapan Pasca-Kuantum: 68.5%
            </h2>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
              Algoritma kunci telah dimodernisasi menggunakan enkripsi berbasis kisi (Lattice-based cryptography: ML-KEM-768 &amp; ML-DSA-65).
            </p>
          </div>

          <div className="flex sm:flex-col items-center justify-center p-4 bg-purple-900/40 border border-purple-700/50 rounded-2xl shrink-0 text-center font-mono">
            <span className="text-[11px] text-purple-300 uppercase">HNDL RISK INDEX</span>
            <span className="text-2xl sm:text-3xl font-bold text-amber-400 mt-1">MODERATE</span>
            <span className="text-[10px] text-purple-300">Harvest Now Decrypt Later</span>
          </div>
        </div>
      </div>

      {/* CBOM Inventory Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Inventaris CBOM (Cryptographic Bill of Materials)</h3>
            <p className="text-xs text-slate-500">Daftar kunci, sertifikat SSL/TLS, dan algoritma tanda tangan digital dalam ekosistem cloud.</p>
          </div>
          <span className="text-xs font-mono text-slate-500">{assets.length} Algoritma Terlacak</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-mono uppercase text-[10px]">
                <th className="pb-3 px-3 font-semibold">Nama Sistem / Aset</th>
                <th className="pb-3 px-3 font-semibold">Algoritma Saat Ini</th>
                <th className="pb-3 px-3 font-semibold">Tipe Kripto</th>
                <th className="pb-3 px-3 font-semibold">Target Standar PQC</th>
                <th className="pb-3 px-3 font-semibold">Kerentanan Kuantum</th>
                <th className="pb-3 px-3 font-semibold text-right">Fase Migrasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-900 text-[13px]">{asset.name}</div>
                    <div className="text-slate-400 font-mono text-[10px]">{asset.workload}</div>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-800">
                    {asset.currentAlgorithm}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-100 text-slate-800">
                      {asset.algorithmType}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-purple-700 font-semibold">
                    {asset.targetAlgorithm}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`font-mono font-bold ${
                        asset.quantumVulnerability === 'HIGH_RISK'
                          ? 'text-rose-600'
                          : asset.quantumVulnerability === 'MEDIUM_RISK'
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {asset.quantumVulnerability}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                        asset.migrationPhase === 'MIGRATED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : asset.migrationPhase === 'SIMULATED'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {asset.migrationPhase}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
