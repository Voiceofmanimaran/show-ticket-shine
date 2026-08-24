import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { LogOut, MapPin, Plus, Search, Flame, Zap } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CITIES, FILTER_TABS } from "@/lib/events";
import { useFilters } from "@/lib/filters";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

// Compact set for the header search bar — all six categories live in the homepage filter pills.
const HEADER_CATEGORIES = ["Movies", "Concerts", "Local Passes", "Theater"];

const DEALS = [
  { icon: Flame, text: "Amber Lights Live — 4 passes left at face value" },
  { icon: Zap, text: "Neon Noir midnight premiere — ₹30 below box office" },
  { icon: Flame, text: "Harbour Street Fair — 12 passes just dropped" },
  { icon: Zap, text: "The Late Set — verified seller price capped at ₹690" },
  { icon: Flame, text: "Monsoon Sessions — early-bird tier closing tonight" },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-4" aria-hidden>
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

function initialsFor(name: string | undefined, email: string | undefined) {
  const base = (name || email || "TX").trim();
  return base
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function AuthArea() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  if (loading) {
    return <div className="size-9 animate-pulse rounded-full bg-secondary" aria-hidden />;
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={() =>
          signInWithGoogle().catch((e: Error) =>
            toast.error(`Google sign-in failed: ${e.message}`),
          )
        }
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
      >
        <GoogleIcon />
        <span className="hidden sm:inline">Sign in with Google</span>
        <span className="sm:hidden">Sign in</span>
      </button>
    );
  }

  const name = user.user_metadata?.["full_name"] as string | undefined;
  const avatarUrl = user.user_metadata?.["avatar_url"] as string | undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label="Account menu" className="rounded-full">
          <Avatar className="size-9 border border-border transition-shadow hover:ring-2 hover:ring-accent">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={name ?? user.email ?? "Account"} />}
            <AvatarFallback className="bg-secondary text-xs font-semibold">
              {initialsFor(name, user.email)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-semibold">{name ?? "Signed in"}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() =>
            signOut()
              .then(() => toast.success("Signed out. See you at the next show!"))
              .catch((e: Error) => toast.error(`Sign-out failed: ${e.message}`))
          }
        >
          <LogOut className="size-4" aria-hidden />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header({ onListTicket }: { onListTicket?: () => void }) {
  const { query, setQuery, category, setCategory, city, setCity } = useFilters();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pickCategory = (c: string) => {
    setCategory(c);
    if (pathname !== "/") void navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-lg bg-velvet text-velvet-foreground text-display text-lg">
              TX
            </span>
            <span className="text-display text-2xl leading-none">
              Ticker <span className="text-primary">Xchanger</span>
            </span>
          </Link>

          <div className="order-3 w-full flex-1 md:order-none md:w-auto">
            <div className="glow-focus flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 transition-shadow">
              <Search className="size-4 text-muted-foreground" aria-hidden />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events, venues or artists"
                aria-label="Search events"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <div className="hidden flex-wrap items-center gap-1 lg:flex">
                {HEADER_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => pickCategory(c)}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                      category === c
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-secondary",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger
                aria-label="Select city"
                className="h-9 w-auto gap-1.5 rounded-lg border-border bg-background px-2.5 text-sm font-medium"
              >
                <MapPin className="size-4 text-primary" aria-hidden />
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Link
              to="/tickets"
              className="hidden text-sm font-semibold text-muted-foreground transition-colors hover:text-primary sm:inline"
            >
              Live Passes
            </Link>
            <button
              type="button"
              onClick={onListTicket}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-velvet"
            >
              <Plus className="size-4" aria-hidden />
              Add a Ticket
            </button>
            <AuthArea />
          </div>
        </div>
      </div>

      <div
        className="overflow-hidden border-b border-border py-1.5"
        style={{ background: "var(--gradient-marquee)" }}
      >
        <div className="flex w-max animate-[marquee_32s_linear_infinite] gap-10 pr-10">
          {[...DEALS, ...DEALS].map((deal, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap text-xs font-medium text-velvet-foreground"
            >
              <deal.icon className="size-3.5 text-accent" aria-hidden />
              {deal.text}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
