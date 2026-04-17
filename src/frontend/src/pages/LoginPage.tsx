import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import { Navigate } from "@tanstack/react-router";
import { AlertCircle, MapPin, Search, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function LoginPage() {
  const { isAuthenticated, isInitializing, loginStatus, login } = useAuth();
  const { actor } = useBackend();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const isRegisteringRef = useRef(false);

  const isLoggingIn = loginStatus === "logging-in";
  const isBusy = isLoggingIn || isRegistering;

  // After login, register user if fields were provided
  useEffect(() => {
    if (isAuthenticated && actor && !isRegisteringRef.current) {
      const storedName = sessionStorage.getItem("_clf_pending_name") ?? "";
      const storedEmail = sessionStorage.getItem("_clf_pending_email") ?? "";
      if (storedName) {
        isRegisteringRef.current = true;
        setIsRegistering(true);
        actor
          .registerUser(storedName, storedEmail)
          .then(() => {
            sessionStorage.removeItem("_clf_pending_name");
            sessionStorage.removeItem("_clf_pending_email");
          })
          .catch(() => {
            // Already registered is fine — silently continue
          })
          .finally(() => {
            isRegisteringRef.current = false;
            setIsRegistering(false);
          });
      }
    }
  }, [isAuthenticated, actor]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" label="Loading Campus Lost & Found..." />
      </div>
    );
  }

  if (isAuthenticated && !isRegistering) {
    return <Navigate to="/" />;
  }

  const handleLogin = () => {
    setError(null);
    if (!name.trim()) {
      setError("Please enter your name before signing in.");
      return;
    }
    sessionStorage.setItem("_clf_pending_name", name.trim());
    sessionStorage.setItem("_clf_pending_email", email.trim());
    try {
      login();
    } catch {
      setError("Login failed. Please try again.");
      sessionStorage.removeItem("_clf_pending_name");
      sessionStorage.removeItem("_clf_pending_email");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-5 py-12 max-w-sm mx-auto w-full">
        {/* Logo + Branding */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="relative mb-5">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-card overflow-hidden">
              <img
                src="/assets/generated/campus-lostfound-logo.dim_200x200.png"
                alt="Campus Lost & Found logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary border-2 border-background flex items-center justify-center">
              <Search
                className="w-2.5 h-2.5 text-secondary-foreground"
                aria-hidden="true"
              />
            </span>
          </div>

          <h1 className="text-2xl font-display font-bold text-foreground leading-tight tracking-tight mb-1">
            Campus Lost &amp; Found
          </h1>
          <p className="text-sm text-muted-foreground font-body max-w-[240px]">
            Reconnect students with their lost belongings
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {[
            { icon: MapPin, label: "Campus-wide" },
            { icon: Search, label: "Smart Matching" },
            { icon: ShieldCheck, label: "Secure" },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-body border border-border"
            >
              <Icon className="w-3 h-3" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>

        {/* Login Card */}
        <div className="w-full card-base border border-border rounded-2xl p-6 shadow-elevated">
          <h2 className="text-base font-display font-semibold text-foreground mb-4">
            Sign in to get started
          </h2>

          {/* Error state */}
          {error && (
            <div
              data-ocid="login.error_state"
              className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-4"
              role="alert"
            >
              <AlertCircle
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="font-body">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            {/* Name field */}
            <div className="space-y-1.5">
              <Label
                htmlFor="clf-name"
                className="text-sm font-body text-foreground"
              >
                Your Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="clf-name"
                data-ocid="login.name_input"
                type="text"
                placeholder="e.g. Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isBusy}
                className="h-11 font-body text-sm"
                autoComplete="name"
              />
            </div>

            {/* Email field */}
            <div className="space-y-1.5">
              <Label
                htmlFor="clf-email"
                className="text-sm font-body text-foreground"
              >
                Email / Student ID{" "}
                <span className="text-muted-foreground text-xs">
                  (optional)
                </span>
              </Label>
              <Input
                id="clf-email"
                data-ocid="login.email_input"
                type="email"
                placeholder="e.g. alex@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isBusy}
                className="h-11 font-body text-sm"
                autoComplete="email"
              />
            </div>

            {/* Login button */}
            <Button
              data-ocid="login.submit_button"
              className="w-full h-12 font-body font-semibold text-sm transition-smooth rounded-xl mt-1"
              onClick={handleLogin}
              disabled={isBusy}
            >
              {isBusy ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  {isRegistering
                    ? "Setting up your profile…"
                    : "Opening Internet Identity…"}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  Sign in with Internet Identity
                </span>
              )}
            </Button>
          </div>

          {/* Separator */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-body">
              secure &amp; private
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Info text */}
          <p className="text-xs text-center text-muted-foreground font-body leading-relaxed">
            All students and staff can use their{" "}
            <span className="text-primary font-medium">Internet Identity</span>{" "}
            to sign in. No password required.
          </p>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-xs text-muted-foreground font-body text-center px-4">
          By signing in you agree to our community guidelines for respectful
          item reporting.
        </p>
      </div>

      <footer className="relative py-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
