"use server";
import createClient from "@/lib/supabase/server";
import { Thread } from "@/types/thread";

export default async function getAllThreads(): Promise<Thread[]> {
  const supabase = await createClient();

  const { error, data } = await supabase.from("threads").select("*");

  if (error) {
    throw new Error(error.message);
  }

  const threads = data?.map((thread) => {
    return {
      ...thread,
      created_at: new Date(thread.created_at)
    }
  }) 

  return threads;
}
