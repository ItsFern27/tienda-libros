import { createClient } from '@/app/utils/supabase/server';

export default async function Instruments() {
  const supabase = await createClient();
  const { data: libro } = await supabase.from("libro").select();

  return <pre>{JSON.stringify(libro, null, 2)}</pre>
}