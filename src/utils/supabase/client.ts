
import { createBrowserClient } from "@supabase/ssr";
//esto inicializa el cliente de supabase en el navegador en conjunto con el env local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = () =>
  createBrowserClient(
    supabaseUrl!,
    supabaseKey!,
  );
