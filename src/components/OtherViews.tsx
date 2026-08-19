import React, { useState } from 'react';
import {
  Users,
  LayoutGrid,
  Layers,
  Bell,
  Sparkles,
  User,
  SlidersHorizontal,
  ShieldCheck,
  Lock,
  Code2,
  Boxes,
  FileSpreadsheet,
  Plus,
  Trash2,
  Mail,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  Download,
  Copy,
  Check
} from 'lucide-react';
import { NavigationSection, TeamMember } from '../types';
import { TEAM_MEMBERS_DATA, INVOICES_DATA } from '../data/mockData';

interface OtherViewsProps {
  currentSection: NavigationSection;
  onNavigateToBilling: () => void;
}

export const OtherViews: React.FC<OtherViewsProps> = ({ currentSection, onNavigateToBilling }) => {
  const [members, setMembers] = useState<TeamMember[]>(TEAM_MEMBERS_DATA);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'Member' | 'Editor' | 'Admin'>('Member');
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [apiKey] = useState('sk_live_9928f01a8837bcde209a3994');

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberEmail.trim()) return;
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: newMemberEmail.split('@')[0],
      email: newMemberEmail.trim(),
      role: newMemberRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'invited'
    };
    setMembers([...members, newMember]);
    setNewMemberEmail('');
  };

  const handleCopyKey = () => {
    navigator.clipboard?.writeText(apiKey);
    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full">
      {/* OVERVIEW VIEW */}
      {currentSection === 'overview' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Workplace Overview</h1>
              <p className="text-xs sm:text-sm text-slate-500">Ringkasan performa dan aktivitas tim Anda saat ini.</p>
            </div>
            <button 
              onClick={onNavigateToBilling}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl"
            >
              Kelola Paket
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">Total Tim Aktif</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-slate-900">{members.length} Anggota</span>
                <span className="text-xs text-emerald-600 font-semibold">+1 bulan ini</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">Penyimpanan Terpakai</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-slate-900">420 MB</span>
                <span className="text-xs text-slate-500">dari 1 GB Free</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                <div className="bg-blue-600 h-full w-[42%]"></div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">Status Paket</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-slate-900">Free Tier</span>
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Aktif</span>
              </div>
              <button 
                onClick={onNavigateToBilling}
                className="text-xs text-blue-600 hover:underline font-semibold mt-2 block"
              >
                Upgrade ke Plus (Hemat 20%) &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MEMBERS VIEW */}
      {currentSection === 'members' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Anggota Workspace</h1>
              <p className="text-xs sm:text-sm text-slate-500">Kelola izin akses dan undang anggota tim baru.</p>
            </div>
          </div>

          {/* Invite Box */}
          <form onSubmit={handleInviteMember} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="flex-1 relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                id="invite-email-input"
                type="email"
                required
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="nama@perusahaan.com"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <select
              value={newMemberRole}
              onChange={(e) => setNewMemberRole(e.target.value as any)}
              className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-white text-slate-700 font-medium"
            >
              <option value="Member">Member</option>
              <option value="Editor">Editor</option>
              <option value="Admin">Admin</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl"
            >
              Undang Anggota
            </button>
          </form>

          {/* Members Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-medium">
                <tr>
                  <th className="py-3 px-4">Nama & Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <span className="font-semibold text-slate-900 block">{m.name}</span>
                        <span className="text-slate-500 text-xs">{m.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium text-xs">
                        {m.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                        m.status === 'active' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                        {m.status === 'active' ? 'Aktif' : 'Terkirim'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {m.role !== 'Admin' && (
                        <button 
                          onClick={() => setMembers(members.filter(x => x.id !== m.id))}
                          className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PROJECTS VIEW */}
      {currentSection === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Projects &amp; Tasks</h1>
              <p className="text-xs sm:text-sm text-slate-500">Kelola repositori proyek dan alur kerja kolaboratif.</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2">
              <Plus className="w-4 h-4" /> Buat Proyek Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">GoodWriter App</span>
                <span className="text-xs text-slate-400">Diperbarui 2 jam lalu</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">AI Copywriting Suite</h3>
              <p className="text-xs text-slate-500 mb-4">Aplikasi generator naskah otomatis dengan integrasi AI dan ekspor PDF.</p>
              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                <span className="text-slate-600 font-medium">8 Tugas Selesai</span>
                <span className="text-emerald-600 font-bold">Progress 80%</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Invoicer App</span>
                <span className="text-xs text-slate-400">Diperbarui kemarin</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Automated Invoicing Engine</h3>
              <p className="text-xs text-slate-500 mb-4">Sistem penagihan otomatis ke klien dengan pelacakan status pembayaran online.</p>
              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                <span className="text-slate-600 font-medium">14 Tugas Selesai</span>
                <span className="text-emerald-600 font-bold">Progress 95%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS VIEW */}
      {currentSection === 'notifications' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Pemberitahuan &amp; Log</h1>
            <p className="text-xs sm:text-sm text-slate-500">Semua aktivitas dan info update akun Anda.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-2xs">
            <div className="p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-slate-900">Uji Coba 2 Bulan Gratis Plus Tersedia!</p>
                <p className="text-xs text-slate-500 mt-0.5">Dapatkan diskon 20% dan 2 bulan gratis saat memilih pembayaran tahunan.</p>
                <span className="text-[10px] text-slate-400 mt-2 block">10 menit yang lalu</span>
              </div>
            </div>

            <div className="p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-slate-900">Workspace Berhasil Diinisialisasi</p>
                <p className="text-xs text-slate-500 mt-0.5">Anda saat ini berada pada paket Free dengan akses penuh ke fitur dasar.</p>
                <span className="text-[10px] text-slate-400 mt-2 block">Hari ini</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API VIEW */}
      {currentSection === 'api' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">API Credentials &amp; Webhooks</h1>
            <p className="text-xs sm:text-sm text-slate-500">Akses kunci API untuk integrasi aplikasi backend &amp; webhook.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2">Live Secret API Key</label>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  readOnly
                  value={apiKey}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 font-mono"
                />
                <button
                  onClick={handleCopyKey}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  {copiedApiKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedApiKey ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROFILE / PREFERENCE / SECURITY / PASSWORDS / TEAMS FALLBACK */}
      {!['overview', 'members', 'projects', 'notifications', 'api'].includes(currentSection) && (
        <div className="space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 capitalize">
              {currentSection.replace('team-', 'Tim: ').replace('-', ' ')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">Pengaturan konfigurasi dan detail preferensi akun Anda.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                NA
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Nurlaela Azwini</h3>
                <p className="text-xs text-slate-500">nurlaelaazwini66@gmail.com • Administrator</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-600">Butuh fitur kolaborasi tim yang lebih lengkap?</span>
              <button
                onClick={onNavigateToBilling}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Lihat Paket Billing &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
