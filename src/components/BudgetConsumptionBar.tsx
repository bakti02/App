import React, { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { BillingCycle, PlanTier } from '../types';
import { ADDONS_DATA, PLANS_DATA } from '../data/mockData';

interface BudgetConsumptionBarProps {
  activeAddons: string[];
  teamSeats: number;
  billingCycle: BillingCycle;
  currentPlanTier?: PlanTier;
  initialBudgetLimit?: number;
}

export const BudgetConsumptionBar: React.FC<BudgetConsumptionBarProps> = ({
  activeAddons,
  teamSeats = 1,
  billingCycle = 'monthly',
  currentPlanTier = 'plus',
  initialBudgetLimit = 50
}) => {
  const [budgetLimit, setBudgetLimit] = useState<number>(initialBudgetLimit);
  const [isEditingBudget, setIsEditingBudget] = useState<boolean>(false);
  const [tempBudgetInput, setTempBudgetInput] = useState<string>(initialBudgetLimit.toString());

  const isAnnual = billingCycle === 'annually';

  // Calculate base plan cost
  const planData = PLANS_DATA.find((p) => p.id === currentPlanTier) || PLANS_DATA[1];
  const unitPlanPrice = isAnnual ? planData.annualPrice : planData.monthlyPrice;
  const planCost = unitPlanPrice * Math.max(1, teamSeats);

  // Calculate total add-ons cost
  const activeAddonObjects = ADDONS_DATA.filter((addon) => activeAddons.includes(addon.id));
  const addonsCost = activeAddonObjects.reduce(
    (acc, addon) => acc + (isAnnual ? addon.annualPrice : addon.monthlyPrice),
    0
  );

  // Total consumption
  const totalConsumption = planCost + addonsCost;
  const remainingBudget = Math.max(0, budgetLimit - totalConsumption);
  const percentageConsumed = budgetLimit > 0 ? Math.round((totalConsumption / budgetLimit) * 100) : 0;

  // Segment widths in percentages (normalized to total 100%)
  const planSegmentWidth = budgetLimit > 0 ? Math.min(100, (planCost / budgetLimit) * 100) : 0;
  const addonsSegmentWidth = budgetLimit > 0 ? Math.min(100 - planSegmentWidth, (addonsCost / budgetLimit) * 100) : 0;

  const isOverBudget = totalConsumption > budgetLimit;
  const isNearBudget = percentageConsumed >= 80 && !isOverBudget;

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(tempBudgetInput);
    if (!isNaN(parsed) && parsed > 0) {
      setBudgetLimit(parsed);
      setIsEditingBudget(false);
    }
  };

  return (
    <div
      id="budget-consumption-bar-card"
      className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 mb-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] relative overflow-hidden transition-colors"
    >
      {/* Header & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs">
            <Wallet className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-blue-500"></span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                MONTHLY BUDGET CONSUMPTION
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isOverBudget
                    ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                    : isNearBudget
                    ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                    : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                }`}
              >
                {isOverBudget ? 'Over Budget' : isNearBudget ? '80%+ Reached' : 'Within Budget'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Konsumsi biaya berjalan berdasarkan paket langganan aktif, alokasi kursi tim, dan add-on terpilih.
            </p>
          </div>
        </div>

        {/* Budget Limit Configurator */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isEditingBudget ? (
            <form onSubmit={handleSaveBudget} className="flex items-center gap-1.5">
              <div className="relative">
                <span className="absolute left-2.5 top-1.5 text-xs text-slate-400 font-bold">$</span>
                <input
                  id="budget-limit-edit-input"
                  type="number"
                  min="1"
                  max="10000"
                  step="1"
                  value={tempBudgetInput}
                  onChange={(e) => setTempBudgetInput(e.target.value)}
                  className="w-24 pl-6 pr-2 py-1 bg-slate-50 dark:bg-slate-800 border border-blue-400 dark:border-blue-500 rounded-lg text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
              >
                Simpan
              </button>
              <button
                type="button"
                onClick={() => setIsEditingBudget(false)}
                className="px-2 py-1 text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs"
              >
                Batal
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 px-3 py-1.5 rounded-xl">
              <span className="text-xs text-slate-500 dark:text-slate-400">Batas Anggaran:</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">${budgetLimit.toFixed(2)} USD</span>
              <button
                id="edit-budget-limit-btn"
                onClick={() => {
                  setTempBudgetInput(budgetLimit.toString());
                  setIsEditingBudget(true);
                }}
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline ml-1 cursor-pointer"
              >
                Ubah
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Consumption Progress Meter */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              ${totalConsumption.toFixed(2)}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              terpakai dari batas <strong className="text-slate-800 dark:text-slate-200">${budgetLimit.toFixed(2)} USD</strong>
            </span>
          </div>

          <div className="text-right">
            <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {percentageConsumed}%
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">terkonsumsi</span>
          </div>
        </div>

        {/* Visual Multi-Segment Progress Bar */}
        <div 
          id="budget-consumption-progress-bar"
          className="h-3.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-slate-200/60 dark:border-slate-700 shadow-inner"
        >
          {/* Plan Base Segment */}
          {planSegmentWidth > 0 && (
            <div
              className="h-full bg-blue-600 rounded-l-full transition-all duration-500 relative group cursor-pointer"
              style={{ width: `${planSegmentWidth}%` }}
              title={`Paket Langganan: $${planCost.toFixed(2)}/bln (${Math.round(planSegmentWidth)}%)`}
            />
          )}

          {/* Add-ons Segment */}
          {addonsSegmentWidth > 0 && (
            <div
              className={`h-full bg-indigo-500 transition-all duration-500 relative group cursor-pointer ${
                planSegmentWidth === 0 ? 'rounded-l-full' : ''
              } ${isOverBudget || remainingBudget === 0 ? 'rounded-r-full' : ''}`}
              style={{ width: `${addonsSegmentWidth}%` }}
              title={`Add-ons Aktif: $${addonsCost.toFixed(2)}/bln (${Math.round(addonsSegmentWidth)}%)`}
            />
          )}
        </div>
      </div>

      {/* Interactive Legend & Itemized Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
        {/* 1. Plan Item */}
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80">
          <div className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
          <div className="min-w-0">
            <span className="text-slate-500 dark:text-slate-400 block text-[11px] truncate">
              Paket {planData.name} ({teamSeats} {teamSeats === 1 ? 'kursi' : 'kursi'}):
            </span>
            <span className="font-bold text-slate-900 dark:text-white text-xs">
              ${planCost.toFixed(2)} / bln
            </span>
          </div>
        </div>

        {/* 2. Add-ons Item */}
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80">
          <div className="w-3 h-3 rounded-full bg-indigo-500 shrink-0" />
          <div className="min-w-0">
            <span className="text-slate-500 dark:text-slate-400 block text-[11px] truncate">
              Add-ons Terpasang ({activeAddonObjects.length}):
            </span>
            <span className="font-bold text-slate-900 dark:text-white text-xs">
              ${addonsCost.toFixed(2)} / bln
            </span>
          </div>
        </div>

        {/* 3. Remaining Buffer Item */}
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80">
          <div
            className={`w-3 h-3 rounded-full shrink-0 ${
              isOverBudget ? 'bg-rose-500' : 'bg-slate-300 dark:bg-slate-600'
            }`}
          />
          <div className="min-w-0">
            <span className="text-slate-500 dark:text-slate-400 block text-[11px] truncate">
              Sisa Kuota Anggaran:
            </span>
            <span
              className={`font-bold text-xs ${
                isOverBudget ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'
              }`}
            >
              ${remainingBudget.toFixed(2)} / bln
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
