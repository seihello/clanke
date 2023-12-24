"use client";
import NewThreadDialog from "@/components/threads/new-thread-dialog";
import ThreadCard from "@/components/threads/thread-card";
import getAllThreads from "@/lib/threads/get-all-threads";
import { Thread } from "@/types/thread";
import { UserInfo } from "@/types/user";
import { useEffect, useState } from "react";

type Props = {
  user: UserInfo | null;
};
export default function ThreadsView({ user }: Props) {
  const [threads, setThreads] = useState<Thread[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllThreads();
        setThreads(data);
      } catch (error: any) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <NewThreadDialog user={user} />
      {threads.map((thread: Thread, index: number) => (
        <ThreadCard key={index} thread={thread} user={user} />
      ))}
    </div>
  );
}
