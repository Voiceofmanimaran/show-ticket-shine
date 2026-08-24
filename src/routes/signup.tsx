import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, ShieldCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — Ticker Xchanger" },
      { name: "description", content: "Create your Ticker Xchanger account." },
    ],
  }),
  component: SignUpPage,
});

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        // Do NOT auto-login. Redirect to Sign In page with email pre-filled and registered banner flag!
        toast.success("Account created successfully!");
        void navigate({
          to: "/signin",
          search: { email, registered: "true" },
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred during sign up.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      if (error) setErrorMessage(error.message);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google sign-in error.";
      setErrorMessage(msg);
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center justify-center px-4 py-12">
      <div className="stub stub-notch-y w-full space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="text-center">
          <span className="inline-grid size-12 place-items-center rounded-xl bg-velvet text-velvet-foreground text-display text-xl mb-3">
            TX
          </span>
          <h1 className="text-display text-3xl">Create Account</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Sign up to start buying, selling, and exchanging verified show passes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-background py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          <GoogleIcon />
          <span>Sign up with Google</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <span className="relative bg-card px-3 text-xs uppercase text-muted-foreground">
            Or with email
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-muted-foreground">Email Address</span>
            <input
              required
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glow-focus w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-shadow placeholder:text-muted-foreground"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-muted-foreground">Password</span>
            <input
              required
              type="password"
              minLength={6}
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glow-focus w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-shadow placeholder:text-muted-foreground"
            />
          </label>

          {errorMessage && (
            <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-xs font-medium text-primary">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-velvet disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <UserPlus className="size-4" aria-hidden />
            )}
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <div className="border-t border-border pt-4 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/signin" className="font-semibold text-primary hover:underline">
            Sign In
          </Link>
        </div>

        <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <ShieldCheck className="size-3.5 text-accent" aria-hidden /> PassShield™ Encrypted Auth
        </p>
      </div>
    </main>
  );
}
