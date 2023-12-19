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

const schema = zod
  .object({
    email: zod
      .string()
      .min(1, { message: "Email is missing" })
      .email({ message: "Email is invalid" }),
    name: zod.string().min(1, { message: "First name is missing" }),
    password: zod.string().min(1, { message: "Password is missing" }).min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: zod
      .string()
      .min(1, { message: "Password is missing" })
      .min(8, {
        message: "Password must be at least 8 characters long",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Doesn't match password",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const supabase = createClient();

  const form = useForm<zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: zod.infer<typeof schema>) {
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      if (error) throw new Error(error.message);
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-[32rem] flex-col gap-y-4 items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="w-full">
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
          name="name"
          render={({ field, fieldState }) => (
            <FormItem className="w-full">
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  type="name"
                  placeholder="Type your account name"
                  className={fieldState.invalid ? "border-destructive" : ""}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-normal" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem className="w-full">
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem className="w-full">
              <FormLabel>Confirm Password</FormLabel>
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

        <Button className="w-auto" type="submit" disabled={!form.formState.isValid}>
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
