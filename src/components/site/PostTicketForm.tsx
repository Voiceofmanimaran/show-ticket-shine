import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { insertTicket, type NewTicket } from "@/lib/tickets";

const EMPTY = {
  movie_title: "",
  theater_name: "",
  show_time: "",
  ticket_price: "",
  ticket_count: "1",
  seller_contact: "",
  status: "available",
};

type FormState = typeof EMPTY;

const FIELDS: Array<{
  name: keyof FormState;
  label: string;
  type: string;
  placeholder?: string;
  min?: number;
}> = [
  { name: "movie_title", label: "Movie / event", type: "text", placeholder: "Neon Noir" },
  { name: "theater_name", label: "Theater", type: "text", placeholder: "Grand Marquee Cinemas" },
  { name: "show_time", label: "Show time", type: "datetime-local" },
  { name: "ticket_price", label: "Price per pass (₹)", type: "number", placeholder: "420", min: 0 },
  { name: "ticket_count", label: "Number of passes", type: "number", min: 1 },
  { name: "seller_contact", label: "Contact", type: "text", placeholder: "you@email.com" },
];

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
    mutation.mutate({
      movie_title: form.movie_title.trim(),
      theater_name: form.theater_name.trim(),
      show_time: new Date(form.show_time).toISOString(),
      ticket_price: Number(form.ticket_price),
      ticket_count: Number(form.ticket_count),
      seller_contact: form.seller_contact.trim(),
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
        {FIELDS.map((field) => (
          <label key={field.name} className="space-y-1.5">
            <span className="text-xs font-semibold text-muted-foreground">{field.label}</span>
            <input
              required
              type={field.type}
              min={field.min}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.value }))}
              className="glow-focus w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-shadow placeholder:text-muted-foreground"
            />
          </label>
        ))}

        <label className="space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground">Status</span>
          <select
            value={form.status}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
            className="glow-focus w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-shadow"
          >
            <option value="available">available</option>
            <option value="sold">sold</option>
          </select>
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
