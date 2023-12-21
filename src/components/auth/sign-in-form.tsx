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
import createClient from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { useRouter } from "next/navigation";

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
  const supabase = createClient();
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
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) throw new Error(error.message);
      router.replace("/");
    } catch (error: any) {
      console.error(error);
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
