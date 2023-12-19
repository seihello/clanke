import { createBrowserClient } from "@supabase/ssr";

export default function createClient() {

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return supabase;
}
