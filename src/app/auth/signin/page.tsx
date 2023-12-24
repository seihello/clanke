import SignInForm from "@/components/auth/sign-in-form";
import getCurrentUser from "@/lib/users/get-current-user";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Clanke | Sign In",
};

export default async function SignInPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/");
  }

  return (
    <div className="mx-auto flex max-w-[36rem] flex-col items-center gap-y-8 rounded-lg bg-white py-16">
      <h1>Sign in to Clanke</h1>
      <SignInForm />
    </div>
  );
}
