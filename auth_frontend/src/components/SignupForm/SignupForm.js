import React, { useMemo, useState } from "react";
import "../LoginForm/LoginForm.css";
import { isValidEmail, validatePassword, validateRequired } from "../../utils/validation";

/**
 * Signup form with client-side validation.
 */

// PUBLIC_INTERFACE
export default function SignupForm({ onSubmit, isSubmitting = false }) {
  /** SignupForm collects name, email, password, confirmPassword and calls onSubmit(payload) when valid. */
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [formError, setFormError] = useState("");

  const errors = useMemo(() => {
    const next = { name: "", email: "", password: "", confirmPassword: "" };

    next.name = validateRequired(values.name, "Name");

    next.email = validateRequired(values.email, "Email");
    if (!next.email && !isValidEmail(values.email)) {
      next.email = "Please enter a valid email address.";
    }

    const pwdRequired = validateRequired(values.password, "Password");
    if (pwdRequired) {
      next.password = pwdRequired;
    } else {
      const pwd = validatePassword(values.password, { minLength: 8 });
      next.password = pwd.ok ? "" : pwd.message;
    }

    const cpRequired = validateRequired(values.confirmPassword, "Confirm password");
    if (cpRequired) {
      next.confirmPassword = cpRequired;
    } else if (values.confirmPassword !== values.password) {
      next.confirmPassword = "Passwords do not match.";
    }

    return next;
  }, [values]);

  const canSubmit =
    !errors.name && !errors.email && !errors.password && !errors.confirmPassword && !isSubmitting;

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
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    setFormError("");

    if (errors.name || errors.email || errors.password || errors.confirmPassword) return;

    try {
      await onSubmit?.({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });
    } catch (err) {
      setFormError(err?.message || "Signup failed. Please try again.");
    }
  }

  return (
    <form className="authForm" onSubmit={handleSubmit} noValidate>
      <div className="authForm__field">
        <label className="authForm__label" htmlFor="signup-name">
          Name
        </label>
        <input
          id="signup-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className="authForm__input"
          aria-invalid={Boolean(touched.name && errors.name)}
          aria-describedby={touched.name && errors.name ? "signup-name-error" : undefined}
          placeholder="Your name"
        />
        {touched.name && errors.name ? (
          <p id="signup-name-error" className="authForm__error" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="authForm__field">
        <label className="authForm__label" htmlFor="signup-email">
          Email
        </label>
        <input
          id="signup-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="authForm__input"
          aria-invalid={Boolean(touched.email && errors.email)}
          aria-describedby={touched.email && errors.email ? "signup-email-error" : undefined}
          placeholder="you@company.com"
        />
        {touched.email && errors.email ? (
          <p id="signup-email-error" className="authForm__error" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="authForm__field">
        <label className="authForm__label" htmlFor="signup-password">
          Password
        </label>
        <input
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className="authForm__input"
          aria-invalid={Boolean(touched.password && errors.password)}
          aria-describedby={touched.password && errors.password ? "signup-password-error" : undefined}
          placeholder="At least 8 characters"
        />
        {touched.password && errors.password ? (
          <p id="signup-password-error" className="authForm__error" role="alert">
            {errors.password}
          </p>
        ) : null}
      </div>

      <div className="authForm__field">
        <label className="authForm__label" htmlFor="signup-confirmPassword">
          Confirm password
        </label>
        <input
          id="signup-confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className="authForm__input"
          aria-invalid={Boolean(touched.confirmPassword && errors.confirmPassword)}
          aria-describedby={
            touched.confirmPassword && errors.confirmPassword ? "signup-confirmPassword-error" : undefined
          }
          placeholder="Repeat password"
        />
        {touched.confirmPassword && errors.confirmPassword ? (
          <p id="signup-confirmPassword-error" className="authForm__error" role="alert">
            {errors.confirmPassword}
          </p>
        ) : null}
      </div>

      {formError ? (
        <div className="authForm__formError" role="alert">
          {formError}
        </div>
      ) : null}

      <button className="btnPrimary" type="submit" disabled={!canSubmit}>
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
