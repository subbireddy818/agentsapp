import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cdjuzogayydennjrnajg.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseAnonKey) {
  console.warn("Supabase Anon Key is missing. Check your .env.local configuration.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
