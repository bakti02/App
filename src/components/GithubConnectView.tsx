import React, { useState } from 'react';
import {
  Github,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  GitPullRequest,
  ShieldCheck,
  Plus,
  ExternalLink,
  Lock,
  Code
} from 'lucide-react';

interface GitHubRepo {
  id: string;
  name: string;
  defaultBranch: string;
  webhookStatus: 'ACTIVE' | 'PENDING' | 'FAILED';
  sastStatus: 'PASS' | 'FINDINGS';
  pqcScan: 'COMPLIANT' | 'VULNERABLE';
  lastScan: string;
}

const INITIAL_REPOS: GitHubRepo[] = [
  {
    id: 'repo-1',
    name: 'nusasec-org/core-crypto-gateway',
    defaultBranch: 'main',
    webhookStatus: 'ACTIVE',
    sastStatus: 'PASS',
    pqcScan: 'COMPLIANT',
    lastScan: '14 menit lalu'
  },
  {
    id: 'repo-2',
    name: 'nusasec-org/mobile-banking-backend',
    defaultBranch: 'main',
    webhookStatus: 'ACTIVE',
    sastStatus: 'FINDINGS',
    pqcScan: 'VULNERABLE',
    lastScan: '1 jam lalu'
  }
];

export const GithubConnectView: React.FC<{ showToast?: (msg: string) => void }> = ({
  showToast = (_msg: string) => {}
}) => {
  const [repos, setRepos] = useState<GitHubRepo[]>(INITIAL_REPOS);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncRepos = () => {
    setIsSyncing(true);
    showToast('Menyinkronkan repositori GitHub dan memvalidasi Webhook Signature...');

    setTimeout(() => {
      setIsSyncing(false);
      showToast('Sinkronisasi GitHub selesai. 2 repositori terhubung aktif.');
    }, 1200);
  };

  return (
    <div id="github-connect-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              NusaSec CI/CD DevSecOps Plane
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            GitHub DevSecOps &amp; Continuous PR Gates
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Integrasikan GitHub App untuk pemindaian kode statis (SAST), deteksi kebocoran kredensial (secret scanning), dan validasi CBOM otomatis pada setiap Pull Request.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSyncRepos}
            disabled={isSyncing}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sinkronkan Repositori</span>
          </button>
          <button
            onClick={() => showToast('Membuka flow otorisasi GitHub App NusaSec...')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-98"
          >
            <Github className="w-4 h-4" />
            <span>Pasang GitHub App</span>
          </button>
        </div>
      </div>

      {/* GitHub Connected Repos */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Repositori Terhubung &amp; Status PR Gate</h3>
          <span className="text-xs font-mono text-slate-500">{repos.length} Repo Aktif</span>
        </div>

        <div className="space-y-3">
          {repos.map((r) => (
            <div
              key={r.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Github className="w-4 h-4 text-slate-800" />
                  <span className="font-bold text-slate-900 text-sm">{r.name}</span>
                  <span className="font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                    branch: {r.defaultBranch}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-4 pt-1 font-mono">
                  <span>
                    Webhook: <strong className="text-emerald-600">✓ {r.webhookStatus}</strong>
                  </span>
                  <span>
                    SAST Scan: <strong className={r.sastStatus === 'PASS' ? 'text-emerald-600' : 'text-amber-600'}>{r.sastStatus}</strong>
                  </span>
                  <span>
                    PQC CBOM: <strong className={r.pqcScan === 'COMPLIANT' ? 'text-purple-600' : 'text-rose-600'}>{r.pqcScan}</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-mono">Scan: {r.lastScan}</span>
                <button
                  onClick={() => showToast(`Menjalankan manual trigger PR gate check pada ${r.name}...`)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                >
                  Trigger Scan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
