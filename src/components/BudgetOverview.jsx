import React from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/currency';
import { Wallet, AlertTriangle, AlertOctagon, TrendingUp, ArrowDownRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const BudgetOverview = () => {
  const {
    tripBudget,
    totalSpentINR,
    remainingBalanceINR,
    budgetUsedPercent,
    isBudgetWarning,
    isBudgetDanger
  } = useApp();

  return (
    <div className="space-y-6 text-ivory">
      {/* 3 TOP STATS FINANCIAL CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* TOTAL BUDGET */}
        <div className="glass-card-luxury p-6 sm:p-7 rounded-3xl border border-sand/20 shadow-luxury flex flex-col justify-between">
          <div className="flex items-center justify-between text-sand/60 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-sunset font-mono">
              Allocated Budget
            </span>
            <div className="p-2.5 rounded-2xl bg-midnight-dark text-sunset border border-sand/15">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-serif font-bold text-ivory tracking-tight font-num">
              {formatINR(tripBudget)}
            </p>
            <span className="text-xs text-sand/60 mt-1 block font-sans">
              Set for 4-day Goa expedition
            </span>
          </div>
        </div>

        {/* TOTAL SPENT */}
        <div className="glass-card-luxury p-6 sm:p-7 rounded-3xl border border-sand/20 shadow-luxury flex flex-col justify-between">
          <div className="flex items-center justify-between text-sand/60 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-sunset font-mono">
              Total Utilized
            </span>
            <div
              className={`p-2.5 rounded-2xl ${
                isBudgetDanger
                  ? 'bg-rose-950 text-rose-400 border border-rose-700/50'
                  : isBudgetWarning
                  ? 'bg-sunset/20 text-sunset border border-sunset/30'
                  : 'bg-midnight-dark text-terracotta border border-sand/15'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p
              className={`text-3xl sm:text-4xl font-serif font-bold tracking-tight font-num ${
                isBudgetDanger
                  ? 'text-rose-400'
                  : isBudgetWarning
                  ? 'text-sunset'
                  : 'text-terracotta'
              }`}
            >
              {formatINR(totalSpentINR)}
            </p>
            <span className="text-xs text-sand/60 mt-1 block font-num">
              {budgetUsedPercent}% of total capital consumed
            </span>
          </div>
        </div>

        {/* REMAINING BALANCE */}
        <div className="glass-card-luxury p-6 sm:p-7 rounded-3xl border border-sand/20 shadow-luxury flex flex-col justify-between">
          <div className="flex items-center justify-between text-sand/60 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-sunset font-mono">
              Available Capital
            </span>
            <div
              className={`p-2.5 rounded-2xl ${
                remainingBalanceINR < 0
                  ? 'bg-rose-950 text-rose-400 border border-rose-700/50'
                  : 'bg-midnight-dark text-emerald-400 border border-sand/15'
              }`}
            >
              {remainingBalanceINR < 0 ? (
                <ArrowDownRight className="w-4 h-4" />
              ) : (
                <ArrowUpRight className="w-4 h-4" />
              )}
            </div>
          </div>
          <div>
            <p
              className={`text-3xl sm:text-4xl font-serif font-bold tracking-tight font-num ${
                remainingBalanceINR < 0 ? 'text-rose-400' : 'text-ivory'
              }`}
            >
              {formatINR(remainingBalanceINR)}
            </p>
            <span className="text-xs text-sand/60 mt-1 block font-sans">
              {remainingBalanceINR < 0
                ? 'Exceeded ceiling by ' + formatINR(Math.abs(remainingBalanceINR))
                : 'Safe reserve for remaining stops'}
            </span>
          </div>
        </div>
      </div>

      {/* PROGRESS BAR & THRESHOLD NOTIFICATIONS */}
      <div className="glass-card-luxury p-6 sm:p-8 rounded-3xl border border-sand/20 shadow-luxury space-y-5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-ivory font-serif text-sm">Budget Consumption Gauge</span>
          <span
            className={`text-sm font-num font-bold ${
              isBudgetDanger
                ? 'text-rose-400'
                : isBudgetWarning
                ? 'text-sunset'
                : 'text-emerald-400'
            }`}
          >
            {budgetUsedPercent}% Utilized
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-midnight-600 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(budgetUsedPercent, 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full rounded-full ${
              isBudgetDanger
                ? 'bg-rose-500'
                : isBudgetWarning
                ? 'bg-sunset'
                : 'bg-gradient-to-r from-terracotta to-sunset'
            }`}
          />
        </div>

        {/* 70% WARNING ALERT BOX */}
        {isBudgetWarning && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-5 rounded-2xl bg-sunset/15 border border-sunset/35 text-sand flex items-start gap-3.5 shadow-md"
          >
            <AlertTriangle className="w-5 h-5 text-sunset shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-serif font-bold text-ivory">
                Warning Threshold Reached: 70%+ of Trip Budget Utilized!
              </h5>
              <p className="text-xs text-sand/80 mt-0.5 leading-relaxed font-sans">
                You have spent {formatINR(totalSpentINR)} ({budgetUsedPercent}%) of your allocated ₹30,000 budget. Monitor remaining leisure, souvenir, and dining expenses.
              </p>
            </div>
          </motion.div>
        )}

        {/* OVER-BUDGET DANGER ALERT BOX */}
        {isBudgetDanger && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 flex items-start gap-3.5 shadow-md"
          >
            <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-serif font-bold text-rose-200">
                Critical Alert: Trip Budget Cap Exceeded!
              </h5>
              <p className="text-xs text-rose-300/80 mt-0.5 leading-relaxed font-sans">
                Total spending has exceeded the ₹30,000 limit by {formatINR(Math.abs(remainingBalanceINR))}. Review and adjust discretionary items below.
              </p>
            </div>
          </motion.div>
        )}

        {/* EXCHANGE RATE INDICATOR */}
        <div className="flex flex-wrap items-center justify-between pt-3 border-t border-sand/15 text-[11px] text-sand/60">
          <span>
            Active Demo Exchange Rates: <strong className="text-ivory font-mono">1 USD = ₹84</strong> · <strong className="text-ivory font-mono">1 EUR = ₹91</strong>
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" /> Dynamic real-time INR conversion
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
