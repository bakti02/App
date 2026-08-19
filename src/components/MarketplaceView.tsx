import React, { useState } from 'react';
import {
  ShoppingBag,
  ShieldCheck,
  FileCheck2,
  Atom,
  Code2,
  Check,
  Zap,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Lock,
  Layers,
  CheckCircle2,
  Gem,
  Search,
  Filter
} from 'lucide-react';
import { PLANS_DATA, ADDONS_DATA } from '../data/mockData';

interface MarketplaceViewProps {
  onNavigateToBilling: () => void;
  showToast?: (msg: string) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  onNavigateToBilling,
  showToast = (_msg: string) => {}
}) => {
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductDetail, setSelectedProductDetail] = useState<any | null>(null);

  const productFamilies = [
    {
      code: 'SECURE',
      name: 'NusaSec Secure',
      tagline: 'Cloud security discovery, attack path analysis & active posture',
      icon: ShieldCheck,
      color: 'blue',
      products: [
        {
          id: 'prod-asset-discovery',
          name: 'Cloud & Asset Discovery',
          mode: 'INCLUDED IN ALL PLANS',
          description: 'Penemuan otomatis multi-cloud (AWS, Azure, GCP) dan pemetaan aset realtime.',
          features: ['Multi-Cloud API Connectors', 'Real-time Asset Graph', 'Zero-agent CSPM Discovery']
        },
        {
          id: 'prod-risk-exposure',
          name: 'Risk & Exposure Engine',
          mode: 'SECURE & TRUST PRO',
          description: 'Kalkulasi skor risiko berbasis AI dan identifikasi vektor kerentanan Zero-Day.',
          features: ['CVSS 4.0 & EPSS Scoring', 'Blast Radius Calculation', '1-Click Auto Remediation']
        },
        {
          id: 'prod-attack-paths',
          name: 'Attack Path Visualizer',
          mode: 'SECURE & TRUST PRO',
          description: 'Visualisasi grafis rantai eksploitasi dari internet hingga crown-jewel database.',
          features: ['Graph Node Traversal', 'IAM Privilege Escalation Detection', 'Choke-point Isolation']
        }
      ]
    },
    {
      code: 'TRUST',
      name: 'NusaSec Trust',
      tagline: 'Automated compliance, evidence integrity & regulatory intelligence',
      icon: FileCheck2,
      color: 'emerald',
      products: [
        {
          id: 'prod-compliance-audit',
          name: 'Continuous Compliance Auditor',
          mode: 'SECURE & TRUST PRO',
          description: 'Audit berkelanjutan untuk SOC 2 Type II, ISO 27001, UU PDP No. 27/2022, dan GDPR.',
          features: ['Automated Control Mapping', 'Audit-Ready Export', 'Continuous Evidence Freshness']
        },
        {
          id: 'prod-regulatory-intel',
          name: 'Regulatory Intelligence Feed',
          mode: 'ENTERPRISE',
          description: 'Pelacak regulasi hukum siber nasional dan global dengan analisis dampak otomatis.',
          features: ['Kominfo UU PDP Updates', 'NIST SP 800-207 Mapping', 'Regulatory Change Alerts']
        }
      ]
    },
    {
      code: 'QUANTUM',
      name: 'NusaSec Quantum',
      tagline: 'Post-Quantum Cryptography (PQC) readiness, CBOM & migration sandbox',
      icon: Atom,
      color: 'purple',
      products: [
        {
          id: 'prod-pqc-readiness',
          name: 'PQC Readiness & CBOM Analyzer',
          mode: 'QUANTUM FORTRESS',
          description: 'Audit inventaris kriptografi (CBOM) dan deteksi algoritma rentan serangan kuantum (Shor).',
          features: ['CBOM Automated Discovery', 'NIST PQC Algorithm Mapping', 'Quantum Exposure Index']
        },
        {
          id: 'prod-pqc-migration',
          name: 'Quantum Migration Center',
          mode: 'QUANTUM FORTRESS',
          description: 'Simulasi transisi kriptografi klasik (RSA/ECC) ke standar PQC (ML-KEM, ML-DSA).',
          features: ['Before/After Snapshot Comparison', 'Handshake Latency Benchmark', '1-Click Cryptographic Attestation']
        }
      ]
    },
    {
      code: 'DEVELOPER',
      name: 'Developer & Integrations',
      tagline: 'Post-quantum APIs, client SDKs, and GitHub CI/CD DevSecOps pipelines',
      icon: Code2,
      color: 'slate',
      products: [
        {
          id: 'prod-pqc-api',
          name: 'PQC Cloud API',
          mode: 'DEVELOPER & ENTERPRISE',
          description: 'API enkripsi dan verifikasi tanda tangan digital pasca-kuantum berlatensi rendah.',
          features: ['ML-KEM-768 Key Encapsulation', 'ML-DSA-65 Signature Verification', 'Sub-millisecond Global Edge']
        },
        {
          id: 'prod-github-connect',
          name: 'GitHub DevSecOps Connect',
          mode: 'INCLUDED',
          description: 'Pemindaian kode statis (SAST), secret scanning, dan dependency review otomatis di PR.',
          features: ['Automated PR Gate Check', 'CBOM Repository Generation', 'Inline Security Annotations']
        }
      ]
    }
  ];

  const filteredFamilies = productFamilies
    .filter((f) => selectedFamily === 'all' || f.code === selectedFamily)
    .map((f) => ({
      ...f,
      products: f.products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter((f) => f.products.length > 0);

  const handleStartTrial = (productName: string) => {
    showToast(`Uji Coba 14 Hari NusaSec "${productName}" berhasil diaktifkan pada Core Tenant!`);
  };

  const handleRequestQuote = (productName: string) => {
    showToast(`Permintaan penawaran Enterprise untuk "${productName}" telah dikirim ke tim komersial.`);
  };

  return (
    <div id="marketplace-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-mono font-semibold">
            <ShoppingBag className="w-3.5 h-3.5" />
            NusaSec Solution Catalog &amp; Entitlements
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Katalog Layanan Keamanan Siber, Kepatuhan Regulasi &amp; Kriptografi Kuantum
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Temukan solusi terpadu untuk discovery multi-cloud, visualisasi jalur serangan, audit otomatis standar internasional (SOC 2, ISO 27001, UU PDP), serta modernisasi post-quantum cryptography (PQC).
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onNavigateToBilling}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg transition-all active:scale-98"
            >
              <Gem className="w-4 h-4" />
              <span>Lihat Paket &amp; Langganan Aktif</span>
            </button>
            <button
              onClick={() => showToast('Menghubungkan ke Tim Solusi Arsitek NusaSec...')}
              className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <span>Konsultasi Enterprise Custom</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Family Pill Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 font-medium text-xs">
          {[
            { code: 'all', label: 'Semua Layanan' },
            { code: 'SECURE', label: 'NusaSec Secure' },
            { code: 'TRUST', label: 'NusaSec Trust' },
            { code: 'QUANTUM', label: 'NusaSec Quantum' },
            { code: 'DEVELOPER', label: 'Developer & SDK' }
          ].map((tab) => (
            <button
              key={tab.code}
              onClick={() => setSelectedFamily(tab.code)}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                selectedFamily === tab.code
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari solusi atau kapabilitas..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Product Families & Service Cards */}
      <div className="space-y-8">
        {filteredFamilies.map((family) => {
          const FamilyIcon = family.icon;
          return (
            <div key={family.code} className="space-y-4">
              {/* Family Header */}
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-2xs ${
                  family.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                  family.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                  family.color === 'purple' ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-700'
                }`}>
                  <FamilyIcon className="w-5 h-5 stroke-[1.9]" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">{family.name}</h2>
                  <p className="text-xs text-slate-500">{family.tagline}</p>
                </div>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {family.products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {product.mode}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                        {product.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => handleStartTrial(product.name)}
                        className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-98"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>Mulai Uji Coba</span>
                      </button>
                      <button
                        onClick={() => handleRequestQuote(product.name)}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                        title="Minta Penawaran Kustom"
                      >
                        Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Plans Comparison Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <Gem className="w-4 h-4 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Siap Mengamankan Infrastruktur Multi-Cloud Anda?</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            Tingkatkan ke paket <strong>Quantum Fortress</strong> untuk akses tak terbatas ke seluruh ekosistem NusaSec Secure, Trust, dan Quantum Migration Center.
          </p>
        </div>

        <button
          onClick={onNavigateToBilling}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 shrink-0"
        >
          <span>Buka Matriks Perbandingan Paket</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
