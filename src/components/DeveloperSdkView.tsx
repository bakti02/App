import React, { useState } from 'react';
import {
  Package,
  Code2,
  Terminal,
  Copy,
  Check,
  Download,
  ExternalLink,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

interface SdkPackage {
  lang: string;
  name: string;
  version: string;
  installCmd: string;
  description: string;
  codeSnippet: string;
}

const SDK_PACKAGES: SdkPackage[] = [
  {
    lang: 'TypeScript / Node.js',
    name: '@nusasec/pqc-client',
    version: 'v2.4.0',
    installCmd: 'npm install @nusasec/pqc-client',
    description: 'TypeScript client dengan dukungan native WebAssembly untuk ML-KEM & ML-DSA di lingkungan Node.js dan browser.',
    codeSnippet: `import { NusaSecClient } from '@nusasec/pqc-client';

const nusa = new NusaSecClient({ apiKey: process.env.NUSA_API_KEY });
const { ciphertext, sharedSecret } = await nusa.kem.encapsulate({
  algorithm: 'ML-KEM-768',
  publicKey: recipientPublicKey
});`
  },
  {
    lang: 'Python',
    name: 'nusasec-pqc',
    version: 'v2.1.2',
    installCmd: 'pip install nusasec-pqc',
    description: 'Python bindings dengan akselerasi C liboqs untuk data science, API microservices, dan backend Django/FastAPI.',
    codeSnippet: `from nusasec import NusaSecClient

client = NusaSecClient(api_key="nusa_live_...")
sig = client.signatures.sign(
    algorithm="ML-DSA-65",
    message=b"Transaction Payload"
)`
  },
  {
    lang: 'Rust',
    name: 'nusasec-pqc',
    version: 'v0.9.4',
    installCmd: 'cargo add nusasec-pqc',
    description: 'Zero-allocation memory-safe Rust crate untuk infrastruktur high-throughput dan edge gateways.',
    codeSnippet: `use nusasec_pqc::{Client, Algorithm};

let client = Client::new("nusa_live_...")?;
let encapsulation = client.encapsulate(Algorithm::MlKem768, &pub_key)?;`
  },
  {
    lang: 'Go',
    name: 'github.com/nusasec/pqc-go',
    version: 'v1.3.0',
    installCmd: 'go get github.com/nusasec/pqc-go',
    description: 'Idiomatic Go package untuk cloud native services, Kubernetes controllers, dan gRPC microservices.',
    codeSnippet: `import "github.com/nusasec/pqc-go/pqc"

client := pqc.NewClient("nusa_live_...")
sharedSecret, ct, err := client.Encapsulate(pqc.ML_KEM_768, pubKey)`
  }
];

export const DeveloperSdkView: React.FC<{ showToast?: (msg: string) => void }> = ({
  showToast = (_msg: string) => {}
}) => {
  const [selectedSdk, setSelectedSdk] = useState<SdkPackage>(SDK_PACKAGES[0]);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Tersalin ke clipboard!');
  };

  return (
    <div id="developer-sdk-view" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              NusaSec Client Libraries
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Post-Quantum SDKs &amp; Developer Toolkits
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Library resmi TypeScript, Python, Rust, dan Go untuk mengintegrasikan standar kriptografi kuantum ke dalam aplikasi Anda.
          </p>
        </div>

        <a
          href="https://docs.nusasec.cloud"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all"
        >
          <BookOpen className="w-4 h-4" />
          <span>Dokumentasi API &amp; SDK Lengkap</span>
        </a>
      </div>

      {/* SDK Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SDK_PACKAGES.map((sdk) => {
          const isSelected = selectedSdk.name === sdk.name;
          return (
            <button
              key={sdk.name}
              onClick={() => setSelectedSdk(sdk)}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {sdk.lang}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    isSelected ? 'bg-slate-800 text-blue-400' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {sdk.version}
                  </span>
                </div>

                <div className={`font-mono text-xs truncate ${isSelected ? 'text-blue-300' : 'text-slate-500'}`}>
                  {sdk.name}
                </div>
              </div>

              <div className={`text-[11px] pt-2 border-t font-mono flex items-center justify-between ${
                isSelected ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
              }`}>
                <span>NIST FIPS 203/204</span>
                <span className="text-emerald-400">✓ Tested</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected SDK Detail Box */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">{selectedSdk.lang} SDK</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">{selectedSdk.description}</p>
          </div>

          <button
            onClick={() => copyText(selectedSdk.installCmd)}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-mono text-xs font-semibold transition-colors"
          >
            <code>{selectedSdk.installCmd}</code>
            <Copy className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

        {/* Quickstart Code */}
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono text-xs text-slate-500">
            <span>CONTOH KODE CEPAT (QUICKSTART):</span>
            <button
              onClick={() => copyText(selectedSdk.codeSnippet)}
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" /> Salin Kode
            </button>
          </div>

          <pre className="bg-slate-950 text-blue-200 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
            {selectedSdk.codeSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
};
