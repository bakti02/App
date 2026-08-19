import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, CreditCard, Lock } from 'lucide-react';
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
  billingCycle,
  seats,
  isOpen,
  onClose,
  onConfirmSuccess
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');

  if (!isOpen || !plan) return null;

  const unitPrice = billingCycle === 'annually' ? plan.annualPrice : plan.monthlyPrice;
  const totalPrice = unitPrice * seats;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirmSuccess(plan.name);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          id="close-upgrade-modal"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Upgrade ke {plan.name}</h3>
            <p className="text-xs text-slate-500">
              Paket {billingCycle === 'annually' ? 'Tahunan (Diskon 20%)' : 'Bulanan'}
            </p>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 mb-5 space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Paket {plan.name} ({seats} pengguna)</span>
            <span className="font-semibold text-slate-900">${totalPrice}/bulan</span>
          </div>
          {billingCycle === 'annually' && (
            <div className="flex justify-between text-emerald-600 font-medium">
              <span>Diskon Tahunan (2 Bulan Gratis)</span>
              <span>Aktif ✓</span>
            </div>
          )}
          <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
            <span>Total Tagihan</span>
            <span className="text-blue-600">${totalPrice} / bulan</span>
          </div>
        </div>

        {/* Payment Simulation Form */}
        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Metode Pembayaran</label>
            <div className="flex items-center gap-2 p-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs text-slate-700">
              <CreditCard className="w-4 h-4 text-slate-500" />
              <input
                type="text"
                readOnly
                value={cardNumber}
                className="bg-transparent flex-1 focus:outline-none font-mono text-xs"
              />
              <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                VISA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Pembayaran aman 256-bit SSL Terenkripsi. Batalkan kapan saja.</span>
          </div>

          <button
            id="confirm-upgrade-btn"
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-75 text-white font-semibold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span>Memproses Konfirmasi...</span>
            ) : (
              <span>Konfirmasi &amp; Aktifkan Paket</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
