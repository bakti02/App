import React, { useState } from 'react';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Download,
  Search,
  ExternalLink,
  ShieldCheck,
  Plus,
  FileCheck,
  Check
} from 'lucide-react';
import { EvidenceRecord } from '../types';
import { EVIDENCE_RECORDS_DATA } from '../data/mockData';

export const EvidenceView: React.FC<{ showToast?: (msg: string) => void }> = ({
  showToast = (_msg: string) => {}
}) => {
  const [evidenceList, setEvidenceList] = useState<EvidenceRecord[]>(EVIDENCE_RECORDS_DATA);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newFilename, setNewFilename] = useState('');
  const [newKind, setNewKind] = useState<'security_report' | 'soc2_attestation' | 'pen_test' | 'policy_document' | 'pqc_benchmark'>('soc2_attestation');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFilename.trim()) return;

    const newRec: EvidenceRecord = {
      id: `evd-${Date.now().toString().slice(-4)}`,
      filename: newFilename.endsWith('.pdf') ? newFilename : `${newFilename}.pdf`,
      contentType: 'application/pdf',
      sizeBytes: Math.floor(Math.random() * 5000000 + 1000000),
      sha256: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      kind: newKind,
      status: 'VERIFIED',
      uploadedBy: 'Nurlaela Azwini',
      createdAt: 'Baru saja',
      freshness: 'FRESH'
    };

    setEvidenceList([newRec, ...evidenceList]);
    setIsUploadModalOpen(false);
    setNewFilename('');
    showToast(`Dokumen bukti "${newRec.filename}" berhasil didaftarkan dengan checksum SHA256 canonical.`);
  };

  return (
    <div id="evidence-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              NusaSec Trust Evidence Registry
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Evidence Collection &amp; Cryptographic Integrity
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Katalog bukti audit digital yang terverifikasi integritasnya menggunakan hash SHA-256 dan catatan provenance.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-98"
        >
          <Upload className="w-4 h-4" />
          <span>Unggah Bukti Baru (Evidence)</span>
        </button>
      </div>

      {/* Evidence Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Daftar Berkas Bukti Terverifikasi</h3>
          <span className="text-xs font-mono text-slate-500">{evidenceList.length} Berkas Aktif</span>
        </div>

        <div className="space-y-3">
          {evidenceList.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono font-bold text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    {item.id}
                  </span>
                  <span className="font-bold text-sm text-slate-900 truncate">{item.filename}</span>
                  <span className="text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full">
                    {item.kind.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-slate-400 truncate">
                  SHA-256: <code className="text-slate-600 font-bold">{item.sha256}</code>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-4 pt-1">
                  <span>Ukuran: {(item.sizeBytes / (1024 * 1024)).toFixed(2)} MB</span>
                  <span>Diunggah oleh: <strong>{item.uploadedBy}</strong></span>
                  <span>Tanggal: {item.createdAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                  ✓ VERIFIED
                </span>
                <button
                  onClick={() => showToast(`Mengunduh berkas "${item.filename}" dengan verifikasi hash SHA256...`)}
                  className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Unduh Berkas"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Upload */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Daftarkan Bukti Audit Baru</h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Nama Berkas Laporan / Attestation</label>
                <input
                  type="text"
                  required
                  value={newFilename}
                  onChange={(e) => setNewFilename(e.target.value)}
                  placeholder="Contoh: iso27001_surveillance_audit_signed.pdf"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Jenis Dokumen Bukti</label>
                <select
                  value={newKind}
                  onChange={(e) => setNewKind(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="soc2_attestation">SOC 2 Attestation Report</option>
                  <option value="pen_test">Penetration Test Report</option>
                  <option value="pqc_benchmark">PQC Cryptographic Benchmark</option>
                  <option value="policy_document">Security Policy Document</option>
                  <option value="security_report">General Security Report</option>
                </select>
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center space-y-2 bg-slate-50/50">
                <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-xs text-slate-600">
                  <span className="font-bold text-blue-600">Pilih berkas PDF</span> atau drag and drop ke sini
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Hash SHA-256 dihitung secara otomatis saat unggahan selesai.
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs shadow-xs"
                >
                  Daftarkan Bukti
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
