import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  BadgeCheck,
  CalendarDays,
  MapPin,
  QrCode,
  ShieldCheck,
  Star,
  Ticket,
} from "lucide-react";
import { toast } from "sonner";
import { currency, EVENTS, getEvent } from "@/lib/events";
import { FairPassBadge, PassShieldBadge } from "@/components/site/TrustBadges";

export const Route = createFileRoute("/ticket/$eventId")({
  loader: ({ params }) => {
    const event = getEvent(params.eventId);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Pass unavailable — Ticker Xchanger" }, { name: "robots", content: "noindex" }],
      };
    }
    const { event } = loaderData;
    const title = `${event.title} — Verified Pass | Ticker Xchanger`;
    const description = `${event.venue}, ${event.city} on ${event.date}. FairPass capped at ${currency(event.price)} with PassShield refund protection.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: TicketDetail,
});

function Confetti() {
  const pieces = Array.from({ length: 40 });
  const colors = ["bg-primary", "bg-accent", "bg-velvet"];
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((_, i) => (
        <span
          key={i}
          className={`animate-confetti absolute top-0 size-2 rounded-[2px] ${colors[i % 3]}`}
          style={{
            left: `${(i * 2.5) % 100}%`,
            animationDelay: `${(i % 10) * 0.09}s`,
          }}
        />
      ))}
    </div>
  );
}

function TicketDetail() {
  const { event } = Route.useLoaderData();
  const [coupon, setCoupon] = useState("");
  const [booked, setBooked] = useState(false);

  const fees = Math.round(event.price * 0.05);
  const discount = coupon.trim().toUpperCase() === "FRONTROW" ? 100 : 0;
  const total = event.price + fees - discount;

  const related = EVENTS.filter((e) => e.id !== event.id).slice(0, 0);
  void related;

  const checkout = () => {
    setBooked(true);
    // Ticket-stamp "sound effect" simulation
    toast.success("🎟️ Stamped! Your pass is confirmed.", {
      description: "Check your email for the scannable QR pass.",
    });
    setTimeout(() => setBooked(false), 4000);
  };

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.4fr_1fr]">
      {booked && <Confetti />}

      <div className="space-y-6">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <img
            src={event.poster}
            alt={`${event.title} poster`}
            width={768}
            height={1024}
            className="h-64 w-full object-cover"
          />
          <div className="space-y-4 p-6">
            <span className="rounded-full bg-velvet px-2.5 py-1 text-[11px] font-semibold text-velvet-foreground">
              {event.source}
            </span>
            <h1 className="text-4xl leading-tight">{event.title}</h1>
            <div className="flex flex-wrap gap-2">
              <PassShieldBadge />
              <FairPassBadge />
            </div>
            <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <p className="flex items-center gap-1.5">
                <MapPin className="size-4" aria-hidden /> {event.venue}, {event.city}
              </p>
              <p className="flex items-center gap-1.5">
                <CalendarDays className="size-4" aria-hidden /> {event.date} · {event.time}
              </p>
              <p className="flex items-center gap-1.5">
                <Ticket className="size-4" aria-hidden /> {event.seatsRemaining} seats remaining
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid h-56 place-items-center bg-secondary text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="size-4" aria-hidden /> Venue map — {event.venue}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-2">
              <span className="grid size-10 place-items-center rounded-full bg-velvet text-velvet-foreground text-display">
                {event.sellerName.slice(0, 1)}
              </span>
              <div>
                <p className="text-sm font-semibold">{event.sellerName}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="size-3.5 fill-accent text-accent" aria-hidden />
                  {event.sellerRating.toFixed(1)} seller rating
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              <BadgeCheck className="size-4" aria-hidden /> Golden Stub Verified
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/40 bg-card p-6">
          <h2 className="text-2xl">Real Fans, Fair Prices</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Every pass on Ticker Xchanger is price-capped to keep experiences accessible. No
            artificial markups, no hidden extortion. If your pass fails at the gate, PassShield™
            refunds you in full — on the spot.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-secondary px-3 py-1">🛡️ 100% Legit Pass</span>
            <span className="rounded-full bg-secondary px-3 py-1">⚖️ Fan-First Pricing</span>
            <span className="rounded-full bg-secondary px-3 py-1">🚫 No Scalper Zone</span>
          </div>
        </div>
      </div>

      <aside className="lg:sticky lg:top-36 lg:self-start">
        <div className="stub stub-notch-y rounded-2xl border border-border p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Admit One</p>
              <p className="text-display text-2xl">{event.title}</p>
              <p className="text-xs text-muted-foreground">
                {event.date} · {event.time}
              </p>
            </div>
            <div className="grid size-20 shrink-0 place-items-center rounded-lg border border-border bg-secondary">
              <QrCode className="size-12 text-foreground" aria-hidden />
            </div>
          </div>

          <div className="perforation my-5" />

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt>Pass price</dt>
              <dd>{currency(event.price)}</dd>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <dt>Service &amp; PassShield fee</dt>
              <dd>{currency(fees)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-primary">
                <dt>Coupon FRONTROW</dt>
                <dd>−{currency(discount)}</dd>
              </div>
            )}
            <div className="perforation my-3" />
            <div className="flex items-center justify-between">
              <dt className="font-semibold">Total</dt>
              <dd className="text-display text-3xl text-velvet">{currency(total)}</dd>
            </div>
          </dl>

          <label className="glow-focus mt-5 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 transition-shadow">
            <span className="sr-only">Coupon code</span>
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon code (try FRONTROW)"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>

          <button
            type="button"
            onClick={checkout}
            className="mt-4 w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-velvet"
          >
            Instant Secure Checkout
          </button>

          <div className="mt-3 flex flex-wrap gap-2">
            <PassShieldBadge />
            <FairPassBadge />
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-accent" aria-hidden />
            🎬 No Plot Twists — valid pass guaranteed, or full refund on the spot.
          </p>

          {booked && (
            <div className="animate-stamp mt-5 rounded-lg border-4 border-velvet px-4 py-3 text-center">
              <p className="text-display text-2xl text-velvet">Booking Confirmed</p>
              <p className="text-[11px] uppercase tracking-widest text-velvet">
                Ticker Xchanger · Stamped
              </p>
            </div>
          )}
        </div>
      </aside>
    </main>
  );
}
