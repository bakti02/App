import React, { useState } from 'react';
import {
  Cloud,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Server,
  Layers,
  Search,
  ExternalLink,
  ShieldCheck,
  Filter,
  Check
} from 'lucide-react';
import { CloudConnection, CloudAsset } from '../types';
import { CLOUD_CONNECTIONS_DATA, CLOUD_ASSETS_DATA } from '../data/mockData';

interface AssetsCloudViewProps {
  showToast?: (msg: string) => void;
}

export const AssetsCloudView: React.FC<AssetsCloudViewProps> = ({
  showToast = (_msg: string) => {}
}) => {
  const [connections, setConnections] = useState<CloudConnection[]>(CLOUD_CONNECTIONS_DATA);
  const [assets, setAssets] = useState<CloudAsset[]>(CLOUD_ASSETS_DATA);
  const [selectedProviderFilter, setSelectedProviderFilter] = useState<string>('all');
  const [searchAssetQuery, setSearchAssetQuery] = useState<string>('');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);
  const [newProvider, setNewProvider] = useState<'aws' | 'azure' | 'gcp' | 'cloudflare'>('aws');
  const [newAccountName, setNewAccountName] = useState<string>('');
  const [newAccountRef, setNewAccountRef] = useState<string>('');
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const handleValidateConnection = (accountId: string) => {
    showToast('Memvalidasi token otentikasi role_ref dengan Cloud Provider API...');
    setTimeout(() => {
      setConnections((prev) =>
        prev.map((c) =>
          c.accountId === accountId
            ? { ...c, identityStatus: 'VALIDATED', lastValidatedAt: 'Baru saja' }
            : c
        )
      );
      showToast('Koneksi Cloud terverifikasi dan inventaris aset diperbarui!');
    }, 1000);
  };

  const handleConnectCloud = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountName.trim() || !newAccountRef.trim()) return;

    setIsValidating(true);
    showToast(`Menghubungkan akun cloud ${newProvider.toUpperCase()} (${newAccountRef})...`);

    setTimeout(() => {
      const newConn: CloudConnection = {
        accountId: `conn-${newProvider}-${Date.now()}`,
        provider: newProvider,
        accountRef: newAccountRef,
        name: newAccountName,
        credentialMode: newProvider === 'cloudflare' ? 'api_key' : 'role_ref',
        identityStatus: 'VALIDATED',
        lastValidatedAt: 'Baru saja',
        regionCount: newProvider === 'cloudflare' ? 275 : 2,
        assetCount: Math.floor(Math.random() * 200 + 50)
      };

      setConnections([newConn, ...connections]);
      setIsValidating(false);
      setIsConnectModalOpen(false);
      setNewAccountName('');
      setNewAccountRef('');
      showToast(`Akun Cloud "${newConn.name}" berhasil ditambahkan dan disinkronkan ke Core Inventory!`);
    }, 1200);
  };

  const filteredAssets = assets.filter((asset) => {
    const matchProvider = selectedProviderFilter === 'all' || asset.provider === selectedProviderFilter;
    const matchSearch =
      asset.name.toLowerCase().includes(searchAssetQuery.toLowerCase()) ||
      asset.externalId.toLowerCase().includes(searchAssetQuery.toLowerCase()) ||
      asset.assetType.toLowerCase().includes(searchAssetQuery.toLowerCase());
    return matchProvider && matchSearch;
  });

  return (
    <div id="assets-cloud-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-7">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              NusaSec Secure Data Plane
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Multi-Cloud Connections &amp; Asset Inventory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Koneksi resmi AWS, Azure, GCP, Cloudflare, dan katalog seluruh aset komputasi yang terlindungi.
          </p>
        </div>

        <button
          onClick={() => setIsConnectModalOpen(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Koneksi Cloud</span>
        </button>
      </div>

      {/* Cloud Connections Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono flex items-center gap-2">
            <Cloud className="w-4 h-4 text-blue-600" />
            AKUN CLOUD TERHUBUNG (AUTHORITATIVE PROVIDERS)
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {connections.length} Akun Terdaftar
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {connections.map((conn) => (
            <div
              key={conn.accountId}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded uppercase ${
                      conn.provider === 'aws'
                        ? 'bg-amber-100 text-amber-900'
                        : conn.provider === 'gcp'
                        ? 'bg-blue-100 text-blue-900'
                        : conn.provider === 'azure'
                        ? 'bg-indigo-100 text-indigo-900'
                        : 'bg-orange-100 text-orange-900'
                    }`}
                  >
                    {conn.provider.toUpperCase()}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Validated
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{conn.name}</h3>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">ID: {conn.accountRef}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600 font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block">ASET</span>
                    <span className="font-bold text-slate-900">{conn.assetCount} item</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">REGION</span>
                    <span className="font-bold text-slate-900">{conn.regionCount} region</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                <span>Diuji: {conn.lastValidatedAt}</span>
                <button
                  onClick={() => handleValidateConnection(conn.accountId)}
                  className="p-1 text-slate-400 hover:text-blue-600 rounded transition-colors"
                  title="Validasi Ulang Koneksi"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Asset Inventory Table Section */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Katalog Seluruh Aset Infrastruktur Terproteksi</h3>
            <p className="text-xs text-slate-500">Inventaris hasil pemindaian CSPM otomatis dengan klasifikasi tingkat sensitivitas data.</p>
          </div>

          {/* Provider Filter & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedProviderFilter}
              onChange={(e) => setSelectedProviderFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
            >
              <option value="all">Semua Provider</option>
              <option value="aws">AWS</option>
              <option value="gcp">GCP</option>
              <option value="azure">Azure</option>
              <option value="cloudflare">Cloudflare</option>
            </select>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchAssetQuery}
                onChange={(e) => setSearchAssetQuery(e.target.value)}
                placeholder="Cari nama aset / ARN..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl w-48 sm:w-60 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-mono uppercase text-[10px]">
                <th className="pb-3 px-3 font-semibold">Nama Aset &amp; External ID</th>
                <th className="pb-3 px-3 font-semibold">Tipe Resource</th>
                <th className="pb-3 px-3 font-semibold">Region</th>
                <th className="pb-3 px-3 font-semibold">Sensitivitas</th>
                <th className="pb-3 px-3 font-semibold">Skor Risiko</th>
                <th className="pb-3 px-3 font-semibold text-right">Status Posture</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-900 text-[13px]">{asset.name}</div>
                    <div className="text-slate-400 font-mono text-[10px] truncate max-w-xs">{asset.externalId}</div>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-slate-700">{asset.assetType}</td>
                  <td className="py-3.5 px-3 text-slate-600">{asset.region}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                        asset.sensitivity === 'RESTRICTED'
                          ? 'bg-purple-100 text-purple-800'
                          : asset.sensitivity === 'CONFIDENTIAL'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {asset.sensitivity}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono">
                    <span className={`font-bold ${asset.riskScore > 50 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {asset.riskScore} / 100
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                        asset.status === 'PROTECTED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {asset.status === 'PROTECTED' ? '✓ Terproteksi' : '⚠️ Berisiko'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Koneksi Cloud */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Tambah Koneksi Cloud Baru</h3>
              </div>
              <button
                onClick={() => setIsConnectModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConnectCloud} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Pilih Cloud Provider</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['aws', 'azure', 'gcp', 'cloudflare'] as const).map((prov) => (
                    <button
                      key={prov}
                      type="button"
                      onClick={() => setNewProvider(prov)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold uppercase transition-all ${
                        newProvider === prov
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {prov}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Nama Workspace / Akun</label>
                <input
                  type="text"
                  required
                  value={newAccountName}
                  onChange={(e) => setNewAccountName(e.target.value)}
                  placeholder="Contoh: AWS Production Infrastructure Jakarta"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">
                  {newProvider === 'aws'
                    ? 'AWS Account ID / Cross-Account Role ARN'
                    : newProvider === 'gcp'
                    ? 'GCP Project ID'
                    : newProvider === 'azure'
                    ? 'Azure Subscription ID / Tenant GUID'
                    : 'Cloudflare Zone ID'}
                </label>
                <input
                  type="text"
                  required
                  value={newAccountRef}
                  onChange={(e) => setNewAccountRef(e.target.value)}
                  placeholder={
                    newProvider === 'aws'
                      ? 'arn:aws:iam::123456789012:role/NusaSecDiscoveryRole'
                      : 'nusasec-prod-cloud'
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-500 font-mono">
                🔒 NusaSec hanya menggunakan izin read-only <code>SecurityAudit</code> dan <code>Viewer</code> tanpa menyimpan kredensial plaintext.
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsConnectModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isValidating}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-xs shadow-xs flex items-center gap-1.5"
                >
                  {isValidating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Memverifikasi...</span>
                    </>
                  ) : (
                    <span>Hubungkan &amp; Pindai Aset</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
