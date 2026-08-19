import React, { useState } from 'react';
import {
  PieChart,
  Download,
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  Plus,
  RefreshCw,
  Award
} from 'lucide-react';

interface ReportSchedule {
  id: string;
  name: string;
  type: 'Executive Security Summary' | 'Cloud Posture & CSPM Audit' | 'PQC Readiness Attestation';
  frequency: 'Weekly' | 'Monthly' | 'Quarterly';
  recipients: string[];
  lastGenerated: string;
  status: 'ACTIVE' | 'PAUSED';
}

const INITIAL_SCHEDULES: ReportSchedule[] = [
  {
    id: 'sch-01',
    name: 'Executive Monthly Board Dossier',
    type: 'Executive Security Summary',
    frequency: 'Monthly',
    recipients: ['ciso@nusasec.cloud', 'nurlaelaazwini66@gmail.com'],
    lastGenerated: '01 Agu 2026',
    status: 'ACTIVE'
  },
  {
    id: 'sch-02',
    name: 'Continuous CSPM & Zero-Day Finding Audit',
    type: 'Cloud Posture & CSPM Audit',
    frequency: 'Weekly',
    recipients: ['secops-team@nusasec.cloud'],
    lastGenerated: '18 Agu 2026',
    status: 'ACTIVE'
  }
];

export const ReportsView: React.FC<{ showToast?: (msg: string) => void }> = ({
  showToast = (_msg: string) => {}
}) => {
  const [schedules, setSchedules] = useState<ReportSchedule[]>(INITIAL_SCHEDULES);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateNow = (type: string) => {
    setIsGenerating(true);
    showToast(`Membangun ${type} dari canonical core snapshot data plane...`);

    setTimeout(() => {
      setIsGenerating(false);
      showToast(`${type} berhasil digenerate dan siap diunduh (PDF / JSON).`);
    }, 1500);
  };

  return (
    <div id="reports-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              NusaSec Authoritative Reporting Engine
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Executive Security Reports &amp; Automated Schedules
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Laporan keamanan siber formal, ringkasan eksekutif CISO, dan otomasi pengiriman berkas audit berkala.
          </p>
        </div>

        <button
          onClick={() => handleGenerateNow('Executive Security Summary')}
          disabled={isGenerating}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-98"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Menyusun Laporan...' : 'Generate Laporan Eksekutif Sekarang'}</span>
        </button>
      </div>

      {/* Available On-Demand Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                C-LEVEL READY
              </span>
              <Award className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Executive Security Summary</h3>
            <p className="text-xs text-slate-600">
              Ringkasan metrik risiko, tingkat paparan aset, tren penanganan insiden, dan skor pertahanan siber keseluruhan.
            </p>
          </div>
          <button
            onClick={() => handleGenerateNow('Executive Security Summary')}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor PDF Eksekutif</span>
          </button>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                AUDITOR COMPLIANCE
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Technical Compliance Dossier</h3>
            <p className="text-xs text-slate-600">
              Laporan terperinci pemenuhan kontrol SOC 2 Type II, ISO 27001, dan UU PDP dengan bukti hash SHA256.
            </p>
          </div>
          <button
            onClick={() => handleGenerateNow('Technical Compliance Dossier')}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Berkas Audit</span>
          </button>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                PQC CRYPTO
              </span>
              <FileText className="w-4 h-4 text-purple-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Quantum Readiness Attestation</h3>
            <p className="text-xs text-slate-600">
              Sertifikat kesiapan kriptografi pasca-kuantum dan hasil simulasi transisi algoritma ML-KEM/ML-DSA.
            </p>
          </div>
          <button
            onClick={() => handleGenerateNow('Quantum Readiness Attestation')}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Sertifikat PQC</span>
          </button>
        </div>
      </div>

      {/* Scheduled Automation Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Jadwal Pengiriman Laporan Otomatis</h3>
          <button
            onClick={() => showToast('Membuka konfigurasi jadwal laporan otomatis baru...')}
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Jadwal
          </button>
        </div>

        <div className="space-y-3">
          {schedules.map((sch) => (
            <div
              key={sch.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm">{sch.name}</div>
                <div className="text-slate-500 font-mono">
                  Frekuensi: <strong className="text-slate-700">{sch.frequency}</strong> | Penerima: {sch.recipients.join(', ')}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-slate-400">Terakhir dikirim: {sch.lastGenerated}</span>
                <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {sch.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
