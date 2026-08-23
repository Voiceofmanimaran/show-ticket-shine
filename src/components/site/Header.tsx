import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Plus, Flame, Zap } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Movies", "Concerts", "Local Passes", "Theater"] as const;

const DEALS = [
  { icon: Flame, text: "Amber Lights Live — 4 passes left at face value" },
  { icon: Zap, text: "Neon Noir midnight premiere — ₹30 below box office" },
  { icon: Flame, text: "Harbour Street Fair — 12 passes just dropped" },
  { icon: Zap, text: "The Late Set — verified seller price capped at ₹690" },
  { icon: Flame, text: "Monsoon Sessions — early-bird tier closing tonight" },
];

export function Header({ onListTicket }: { onListTicket?: () => void }) {
  const [category, setCategory] = useState<string>("Movies");
  const [query, setQuery] = useState("");

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
              <div className="hidden items-center gap-1 sm:flex">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
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
            <Avatar className="size-9 border border-border">
              <AvatarFallback className="bg-secondary text-xs font-semibold">MM</AvatarFallback>
            </Avatar>
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
