import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EXPENSE_CATEGORIES } from '../data/expenses';
import { formatINR, convertToINR } from '../utils/currency';
import { PlusCircle, Sparkles, Tag, DollarSign, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

export const AddExpenseForm = () => {
  const { addExpense } = useApp();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [currency, setCurrency] = useState('INR');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  const convertedValue = amount && !isNaN(amount) ? convertToINR(Number(amount), currency) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Please provide an expense title.';
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    addExpense({
      name: name.trim(),
      amount: Number(amount),
      category,
      currency,
      notes: notes.trim()
    });

    setName('');
    setAmount('');
    setNotes('');
  };

  return (
    <div className="glass-card-luxury rounded-3xl border border-sand/20 shadow-luxury p-6 sm:p-7 text-ivory">
      <div className="flex items-center gap-2.5 pb-4 border-b border-sand/15 mb-5">
        <div className="p-2.5 rounded-2xl bg-midnight-dark text-sunset border border-sand/15">
          <PlusCircle className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-sunset font-mono">
            Transaction Entry
          </span>
          <h3 className="text-xl font-serif font-bold text-ivory">
            Log New Expense
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Name input */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-sunset mb-1.5 font-mono">
            Expense Description <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: null });
            }}
            placeholder="e.g. Scuba diving pass, Britto's dinner, Catamaran charter..."
            className={`w-full px-4 py-2.5 rounded-2xl border text-xs focus:ring-2 focus:ring-terracotta focus:outline-none transition-all bg-midnight-dark/80 text-ivory ${
              errors.name ? 'border-rose-400 bg-rose-950/20' : 'border-sand/15'
            }`}
          />
          {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
        </div>

        {/* Amount & Currency Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-sunset mb-1.5 font-mono">
              Amount <span className="text-rose-400">*</span>
            </label>
            <input
              type="number"
              step="any"
              min="1"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errors.amount) setErrors({ ...errors, amount: null });
              }}
              placeholder="0.00"
              className={`w-full px-4 py-2.5 rounded-2xl border text-xs focus:ring-2 focus:ring-terracotta focus:outline-none transition-all bg-midnight-dark/80 text-ivory font-num ${
                errors.amount ? 'border-rose-400 bg-rose-950/20' : 'border-sand/15'
              }`}
            />
            {errors.amount && <p className="text-[11px] text-rose-400 mt-1">{errors.amount}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-sunset mb-1.5 font-mono">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-sand/15 text-xs focus:ring-2 focus:ring-terracotta focus:outline-none bg-midnight-dark/80 text-ivory font-mono font-bold"
            >
              <option value="INR" className="bg-midnight text-ivory">INR (₹) - Indian Rupee</option>
              <option value="USD" className="bg-midnight text-ivory">USD ($) - US Dollar (Rate ₹84)</option>
              <option value="EUR" className="bg-midnight text-ivory">EUR (€) - Euro (Rate ₹91)</option>
            </select>
          </div>
        </div>

        {/* Dynamic INR Preview if foreign */}
        {currency !== 'INR' && amount && !isNaN(amount) && (
          <div className="p-3 bg-midnight-dark/80 border border-sand/15 rounded-2xl flex items-center justify-between text-xs font-num">
            <span className="text-sand/60">Converted Amount:</span>
            <span className="font-extrabold text-sunset">{formatINR(convertedValue)}</span>
          </div>
        )}

        {/* Category */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-sunset mb-1.5 font-mono">
            Expense Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border border-sand/15 text-xs focus:ring-2 focus:ring-terracotta focus:outline-none bg-midnight-dark/80 text-ivory font-medium"
          >
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-midnight text-ivory">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Optional Notes */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-sand/60 mb-1.5 font-mono">
            Notes / Vendor Details (Optional)
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Paid via split UPI, split with Sarah"
            className="w-full px-4 py-2.5 rounded-2xl border border-sand/15 text-xs focus:ring-2 focus:ring-terracotta focus:outline-none bg-midnight-dark/80 text-ivory placeholder:text-sand/30"
          />
        </div>

        <button
          type="submit"
          className="w-full btn-luxury-primary text-xs py-3 rounded-2xl font-bold mt-2 shadow-glow"
        >
          <PlusCircle className="w-4 h-4 text-ivory" />
          <span>Record Transaction</span>
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
