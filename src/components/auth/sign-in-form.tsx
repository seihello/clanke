"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import signIn from "@/lib/auth/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as zod from "zod";

const schema = zod.object({
  email: zod
    .string()
    .min(1, { message: "Email is missing" })
    .email({ message: "Email is invalid" }),
  password: zod.string().min(1, { message: "Password is missing" }).min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: zod.infer<typeof schema>) {
    try {
      await signIn(values.email, values.password);
      router.replace("/");
    } catch (error: any) {
      console.error("Sign in error: ", error);
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-[24rem] flex-col gap-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  type="email"
                  placeholder="Type your email"
                  className={fieldState.invalid ? "border-destructive" : ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  type="password"
                  placeholder="Type your password"
                  className={fieldState.invalid ? "border-destructive" : ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mt-4"
          type="submit"
          disabled={!form.formState.isValid}
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
}
