import React, { useState } from 'react';
import {
  Fingerprint,
  RotateCcw,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Key,
  ShieldCheck,
  Plus,
  RefreshCw,
  Lock
} from 'lucide-react';

interface CloudIdentityBinding {
  id: string;
  provider: 'AWS' | 'GCP' | 'Azure' | 'Entra ID';
  accountRef: string;
  credentialMode: 'role_ref' | 'service_account_token' | 'oidc_federation';
  permissionProfile: string;
  regionScope: string;
  allowedServices: string[];
  validationStatus: 'VALIDATED' | 'REQUIRES_ROTATION' | 'REVOKED';
  lastValidated: string;
  credentialFingerprint: string;
  generation: number;
}

const INITIAL_IDENTITIES: CloudIdentityBinding[] = [
  {
    id: 'id-bind-01',
    provider: 'AWS',
    accountRef: 'arn:aws:iam::948210495501:role/NusaSecDiscovery',
    credentialMode: 'role_ref',
    permissionProfile: 'SecurityAudit + ReadOnlyAccess',
    regionScope: 'ap-southeast-1, ap-southeast-3',
    allowedServices: ['ec2', 'ecs', 'rds', 's3', 'kms'],
    validationStatus: 'VALIDATED',
    lastValidated: '12 menit lalu',
    credentialFingerprint: 'SHA256:8f43...9b2d',
    generation: 4
  },
  {
    id: 'id-bind-02',
    provider: 'GCP',
    accountRef: 'sa-nusasec-telemetry@nusasec-prod-88.iam.gserviceaccount.com',
    credentialMode: 'service_account_token',
    permissionProfile: 'roles/viewer + roles/cloudasset.viewer',
    regionScope: 'asia-southeast1',
    allowedServices: ['gke', 'compute', 'bigquery', 'kms'],
    validationStatus: 'VALIDATED',
    lastValidated: '1 jam lalu',
    credentialFingerprint: 'SHA256:1a82...33fe',
    generation: 2
  },
  {
    id: 'id-bind-03',
    provider: 'Azure',
    accountRef: 'sp-nusasec-sentinel-sub-f8401',
    credentialMode: 'oidc_federation',
    permissionProfile: 'Security Reader',
    regionScope: 'Southeast Asia',
    allowedServices: ['entra_id', 'aks', 'key_vault'],
    validationStatus: 'REQUIRES_ROTATION',
    lastValidated: '3 hari lalu',
    credentialFingerprint: 'SHA256:ca97...48bb',
    generation: 1
  }
];

export const IdentityView: React.FC<{ showToast?: (msg: string) => void }> = ({
  showToast = (_msg: string) => {}
}) => {
  const [identities, setIdentities] = useState<CloudIdentityBinding[]>(INITIAL_IDENTITIES);

  const handleRotate = (id: string, provider: string) => {
    showToast(`Merotasi kredensial ${provider} ke generation baru...`);
    setTimeout(() => {
      setIdentities((prev) =>
        prev.map((i) =>
          i.id === id
            ? {
                ...i,
                generation: i.generation + 1,
                validationStatus: 'VALIDATED',
                lastValidated: 'Baru saja',
                credentialFingerprint: `SHA256:${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`
              }
            : i
        )
      );
      showToast(`Rotasi kredensial ${provider} berhasil! Generasi dinaikkan dan dicatat dalam audit event.`);
    }, 1000);
  };

  const handleRevoke = (id: string, provider: string) => {
    setIdentities((prev) =>
      prev.map((i) => (i.id === id ? { ...i, validationStatus: 'REVOKED' } : i))
    );
    showToast(`Kredensial binding ${provider} telah dicabut (Revoked) dari Core Auth.`);
  };

  return (
    <div id="identity-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              NusaSec Phase 4 Cloud Identity Engine
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Cloud Identity &amp; IAM Credential Bindings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manajemen izin lintas-cloud (Cross-Account IAM Roles), rotasi kredensial berkala, dan penegakan prinsip Least Privilege.
          </p>
        </div>

        <button
          onClick={() => showToast('Membuat binding identitas cloud IAM baru...')}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Binding Identitas</span>
        </button>
      </div>

      {/* Identity Cards */}
      <div className="space-y-4">
        {identities.map((item) => (
          <div
            key={item.id}
            className={`bg-white border rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4 ${
              item.validationStatus === 'REVOKED'
                ? 'border-slate-200 opacity-60 bg-slate-50'
                : item.validationStatus === 'REQUIRES_ROTATION'
                ? 'border-amber-300'
                : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-900">
                  {item.provider}
                </span>

                <span
                  className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase ${
                    item.validationStatus === 'VALIDATED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.validationStatus === 'REQUIRES_ROTATION'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {item.validationStatus.replace('_', ' ')}
                </span>

                <span className="text-[11px] font-mono text-slate-400">
                  Generation #{item.generation}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {item.validationStatus !== 'REVOKED' && (
                  <>
                    <button
                      onClick={() => handleRotate(item.id, item.provider)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all active:scale-98"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Rotasi Kredensial</span>
                    </button>
                    <button
                      onClick={() => handleRevoke(item.id, item.provider)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold transition-colors"
                    >
                      Cabut Izin
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-mono font-bold text-slate-900 break-all">{item.accountRef}</div>
              <div className="text-xs text-slate-500">
                Profil Izin: <strong className="text-slate-700">{item.permissionProfile}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-slate-600">
              <div>
                <span className="text-slate-400 block text-[10px]">CREDENTIAL MODE:</span>
                <span>{item.credentialMode}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">FINGERPRINT HASH:</span>
                <span className="text-blue-600">{item.credentialFingerprint}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">TERAKHIR DIVALIDASI:</span>
                <span>{item.lastValidated}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-mono text-[11px]">Layanan Diizinkan:</span>
              {item.allowedServices.map((svc) => (
                <span key={svc} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-mono text-[10px] font-semibold">
                  {svc}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
