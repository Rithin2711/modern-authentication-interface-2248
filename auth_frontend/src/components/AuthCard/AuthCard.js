import React from "react";
import "./AuthCard.css";

/**
 * Reusable card layout for authentication pages.
 */

// PUBLIC_INTERFACE
export default function AuthCard({ title, subtitle, children, footer }) {
  /** AuthCard renders a centered, elevated card container with header/body/footer regions. */
  return (
    <section className="authCard" aria-label={title}>
      <header className="authCard__header">
        <h1 className="authCard__title">{title}</h1>
        {subtitle ? <p className="authCard__subtitle">{subtitle}</p> : null}
      </header>

      <div className="authCard__body">{children}</div>

      {footer ? <footer className="authCard__footer">{footer}</footer> : null}
    </section>
  );
}
