import SignUpForm from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center gap-y-8">
      <h1>Sign Up for Clanke</h1>
      <SignUpForm />
    </div>
  );
}
