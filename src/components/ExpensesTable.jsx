import React from 'react';
import { useApp } from '../context/AppContext';
import { formatINR, convertToINR, formatCurrency } from '../utils/currency';
import { Trash2, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';

export const ExpensesTable = () => {
  const { expenses, deleteExpense } = useApp();

  if (!expenses.length) {
    return (
      <div className="glass-card-luxury rounded-3xl border border-sand/20 shadow-luxury p-10 text-center text-ivory">
        <div className="w-14 h-14 rounded-full bg-midnight-dark text-sand/40 flex items-center justify-center mx-auto mb-3">
          <Receipt className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-serif font-bold text-ivory">No Expenses Recorded</h4>
        <p className="text-xs text-sand/60 mt-1">
          Use the form above to record hotel, dining, transit, or activities.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card-luxury rounded-3xl border border-sand/20 shadow-luxury overflow-hidden text-ivory">
      <div className="px-6 py-4.5 border-b border-sand/15 bg-midnight-dark/80 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-sunset font-mono">
            Audit Trail
          </span>
          <h3 className="text-base font-serif font-bold text-ivory">
            Recent Ledger Transactions
          </h3>
        </div>
        <span className="text-xs text-sand/60 font-num">
          {expenses.length} transaction{expenses.length > 1 ? 's' : ''} stored locally
        </span>
      </div>

      <div className="divide-y divide-sand/10 overflow-x-auto">
        {expenses.map((exp) => {
          const isForeign = exp.currency && exp.currency !== 'INR';
          const inrVal = convertToINR(exp.amount, exp.currency);

          return (
            <motion.div
              key={exp.id}
              layout
              className="p-4 sm:p-5 hover:bg-white/5 transition-colors flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-serif font-bold text-ivory text-sm truncate">
                    {exp.name}
                  </h4>
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-midnight-600 text-sand border border-sand/15 font-mono">
                    {exp.category}
                  </span>
                  {isForeign && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sunset/20 text-sunset border border-sunset/30 font-num">
                      Foreign: {exp.currency}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-sand/60 mt-1 font-num">
                  <span>{exp.date || 'Today'}</span>
                  {exp.notes && (
                    <>
                      <span>•</span>
                      <span className="text-sand/50 italic truncate max-w-sm">{exp.notes}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Amount Display */}
              <div className="text-right shrink-0">
                <p className="text-base font-num font-extrabold text-ivory">
                  {formatINR(inrVal)}
                </p>
                {isForeign && (
                  <p className="text-[10px] text-sunset font-num font-medium">
                    Orig: {formatCurrency(exp.amount, exp.currency)}
                  </p>
                )}
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteExpense(exp.id)}
                className="p-2 text-sand/40 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors shrink-0"
                title="Remove this expense"
                aria-label={`Delete ${exp.name}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpensesTable;
