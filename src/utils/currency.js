import { EXCHANGE_RATES } from '../data/expenses';

/**
 * Format an amount in INR with Indian comma separators
 * @param {number} amount
 * @returns {string} e.g. "₹18,500"
 */
export const formatINR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  const rounded = Math.round(amount);
  return '₹' + rounded.toLocaleString('en-IN');
};

/**
 * Format any currency according to standard notation
 * @param {number} amount
 * @param {string} currencyCode ('INR', 'USD', 'EUR')
 * @returns {string}
 */
export const formatCurrency = (amount, currencyCode = 'INR') => {
  if (amount === undefined || amount === null || isNaN(amount)) return '0';
  if (currencyCode === 'INR') {
    return formatINR(amount);
  } else if (currencyCode === 'USD') {
    return `$${amount.toLocaleString('en-US')}`;
  } else if (currencyCode === 'EUR') {
    return `€${amount.toLocaleString('de-DE')}`;
  }
  return `${amount} ${currencyCode}`;
};

/**
 * Convert any amount in given currency to INR
 * @param {number} amount
 * @param {string} currency ('INR', 'USD', 'EUR')
 * @returns {number}
 */
export const convertToINR = (amount, currency = 'INR') => {
  const rate = EXCHANGE_RATES[currency] || 1;
  return Number(amount) * rate;
};
