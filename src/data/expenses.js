export const DEFAULT_BUDGET = 30000;

export const EXCHANGE_RATES = {
  INR: 1,
  USD: 84,
  EUR: 91
};

export const INITIAL_EXPENSES = [
  {
    id: 'exp-1',
    name: 'Hotel Taj Advance Deposit',
    category: 'Hotel',
    amount: 9000,
    currency: 'INR',
    date: '2026-11-01',
    notes: '2-night beach villa reservation deposit'
  },
  {
    id: 'exp-2',
    name: 'Britto’s & Fisherman’s Wharf Dinners',
    category: 'Food',
    amount: 5450,
    currency: 'INR',
    date: '2026-11-02',
    notes: 'Group dinner seafood thalis and drinks'
  },
  {
    id: 'exp-3',
    name: 'Airport Airport Taxi & Scooter Rentals',
    category: 'Transport',
    amount: 4000,
    currency: 'INR',
    date: '2026-11-02',
    notes: 'Prepaid AC cab from airport + 2 Activa scooters for 3 days'
  },
  {
    id: 'exp-4',
    name: 'Mandovi Sunset Cruise Tickets',
    category: 'Activities',
    amount: 1320,
    currency: 'INR',
    date: '2026-11-03',
    notes: 'Catamaran cruise with Goan cultural show'
  },
  {
    id: 'exp-5',
    name: 'Handcrafted Shell Art & Spices',
    category: 'Souvenirs',
    amount: 20,
    currency: 'USD',
    date: '2026-11-03',
    notes: 'Bought at artisan market using foreign currency card (USD 20 @ ₹84 = ₹1,680)'
  }
];

export const EXPENSE_CATEGORIES = [
  'Hotel',
  'Food',
  'Transport',
  'Activities',
  'Souvenirs',
  'Shopping',
  'Miscellaneous'
];
