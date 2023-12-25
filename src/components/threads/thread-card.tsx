import { Thread } from "@/types/thread";
import { UserInfo } from "@/types/user";

type Props = {
  thread: Thread;
  user: UserInfo | null;
};

export default function ThreadCard({ thread, user }: Props) {
  return (
    <div className="w-full rounded-md py-4">
      <h2>{thread.title}</h2>
    </div>
  );
}
