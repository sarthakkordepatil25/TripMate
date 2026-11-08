import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import BudgetOverview from '../components/BudgetOverview';
import ExpenseChart from '../components/ExpenseChart';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
import { Wallet, Sparkles, Hotel, Utensils, Car, Compass, ShoppingBag } from 'lucide-react';
import { formatINR, convertToINR } from '../utils/currency';

export const Budget = () => {
  const { expenses } = useApp();

  const categorySums = useMemo(() => {
    const sums = {
      Hotel: 0,
      Food: 0,
      Transport: 0,
      Activities: 0,
      Souvenirs: 0
    };
    expenses.forEach((e) => {
      const inr = convertToINR(e.amount, e.currency);
      if (sums[e.category] !== undefined) {
        sums[e.category] += inr;
      }
    });
    return sums;
  }, [expenses]);

  const quickCategoryCards = [
    { name: 'Hotel & Stays', amount: categorySums.Hotel, icon: Hotel, color: '#C66B4E' },
    { name: 'Dining & Food', amount: categorySums.Food, icon: Utensils, color: '#E9A45B' },
    { name: 'Transport & Fuel', amount: categorySums.Transport, icon: Car, color: '#314C42' },
    { name: 'Activities & Cruising', amount: categorySums.Activities, icon: Compass, color: '#D97706' },
    { name: 'Souvenirs & Crafts', amount: categorySums.Souvenirs, icon: ShoppingBag, color: '#A63D2F' },
  ];

  return (
    <div id="budget" data-scene="budget" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn pb-24 z-10 relative text-ivory">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-sand/15">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="eyebrow text-sunset">
              Capital Intelligence
            </span>
            <span className="text-xs text-sand/60 font-semibold font-num">Goa Expedition Ledger</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-ivory">
            Travel more. <span className="italic text-sand font-normal">Spend smarter.</span>
          </h1>
          <p className="text-xs sm:text-sm text-sand/80 mt-1">
            Multi-currency tracking, real-time conversion ($1 = ₹84, €1 = ₹91), and predictive budget warnings.
          </p>
        </div>

        {/* Currency rate pills */}
        <div className="flex items-center gap-2.5 glass-card-luxury px-4 py-2.5 rounded-2xl border border-sand/20 shadow-luxury text-xs">
          <span className="font-bold text-sunset font-mono uppercase text-[10px] tracking-wider">Live Rates:</span>
          <span className="px-2.5 py-1 rounded-xl bg-midnight-dark border border-sand/15 font-mono text-[11px] font-bold text-ivory">
            $1 = ₹84
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-midnight-dark border border-sand/15 font-mono text-[11px] font-bold text-ivory">
            €1 = ₹91
          </span>
        </div>
      </div>

      {/* OVERVIEW METRICS & THRESHOLD NOTIFICATIONS */}
      <BudgetOverview />

      {/* QUICK CATEGORY METRICS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {quickCategoryCards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.name}
              className="glass-card-luxury p-4 rounded-2xl border border-sand/15 shadow-card flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase text-sand/70 truncate font-mono">
                  {c.name}
                </span>
                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: c.color }} />
              </div>
              <p className="text-lg font-num font-extrabold text-sunset">
                {formatINR(c.amount)}
              </p>
            </div>
          );
        })}
      </div>

      {/* TWO COLUMNS: EXPENSE ENTRY & RECHARTS BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ADD EXPENSE FORM (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <AddExpenseForm />
        </div>

        {/* RECHARTS CATEGORY BREAKDOWN DONUT (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <ExpenseChart />
        </div>
      </div>

      {/* LEDGER TRANSACTION AUDIT LOG */}
      <ExpensesTable />
    </div>
  );
};

export default Budget;
