"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

import { AskQuestionSchema } from "@/lib/validations";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const PostForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = () => {};

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold">
                Post Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular no-focus min-h-[52px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold">
                Post Content <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  value={field.value}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="paragraph-regular no-focus min-h-[52px] border"
                    placeholder="Add tags..."
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your post is about. You need
                to press enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-16 flex justify-end gap-4">
          <Button type="submit" variant="secondary" className="w-fit">
            Save Draft
          </Button>
          <Button type="submit" className="w-fit">
            Save and Publish
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
