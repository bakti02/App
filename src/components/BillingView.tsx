import React, { useState } from 'react';
import {
  Gem,
  Check,
  Sparkles,
  HelpCircle,
  Zap,
  Users,
  CreditCard,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { BillingCycle, PlanTier, AddOnItem } from '../types';
import { PLANS_DATA, ADDONS_DATA } from '../data/mockData';

interface BillingViewProps {
  onUpgradePlan: (plan: PlanTier, cycle: BillingCycle, seats: number) => void;
  onToggleAddon: (addon: AddOnItem) => void;
  onOpenAiAssistant: () => void;
  activeAddons: string[];
}

export const BillingView: React.FC<BillingViewProps> = ({
  onUpgradePlan,
  onToggleAddon,
  onOpenAiAssistant,
  activeAddons
}) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [teamSeats, setTeamSeats] = useState<number>(3);
  const [showSeatCalculator, setShowSeatCalculator] = useState<boolean>(false);

  const isAnnual = billingCycle === 'annually';

  return (
    <div id="billing-view-container" className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xs">
            <Gem className="w-4 h-4 fill-white text-white stroke-[1.5]" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Billing &amp; Plan
          </h1>
        </div>

        {/* Try our AI Button */}
        <button
          id="try-our-ai-btn"
          onClick={onOpenAiAssistant}
          className="inline-flex items-center gap-2.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-slate-800 text-xs sm:text-sm font-medium shadow-xs transition-all hover:border-indigo-200 group"
        >
          <span>Try our AI</span>
          <div className="relative flex items-center justify-center w-5 h-5">
            <span className="absolute w-2 h-2 rounded-full bg-cyan-400 -top-0.5 left-0 animate-pulse"></span>
            <span className="absolute w-2 h-2 rounded-full bg-indigo-500 top-1 -right-0.5"></span>
            <span className="absolute w-2 h-2 rounded-full bg-pink-500 -bottom-0.5 left-1"></span>
            <Sparkles className="w-3 h-3 text-indigo-600 relative z-10" />
          </div>
        </button>
      </div>

      {/* Section Header: Choose Your Plans + Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
          <span className="text-[12px] font-bold uppercase tracking-wider text-slate-800">
            CHOOSE YOUR PLANS
          </span>
        </div>

        {/* Monthly / Annually Toggle */}
        <div className="flex items-center gap-3 self-start sm:self-auto bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
          <button
            id="billing-toggle-monthly"
            onClick={() => setBillingCycle('monthly')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Monthly
          </button>
          
          <button
            id="billing-toggle-annually"
            onClick={() => setBillingCycle('annually')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              billingCycle === 'annually'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Annually</span>
            <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* Free 2-month plus trial banner */}
      <div 
        id="trial-banner"
        className="bg-white border border-slate-200/90 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Free 2-month plus trial available
            </h2>
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              SAVE 20%
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Upgrade to any annually plan today and get the first 2 months free trial.
          </p>
        </div>

        <button
          id="switch-to-annually-banner-btn"
          onClick={() => {
            setBillingCycle('annually');
          }}
          className="inline-flex items-center justify-center px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs sm:text-sm font-semibold transition-all shadow-2xs shrink-0 active:scale-98"
        >
          {isAnnual ? 'Annually Active' : 'Switch to annually'}
        </button>
      </div>

      {/* Pricing Cards Grid (3 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {PLANS_DATA.map((plan) => {
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
          const isFree = plan.id === 'free';
          const isPlus = plan.id === 'plus';
          const isPremium = plan.id === 'premium';

          return (
            <div
              key={plan.id}
              id={`pricing-card-${plan.id}`}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                    {plan.badge && plan.badgeType === 'popular' && (
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {plan.badge}
                      </span>
                    )}
                    {plan.badge && plan.badgeType === 'valuable' && (
                      <span className="bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-500 mb-6">{plan.subtitle}</p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    ${price}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500 font-normal">
                    / user / month
                  </span>
                  {isAnnual && price > 0 && (
                    <span className="ml-1 text-[11px] text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                      billed yearly
                    </span>
                  )}
                </div>

                {/* Main Action Button */}
                {plan.buttonVariant === 'primary' ? (
                  <button
                    id={`btn-upgrade-${plan.id}`}
                    onClick={() => onUpgradePlan(plan, billingCycle, teamSeats)}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs mb-8 cursor-pointer"
                  >
                    {plan.buttonLabel}
                  </button>
                ) : (
                  <button
                    id={`btn-current-${plan.id}`}
                    disabled
                    className="w-full py-2.5 px-4 bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl mb-8 cursor-default"
                  >
                    {plan.buttonLabel}
                  </button>
                )}

                {/* Feature List */}
                <div className="space-y-3.5 pt-2 border-t border-slate-100">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-800 font-normal leading-tight">
                      <div className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom footer extra detail */}
              <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400">
                <span>{isFree ? '14-day history' : 'Unlimited history'}</span>
                <span>{isFree ? 'Standard speed' : 'Dedicated capacity'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section: ADD-ONS */}
      <div className="space-y-4 mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
          <span className="text-[12px] font-bold uppercase tracking-wider text-slate-800">
            ADD-ONS
          </span>
        </div>

        {ADDONS_DATA.map((addon) => {
          const isAdded = activeAddons.includes(addon.id);
          const price = isAnnual ? addon.annualPrice : addon.monthlyPrice;

          return (
            <div
              key={addon.id}
              id={`addon-card-${addon.id}`}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all hover:border-slate-300"
            >
              <div className="flex items-start gap-4">
                {/* Icon Rendering */}
                {addon.iconType === 'ai-rainbow' ? (
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative shrink-0 shadow-2xs">
                    <div className="grid grid-cols-2 gap-1 p-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    </div>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-2xs font-bold text-base">
                    ?
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      {addon.title}
                    </h4>
                    {addon.badge && (
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded uppercase">
                        {addon.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
                    {addon.subtitle}
                  </p>
                </div>
              </div>

              {/* Price and Add to plan action button */}
              <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
                  +${price} <span className="text-slate-500 font-normal">/ user / month</span>
                </div>

                <button
                  id={`btn-addon-${addon.id}`}
                  onClick={() => onToggleAddon(addon)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
                    isAdded
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-2xs'
                  }`}
                >
                  {isAdded ? 'Added to plan ✓' : 'Add to plan'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Seat Calculator Drawer / Toggle */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Workspace Team Capacity</h4>
              <p className="text-xs text-slate-500">Sesuaikan jumlah pengguna aktif untuk estimasi biaya total tim Anda.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="calc-decrease-seats"
              onClick={() => setTeamSeats(Math.max(1, teamSeats - 1))}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm"
            >
              -
            </button>
            <span className="w-12 text-center font-bold text-slate-900 text-sm">
              {teamSeats} {teamSeats === 1 ? 'user' : 'users'}
            </span>
            <button
              id="calc-increase-seats"
              onClick={() => setTeamSeats(teamSeats + 1)}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm"
            >
              +
            </button>
          </div>
        </div>

        {teamSeats > 1 && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-500 block">Free Plan ({teamSeats} users):</span>
              <span className="font-bold text-slate-900 text-sm">$0 / month</span>
            </div>
            <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100">
              <span className="text-blue-700 block">Plus Plan ({teamSeats} users):</span>
              <span className="font-bold text-blue-900 text-sm">
                ${(isAnnual ? 10 : 12) * teamSeats} / month
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-500 block">Premium Plan ({teamSeats} users):</span>
              <span className="font-bold text-slate-900 text-sm">
                ${(isAnnual ? 13 : 16) * teamSeats} / month
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
