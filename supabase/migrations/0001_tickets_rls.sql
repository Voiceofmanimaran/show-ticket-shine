-- Public read + insert access for the Tickets marketplace listings.
alter table public."Tickets" enable row level security;

drop policy if exists "Tickets are readable by everyone" on public."Tickets";
create policy "Tickets are readable by everyone"
  on public."Tickets"
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can post a ticket" on public."Tickets";
create policy "Anyone can post a ticket"
  on public."Tickets"
  for insert
  to anon, authenticated
  with check (true);
