import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../components/AuthCard/AuthCard";
import LoginForm from "../../components/LoginForm/LoginForm";
import "../authPages.css";

/**
 * /login page.
 */

// PUBLIC_INTERFACE
export default function LoginPage() {
  /** Renders login page UI and provides submit handler. */
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(payload) {
    // Frontend-only scaffold: in real integration, call backend here.
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      // Demonstrate navigation after "success"
      navigate("/login", { replace: true });
      // eslint-disable-next-line no-console
      console.log("Login payload", payload);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="authPage">
      <div className="authPage__bg" aria-hidden="true" />
      <div className="authPage__content">
        <AuthCard
          title="Welcome back"
          subtitle="Sign in to continue."
          footer={
            <span>
              Don&apos;t have an account? <Link to="/signup">Create one</Link>
            </span>
          }
        >
          <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </AuthCard>
      </div>
    </main>
  );
}
