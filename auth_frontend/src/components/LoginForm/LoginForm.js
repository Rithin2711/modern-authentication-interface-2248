import React, { useMemo, useState } from "react";
import "./LoginForm.css";
import { isValidEmail, validateRequired } from "../../utils/validation";

/**
 * Login form with minimal client-side validation.
 */

// PUBLIC_INTERFACE
export default function LoginForm({ onSubmit, isSubmitting = false }) {
  /** LoginForm collects email and password and calls onSubmit({email,password}) when valid. */
  const [values, setValues] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [formError, setFormError] = useState("");

  const errors = useMemo(() => {
    const next = { email: "", password: "" };

    next.email = validateRequired(values.email, "Email");
    if (!next.email && !isValidEmail(values.email)) {
      next.email = "Please enter a valid email address.";
    }

    next.password = validateRequired(values.password, "Password");
    return next;
  }, [values.email, values.password]);

  const canSubmit = !errors.email && !errors.password && !isSubmitting;

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setFormError("");
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setFormError("");

    if (errors.email || errors.password) return;

    try {
      await onSubmit?.({ email: values.email.trim(), password: values.password });
    } catch (err) {
      setFormError(err?.message || "Login failed. Please try again.");
    }
  }

  return (
    <form className="authForm" onSubmit={handleSubmit} noValidate>
      <div className="authForm__field">
        <label className="authForm__label" htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="authForm__input"
          aria-invalid={Boolean(touched.email && errors.email)}
          aria-describedby={touched.email && errors.email ? "login-email-error" : undefined}
          placeholder="you@company.com"
        />
        {touched.email && errors.email ? (
          <p id="login-email-error" className="authForm__error" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="authForm__field">
        <label className="authForm__label" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className="authForm__input"
          aria-invalid={Boolean(touched.password && errors.password)}
          aria-describedby={touched.password && errors.password ? "login-password-error" : undefined}
          placeholder="••••••••"
        />
        {touched.password && errors.password ? (
          <p id="login-password-error" className="authForm__error" role="alert">
            {errors.password}
          </p>
        ) : null}
      </div>

      {formError ? (
        <div className="authForm__formError" role="alert">
          {formError}
        </div>
      ) : null}

      <button className="btnPrimary" type="submit" disabled={!canSubmit}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
