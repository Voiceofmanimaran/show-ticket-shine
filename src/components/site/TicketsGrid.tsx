import { useQuery } from "@tanstack/react-query";
import { Loader2, TicketX } from "lucide-react";
import { fetchTickets } from "@/lib/tickets";
import { LiveTicketCard } from "./LiveTicketCard";

export function TicketsGrid() {
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

  if (data.length === 0) {
    return (
      <div className="stub flex flex-col items-center gap-2 rounded-2xl border border-border p-10 text-center">
        <TicketX className="size-6 text-muted-foreground" aria-hidden />
        <p className="text-sm font-semibold">No passes listed yet</p>
        <p className="text-xs text-muted-foreground">
          Post the first one using the form and it will show up here instantly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((ticket) => (
        <LiveTicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
