"use server";
import createClient from "@/lib/supabase/server";
import { Thread } from "@/types/thread";

export default async function getAllThreads(): Promise<Thread[]> {
  const supabase = await createClient();

  const { error, data } = await supabase.from("threads").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
