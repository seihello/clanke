import SignUpForm from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="mx-auto flex max-w-[36rem] flex-col items-center gap-y-8 bg-white py-16 rounded-lg">
      <h1>Sign up for Clanke</h1>
      <SignUpForm />
    </div>
  );
}
