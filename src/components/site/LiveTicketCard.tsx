import { CalendarDays, MapPin, Phone, Ticket } from "lucide-react";
import { currency } from "@/lib/events";
import { formatShowTime, type TicketRow } from "@/lib/tickets";

export function LiveTicketCard({ ticket }: { ticket: TicketRow }) {
  const sold = ticket.status?.toLowerCase() === "sold";
  const scarce = ticket.ticket_count <= 2;

  return (
    <article className="stub stub-notch-y flex flex-col gap-3 rounded-2xl border border-border p-4 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-display text-xl leading-tight">{ticket.movie_title}</h3>
        <span
          className={
            sold
              ? "shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground"
              : "shrink-0 rounded-full bg-velvet px-2.5 py-1 text-[11px] font-semibold text-velvet-foreground"
          }
        >
          {ticket.status ?? "available"}
        </span>
      </div>

      <div className="perforation" />

      <div className="space-y-1 text-sm text-muted-foreground">
        <p className="flex items-center gap-1.5">
          <MapPin className="size-4" aria-hidden />
          {ticket.theater_name}
        </p>
        <p className="flex items-center gap-1.5">
          <CalendarDays className="size-4" aria-hidden />
          {formatShowTime(ticket.show_time)}
        </p>
        <p className="flex items-center gap-1.5">
          <Phone className="size-4" aria-hidden />
          {ticket.seller_contact}
        </p>
      </div>

      <div className="mt-auto flex items-end justify-between gap-3 pt-1">
        <div>
          <p className="text-display text-2xl text-velvet">{currency(ticket.ticket_price)}</p>
          <p className="text-xs text-muted-foreground">per pass</p>
        </div>
        <span
          className={
            scarce
              ? "inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground"
              : "inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground"
          }
        >
          <Ticket className="size-3.5" aria-hidden />
          {ticket.ticket_count} available
        </span>
      </div>
    </article>
  );
}
