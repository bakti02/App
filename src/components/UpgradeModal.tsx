import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  ShieldCheck,
  Sparkles,
  CreditCard,
  Lock,
  Building2,
  Mail,
  User,
  MapPin,
  FileText,
  Phone,
  QrCode,
  Landmark,
  FileCheck,
  Download,
  Copy,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Calendar,
  AlertCircle,
  HelpCircle,
  Zap,
  Globe,
  Wallet,
  Smartphone,
  CheckCircle,
  Clock,
  Shield,
  Eye,
  EyeOff,
  ExternalLink,
  RefreshCw,
  Layers
} from 'lucide-react';
import { PlanTier, BillingCycle } from '../types';

interface UpgradeModalProps {
  plan: PlanTier | null;
  billingCycle: BillingCycle;
  seats: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirmSuccess: (planName: string) => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  plan,
  billingCycle: initialBillingCycle,
  seats: initialSeats,
  isOpen,
  onClose,
  onConfirmSuccess
}) => {
  // Step state: 1 = Rincian & Data Penagihan, 2 = Gateway (Stripe & Xendit), 3 = Sukses & e-Faktur
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(initialBillingCycle);
  const [seats, setSeats] = useState<number>(initialSeats || 3);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedVa, setCopiedVa] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [showVaGuide, setShowVaGuide] = useState(true);

  // QRIS Countdown Timer (15 Minutes Simulation)
  const [qrisTimeLeft, setQrisTimeLeft] = useState(899);

  // Selected Add-ons inside checkout
  const [includeAiEngine, setIncludeAiEngine] = useState(true);
  const [includePqcSandbox, setIncludePqcSandbox] = useState(plan?.id === 'premium');
  const [includeDedicatedSla, setIncludeDedicatedSla] = useState(false);

  // Customer / Organization Specific Data
  const [customerData, setCustomerData] = useState({
    picName: 'Nurlaela Azwini',
    picEmail: 'nurlaelaazwini66@gmail.com',
    picRole: 'Lead Security Architect & SOC Admin (Level 4)',
    companyName: 'PT Nusa Keamanan Kuantum Indonesia (NusaSec Enterprise Core)',
    taxIdNpwp: '01.384.920.4-012.000',
    billingAddress: 'Sudirman Central Business District (SCBD) Lot 28, Treasury Tower Lt. 32, Senayan, Jakarta Selatan 12190, Indonesia',
    phoneNumber: '+62 812-9840-3321',
    financeEmail: 'finance@nusasec.cloud',
    poNumber: 'PO-2026-NUSA-091'
  });

  // Payment Gateway Provider Selection: 'stripe' | 'xendit' | 'po'
  const [gatewayProvider, setGatewayProvider] = useState<'stripe' | 'xendit' | 'po'>('stripe');

  // Stripe Sub-Methods: 'card' | 'apple_pay' | 'link'
  const [stripeMethod, setStripeMethod] = useState<'card' | 'apple_pay' | 'link'>('card');
  const [stripeCardDetails, setStripeCardDetails] = useState({
    cardNumber: '4111 8290 1204 8832',
    cardHolder: 'NURLAELA AZWINI',
    expiry: '08/29',
    cvc: '891',
    country: 'Indonesia (ID)',
    saveCard: true
  });

  // Xendit Sub-Methods: 'va' | 'qris' | 'ewallet' | 'direct_debit'
  const [xenditMethod, setXenditMethod] = useState<'va' | 'qris' | 'ewallet' | 'direct_debit'>('va');
  const [selectedXenditBank, setSelectedXenditBank] = useState<'bca' | 'mandiri' | 'bni' | 'bri' | 'permata'>('bca');
  const [selectedEwallet, setSelectedEwallet] = useState<'dana' | 'ovo' | 'shopeepay' | 'gopay'>('dana');
  const [ewalletPhone, setEwalletPhone] = useState('081298403321');

  useEffect(() => {
    if (isOpen && currentStep === 2 && gatewayProvider === 'xendit' && xenditMethod === 'qris') {
      const timer = setInterval(() => {
        setQrisTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, currentStep, gatewayProvider, xenditMethod]);

  if (!isOpen || !plan) return null;

  // Pricing calculations
  const unitPrice = billingCycle === 'annually' ? plan.annualPrice : plan.monthlyPrice;
  const basePlanTotal = unitPrice * seats;
  
  const aiAddonPrice = includeAiEngine ? (billingCycle === 'annually' ? 3.5 : 4) : 0;
  const pqcAddonPrice = includePqcSandbox ? (billingCycle === 'annually' ? 1.8 : 2) : 0;
  const slaAddonPrice = includeDedicatedSla ? 5 : 0;
  const addonsTotal = aiAddonPrice + pqcAddonPrice + slaAddonPrice;

  const subtotalUsd = basePlanTotal + addonsTotal;
  const ppn11Rate = 0.11;
  const taxAmountUsd = subtotalUsd * ppn11Rate;
  const grandTotalUsd = subtotalUsd + taxAmountUsd;

  // Currency Conversion (USD to IDR ~Rp16.250)
  const usdToIdrRate = 16250;
  const grandTotalIdr = Math.round(grandTotalUsd * usdToIdrRate);

  const xenditBanksConfig = {
    bca: {
      name: 'Bank Central Asia',
      code: 'BCA',
      vaNumber: '89320 081298403321',
      color: '#005baa',
      badgeBg: 'bg-blue-600 text-white',
      instructions: [
        'Buka aplikasi BCA Mobile / KlikBCA / myBCA.',
        'Pilih menu Transfer > BCA Virtual Account.',
        'Masukkan nomor VA 89320 081298403321 dan konfirmasi nominal tagihan.',
        'Selesaikan pembayaran dengan memasukkan PIN / Appli 1 Token.'
      ]
    },
    mandiri: {
      name: 'Bank Mandiri',
      code: 'MANDIRI',
      vaNumber: '88701 9840332109',
      color: '#002b66',
      badgeBg: 'bg-blue-900 text-amber-300',
      instructions: [
        'Buka aplikasi Livin\' by Mandiri (Logo Kuning).',
        'Pilih menu Bayar > Cari penyedia jasa Xendit / NusaSec.',
        'Masukkan nomor VA 88701 9840332109 dan periksa detail pesanan.',
        'Konfirmasi dan masukkan PIN Livin\' Anda.'
      ]
    },
    bni: {
      name: 'Bank Negara Indonesia',
      code: 'BNI',
      vaNumber: '98812 081298403321',
      color: '#e05929',
      badgeBg: 'bg-teal-700 text-white',
      instructions: [
        'Buka BNI Mobile Banking atau ATM BNI.',
        'Pilih menu Pembayaran > Virtual Account Billing.',
        'Input nomor VA 98812 081298403321.',
        'Pastikan nama PT Nusa Keamanan tertera lalu bayar.'
      ]
    },
    bri: {
      name: 'Bank Rakyat Indonesia',
      code: 'BRI',
      vaNumber: '10293 8403321098',
      color: '#00529c',
      badgeBg: 'bg-sky-700 text-white',
      instructions: [
        'Buka aplikasi BRImo > Pilih BRIVA.',
        'Klik Tambah Transaksi Baru > Masukkan nomor 10293 8403321098.',
        'Verifikasi jumlah tagihan lalu masukkan PIN BRImo.'
      ]
    },
    permata: {
      name: 'Permata Bank',
      code: 'PERMATA',
      vaNumber: '85220 081298403321',
      color: '#65a124',
      badgeBg: 'bg-emerald-700 text-white',
      instructions: [
        'Buka PermataME / ATM Permata.',
        'Pilih Pembayaran Tagihan > Virtual Account.',
        'Ketikkan nomor VA 85220 081298403321 dan konfirmasi.'
      ]
    }
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(3);
      onConfirmSuccess(plan.name);
    }, 1500);
  };

  const handleCopyVa = () => {
    navigator.clipboard?.writeText(xenditBanksConfig[selectedXenditBank].vaNumber.replace(/\s+/g, ''));
    setCopiedVa(true);
    setTimeout(() => setCopiedVa(false), 2000);
  };

  const handleCloseAll = () => {
    setCurrentStep(1);
    onClose();
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full my-auto shadow-2xl border border-slate-200/90 overflow-hidden relative flex flex-col max-h-[94vh]">
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200/80 bg-slate-50/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 via-blue-900 to-indigo-700 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Checkout &amp; Pembayaran Resmi NusaSec
                </h2>
                <span className="text-xs bg-blue-100 text-blue-800 font-extrabold px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
                  {plan.name}
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <span>Saluran Gateway Resmi Terintegrasi:</span>
                <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-[#635BFF]"></span> Stripe Global
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-[#002b49]"></span> Xendit XenPlatform
                </span>
              </p>
            </div>
          </div>

          <button
            id="close-upgrade-modal-btn"
            onClick={handleCloseAll}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="bg-white px-6 py-3 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
              currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              1
            </span>
            <span className={currentStep === 1 ? 'text-slate-900 font-bold' : ''}>1. Rincian &amp; Data Penagihan</span>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-300" />

          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
              currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              2
            </span>
            <span className={currentStep === 2 ? 'text-slate-900 font-bold' : ''}>2. Saluran Pembayaran (Stripe &amp; Xendit)</span>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-300" />

          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
              currentStep === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              3
            </span>
            <span className={currentStep === 3 ? 'text-emerald-700 font-bold' : ''}>3. e-Faktur &amp; Aktivasi Lisensi</span>
          </div>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#f8fafc]">
          {/* STEP 1: RINCIAN PAKET & DATA PENAGIHAN SPESIFIK */}
          {currentStep === 1 && (
            <form onSubmit={handleNextToPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Customer Specific Data */}
              <div className="lg:col-span-7 space-y-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <h3 className="text-sm font-bold text-slate-900">Data Penagihan &amp; Penanggung Jawab (PIC)</h3>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                      Akun Resmi Terverifikasi
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Nama Lengkap PIC</label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          value={customerData.picName}
                          onChange={(e) => setCustomerData({ ...customerData, picName: e.target.value })}
                          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Email Tagihan Resmi</label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="email"
                          required
                          value={customerData.picEmail}
                          onChange={(e) => setCustomerData({ ...customerData, picEmail: e.target.value })}
                          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-bold text-slate-700 block mb-1">Nama Entitas Perusahaan / Badan Usaha</label>
                      <input
                        type="text"
                        required
                        value={customerData.companyName}
                        onChange={(e) => setCustomerData({ ...customerData, companyName: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">NPWP Perusahaan (Pajak PPN 11%)</label>
                      <input
                        type="text"
                        value={customerData.taxIdNpwp}
                        onChange={(e) => setCustomerData({ ...customerData, taxIdNpwp: e.target.value })}
                        placeholder="01.xxx.xxx.x-xxx.xxx"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <span className="text-[10px] text-slate-400 mt-0.5 block">Diperlukan untuk penerbitan e-Faktur Pajak resmi Ditjen Pajak.</span>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Nomor WhatsApp / Hotline SOC</label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={customerData.phoneNumber}
                          onChange={(e) => setCustomerData({ ...customerData, phoneNumber: e.target.value })}
                          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-bold text-slate-700 block mb-1">Alamat Penagihan Domisili Perusahaan</label>
                      <textarea
                        rows={2}
                        value={customerData.billingAddress}
                        onChange={(e) => setCustomerData({ ...customerData, billingAddress: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Add-on Bundles Selection */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <h3 className="text-sm font-bold text-slate-900">Tambahan Add-on Layanan Kuantum &amp; AI</h3>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={includeAiEngine}
                          onChange={(e) => setIncludeAiEngine(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">NusaSec-AI Threat Intelligence Engine</span>
                          <span className="text-slate-500 text-[11px]">Deteksi Zero-Day &amp; playbook mitigasi insiden otomatis.</span>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">${billingCycle === 'annually' ? '3.5' : '4'}/bln</span>
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={includePqcSandbox}
                          onChange={(e) => setIncludePqcSandbox(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">PQC Quantum Migration Sandbox</span>
                          <span className="text-slate-500 text-[11px]">Simulasi benchmark algoritma ML-KEM-768 &amp; ML-DSA-65.</span>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">${billingCycle === 'annually' ? '1.8' : '2'}/bln</span>
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={includeDedicatedSla}
                          onChange={(e) => setIncludeDedicatedSla(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">Dedicated 24/7 SOC Architect SLA (99.99%)</span>
                          <span className="text-slate-500 text-[11px]">Jalur prioritas respon insiden &lt;15 menit.</span>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">$5/bln</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Calculation */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Ringkasan Konfigurasi Paket</h3>

                  {/* Billing Cycle Switcher */}
                  <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setBillingCycle('monthly')}
                      className={`flex-1 py-1.5 rounded-lg transition-all ${
                        billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Bulanan
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingCycle('annually')}
                      className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        billingCycle === 'annually' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>Tahunan</span>
                      <span className="bg-blue-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                        -20%
                      </span>
                    </button>
                  </div>

                  {/* Seats Adjuster */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">Jumlah Kursi Analis SOC</span>
                      <span className="text-[11px] text-slate-500">${unitPrice} / pengguna / bulan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSeats(Math.max(1, seats - 1))}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="font-bold text-slate-900 w-5 text-center">{seats}</span>
                      <button
                        type="button"
                        onClick={() => setSeats(seats + 1)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Financial Breakdown Table */}
                  <div className="space-y-2 text-xs pt-3 border-t border-slate-100">
                    <div className="flex justify-between text-slate-600">
                      <span>Lisensi Pokok ({plan.name} × {seats})</span>
                      <span className="font-semibold text-slate-900">${basePlanTotal.toFixed(2)}</span>
                    </div>
                    {includeAiEngine && (
                      <div className="flex justify-between text-slate-600">
                        <span>AI Threat Intel Engine</span>
                        <span className="font-semibold text-slate-900">${aiAddonPrice.toFixed(2)}</span>
                      </div>
                    )}
                    {includePqcSandbox && (
                      <div className="flex justify-between text-slate-600">
                        <span>PQC Quantum Sandbox</span>
                        <span className="font-semibold text-slate-900">${pqcAddonPrice.toFixed(2)}</span>
                      </div>
                    )}
                    {includeDedicatedSla && (
                      <div className="flex justify-between text-slate-600">
                        <span>Dedicated 24/7 SOC Architect</span>
                        <span className="font-semibold text-slate-900">${slaAddonPrice.toFixed(2)}</span>
                      </div>
                    )}
                    {billingCycle === 'annually' && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Diskon Pembayaran Tahunan (-20%)</span>
                        <span>Hemat ${((plan.monthlyPrice - plan.annualPrice) * seats * 12).toFixed(2)}/thn</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-600">
                      <span>Subtotal (Sebelum Pajak)</span>
                      <span className="font-bold text-slate-900">${subtotalUsd.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>PPN 11% (Faktur Pajak ID)</span>
                      <span className="font-semibold text-slate-900">${taxAmountUsd.toFixed(2)}</span>
                    </div>

                    <div className="pt-3 border-t-2 border-slate-900 flex flex-col gap-1">
                      <div className="flex justify-between text-base font-extrabold text-slate-900">
                        <span>Total Tagihan</span>
                        <span className="text-blue-600">${grandTotalUsd.toFixed(2)} / bln</span>
                      </div>
                      <span className="text-[11px] text-slate-500 text-right font-mono">
                        ≈ Rp{grandTotalIdr.toLocaleString('id-ID')} IDR (PPN Termasuk)
                      </span>
                    </div>
                  </div>

                  {/* Security Assurance */}
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 text-[11px] text-emerald-900 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      Dilindungi enkripsi post-quantum TLS 1.3, jaminan ketersediaan SLA 99.99%, dan gateway berlisensi resmi Bank Indonesia &amp; PCI-DSS.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Lanjut ke Saluran Pembayaran (Stripe / Xendit)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 2: SALURAN GATEWAY RESMI (BRANDED STRIPE & XENDIT) */}
          {currentStep === 2 && (
            <form onSubmit={handleExecutePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Payment Gateways Selection */}
              <div className="lg:col-span-7 space-y-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Pilih Saluran Gateway Pembayaran</h3>
                      <p className="text-[11px] text-slate-500">Pilih infrastruktur pembayaran global Stripe atau gateway lokal Indonesia Xendit.</p>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Ref: TX-NUSA-{Date.now().toString().slice(-6)}</span>
                  </div>

                  {/* Top Gateway Selector Cards with Distinct Brand Identities */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* 1. Stripe Gateway Card */}
                    <button
                      type="button"
                      onClick={() => setGatewayProvider('stripe')}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative group ${
                        gatewayProvider === 'stripe'
                          ? 'border-[#635BFF] bg-gradient-to-b from-[#635BFF]/5 to-white ring-2 ring-[#635BFF]/25 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="px-2 py-0.5 bg-[#635BFF] text-white rounded font-extrabold text-[11px] tracking-wider shadow-2xs">
                          stripe
                        </div>
                        <span className="text-[10px] text-indigo-700 bg-indigo-50 font-bold px-1.5 py-0.2 rounded border border-indigo-100">
                          Global
                        </span>
                      </div>
                      <span className="font-bold text-slate-900 text-xs block">Stripe Payments</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Credit Card, Apple Pay, Google Pay, Multi-Currency</span>
                    </button>

                    {/* 2. Xendit Gateway Card */}
                    <button
                      type="button"
                      onClick={() => setGatewayProvider('xendit')}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative group ${
                        gatewayProvider === 'xendit'
                          ? 'border-[#002b49] bg-gradient-to-b from-[#002b49]/5 to-white ring-2 ring-[#002b49]/25 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="px-2 py-0.5 bg-[#002b49] text-[#2db5ff] rounded font-extrabold text-[11px] tracking-wider shadow-2xs">
                          xendit
                        </div>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-1.5 py-0.2 rounded border border-emerald-100">
                          Indonesia
                        </span>
                      </div>
                      <span className="font-bold text-slate-900 text-xs block">Xendit XenPlatform</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">VA Bank ID, QRIS Dinamis, E-Wallet, Direct Debit</span>
                    </button>

                    {/* 3. Corporate PO Card */}
                    <button
                      type="button"
                      onClick={() => setGatewayProvider('po')}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative group ${
                        gatewayProvider === 'po'
                          ? 'border-slate-900 bg-slate-50 ring-2 ring-slate-900/25 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-2xs">
                          <FileCheck className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] text-slate-600 bg-slate-100 font-bold px-1.5 py-0.2 rounded">
                          Net 30
                        </span>
                      </div>
                      <span className="font-bold text-slate-900 text-xs block">Corporate PO (30 Hari)</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Faktur Pajak PPN 11% Resmi Ditjen Pajak</span>
                    </button>
                  </div>

                  {/* ========================================================
                      BRANDED STRIPE GATEWAY UI SECTION
                     ======================================================== */}
                  {gatewayProvider === 'stripe' && (
                    <div className="p-5 bg-gradient-to-br from-slate-50 via-[#fbfaff] to-indigo-50/30 rounded-2xl border border-indigo-100 space-y-4 text-xs animate-in fade-in duration-200 shadow-2xs">
                      {/* Stripe Brand Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-100 pb-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="px-2.5 py-1 bg-[#635BFF] text-white rounded-lg font-extrabold text-xs tracking-wider shadow-2xs flex items-center gap-1.5">
                            <span>stripe</span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block text-xs">Stripe Elements &amp; Express Checkout</span>
                            <span className="text-[10px] text-slate-500">Global PCI-DSS Level 1 Encrypted Payment Stream</span>
                          </div>
                        </div>

                        {/* Stripe Sub-Methods Switcher */}
                        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 self-start sm:self-auto shadow-2xs">
                          <button
                            type="button"
                            onClick={() => setStripeMethod('card')}
                            className={`px-3 py-1 rounded-lg font-bold transition-all text-xs ${
                              stripeMethod === 'card' ? 'bg-[#635BFF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Kartu Kredit
                          </button>
                          <button
                            type="button"
                            onClick={() => setStripeMethod('apple_pay')}
                            className={`px-3 py-1 rounded-lg font-bold transition-all text-xs flex items-center gap-1 ${
                              stripeMethod === 'apple_pay' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            <span>Pay / GPay</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setStripeMethod('link')}
                            className={`px-3 py-1 rounded-lg font-bold transition-all text-xs flex items-center gap-1 ${
                              stripeMethod === 'link' ? 'bg-[#00D66F] text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            <span>Link</span>
                          </button>
                        </div>
                      </div>

                      {/* 1. Stripe Card Input & Live Virtual Card Visual */}
                      {stripeMethod === 'card' && (
                        <div className="space-y-4">
                          {/* Live Visual Card Simulation */}
                          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-md border border-slate-800 flex flex-col justify-between h-36 relative overflow-hidden">
                            <div className="absolute -right-8 -top-8 w-28 h-28 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
                            <div className="flex items-center justify-between z-10">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-5 rounded bg-amber-400/80 border border-amber-300 flex items-center justify-center">
                                  <div className="w-3 h-2 border-t border-b border-amber-800"></div>
                                </div>
                                <span className="text-[10px] tracking-widest text-slate-300 font-mono">CORPORATE ENCRYPTED</span>
                              </div>
                              <span className="text-xs font-black tracking-widest text-white/90">VISA</span>
                            </div>

                            <div className="z-10 font-mono text-sm tracking-widest text-slate-200">
                              {stripeCardDetails.cardNumber || '•••• •••• •••• ••••'}
                            </div>

                            <div className="flex items-center justify-between text-[10px] text-slate-300 z-10 uppercase font-mono">
                              <div>
                                <span className="text-[8px] text-slate-400 block tracking-normal">Cardholder</span>
                                <span className="font-bold text-white">{stripeCardDetails.cardHolder || 'NURLAELA AZWINI'}</span>
                              </div>
                              <div>
                                <span className="text-[8px] text-slate-400 block tracking-normal">Expires</span>
                                <span className="font-bold text-white">{stripeCardDetails.expiry || 'MM/YY'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Stripe Input Fields */}
                          <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                            <div>
                              <label className="font-bold text-slate-700 block mb-1">Nomor Kartu (Visa, Mastercard, AMEX, JCB)</label>
                              <div className="relative">
                                <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                                <input
                                  type="text"
                                  required
                                  value={stripeCardDetails.cardNumber}
                                  onChange={(e) => setStripeCardDetails({ ...stripeCardDetails, cardNumber: e.target.value })}
                                  placeholder="4111 8290 1204 8832"
                                  className="w-full pl-9 pr-24 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                                />
                                <div className="absolute right-2.5 top-2 flex items-center gap-1 pointer-events-none">
                                  <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">VISA</span>
                                  <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">MC</span>
                                  <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">AMEX</span>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              <div className="sm:col-span-2">
                                <label className="font-bold text-slate-700 block mb-1">Nama Pemegang Kartu</label>
                                <input
                                  type="text"
                                  required
                                  value={stripeCardDetails.cardHolder}
                                  onChange={(e) => setStripeCardDetails({ ...stripeCardDetails, cardHolder: e.target.value })}
                                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl uppercase font-semibold text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                                />
                              </div>

                              <div>
                                <label className="font-bold text-slate-700 block mb-1">Masa Berlaku &amp; CVC</label>
                                <div className="flex gap-1.5">
                                  <input
                                    type="text"
                                    required
                                    value={stripeCardDetails.expiry}
                                    onChange={(e) => setStripeCardDetails({ ...stripeCardDetails, expiry: e.target.value })}
                                    placeholder="MM/YY"
                                    className="w-1/2 px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-center text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                                  />
                                  <div className="relative w-1/2">
                                    <input
                                      type={showCvv ? 'text' : 'password'}
                                      required
                                      value={stripeCardDetails.cvc}
                                      onChange={(e) => setStripeCardDetails({ ...stripeCardDetails, cvc: e.target.value })}
                                      placeholder="CVC"
                                      className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-center text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setShowCvv(!showCvv)}
                                      className="absolute right-1.5 top-2.5 text-slate-400 hover:text-slate-600"
                                    >
                                      {showCvv ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <label className="flex items-center gap-2 text-[11px] text-slate-600 cursor-pointer pt-1">
                              <input
                                type="checkbox"
                                checked={stripeCardDetails.saveCard}
                                onChange={(e) => setStripeCardDetails({ ...stripeCardDetails, saveCard: e.target.checked })}
                                className="w-3.5 h-3.5 text-[#635BFF] rounded focus:ring-[#635BFF]"
                              />
                              <span>Simpan kartu ini dengan aman untuk perpanjangan lisensi otomatis (Stripe Vault).</span>
                            </label>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
                            <span className="flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-[#635BFF]" />
                              Terproteksi 3D Secure 2.2 &amp; Stripe Radar AI Anti-Fraud
                            </span>
                            <span className="font-extrabold text-[#635BFF]">PCI Service Provider Level 1 ✓</span>
                          </div>
                        </div>
                      )}

                      {/* 2. Stripe Apple Pay / Google Pay */}
                      {stripeMethod === 'apple_pay' && (
                        <div className="p-6 bg-white rounded-xl border border-slate-200 text-center space-y-3">
                          <button
                            type="button"
                            onClick={() => {}}
                            className="w-full py-3 bg-black hover:bg-neutral-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm text-sm"
                          >
                            <span>Pay with Pay / GPay via Stripe</span>
                          </button>
                          <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                            Otentikasi biometrik Face ID / Touch ID didukung langsung oleh infrastruktur Stripe Express Checkout.
                          </p>
                        </div>
                      )}

                      {/* 3. Stripe Link Express */}
                      {stripeMethod === 'link' && (
                        <div className="p-6 bg-white rounded-xl border border-[#00D66F]/40 text-center space-y-3">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00D66F]/10 text-slate-900 font-extrabold rounded-lg text-xs">
                            <span className="text-[#00D66F] font-black text-sm">link</span> by stripe
                          </div>
                          <p className="text-xs text-slate-700 font-medium">
                            Bayar instan dalam 1 klik dengan kredensial tersimpan di jaringan global Stripe.
                          </p>
                          <input
                            type="email"
                            value={customerData.picEmail}
                            readOnly
                            className="max-w-xs mx-auto text-center px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs text-slate-700 block w-full"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* ========================================================
                      BRANDED XENDIT GATEWAY UI SECTION
                     ======================================================== */}
                  {gatewayProvider === 'xendit' && (
                    <div className="p-5 bg-gradient-to-br from-slate-50 via-[#f4faff] to-sky-50/40 rounded-2xl border border-sky-100 space-y-4 text-xs animate-in fade-in duration-200 shadow-2xs">
                      {/* Xendit Brand Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-100 pb-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="px-2.5 py-1 bg-[#002b49] text-[#2db5ff] rounded-lg font-black text-xs tracking-wider shadow-2xs flex items-center gap-1.5">
                            <span>xendit</span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block text-xs">Xendit XenPlatform Payment Infrastructure</span>
                            <span className="text-[10px] text-slate-500">Pusat Transaksi FinTech Berlisensi Bank Indonesia &amp; OJK</span>
                          </div>
                        </div>

                        {/* Xendit Sub-Methods Switcher */}
                        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 self-start sm:self-auto shadow-2xs">
                          <button
                            type="button"
                            onClick={() => setXenditMethod('va')}
                            className={`px-3 py-1 rounded-lg font-bold transition-all text-xs ${
                              xenditMethod === 'va' ? 'bg-[#002b49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Virtual Account
                          </button>
                          <button
                            type="button"
                            onClick={() => setXenditMethod('qris')}
                            className={`px-3 py-1 rounded-lg font-bold transition-all text-xs flex items-center gap-1 ${
                              xenditMethod === 'qris' ? 'bg-[#002b49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            <span>QRIS Dinamis</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setXenditMethod('ewallet')}
                            className={`px-3 py-1 rounded-lg font-bold transition-all text-xs ${
                              xenditMethod === 'ewallet' ? 'bg-[#002b49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            E-Wallet
                          </button>
                        </div>
                      </div>

                      {/* 1. Xendit Virtual Account UI */}
                      {xenditMethod === 'va' && (
                        <div className="space-y-4">
                          {/* Bank Selector Buttons */}
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {(['bca', 'mandiri', 'bni', 'bri', 'permata'] as const).map((bankKey) => {
                              const b = xenditBanksConfig[bankKey];
                              const isSelected = selectedXenditBank === bankKey;
                              return (
                                <button
                                  key={bankKey}
                                  type="button"
                                  onClick={() => setSelectedXenditBank(bankKey)}
                                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                                    isSelected
                                      ? 'border-blue-600 bg-white ring-2 ring-blue-600/30 shadow-xs'
                                      : 'border-slate-200 bg-white hover:bg-slate-50'
                                  }`}
                                >
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${b.badgeBg}`}>
                                    {b.code}
                                  </span>
                                  <span className="font-bold text-slate-800 text-[11px]">{b.name}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Dynamic VA Number Display Box */}
                          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                              <div>
                                <span className="text-[11px] text-slate-500 block">Nomor Xendit Virtual Account ({xenditBanksConfig[selectedXenditBank].name}):</span>
                                <span className="text-xs font-bold text-slate-800">Verifikasi Otomatis Realtime 24/7</span>
                              </div>
                              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                                VA Aktif ✓
                              </span>
                            </div>

                            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                              <span className="font-mono font-extrabold text-base sm:text-lg text-slate-900 tracking-wider">
                                {xenditBanksConfig[selectedXenditBank].vaNumber}
                              </span>
                              <button
                                type="button"
                                onClick={handleCopyVa}
                                className="px-3.5 py-1.5 bg-[#002b49] hover:bg-slate-900 text-white rounded-lg font-bold flex items-center gap-1.5 transition-all text-xs shadow-2xs"
                              >
                                {copiedVa ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                <span>{copiedVa ? 'Tersalin' : 'Salin Nomor'}</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                              <div>
                                <span className="text-slate-400 block text-[10px]">Nama Akun Penerima:</span>
                                <strong className="text-slate-900">PT NUSA KEAMANAN - NURLAELA AZWINI</strong>
                              </div>
                              <div>
                                <span className="text-slate-400 block text-[10px]">Total Transfer Tepat:</span>
                                <strong className="text-blue-600 font-mono">Rp{grandTotalIdr.toLocaleString('id-ID')}</strong>
                              </div>
                            </div>
                          </div>

                          {/* Transfer Guide Dropdown */}
                          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <button
                              type="button"
                              onClick={() => setShowVaGuide(!showVaGuide)}
                              className="w-full p-3 text-left font-bold text-slate-800 flex items-center justify-between text-xs hover:bg-slate-50"
                            >
                              <span>Panduan Pembayaran {xenditBanksConfig[selectedXenditBank].name}</span>
                              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${showVaGuide ? 'rotate-90' : ''}`} />
                            </button>
                            {showVaGuide && (
                              <div className="p-3.5 bg-slate-50/70 border-t border-slate-100 text-[11px] text-slate-600 space-y-1.5">
                                <ol className="list-decimal pl-4 space-y-1">
                                  {xenditBanksConfig[selectedXenditBank].instructions.map((ins, idx) => (
                                    <li key={idx}>{ins}</li>
                                  ))}
                                </ol>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* 2. Xendit QRIS Dinamis */}
                      {xenditMethod === 'qris' && (
                        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col items-center text-center space-y-3">
                          <div className="flex items-center justify-between w-full border-b border-slate-100 pb-2">
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-slate-900 text-xs">QRIS Standar Bank Indonesia</span>
                              <span className="text-[10px] bg-red-50 text-red-700 font-bold px-1.5 py-0.2 rounded">ASPI Validated</span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>{formatTimer(qrisTimeLeft)}</span>
                            </div>
                          </div>

                          {/* QR Code Container */}
                          <div className="w-48 h-48 bg-white p-2.5 rounded-2xl border-2 border-slate-900 shadow-md flex flex-col items-center justify-center relative">
                            {/* Visual QR Code Pattern */}
                            <div className="w-full h-full bg-slate-950 text-white rounded-xl p-2 flex flex-col items-center justify-center font-mono text-[9px] text-center space-y-1">
                              <QrCode className="w-14 h-14 text-white" />
                              <span className="text-cyan-400 font-bold">[XENDIT-QRIS-B2B]</span>
                              <span className="text-[10px] text-amber-300 font-extrabold">
                                Rp{grandTotalIdr.toLocaleString('id-ID')}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1 max-w-sm">
                            <span className="font-bold text-slate-900 text-xs block">
                              Pindai menggunakan Aplikasi Mobile Banking &amp; E-Wallet Apa Pun
                            </span>
                            <span className="text-slate-500 text-[11px] block">
                              Mendukung BCA Mobile, Livin' Mandiri, BRImo, BNI Mobile, GoPay, OVO, DANA, ShopeePay, dan AstraPay.
                            </span>
                          </div>
                        </div>
                      )}

                      {/* 3. Xendit E-Wallet */}
                      {xenditMethod === 'ewallet' && (
                        <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                          <label className="font-bold text-slate-700 block text-xs">Pilih Layanan E-Wallet</label>
                          <div className="grid grid-cols-4 gap-2">
                            {[
                              { id: 'dana', name: 'DANA', bg: 'bg-sky-500 text-white' },
                              { id: 'ovo', name: 'OVO', bg: 'bg-purple-700 text-white' },
                              { id: 'shopeepay', name: 'ShopeePay', bg: 'bg-orange-500 text-white' },
                              { id: 'gopay', name: 'GoPay', bg: 'bg-emerald-600 text-white' }
                            ].map((ew) => (
                              <button
                                key={ew.id}
                                type="button"
                                onClick={() => setSelectedEwallet(ew.id as any)}
                                className={`p-2.5 rounded-xl border text-center font-bold transition-all text-xs ${
                                  selectedEwallet === ew.id
                                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600/30'
                                    : 'border-slate-200 bg-white hover:bg-slate-50'
                                }`}
                              >
                                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${ew.bg}`}>
                                  {ew.name}
                                </span>
                              </button>
                            ))}
                          </div>

                          <div>
                            <label className="font-bold text-slate-700 block mb-1 text-xs">Nomor Handphone Terdaftar di E-Wallet</label>
                            <input
                              type="text"
                              value={ewalletPhone}
                              onChange={(e) => setEwalletPhone(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <span className="text-[10px] text-slate-400 mt-0.5 block">
                              Permintaan otentikasi push notification akan otomatis dikirimkan ke aplikasi {selectedEwallet.toUpperCase()}.
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 pt-1">
                        <span className="flex items-center gap-1.5">
                          <Landmark className="w-3.5 h-3.5 text-[#002b49]" />
                          Didukung oleh Xendit XenPlatform • Pengawasan Bank Indonesia
                        </span>
                        <span className="font-extrabold text-[#002b49]">ISO 27001 Certified ✓</span>
                      </div>
                    </div>
                  )}

                  {/* ========================================================
                      CORPORATE PO DETAILS
                     ======================================================== */}
                  {gatewayProvider === 'po' && (
                    <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4 text-xs animate-in fade-in duration-200">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Nomor Purchase Order (PO) Perusahaan</label>
                        <input
                          type="text"
                          required
                          value={customerData.poNumber}
                          onChange={(e) => setCustomerData({ ...customerData, poNumber: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono font-medium text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-100 text-blue-900 space-y-1">
                        <strong className="block">Ketentuan Pembayaran Term of Payment Net 30 Hari:</strong>
                        <span>
                          Faktur tagihan resmi beserta lampiran e-Faktur Pajak PPN 11% Ditjen Pajak akan dikirimkan otomatis ke departemen keuangan di <strong>{customerData.financeEmail}</strong>.
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Kembali Ubah Data Penagihan
                </button>
              </div>

              {/* Right Column: Order Confirmation Summary */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Konfirmasi Nilai Pembayaran</h3>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Penerima Tagihan:</span>
                      <span className="font-bold text-slate-900">{customerData.picName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Entitas Usaha:</span>
                      <span className="font-semibold text-slate-900">{customerData.companyName.slice(0, 24)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Saluran Gateway:</span>
                      <span className="font-extrabold text-blue-600 uppercase">
                        {gatewayProvider === 'stripe' ? 'Stripe Global' : gatewayProvider === 'xendit' ? 'Xendit XenPlatform' : 'Corporate PO'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Paket {plan.name} ({seats} Kursi)</span>
                      <span className="font-bold text-slate-900">${basePlanTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Add-on Tambahan</span>
                      <span className="font-bold text-slate-900">${addonsTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>PPN 11% (Faktur Pajak)</span>
                      <span className="font-bold text-slate-900">${taxAmountUsd.toFixed(2)}</span>
                    </div>
                    <div className="pt-3 border-t-2 border-slate-900 flex justify-between text-base font-extrabold text-slate-900">
                      <span>Total Pembayaran</span>
                      <span className="text-blue-600">${grandTotalUsd.toFixed(2)}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 text-right block font-mono">
                      ≈ Rp{grandTotalIdr.toLocaleString('id-ID')} IDR (PPN Termasuk)
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-75 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Mengotentikasi via {gatewayProvider === 'stripe' ? 'Stripe' : gatewayProvider === 'xendit' ? 'Xendit' : 'PO'}...
                      </span>
                    ) : (
                      <span>Bayar &amp; Aktifkan Layanan Sekarang</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: SUKSES & KWITANSI / E-FAKTUR ELEKTRONIK */}
          {currentStep === 3 && (
            <div className="max-w-2xl mx-auto space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md animate-in zoom-in-50 duration-200">
                <CheckCircle2 className="w-9 h-9 text-emerald-600" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Pembayaran Berhasil &amp; Lisensi Aktif! 🎉
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
                  Selamat! Workspace <strong>{customerData.companyName}</strong> telah berhasil ditingkatkan ke paket <strong>{plan.name}</strong> dengan akses penuh ke seluruh fitur keamanan &amp; PQC.
                </p>
              </div>

              {/* Receipt / Invoice Details Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 text-left space-y-4 shadow-2xs text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">ID Transaksi Resmi:</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {gatewayProvider === 'stripe' ? 'ch_stripe_3PnL92819821' : gatewayProvider === 'xendit' ? 'inv_xendit_9840332199' : 'TX-NUSA-20260819-9821'}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 rounded-lg text-xs">
                    LUNAS (PAID) ✓
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Nama Pembeli / PIC:</span>
                    <strong className="text-slate-900">{customerData.picName}</strong>
                    <span className="text-slate-500 block text-[11px]">{customerData.picEmail}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Entitas Tenant:</span>
                    <strong className="text-slate-900">{customerData.companyName}</strong>
                    <span className="text-slate-500 block text-[11px]">NPWP: {customerData.taxIdNpwp}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Saluran Gateway:</span>
                    <strong className="text-slate-900">
                      {gatewayProvider === 'stripe' ? 'Stripe Global Payments (PCI-DSS L1)' : gatewayProvider === 'xendit' ? 'Xendit XenPlatform (Bank Indonesia Regulated)' : 'Corporate PO 30 Hari'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Total Pembayaran:</span>
                    <strong className="text-blue-600 text-sm">${grandTotalUsd.toFixed(2)} USD (Rp{grandTotalIdr.toLocaleString('id-ID')})</strong>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-[11px] flex items-center justify-between">
                  <span>e-Faktur Pajak resmi telah otomatis diterbitkan dan dikirimkan ke <strong>{customerData.picEmail}</strong></span>
                  <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseAll}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs"
                >
                  Kembali ke Dashboard Workspace
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
