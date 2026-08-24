import { useState } from "react";
import { LogIn, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";

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

export function AuthModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { signInWithGoogle } = useAuth();
  const [signingIn, setSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setSigningIn(true);
      await signInWithGoogle();
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : "Authentication error";
      toast.error(`Google sign-in failed: ${err}`);
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-card p-0">
        <div className="rounded-t-lg px-6 py-6" style={{ background: "var(--gradient-velvet)" }}>
          <DialogHeader>
            <DialogTitle className="text-display text-3xl text-velvet-foreground">
              Sign In to Ticker Xchanger
            </DialogTitle>
          </DialogHeader>
          <p className="mt-2 text-xs text-velvet-foreground/80">
            Sign in with Google to list tickets, manage active passes, and complete purchases securely.
          </p>
        </div>

        <div className="space-y-6 px-6 py-6">
          <ul className="space-y-2.5 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 shrink-0 text-accent" aria-hidden />
              <span>PassShield™ protection for all verified seller accounts</span>
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="size-4 shrink-0 text-primary" aria-hidden />
              <span>Instant payouts released within 24 hours of gate scan</span>
            </li>
            <li className="flex items-center gap-2">
              <LogIn className="size-4 shrink-0 text-accent" aria-hidden />
              <span>Single Sign-On with your existing Google account</span>
            </li>
          </ul>

          <button
            type="button"
            disabled={signingIn}
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background py-3 font-semibold transition-all hover:bg-secondary hover:shadow-md disabled:opacity-60 text-sm"
          >
            <GoogleIcon />
            <span>{signingIn ? "Connecting to Google…" : "Continue with Google"}</span>
          </button>

          <div className="flex items-center justify-center gap-4 text-xs font-semibold">
            <a
              href="/signin"
              onClick={() => onOpenChange(false)}
              className="text-primary hover:underline"
            >
              Email Sign In
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="/signup"
              onClick={() => onOpenChange(false)}
              className="text-primary hover:underline"
            >
              Create Account
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
