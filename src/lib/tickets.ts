import { supabase } from "./supabaseClient";

export const TICKETS_TABLE = "Tickets";

export type TicketStatus = "available" | "sold";

export type TicketRow = {
  id: number;
  created_at: string;
  movie_title: string;
  theater_name: string;
  show_time: string;
  ticket_price: number;
  ticket_count: number;
  seller_contact: string;
  status: string | null;
  category?: string | null;
  city?: string | null;
  theatre_name?: string | null;
};

export type NewTicket = Omit<TicketRow, "id" | "created_at">;

export async function fetchTickets(): Promise<TicketRow[]> {
  const { data, error } = await supabase
    .from(TICKETS_TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as TicketRow[];
}

export async function insertTicket(ticket: NewTicket): Promise<TicketRow> {
  const { data, error } = await supabase.from(TICKETS_TABLE).insert(ticket).select().single();

  if (error) throw new Error(error.message);
  return data as TicketRow;
}

export const formatShowTime = (value: string) =>
  new Date(value).toLocaleString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
