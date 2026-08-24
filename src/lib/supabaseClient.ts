import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"];
const rawAnonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"];
const supabaseAnonKey = rawAnonKey ? rawAnonKey.replace(/^\[|\]$/g, "") : "";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Add them to your .env file.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
