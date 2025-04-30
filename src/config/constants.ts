
// API Keys and Configuration
export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

// App Configuration
export const APP_NAME = 'Virtual Business Formula Process';
export const APP_DESCRIPTION = 'We make sure you know you\'re the right market, for the right brand';

// Feature Flags
export const FEATURES = {
  EXPORT_PDF: true,
  EMAIL_RESULTS: true,
};

// Colors
export const COLORS = {
  PRIMARY: '#cf242a',  // LCM Red
  SECONDARY: '#333333', // LCM Dark Grey
  TEXT: '#222222',
  BACKGROUND: '#f9f9f9',
  ACCENT: '#e8e8e8',
}
