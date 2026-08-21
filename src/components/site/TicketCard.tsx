import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { currency, type TicketEvent } from "@/lib/events";
import { FairPassBadge, PassShieldBadge } from "./TrustBadges";

export function TicketCard({ event }: { event: TicketEvent }) {
  const scarce = event.seatsRemaining <= 5;

  return (
    <article className="stub stub-notch-y group overflow-hidden rounded-2xl border border-border transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.poster}
          alt={`${event.title} poster`}
          loading="lazy"
          width={768}
          height={1024}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-velvet px-2.5 py-1 text-[11px] font-semibold text-velvet-foreground">
          {event.source}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-semibold text-foreground">
          {event.category}
        </span>
      </div>

      <div className="perforation" />

      <div className="space-y-3 p-4">
        <h3 className="text-display text-xl leading-tight">{event.title}</h3>

        <div className="flex flex-wrap gap-2">
          <PassShieldBadge />
          <FairPassBadge />
        </div>

        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <MapPin className="size-4" aria-hidden />
            {event.venue}, {event.city}
          </p>
          <p className="flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden />
            {event.date} · {event.time}
          </p>
        </div>

        <div className="flex items-end justify-between gap-3 pt-1">
          <div>
            <p className="text-display text-2xl text-velvet">{currency(event.price)}</p>
            <p className="text-xs text-muted-foreground">Face value {currency(event.faceValue)}</p>
          </div>
          <span
            className={
              scarce
                ? "inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground"
                : "inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground"
            }
          >
            <Ticket className="size-3.5" aria-hidden />
            {event.seatsRemaining} seats left
          </span>
        </div>

        <Link
          to="/ticket/$eventId"
          params={{ eventId: event.id }}
          className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-velvet"
        >
          View &amp; Checkout
        </Link>
      </div>
    </article>
  );
}
