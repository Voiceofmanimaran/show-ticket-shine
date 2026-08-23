import { createFileRoute } from "@tanstack/react-router";
import { PostTicketForm } from "@/components/site/PostTicketForm";
import { TicketsGrid } from "@/components/site/TicketsGrid";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "Live Passes — Ticker Xchanger" },
      {
        name: "description",
        content: "Browse passes posted by the community and list your own in seconds.",
      },
    ],
  }),
  component: TicketsPage,
});

function TicketsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <header>
        <h1 className="text-4xl sm:text-5xl">Live Passes</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Posted by fans, in real time. Grab one or list your own below.
        </p>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <section aria-label="Available passes">
          <TicketsGrid />
        </section>
        <section aria-label="Post a ticket">
          <PostTicketForm />
        </section>
      </div>
    </main>
  );
}
