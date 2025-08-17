import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";

// load from .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ Supabase URL or Key is missing. Check your .env file!");
}

// create a single Supabase client for the whole project
export const supabase = createClient(supabaseUrl, supabaseKey);
