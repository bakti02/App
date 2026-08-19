import React, { useState } from 'react';
import {
  GitFork,
  ShieldAlert,
  Server,
  Database,
  Lock,
  Globe,
  ArrowRight,
  Zap,
  Info,
  CheckCircle2,
  AlertTriangle,
  Layers
} from 'lucide-react';

interface AttackPathsViewProps {
  showToast?: (msg: string) => void;
}

export const AttackPathsView: React.FC<AttackPathsViewProps> = ({
  showToast = (_msg: string) => {}
}) => {
  const [selectedNode, setSelectedNode] = useState<string>('node-3');

  const nodes = [
    {
      id: 'node-1',
      title: 'Public Internet Ingress',
      type: 'ENTRY_POINT',
      ip: '0.0.0.0/0',
      risk: 'High Exposure',
      description: 'Permukaan serangan eksternal yang dapat dijangkau botnet dan exploit crawler.',
      icon: Globe,
      status: 'MONITORED'
    },
    {
      id: 'node-2',
      title: 'Cloudflare Edge WAF',
      type: 'FIREWALL_PROXY',
      ip: '104.16.249.249',
      risk: 'Low (Inspected)',
      description: 'Lapis pertahanan awal dengan inspeksi rate limiting dan rule set OWASP.',
      icon: ShieldAlert,
      status: 'PROTECTED'
    },
    {
      id: 'node-3',
      title: 'API Gateway ECS Container',
      type: 'VULNERABLE_SERVICE',
      ip: '10.0.1.42 (VPC Subnet)',
      risk: 'Critical (CVE-2024-3400)',
      description: 'Container rentan parsing header x-forwarded-host yang dapat dieksploitasi untuk injeksi perintah.',
      icon: Server,
      status: 'COMPROMISED_CANDIDATE'
    },
    {
      id: 'node-4',
      title: 'IAM Role (EcsTaskExecutionRole)',
      type: 'PRIVILEGED_IDENTITY',
      ip: 'arn:aws:iam::role/EcsTaskExecutionRole',
      risk: 'High Privilege',
      description: 'Memiliki izin s3:GetObject dan rds-db:connect tanpa batasan IP internal.',
      icon: Lock,
      status: 'OVER_PRIVILEGED'
    },
    {
      id: 'node-5',
      title: 'PostgreSQL Customer RDS (Crown Jewel)',
      type: 'DATA_STORE',
      ip: '10.0.2.18 (Private DB Subnet)',
      risk: 'Target Utama',
      description: 'Database relasional utama yang menyimpan data PII pelanggan dan kredensial hash.',
      icon: Database,
      status: 'CROWN_JEWEL'
    }
  ];

  const activeNodeData = nodes.find((n) => n.id === selectedNode) || nodes[2];

  const handleIsolateChokepoint = () => {
    showToast('Choke-point isolation berhasil! Menutup celah IAM Privilege Escalation pada node terpilih.');
  };

  return (
    <div id="attack-paths-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              NusaSec Phase 4 Graph Intelligence
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Attack Path Graph &amp; Lateral Movement Visualizer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Pemodelan grafis rantai eksploitasi peretas dari Internet Ingress, privilege escalation IAM, hingga Crown Jewel database.
          </p>
        </div>

        <button
          onClick={handleIsolateChokepoint}
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-98"
        >
          <Lock className="w-4 h-4" />
          <span>Isolasi Choke-Point Kritis</span>
        </button>
      </div>

      {/* Interactive Visual Graph Canvas */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
          <span className="text-slate-400 flex items-center gap-2">
            <GitFork className="w-4 h-4 text-blue-400" />
            LIVE ATTACK VECTOR TOPOLOGY (CANONICAL GRAPH PROJECTION)
          </span>
          <span className="text-rose-400 font-bold bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
            1 Jalur Serangan Kritis Terdeteksi
          </span>
        </div>

        {/* Visual Graph Nodes in Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative py-4">
          {nodes.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = selectedNode === node.id;
            return (
              <div key={node.id} className="relative flex flex-col items-center">
                <button
                  onClick={() => setSelectedNode(node.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all relative ${
                    isSelected
                      ? 'bg-blue-950/70 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                        node.status === 'CROWN_JEWEL'
                          ? 'bg-purple-950 text-purple-300 border border-purple-800'
                          : node.status === 'COMPROMISED_CANDIDATE'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {node.type}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-white truncate mb-1">{node.title}</h4>
                  <p className="text-[10px] text-slate-400 font-mono truncate">{node.ip}</p>
                </button>

                {/* Arrow Connector for desktop */}
                {idx < nodes.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-rose-500">
                    <ArrowRight className="w-4 h-4 stroke-[2.5] animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Node Deep Inspector */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400 font-bold uppercase">
              NODE INSPECTOR &amp; EVIDENCE REFERENCE:
            </span>
            <span className="text-blue-400 font-bold">{activeNodeData.title}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
            <div>
              <span className="text-slate-500 block text-[10px]">TIPE NODE:</span>
              <span className="font-bold text-white">{activeNodeData.type}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">IDENTIFIKASI RESOURCE / IP:</span>
              <span className="font-bold text-blue-300">{activeNodeData.ip}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">TINGKAT RISIKO JALUR:</span>
              <span className="font-bold text-rose-400">{activeNodeData.risk}</span>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed font-sans text-xs pt-1">
            {activeNodeData.description}
          </p>
        </div>
      </div>
    </div>
  );
};
