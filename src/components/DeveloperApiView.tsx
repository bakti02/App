import React, { useState } from 'react';
import {
  Code2,
  Key,
  Copy,
  Plus,
  Terminal,
  AlertCircle
} from 'lucide-react';
import { ApiKeyItem } from '../types';
import { API_KEYS_DATA } from '../data/mockData';

export const DeveloperApiView: React.FC<{ showToast?: (msg: string) => void }> = ({
  showToast = (_msg: string) => {}
}) => {
  const [keys, setKeys] = useState<ApiKeyItem[]>(API_KEYS_DATA);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newEnvironment, setNewEnvironment] = useState<'PRODUCTION' | 'STAGING' | 'SANDBOX'>('PRODUCTION');
  const [revealedSecret, setRevealedSecret] = useState<string | null>(null);

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const rawSecret = `nusa_live_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
    const prefix = `${rawSecret.substring(0, 14)}***`;

    const newKey: ApiKeyItem = {
      id: `key-${Date.now().toString().slice(-4)}`,
      name: newKeyName,
      keyPrefix: prefix,
      keyHash: `sha256:${Math.random().toString(36).substring(2, 8)}...`,
      environment: newEnvironment,
      scopes: ['pqc:compute', 'telemetry:write'],
      createdAt: 'Hari ini',
      lastUsed: 'Belum digunakan',
      expiresAt: '01 Agu 2027',
      status: 'ACTIVE'
    };

    setKeys([newKey, ...keys]);
    setRevealedSecret(rawSecret);
    setNewKeyName('');
    showToast(`Kunci API "${newKey.name}" berhasil dibuat.`);
  };

  const handleRevokeKey = (id: string, name: string) => {
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, status: 'REVOKED' } : k)));
    showToast(`Kunci API "${name}" telah dicabut.`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Tersalin ke clipboard!');
  };

  return (
    <div id="developer-api-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              NusaSec Developer Plane
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            PQC Cloud API Keys &amp; Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Kelola kunci otentikasi API untuk enkripsi data pasca-kuantum dan verifikasi tanda tangan digital secara terprogram.
          </p>
        </div>

        <button
          onClick={() => {
            setRevealedSecret(null);
            setIsCreateModalOpen(true);
          }}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Kunci API Baru</span>
        </button>
      </div>

      {/* Keys Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Daftar API Keys Aktif</h3>

        <div className="space-y-3">
          {keys.map((k) => (
            <div
              key={k.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-all ${
                k.status === 'REVOKED'
                  ? 'border-slate-200 bg-slate-50 opacity-60'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-900 text-sm">{k.name}</span>
                  <span className="font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                    {k.keyPrefix}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.2 rounded-full uppercase ${
                      k.environment === 'PRODUCTION'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {k.environment}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 font-mono flex items-center gap-4">
                  <span>Dibuat: {k.createdAt}</span>
                  <span>Terakhir digunakan: <strong>{k.lastUsed}</strong></span>
                  <span>Scopes: <strong className="text-slate-700">{k.scopes.join(', ')}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {k.status === 'ACTIVE' ? (
                  <button
                    onClick={() => handleRevokeKey(k.id, k.name)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Cabut Kunci
                  </button>
                ) : (
                  <span className="text-xs font-bold text-rose-600 font-mono">REVOKED</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Snippet Example */}
      <div className="bg-slate-950 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span>CURL EXAMPLE: POST-QUANTUM KEY ENCAPSULATION</span>
          </div>
          <button
            onClick={() => copyToClipboard('curl -X POST https://api.nusasec.cloud/v1/pqc/kem/encapsulate \\\n  -H "Authorization: Bearer nusa_live_..." \\\n  -H "Content-Type: application/json" \\\n  -d \'{"algorithm":"ML-KEM-768","public_key_b64":"..."}\'')}
            className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
          >
            <Copy className="w-3.5 h-3.5" /> Salin cURL
          </button>
        </div>

        <pre className="text-blue-300 overflow-x-auto p-2 bg-slate-900 rounded-xl leading-relaxed">
{`curl -X POST https://api.nusasec.cloud/v1/pqc/kem/encapsulate \\
  -H "Authorization: Bearer nusa_live_xxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "algorithm": "ML-KEM-768",
    "public_key_b64": "MIIB...=="
  }'`}
        </pre>
      </div>

      {/* Modal Buat Kunci */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Buat Kunci API Baru</h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {revealedSecret ? (
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-2 text-xs text-amber-900">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    SIMPAN KUNCI INI SEKARANG
                  </div>
                  <p>
                    Kunci ini hanya ditampilkan <strong>satu kali</strong> demi keamanan. Kami hanya menyimpan hash satu arah.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-700">API Secret Key Anda:</span>
                  <div className="flex items-center gap-2 bg-slate-900 text-emerald-400 p-3 rounded-xl font-mono text-xs break-all">
                    <span>{revealedSecret}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(revealedSecret)}
                      className="p-1 text-slate-400 hover:text-white shrink-0 ml-auto"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-semibold text-xs mt-3 shadow-xs"
                >
                  Selesai &amp; Tutup
                </button>
              </div>
            ) : (
              <form onSubmit={handleGenerateKey} className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Nama / Kegunaan Kunci</label>
                  <input
                    type="text"
                    required
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="Contoh: Production Edge API Gateway"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Lingkungan (Environment)</label>
                  <select
                    value={newEnvironment}
                    onChange={(e) => setNewEnvironment(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="PRODUCTION">PRODUCTION</option>
                    <option value="STAGING">STAGING</option>
                    <option value="SANDBOX">SANDBOX</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs shadow-xs"
                  >
                    Generate Kunci
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
