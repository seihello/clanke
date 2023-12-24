import SignUpForm from "@/components/auth/sign-up-form";
import getCurrentUser from "@/lib/users/get-current-user";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/");
  }

  return (
    <div className="mx-auto flex max-w-[36rem] flex-col items-center gap-y-8 rounded-lg bg-white py-16">
      <h1>Sign up for Clanke</h1>
      <SignUpForm />
    </div>
  );
}
