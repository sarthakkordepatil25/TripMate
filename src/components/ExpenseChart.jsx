import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { convertToINR, formatINR } from '../utils/currency';

const CATEGORY_COLORS = {
  Hotel: '#C66B4E',
  Food: '#E9A45B',
  Transport: '#314C42',
  Activities: '#D97706',
  Souvenirs: '#A63D2F',
  Shopping: '#8C3F26',
  Miscellaneous: '#687773'
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-midnight-dark text-ivory p-3.5 rounded-2xl border border-sand/20 shadow-luxury text-xs">
        <div className="flex items-center gap-2 font-bold font-serif">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: data.payload.color }}
          />
          <span>{data.name}</span>
        </div>
        <p className="text-sm font-num font-extrabold text-sunset mt-1">
          {formatINR(data.value)}
        </p>
        <p className="text-[10px] text-sand/60 font-num">
          {data.payload.percentage}% of overall expenses
        </p>
      </div>
    );
  }
  return null;
};

export const ExpenseChart = () => {
  const { expenses, totalSpentINR } = useApp();

  const chartData = useMemo(() => {
    const categoryTotals = {};

    expenses.forEach((exp) => {
      const cat = exp.category || 'Miscellaneous';
      const inr = convertToINR(exp.amount, exp.currency);
      categoryTotals[cat] = (categoryTotals[cat] || 0) + inr;
    });

    return Object.keys(categoryTotals).map((cat) => {
      const val = Math.round(categoryTotals[cat]);
      const pct = totalSpentINR > 0 ? Math.round((val / totalSpentINR) * 100) : 0;
      return {
        name: cat,
        value: val,
        percentage: pct,
        color: CATEGORY_COLORS[cat] || '#687773'
      };
    });
  }, [expenses, totalSpentINR]);

  if (!expenses.length) {
    return (
      <div className="glass-card-luxury rounded-3xl border border-sand/20 shadow-luxury p-6 flex flex-col items-center justify-center min-h-[320px] text-sand/50 text-xs">
        No recorded expenses yet.
      </div>
    );
  }

  return (
    <div className="glass-card-luxury rounded-3xl border border-sand/20 shadow-luxury p-6 sm:p-7 flex flex-col text-ivory">
      <div className="flex items-center justify-between pb-3 border-b border-sand/15 mb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-sunset font-mono">
            Portfolio Allocation
          </span>
          <h3 className="text-xl font-serif font-bold text-ivory mt-1">
            Spending by Category
          </h3>
        </div>
        <span className="text-xs font-num font-extrabold text-sunset">
          {formatINR(totalSpentINR)} Total
        </span>
      </div>

      {/* RECHARTS RESPONSIVE DONUT */}
      <div className="h-64 sm:h-72 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#101B2D" strokeWidth={3} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label inside donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sand/60 font-mono">Total Spent</span>
          <span className="text-base font-num font-extrabold text-ivory">
            {formatINR(totalSpentINR)}
          </span>
        </div>
      </div>

      {/* CATEGORY METRIC PILLS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-2 pt-4 border-t border-sand/15 font-num">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2 p-2 rounded-xl bg-midnight-dark/80 border border-sand/10 text-xs">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-sand/70 truncate font-sans">{item.name}</span>
            <strong className="text-ivory ml-auto font-bold">{item.percentage}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseChart;
