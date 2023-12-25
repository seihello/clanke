"use client";
import NewThreadDialog from "@/components/threads/new-thread-dialog";
import ThreadList from "@/components/threads/thread-list";
import { UserInfo } from "@/types/user";

type Props = {
  user: UserInfo | null;
};

export default function ThreadsView({ user }: Props) {
  return (
    <div className="rounded-md bg-white p-4 flex flex-col gap-y-4">
      <NewThreadDialog user={user} />
      <ThreadList user={user} />
    </div>
  );
}
