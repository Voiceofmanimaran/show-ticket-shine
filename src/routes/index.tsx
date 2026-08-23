import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MapPin, Search, Sparkles, Ticket } from "lucide-react";
import { EVENTS, FILTER_TABS } from "@/lib/events";
import { TicketCard } from "@/components/site/TicketCard";
import { GUARANTEES } from "@/components/site/TrustBadges";
import stickerTicket from "@/assets/sticker-ticket.png";
import stickerPopcorn from "@/assets/sticker-popcorn.png";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ticker Xchanger — Buy, Sell & Exchange Tickets in Seconds" },
      {
        name: "description",
        content:
          "Verified, price-capped event passes. Trade movie, concert, fair and comedy tickets with PassShield protection and FairPass anti-scalping caps.",
      },
      { property: "og:title", content: "Buy, Sell & Exchange Tickets in Seconds" },
      {
        property: "og:description",
        content: "Verified passes, fair prices, instant secure checkout on Ticker Xchanger.",
      },
    ],
  }),
  component: Index,
});

const quickFields = [
  { label: "Location", placeholder: "Chennai", icon: MapPin },
  { label: "Date", placeholder: "This weekend", icon: CalendarDays },
  { label: "Event Type", placeholder: "Movies, concerts…", icon: Ticket },
];

function Index() {
  const [tab, setTab] = useState<string>("All");
  const events = tab === "All" ? EVENTS : EVENTS.filter((e) => e.category === tab);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ background: "var(--gradient-velvet)" }}
        />
        <img
          src={stickerTicket}
          alt=""
          aria-hidden
          width={512}
          height={512}
          className="animate-float-slow pointer-events-none absolute left-[4%] top-24 hidden w-28 opacity-90 md:block"
          style={{ ["--tilt" as string]: "-8deg" }}
        />
        <img
          src={stickerPopcorn}
          alt=""
          aria-hidden
          width={512}
          height={512}
          className="animate-float-fast pointer-events-none absolute right-[6%] top-16 hidden w-24 opacity-90 md:block"
          style={{ ["--tilt" as string]: "6deg" }}
        />
        <img
          src={stickerTicket}
          alt=""
          aria-hidden
          width={512}
          height={512}
          className="animate-float-fast pointer-events-none absolute bottom-10 right-[16%] hidden w-20 opacity-70 lg:block"
          style={{ ["--tilt" as string]: "12deg" }}
        />

        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            <Sparkles className="size-3.5" aria-hidden /> Real Fans, Fair Prices
          </span>
          <h1 className="mt-5 text-5xl leading-[0.95] sm:text-7xl">
            Buy, Sell &amp; Exchange
            <br />
            <span className="text-primary">Tickets in Seconds</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Every pass is scan-tested and price-capped. No scalpers, no plot twists — just verified
            seats for the shows you actually want to see.
          </p>

          <div className="stub stub-notch-y mx-auto mt-8 grid max-w-3xl gap-3 rounded-2xl border border-border p-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
            {quickFields.map((f) => (
              <label key={f.label} className="glow-focus flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-left transition-shadow">
                <f.icon className="size-4 text-primary" aria-hidden />
                <span className="sr-only">{f.label}</span>
                <input
                  placeholder={`${f.label} · ${f.placeholder}`}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </label>
            ))}
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-velvet"
            >
              <Search className="size-4" aria-hidden />
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl">Featured Passes</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fresh drops from official box offices and verified fans.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTER_TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  tab === t
                    ? "border-velvet bg-velvet text-velvet-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-accent",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <TicketCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl">The Golden Rule of Resale</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Never pay double for a sold-out show. Sellers are restricted to fair caps, keeping
              tickets in the hands of fans who actually want to go. Every pass on Ticker Xchanger is
              price-capped to keep experiences accessible — no artificial markups, no hidden
              extortion.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {GUARANTEES.map((g) => (
              <li key={g.title} className="rounded-xl border border-border bg-background p-4">
                <p className="text-sm font-semibold">
                  <span className="mr-1.5">{g.icon}</span>
                  {g.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{g.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-4 py-10 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ticker Xchanger · FairPass Certified marketplace
      </footer>
    </main>
  );
}
