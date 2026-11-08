const STORAGE_PREFIX = 'tripmate_';

export const storage = {
  get: (key, defaultValue) => {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn(`Error reading key "${key}" from LocalStorage:`, e);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error writing key "${key}" to LocalStorage:`, e);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (e) {
      console.warn(`Error removing key "${key}" from LocalStorage:`, e);
    }
  },

  clearAll: () => {
    try {
      Object.keys(localStorage).forEach((k) => {
        if (k.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(k);
        }
      });
    } catch (e) {
      console.warn('Error clearing LocalStorage:', e);
    }
  }
};
