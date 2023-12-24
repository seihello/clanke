import NewThreadDialog from "@/components/threads/new-thread-dialog";
import { UserInfo } from "@/types/user";

type Props = {
  user: UserInfo | null;
};
export default function ThreadsView({ user }: Props) {
  return (
    <div>
      <NewThreadDialog />
    </div>
  );
}
