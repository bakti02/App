import React, { useState } from 'react';
import {
  Building2,
  Users,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Lock,
  Key,
  Trash2,
  Plus
} from 'lucide-react';

interface OrgMember {
  id: string;
  name: string;
  email: string;
  role: 'SOC Admin' | 'Security Analyst' | 'Compliance Auditor' | 'Developer';
  mfaEnabled: boolean;
  joinedAt: string;
  status: 'ACTIVE' | 'INVITED';
}

const INITIAL_ORG_MEMBERS: OrgMember[] = [
  {
    id: 'usr-1',
    name: 'Nurlaela Azwini',
    email: 'nurlaelaazwini66@gmail.com',
    role: 'SOC Admin',
    mfaEnabled: true,
    joinedAt: '12 Jan 2026',
    status: 'ACTIVE'
  },
  {
    id: 'usr-2',
    name: 'Budi Santoso',
    email: 'budi.santoso@nusasec.cloud',
    role: 'Security Analyst',
    mfaEnabled: true,
    joinedAt: '04 Feb 2026',
    status: 'ACTIVE'
  },
  {
    id: 'usr-3',
    name: 'Siti Rahmawati',
    email: 'siti.r@audit-partner.id',
    role: 'Compliance Auditor',
    mfaEnabled: false,
    joinedAt: '18 Agu 2026',
    status: 'INVITED'
  }
];

export const OrganizationView: React.FC<{ showToast?: (msg: string) => void }> = ({
  showToast = (_msg: string) => {}
}) => {
  const [members, setMembers] = useState<OrgMember[]>(INITIAL_ORG_MEMBERS);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState<'SOC Admin' | 'Security Analyst' | 'Compliance Auditor' | 'Developer'>('Security Analyst');

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim() || !inviteName.trim()) return;

    const newM: OrgMember = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      mfaEnabled: false,
      joinedAt: 'Hari ini',
      status: 'INVITED'
    };

    setMembers([...members, newM]);
    setIsInviteModalOpen(false);
    setInviteEmail('');
    setInviteName('');
    showToast(`Undangan ke "${newM.email}" sebagai ${newM.role} berhasil dikirim.`);
  };

  return (
    <div id="organization-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              NusaSec Organization &amp; RBAC Control
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Organization, Team Members &amp; RBAC
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Tenant ID: <code className="font-mono font-bold text-slate-800">nusasec-prod-88</code> | Manajemen peran hak akses berbasis Role-Based Access Control.
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-98"
        >
          <UserPlus className="w-4 h-4" />
          <span>Undang Anggota Tim Baru</span>
        </button>
      </div>

      {/* Members List Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Anggota Tim &amp; Hak Akses Role</h3>

        <div className="space-y-3">
          {members.map((m) => (
            <div
              key={m.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                  {m.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{m.name}</span>
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.2 rounded-full uppercase ${
                        m.role === 'SOC Admin'
                          ? 'bg-rose-100 text-rose-800'
                          : m.role === 'Security Analyst'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {m.role}
                    </span>
                  </div>
                  <div className="text-slate-500 font-mono text-[11px]">{m.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[11px] font-mono text-slate-500">
                  MFA: {m.mfaEnabled ? <strong className="text-emerald-600">✓ Aktif (FIDO2)</strong> : <span className="text-rose-500">Nonaktif</span>}
                </span>

                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    m.status === 'ACTIVE'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Invite Member */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Undang Anggota ke Organisasi</h3>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Contoh: Rian Pratama"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Alamat Email Perusahaan</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="rian.pratama@perusahaan.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Role / Izin Akses</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Security Analyst">Security Analyst (Read &amp; Triage)</option>
                  <option value="SOC Admin">SOC Admin (Full Security &amp; IAM Control)</option>
                  <option value="Compliance Auditor">Compliance Auditor (Read-Only Audit &amp; Evidence)</option>
                  <option value="Developer">Developer (API &amp; PQC SDK Access)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs shadow-xs"
                >
                  Kirim Undangan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
