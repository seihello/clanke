"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import postNewThread from "@/lib/threads/post-new-thread";
import { UserInfo } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";

const schema = zod.object({
  title: zod.string().min(1).max(128),
  body: zod.string().min(1).max(2000),
});

type Props = {
  user: UserInfo | null;
};

export default function NewThreadDialog({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      title: "",
      body: "",
    },
  });

  async function onSubmit(values: zod.infer<typeof schema>) {
    try {
      await postNewThread(values.title, values.body, user?.id);
      setIsOpen(false);
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>New thread</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[48rem]">
        <DialogHeader>
          <DialogTitle>Create new thread</DialogTitle>
          <DialogDescription>
            Ask people in the world who may know advice
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="text"
                      placeholder="Type title"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ask for advice"
                      className="h-64"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="mt-4"
              type="submit"
              disabled={!form.formState.isValid}
            >
              Post
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
