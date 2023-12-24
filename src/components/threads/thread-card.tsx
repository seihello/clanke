import { Thread } from "@/types/thread";
import { UserInfo } from "@/types/user";

type Props = {
  thread: Thread;
  user: UserInfo | null;
};

export default function ThreadCard({ thread, user }: Props) {
  return (
    <div className="w-full rounded-md bg-white">
      <h2>{thread.title}</h2>
      <p>{thread.body}</p>
      <p>{thread.created_at.toLocaleString()}</p>
    </div>
  );
}
