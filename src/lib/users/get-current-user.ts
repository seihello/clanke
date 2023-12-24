"use server";
import createClient from "@/lib/supabase/server";
import { PublicUser, UserInfo } from "@/types/user";
import { User } from "@supabase/supabase-js";

export default async function getCurrentUser(): Promise<UserInfo | null> {
  const supabase = await createClient();

  try {
    const authUser = await getAuthUser(supabase);

    // User is signed in
    if (authUser && authUser.email) {
      const user = await getPublicUser(supabase, authUser.id);
      if (!user) {
        throw new Error("User is null");
      }
      return { ...user, email: authUser.email };
    }
    // User is not signed in
    else {
      return null;
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

async function getAuthUser(supabase: any): Promise<User | null> {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  if (!session || !session.user) {
    return null;
  }

  return session.user;
}

async function getPublicUser(
  supabase: any,
  userId: string,
): Promise<PublicUser | null> {
  const { error, data } = await supabase
    .from("users")
    .select("id, name, avatar")
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  if (!data[0]) {
    return null;
  }

  return data[0];
}
