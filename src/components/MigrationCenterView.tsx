import React, { useState } from 'react';
import {
  Binary,
  Play,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';

export const MigrationCenterView: React.FC<{ showToast?: (msg: string) => void }> = ({
  showToast = (_msg: string) => {}
}) => {
  const [selectedProfile, setSelectedProfile] = useState<'HYBRID' | 'FULL_PQC'>('HYBRID');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationDone, setSimulationDone] = useState(true);
  const [isPromoted, setIsPromoted] = useState(false);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    showToast('Menjalankan simulasi handshake PQC ML-KEM-768 & ML-DSA-65...');

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationDone(true);
      showToast('Simulasi selesai! Overhead latensi: +1.4ms (dalam batas SLA optimal).');
    }, 1200);
  };

  const handlePromoteToProduction = () => {
    setIsPromoted(true);
    showToast('Profil Kriptografi PQC berhasil dipromosikan ke Klaster Produksi Utama!');
  };

  return (
    <div id="migration-center-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              NusaSec Quantum Sandbox &amp; Promotion Engine
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Post-Quantum Migration Center &amp; Sandbox
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Uji simulasi transisi TLS/KEM dari RSA-2048 / ECC P-256 ke standar NIST PQC (ML-KEM-768 &amp; ML-DSA-65) dengan benchmarking latensi.
          </p>
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-98"
        >
          <Play className="w-4 h-4 text-amber-400" />
          <span>{isSimulating ? 'Menjalankan Simulasi...' : 'Jalankan Simulasi Handshake'}</span>
        </button>
      </div>

      {/* Profile Selector */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 w-fit text-xs font-semibold">
        <span className="text-slate-400 font-mono px-2">Mode Target:</span>
        <button
          onClick={() => setSelectedProfile('HYBRID')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            selectedProfile === 'HYBRID'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Hybrid (ECDH X25519 + ML-KEM-768)
        </button>
        <button
          onClick={() => setSelectedProfile('FULL_PQC')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            selectedProfile === 'FULL_PQC'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Pure Post-Quantum (FIPS 203 / ML-KEM Native)
        </button>
      </div>

      {/* Before vs After Cryptographic Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Before */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 font-mono">
              [BEFORE] ARSITEKTUR KLASIK (RENTAN KUANTUM)
            </span>
            <span className="text-xs font-mono text-slate-400">Baseline</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-100 space-y-1">
              <span className="text-slate-400 text-[10px] block">ALGORITMA PERTUKARAN KUNCI (KEM):</span>
              <span className="font-bold text-slate-900">ECDH Secp256r1 (256-bit)</span>
              <span className="text-[10px] text-rose-600 block">⚠️ Rentan terhadap Shor Algorithm</span>
            </div>

            <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-100 space-y-1">
              <span className="text-slate-400 text-[10px] block">TANDA TANGAN DIGITAL (SIGNATURE):</span>
              <span className="font-bold text-slate-900">RSA 2048-bit PKCS#1 v1.5</span>
              <span className="text-[10px] text-rose-600 block">⚠️ Rentan Quantum Decryption</span>
            </div>

            <div className="flex items-center justify-between pt-2 text-slate-500">
              <span>Handshake Latency: <strong className="text-slate-900">12.2 ms</strong></span>
              <span>Key Size: <strong className="text-slate-900">256 B</strong></span>
            </div>
          </div>
        </div>

        {/* After */}
        <div className="bg-gradient-to-br from-purple-950 to-slate-950 text-white rounded-2xl p-6 shadow-xl border border-purple-800 space-y-4">
          <div className="flex items-center justify-between border-b border-purple-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              [AFTER] ARSITEKTUR PASCA-KUANTUM (PQC SHIELD)
            </span>
            <span className="text-xs font-mono text-emerald-400">Target Production</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="bg-purple-900/40 p-3 rounded-xl border border-purple-700/50 space-y-1">
              <span className="text-purple-300 text-[10px] block">ALGORITMA PERTUKARAN KUNCI (KEM):</span>
              <span className="font-bold text-white">ML-KEM-768 (Kyber-768 FIPS 203)</span>
              <span className="text-[10px] text-emerald-400 block">✓ Kebal Komputasi Kuantum</span>
            </div>

            <div className="bg-purple-900/40 p-3 rounded-xl border border-purple-700/50 space-y-1">
              <span className="text-purple-300 text-[10px] block">TANDA TANGAN DIGITAL (SIGNATURE):</span>
              <span className="font-bold text-white">ML-DSA-65 (Dilithium-3 FIPS 204)</span>
              <span className="text-[10px] text-emerald-400 block">✓ NIST Standardized Lattice Signature</span>
            </div>

            <div className="flex items-center justify-between pt-2 text-purple-200">
              <span>Handshake Latency: <strong className="text-white">13.6 ms (+1.4ms)</strong></span>
              <span>Public Key Size: <strong className="text-white">1,184 B</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Attestation & Promotion Box */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-base">Promosikan Snapshot Kriptografi ke Klaster Produksi</h3>
            <p className="text-xs text-slate-500">
              Menghasilkan surat pernyataan (attestation) bertanda tangan digital dan menerapkan cipher suite PQC pada Edge Gateway.
            </p>
          </div>

          <button
            onClick={handlePromoteToProduction}
            disabled={isPromoted}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all ${
              isPromoted
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-98'
            }`}
          >
            {isPromoted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Telah Dipromosikan ke Live Core</span>
              </>
            ) : (
              <>
                <Award className="w-4 h-4 text-amber-400" />
                <span>1-Click Promosikan ke Produksi</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
