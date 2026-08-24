import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { EVENT_CATEGORIES, CITIES, EventCategory } from "@/lib/events";
import { insertTicket, type NewTicket } from "@/lib/tickets";

const EMPTY = {
  movie_title: "",
  theater_name: "",
  theatre_name: "",
  show_time: "",
  ticket_price: "",
  ticket_count: "1",
  seller_contact: "",
  category: "Movies" as EventCategory,
  city: "Chennai",
  status: "available",
};

type FormState = typeof EMPTY;

export function PostTicketForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (ticket: NewTicket) => insertTicket(ticket),
    onSuccess: async () => {
      toast.success("🎟️ Pass listed! It's live on the marketplace.");
      setForm(EMPTY);
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: (error: Error) => toast.error(`Couldn't post the pass: ${error.message}`),
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const venue = form.theater_name.trim();
    const screen = form.theatre_name.trim();
    const fullTheaterDisplay = screen ? `${venue} (${screen})` : venue;

    mutation.mutate({
      movie_title: form.movie_title.trim(),
      theater_name: fullTheaterDisplay,
      theatre_name: screen || null,
      show_time: new Date(form.show_time).toISOString(),
      ticket_price: Number(form.ticket_price),
      ticket_count: Number(form.ticket_count),
      seller_contact: form.seller_contact.trim(),
      category: form.category,
      city: form.city,
      status: form.status,
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="stub stub-notch-y space-y-4 rounded-2xl border border-border p-5"
    >
      <div>
        <h3 className="text-display text-2xl">Post a Ticket</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Listings go straight to the marketplace — keep prices fair and capped.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground">Event / Movie Name</span>
          <input
            required
            type="text"
            placeholder="e.g. Neon Noir, Amber Lights Live"
            value={form.movie_title}
            onChange={(e) => setForm((prev) => ({ ...prev, movie_title: e.target.value }))}
            className="glow-focus w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-shadow placeholder:text-muted-foreground"
          />
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground">Venue / Location</span>
          <input
            required
            type="text"
            placeholder="Grand Marquee Cinemas"
            value={form.theater_name}
            onChange={(e) => setForm((prev) => ({ ...prev, theater_name: e.target.value }))}
            className="glow-focus w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-shadow placeholder:text-muted-foreground"
          />
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground">Theatre / Screen Name (Optional)</span>
          <input
            type="text"
            placeholder="Screen 1, Audi 2, or Shanthi Saradha"
            value={form.theatre_name}
            onChange={(e) => setForm((prev) => ({ ...prev, theatre_name: e.target.value }))}
            className="glow-focus w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-shadow placeholder:text-muted-foreground"
          />
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground">Show time</span>
          <input
            required
            type="datetime-local"
            value={form.show_time}
            onChange={(e) => setForm((prev) => ({ ...prev, show_time: e.target.value }))}
            className="glow-focus w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-shadow"
          />
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground">Category</span>
          <select
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as EventCategory }))}
            className="glow-focus w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-shadow"
          >
            {EVENT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground">City</span>
          <select
            value={form.city}
            onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
            className="glow-focus w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-shadow"
          >
            {CITIES.filter((c) => c !== "All Cities").map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground">Price per pass (₹)</span>
          <input
            required
            type="number"
            min={0}
            placeholder="420"
            value={form.ticket_price}
            onChange={(e) => setForm((prev) => ({ ...prev, ticket_price: e.target.value }))}
            className="glow-focus w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-shadow"
          />
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground">Number of passes</span>
          <input
            required
            type="number"
            min={1}
            value={form.ticket_count}
            onChange={(e) => setForm((prev) => ({ ...prev, ticket_count: e.target.value }))}
            className="glow-focus w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-shadow"
          />
        </label>

        <label className="space-y-1.5 sm:col-span-2">
          <span className="text-xs font-semibold text-muted-foreground">Contact info</span>
          <input
            required
            type="text"
            placeholder="you@email.com"
            value={form.seller_contact}
            onChange={(e) => setForm((prev) => ({ ...prev, seller_contact: e.target.value }))}
            className="glow-focus w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-shadow"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-velvet disabled:opacity-60"
      >
        {mutation.isPending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Plus className="size-4" aria-hidden />
        )}
        {mutation.isPending ? "Posting…" : "Post Ticket"}
      </button>
    </form>
  );
}
