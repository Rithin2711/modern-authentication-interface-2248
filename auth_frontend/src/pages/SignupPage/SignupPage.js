import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../components/AuthCard/AuthCard";
import SignupForm from "../../components/SignupForm/SignupForm";
import "../authPages.css";

/**
 * /signup page.
 */

// PUBLIC_INTERFACE
export default function SignupPage() {
  /** Renders signup page UI and provides submit handler. */
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(payload) {
    // Frontend-only scaffold: in real integration, call backend here.
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      // eslint-disable-next-line no-console
      console.log("Signup payload", payload);
      navigate("/login");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="authPage">
      <div className="authPage__bg" aria-hidden="true" />
      <div className="authPage__content">
        <AuthCard
          title="Create your account"
          subtitle="A clean, minimal signup experience."
          footer={
            <span>
              Already have an account? <Link to="/login">Sign in</Link>
            </span>
          }
        >
          <SignupForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </AuthCard>
      </div>
    </main>
  );
}
