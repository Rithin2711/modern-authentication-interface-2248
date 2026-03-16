/**
 * Lightweight client-side validation helpers for auth forms.
 */

// PUBLIC_INTERFACE
export function isValidEmail(email) {
  /** Returns true if the input resembles a valid email address. */
  if (typeof email !== 'string') return false;
  // Simple but practical email check for client-side validation.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// PUBLIC_INTERFACE
export function validatePassword(password, { minLength = 8 } = {}) {
  /** Returns an object describing password validity and a human friendly message. */
  const value = typeof password === 'string' ? password : '';
  if (value.length < minLength) {
    return { ok: false, message: `Password must be at least ${minLength} characters.` };
  }
  return { ok: true, message: '' };
}

// PUBLIC_INTERFACE
export function validateRequired(value, label) {
  /** Returns an error message string if required field is missing; otherwise empty string. */
  if (typeof value !== 'string' || value.trim().length === 0) {
    return `${label} is required.`;
  }
  return '';
}
