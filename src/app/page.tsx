import ThreadsView from "@/components/threads/threads-view";
import getCurrentUser from "@/lib/users/get-current-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clanke | Find your buddy",
};

export default async function ThreadsPage() {
  try {
    const user = await getCurrentUser();
    console.log("user", user);
    return <ThreadsView user={user} />;
  } catch (error: any) {
    console.error(error);
    return <>Error!</>;
  }
}
