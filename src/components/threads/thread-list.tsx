import ThreadCard from "@/components/threads/thread-card";
import { Separator } from "@/components/ui/separator";

import getAllThreads from "@/lib/threads/get-all-threads";
import { Thread } from "@/types/thread";
import { UserInfo } from "@/types/user";
import React, { useEffect, useState } from "react";

type Props = {
  user: UserInfo | null;
};

export default function ThreadList({ user }: Props) {
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
    <div className="">
      {threads.map((thread: Thread, index: number) => (
        <React.Fragment key={index}>
          <ThreadCard thread={thread} user={user} />
          {index !== threads.length - 1 && (
            <Separator className="bg-gray-300" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
