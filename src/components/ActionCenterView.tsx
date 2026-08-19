import React, { useState } from 'react';
import {
  CheckSquare,
  AlertTriangle,
  Clock,
  User,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Filter,
  Plus,
  ArrowUpRight,
  SlidersHorizontal,
  Flame,
  Check
} from 'lucide-react';
import { ActionItem } from '../types';
import { ACTION_ITEMS_DATA } from '../data/mockData';

interface ActionCenterViewProps {
  showToast?: (msg: string) => void;
}

export const ActionCenterView: React.FC<ActionCenterViewProps> = ({
  showToast = (_msg: string) => {}
}) => {
  const [items, setItems] = useState<ActionItem[]>(ACTION_ITEMS_DATA);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreatingModalOpen, setIsCreatingModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'SECURITY' | 'COMPLIANCE' | 'QUANTUM' | 'IDENTITY'>('SECURITY');
  const [newPriority, setNewPriority] = useState<'P0 - CRITICAL' | 'P1 - HIGH' | 'P2 - MEDIUM' | 'P3 - LOW'>('P1 - HIGH');
  const [newOwner, setNewOwner] = useState('Nurlaela Azwini (SOC Admin)');
  const [newActionText, setNewActionText] = useState('');

  const handleStatusChange = (id: string, newStatus: 'OPEN' | 'IN_PROGRESS' | 'DONE') => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    const target = items.find((x) => x.id === id);
    showToast(`Status tugas "${target?.title}" diperbarui menjadi ${newStatus} dan dicatat dalam Core Audit Log.`);
  };

  const handleCreateAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ActionItem = {
      id: `ACT-${Math.floor(Math.random() * 900 + 100)}`,
      title: newTitle,
      category: newCategory,
      priority: newPriority,
      severity: newPriority.includes('P0') ? 'CRITICAL' : newPriority.includes('P1') ? 'HIGH' : 'MEDIUM',
      status: 'OPEN',
      owner: newOwner,
      source: 'Manual SOC Assignment',
      sourceId: `soc-manual-${Date.now()}`,
      dueAt: '3 hari ke depan',
      recommendedAction: newActionText || 'Lakukan audit dan validasi kepatuhan pada endpoint terkait.'
    };

    setItems([newItem, ...items]);
    setIsCreatingModalOpen(false);
    setNewTitle('');
    setNewActionText('');
    showToast(`Tugas perbaikan baru "${newItem.title}" berhasil dibuat!`);
  };

  const filteredItems = items.filter((item) => {
    const matchCat = filterCategory === 'all' || item.category === filterCategory;
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchCat && matchStatus;
  });

  return (
    <div id="action-center-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              NusaSec Authoritative Task Engine
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Action Center &amp; Remediation Backlog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Daftar tugas terprioritas dari evaluasi risiko siber, temuan audit compliance, dan migrasi kriptografi kuantum.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingModalOpen(true)}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Tugas Remediasi Baru</span>
        </button>
      </div>

      {/* Metric Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-slate-500 text-[11px] block">TOTAL TUGAS TERBUKA</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">
            {items.filter((i) => i.status === 'OPEN').length} Item
          </span>
          <span className="text-[10px] text-rose-600 font-bold">Membutuhkan Tindakan</span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-slate-500 text-[11px] block">SEDANG DALAM PROSES</span>
          <span className="text-xl font-bold text-blue-600 mt-1 block">
            {items.filter((i) => i.status === 'IN_PROGRESS').length} Item
          </span>
          <span className="text-[10px] text-slate-500">Dalam Penanganan SOC</span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-slate-500 text-[11px] block">SELESAI DIREMEDIASI</span>
          <span className="text-xl font-bold text-emerald-600 mt-1 block">
            {items.filter((i) => i.status === 'DONE').length} Item
          </span>
          <span className="text-[10px] text-emerald-700">Audit Verifikasi Berhasil</span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-slate-500 text-[11px] block">PRIORITAS TINGGI (P0 / P1)</span>
          <span className="text-xl font-bold text-rose-700 mt-1 block">
            {items.filter((i) => i.priority.startsWith('P0') || i.priority.startsWith('P1')).length} Item
          </span>
          <span className="text-[10px] text-rose-600">SLA &lt; 24 Jam</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 text-xs font-medium">
        <div className="flex items-center gap-1 overflow-x-auto">
          <span className="text-slate-400 mr-2 font-mono">Domain:</span>
          {['all', 'SECURITY', 'COMPLIANCE', 'QUANTUM', 'IDENTITY'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                filterCategory === cat
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <span className="text-slate-400 mr-1 font-mono">Status:</span>
          {['all', 'OPEN', 'IN_PROGRESS', 'DONE'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                filterStatus === st
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st === 'all' ? 'Semua Status' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Action Items List */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white border rounded-2xl p-5 shadow-2xs transition-all space-y-3 ${
              item.status === 'DONE'
                ? 'border-slate-200 opacity-75 bg-slate-50/50'
                : item.priority.startsWith('P0')
                ? 'border-rose-300'
                : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                  {item.id}
                </span>

                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                    item.priority.startsWith('P0')
                      ? 'bg-rose-100 text-rose-800'
                      : item.priority.startsWith('P1')
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {item.priority}
                </span>

                <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {item.category}
                </span>

                <h3 className="text-sm sm:text-base font-bold text-slate-900">{item.title}</h3>
              </div>

              {/* Status Mutator Dropdown / Buttons */}
              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <button
                  onClick={() => handleStatusChange(item.id, 'OPEN')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    item.status === 'OPEN'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Open
                </button>
                <button
                  onClick={() => handleStatusChange(item.id, 'IN_PROGRESS')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    item.status === 'IN_PROGRESS'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => handleStatusChange(item.id, 'DONE')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    item.status === 'DONE'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Done ✓
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
              <div className="font-medium text-slate-800">
                💡 <strong className="text-slate-900">Rekomendasi Aksi:</strong> {item.recommendedAction}
              </div>
              {item.blocker && (
                <div className="text-rose-600 font-medium">
                  ⚠️ <strong>Blocker:</strong> {item.blocker}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <strong>Penanggung Jawab:</strong> {item.owner}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <strong>Batas Waktu:</strong> {item.dueAt}
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">Sumber: {item.source}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Buat Tugas */}
      {isCreatingModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Buat Tugas Remediasi Baru</h3>
              </div>
              <button
                onClick={() => setIsCreatingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAction} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Judul Tindakan Perbaikan</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Perketat IAM Role Policy pada Service Egress..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Kategori Domain</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="SECURITY">SECURITY</option>
                    <option value="COMPLIANCE">COMPLIANCE</option>
                    <option value="QUANTUM">QUANTUM</option>
                    <option value="IDENTITY">IDENTITY</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Tingkat Prioritas</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="P0 - CRITICAL">P0 - CRITICAL</option>
                    <option value="P1 - HIGH">P1 - HIGH</option>
                    <option value="P2 - MEDIUM">P2 - MEDIUM</option>
                    <option value="P3 - LOW">P3 - LOW</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Rekomendasi Langkah Remediasi</label>
                <textarea
                  rows={3}
                  value={newActionText}
                  onChange={(e) => setNewActionText(e.target.value)}
                  placeholder="Detail instruksi langkah mitigasi dan konfigurasi teknis..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreatingModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs shadow-xs"
                >
                  Simpan Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
