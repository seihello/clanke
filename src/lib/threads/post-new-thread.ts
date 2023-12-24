"use server";
import createClient from "@/lib/supabase/server";

export default async function postNewThread(
  title: string,
  body: string,
  userId?: string,
) {
  const supabase = await createClient();

  const { error } = await supabase.from("threads").insert({
    title,
    body,
    user_id: userId,
  });

  if (error) {
    throw new Error(error.message);
  }
}
