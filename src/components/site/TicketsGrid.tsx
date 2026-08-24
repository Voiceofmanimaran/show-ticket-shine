import { useQuery } from "@tanstack/react-query";
import { Loader2, TicketX } from "lucide-react";
import { ALL_CITIES } from "@/lib/events";
import { useFilters } from "@/lib/filters";
import { fetchTickets } from "@/lib/tickets";
import { LiveTicketCard } from "./LiveTicketCard";

export function TicketsGrid() {
  const { query, category, city } = useFilters();

  const { data, isPending, error } = useQuery({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
  });

  if (isPending) {
    return (
      <p className="flex items-center gap-2 py-10 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" aria-hidden />
        Loading available passes…
      </p>
    );
  }

  if (error) {
    return (
      <p className="rounded-xl border border-border bg-card p-4 text-sm text-primary">
        Couldn&apos;t load passes: {error.message}
      </p>
    );
  }

  const q = query.trim().toLowerCase();
  const filteredTickets = (data ?? []).filter((ticket) => {
    const matchCategory =
      category === "All" || !ticket.category || ticket.category === category;
    const matchCity =
      city === ALL_CITIES || !ticket.city || ticket.city === city;
    const matchQuery =
      !q ||
      `${ticket.movie_title} ${ticket.theater_name} ${ticket.city || ""} ${ticket.category || ""}`
        .toLowerCase()
        .includes(q);

    return matchCategory && matchCity && matchQuery;
  });

  if (filteredTickets.length === 0) {
    return (
      <div className="stub flex flex-col items-center gap-2 rounded-2xl border border-border p-10 text-center">
        <TicketX className="size-6 text-muted-foreground" aria-hidden />
        <p className="text-sm font-semibold">No passes match your selected filters</p>
        <p className="text-xs text-muted-foreground">
          Try changing the category or location filter above, or list a new ticket.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredTickets.map((ticket) => (
        <LiveTicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
