import React, { useState } from 'react';
import {
  Database,
  Search,
  Code,
  Play,
  CheckCircle2,
  Layers,
  Sparkles,
  RefreshCw,
  FileJson
} from 'lucide-react';

interface DataEntity {
  id: string;
  name: string;
  sourceTable: string;
  category: 'CLOUD_ASSET' | 'COMPLIANCE_CONTROL' | 'RISK_FINDING' | 'CRYPTO_ALGO';
  recordCount: number;
  sensitivity: 'RESTRICTED' | 'CONFIDENTIAL' | 'INTERNAL';
  lineage: string;
  confidenceScore: number;
}

const SAMPLE_ENTITIES: DataEntity[] = [
  {
    id: 'ent-01',
    name: 'core_cloud_assets_telemetry',
    sourceTable: 'nusasec_assets_v4',
    category: 'CLOUD_ASSET',
    recordCount: 1420,
    sensitivity: 'CONFIDENTIAL',
    lineage: 'AWS CloudTrail -> NusaSec Ingestion -> Canonical DB',
    confidenceScore: 99.8
  },
  {
    id: 'ent-02',
    name: 'audit_evidence_provenance_log',
    sourceTable: 'compliance_evidence_hashes',
    category: 'COMPLIANCE_CONTROL',
    recordCount: 88,
    sensitivity: 'RESTRICTED',
    lineage: 'SOC 2 Agent -> SHA256 Signature -> Evidence Vault',
    confidenceScore: 100.0
  },
  {
    id: 'ent-03',
    name: 'cryptographic_bill_of_materials',
    sourceTable: 'cbom_quantum_inventory',
    category: 'CRYPTO_ALGO',
    recordCount: 412,
    sensitivity: 'RESTRICTED',
    lineage: 'Static Binary Scanner -> PQC Engine -> CBOM Matrix',
    confidenceScore: 98.4
  }
];

export const DataExplorerView: React.FC<{ showToast?: (msg: string) => void }> = ({
  showToast = (_msg: string) => {}
}) => {
  const [query, setQuery] = useState('SELECT asset_name, provider, risk_score FROM core_cloud_assets WHERE risk_score > 30 ORDER BY risk_score DESC LIMIT 10;');
  const [isExecuting, setIsExecuting] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleRunQuery = () => {
    setIsExecuting(true);
    showToast('Mengeksekusi kueri semantik pada Data Intelligence Plane...');

    setTimeout(() => {
      setIsExecuting(false);
      setResults([
        { asset_name: 'prod-api-cluster-sg', provider: 'AWS', risk_score: 92, region: 'ap-southeast-1' },
        { asset_name: 'k8s-ingress-controller', provider: 'GCP', risk_score: 84, region: 'asia-southeast1' },
        { asset_name: 'legacy-auth-vault-vm', provider: 'Azure', risk_score: 76, region: 'Southeast Asia' }
      ]);
      showToast('Kueri selesai! 3 baris data terverifikasi ditampilkan.');
    }, 800);
  };

  return (
    <div id="data-explorer-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
            NusaSec Data Intelligence Plane
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Semantic Data Explorer &amp; Lineage Tracing
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Penjelajah data keamanan terpadu dengan kueri semantik, pelacakan silsilah data (data lineage), dan skor keyakinan data (confidence scoring).
        </p>
      </div>

      {/* Query Console Card */}
      <div className="bg-slate-950 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between font-mono text-xs text-slate-400 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-blue-400" />
            <span>SQL / SEMANTIC QUERY WORKBENCH (READ-ONLY)</span>
          </div>
          <span className="text-emerald-400">Core Schema Connected</span>
        </div>

        <textarea
          rows={3}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 font-mono text-xs text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">
            Latency Target: &lt; 40ms | TLS 1.3
          </span>
          <button
            onClick={handleRunQuery}
            disabled={isExecuting}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-98"
          >
            {isExecuting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            <span>Jalankan Kueri</span>
          </button>
        </div>

        {/* Results preview */}
        {results && (
          <div className="pt-3 border-t border-slate-800 font-mono text-xs space-y-2 animate-in fade-in">
            <span className="text-slate-400 text-[10px] uppercase">HASIL KUERI:</span>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="pb-2">ASSET NAME</th>
                    <th className="pb-2">PROVIDER</th>
                    <th className="pb-2">REGION</th>
                    <th className="pb-2 text-right">RISK SCORE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 text-slate-300">
                  {results.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-900/50">
                      <td className="py-2 text-white font-bold">{r.asset_name}</td>
                      <td className="py-2 text-blue-300">{r.provider}</td>
                      <td className="py-2">{r.region}</td>
                      <td className="py-2 text-right text-rose-400 font-bold">{r.risk_score} / 100</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Data Catalog Entities */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Katalog Entitas &amp; Silsilah Data (Data Lineage)</h3>

        <div className="space-y-3">
          {SAMPLE_ENTITIES.map((ent) => (
            <div
              key={ent.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono font-bold text-sm text-slate-900">{ent.name}</span>
                  <span className="text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.2 rounded">
                    {ent.category}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.2 rounded bg-purple-100 text-purple-800">
                    {ent.sensitivity}
                  </span>
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  Tabel Asal: <code className="text-slate-700 font-bold">{ent.sourceTable}</code> | {ent.recordCount} Rekaman
                </div>
                <div className="text-slate-400 text-[11px]">
                  Silsilah (Lineage): <span className="text-slate-600 font-medium">{ent.lineage}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-400 block font-mono">CONFIDENCE SCORE</span>
                <span className="text-base font-bold font-mono text-emerald-600">{ent.confidenceScore}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
