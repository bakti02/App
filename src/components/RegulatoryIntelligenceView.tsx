import React, { useState } from 'react';
import {
  BookOpen,
  ExternalLink,
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  Scale,
  FileText,
  AlertCircle
} from 'lucide-react';

interface RegulatoryInstrument {
  key: string;
  jurisdiction: string;
  type: string;
  authority: string;
  title: string;
  version: string;
  officialSourceUrl: string;
  summary: string;
  obligations: { ref: string; title: string; requirement: string }[];
}

const REGULATORY_INSTRUMENTS: RegulatoryInstrument[] = [
  {
    key: 'ID-UUPDP-2022',
    jurisdiction: 'Indonesia',
    type: 'Undang-Undang Nasional',
    authority: 'Kementerian Komunikasi dan Informatika / Lembaga PDP',
    title: 'UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)',
    version: 'Statute 2022 / Enforcement 2024-2026',
    officialSourceUrl: 'https://peraturan.go.id/id/uu-no-27-tahun-2022',
    summary: 'Kewajiban pengendali data untuk memastikan keamanan teknis enkripsi, persetujuan pemrosesan, dan notifikasi insiden kebocoran data maksimal 3x24 jam.',
    obligations: [
      {
        ref: 'Pasal 35',
        title: 'Kewajiban Pengamanan Data Pribadi',
        requirement: 'Pengendali Data Pribadi wajib melindungi dan memastikan keamanan Data Pribadi melalui enkripsi dan sistem keamanan berstandar tinggi.'
      },
      {
        ref: 'Pasal 46',
        title: 'Pemberitahuan Kegagalan Pelindungan Data',
        requirement: 'Dalam hal terjadi kegagalan pelindungan Data Pribadi, Pengendali wajib menyampaikan pemberitahuan tertulis paling lambat 3 x 24 jam.'
      }
    ]
  },
  {
    key: 'US-NIST-SP800-207',
    jurisdiction: 'United States / Federal',
    type: 'Security Standard',
    authority: 'National Institute of Standards and Technology (NIST)',
    title: 'NIST SP 800-207 Zero Trust Architecture',
    version: 'Final Publication 2020',
    officialSourceUrl: 'https://csrc.nist.gov/publications/detail/sp/800-207/final',
    summary: 'Standar arsitektur Zero Trust yang mewajibkan validasi identitas dan konteks perangkat secara eksplisit pada setiap permintaan akses jaringan.',
    obligations: [
      {
        ref: 'Tenet 1',
        title: 'All data sources and computing services are considered resources',
        requirement: 'Semua node, database, dan komputasi harus dilindungi oleh otentikasi adaptif.'
      },
      {
        ref: 'Tenet 6',
        title: 'Dynamic Resource Authentication and Authorization',
        requirement: 'Akses ke sumber daya ditentukan oleh kebijakan dinamis termasuk perilaku dan postur keamanan perangkat.'
      }
    ]
  },
  {
    key: 'EU-GDPR-2016',
    jurisdiction: 'European Union',
    type: 'Supranational Regulation',
    authority: 'European Data Protection Board (EDPB)',
    title: 'General Data Protection Regulation (Regulation 2016/679)',
    version: 'Consolidated 2016/679',
    officialSourceUrl: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj',
    summary: 'Kerangka regulasi perlindungan data pribadi dan pembatasan transfer data lintas batas negara bagi subjek data di Uni Eropa.',
    obligations: [
      {
        ref: 'Article 32',
        title: 'Security of processing',
        requirement: 'Penerapan langkah-langkah teknis dan organisasi yang sesuai termasuk pseudonimisasi dan enkripsi data pribadi.'
      }
    ]
  }
];

export const RegulatoryIntelligenceView: React.FC = () => {
  const [selectedInst, setSelectedInst] = useState<RegulatoryInstrument>(REGULATORY_INSTRUMENTS[0]);

  return (
    <div id="regulatory-intelligence-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
            NusaSec Regulatory Intelligence Plane
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Regulatory Intelligence &amp; Legal Obligations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Katalog instrumen hukum siber resmi, rincian pasal kewajiban kepatuhan data, dan tautan dokumen pemerintah terverifikasi.
        </p>
      </div>

      {/* Instruments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {REGULATORY_INSTRUMENTS.map((inst) => {
          const isSelected = selectedInst.key === inst.key;
          return (
            <button
              key={inst.key}
              onClick={() => setSelectedInst(inst)}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                      isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {inst.jurisdiction}
                  </span>
                  <span className={`text-[11px] font-mono ${isSelected ? 'text-blue-400' : 'text-slate-400'}`}>
                    {inst.key}
                  </span>
                </div>

                <h3 className={`font-bold text-sm leading-snug ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {inst.title}
                </h3>
              </div>

              <div className={`text-xs pt-2 border-t font-mono flex items-center justify-between ${
                isSelected ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
              }`}>
                <span>{inst.obligations.length} Klausul Wajib</span>
                <span>Terverifikasi ✓</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Instrument Detail */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">{selectedInst.title}</h3>
            </div>
            <p className="text-xs text-slate-500">
              Otoritas Regulasi: <strong>{selectedInst.authority}</strong> ({selectedInst.jurisdiction})
            </p>
          </div>

          <a
            href={selectedInst.officialSourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
          >
            <span>Sumber Resmi Pemerintah</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
            RINGKASAN KEWAJIBAN HUKUM:
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            {selectedInst.summary}
          </p>
        </div>

        {/* Obligation Clauses */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
            PASAL &amp; KONTROL TEKNIS WAJIB:
          </h4>

          <div className="space-y-3">
            {selectedInst.obligations.map((ob, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                    {ob.ref}
                  </span>
                  <span className="font-bold text-sm text-slate-900">{ob.title}</span>
                </div>
                <p className="text-xs text-slate-600">{ob.requirement}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
