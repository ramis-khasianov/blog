"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ReloadIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

import ROUTES from "@/constants/routes";
import { toast } from "sonner";
import { createPost, editPost } from "@/lib/actions/post.action";
import { CreatePostSchema, EditPostSchema } from "@/lib/validations";

import CategoryBadge from "../cards/CategoryBadge";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

interface Params {
  post?: Post;
  isEdit?: boolean;
}

const PostForm = ({ post, isEdit = false }: Params) => {
  const router = useRouter();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(isEdit ? EditPostSchema : CreatePostSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      summary: post?.summary || "",
      categories: post?.categories?.map((postCategory) => postCategory.category.name) || [],
    },
  });

  console.log(post);

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("categories", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("categories");
      } else if (tagInput.length > 15) {
        form.setError("categories", {
          type: "manual",
          message: "Category should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("categories", {
          type: "manual",
          message: "Category already exists",
        });
      }
    }
  };

  const handleCategoryRemove = (category: string, field: { value: string[] }) => {
    const newCategories = field.value.filter((c) => c !== category);

    form.setValue("categories", newCategories);

    if (newCategories.length === 0) {
      form.setError("categories", {
        type: "manual",
        message: "Categories are required",
      });
    }
  };

  const handleSavePost = async (
    data: z.infer<typeof CreatePostSchema>,
    published = false
  ) => {
    startTransition(async () => {
      if (isEdit && post) {
        const result = await editPost({
          slug: post.slug,
          ...data,
          published,
        });

        if (result.success) {
          toast.success("Success", {
            description: `Post ${
              published ? "published" : "updated"
            } successfully`,
          });

          if (result.data) router.push(ROUTES.POST(result.data.slug));
        } else {
          toast.error(`Error ${result.status}`, {
            description: result.error?.message || "Something went wrong",
          });
        }

        return;
      }

      const result = await createPost({ ...data, published });

      if (result.success) {
        toast.success("Success", {
          description: `Post ${
            published ? "published" : "created"
          } successfully`,
        });

        if (result.data) router.push(ROUTES.POST_EDIT(result.data.slug));
      } else {
        toast.error(`Error ${result.status}`, {
          description: result.error?.message || "Something went wrong",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={(e) => e.preventDefault()}
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
          name="summary"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold">Post Summary</FormLabel>
              <FormControl>
                <Textarea
                  className="paragraph-regular no-focus min-h-[100px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                A concise summary that will be displayed on post cards and
                search results.
              </FormDescription>
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
          name="categories"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold">
                Categories <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="paragraph-regular no-focus min-h-[56px] border"
                    placeholder="Add categories..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex justify-start items-center mt-2.5 flex-wrap gap-2.5">
                      {field?.value?.map((category: string, index: number) => (
                        <CategoryBadge
                          key={`${category}-${index}`}
                          _id={category}
                          name={category}
                          compact
                          remove
                          isButton
                          handleRemove={() => handleCategoryRemove(category, field)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 categories to describe what your post is about. You need
                to press enter to add a category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-16 flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={isPending}
            className="w-fit"
            onClick={() => {
              const data = form.getValues();
              handleSavePost(data, false);
            }}
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 size-4 animate-spin" />
                <span>Saving</span>
              </>
            ) : isEdit ? (
              "Update Draft"
            ) : (
              "Save Draft"
            )}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={isPending}>
                {isEdit ? "Update and Publish" : "Save and Publish"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {isEdit
                    ? "Update and publish your post?"
                    : "Are you ready to publish your post?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {isEdit
                    ? "Your changes will be saved and the post will remain published."
                    : "Your post will be published and available to all users. You can unpublish in my posts section at any time."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    const data = form.getValues();
                    handleSavePost(data, true);
                  }}
                >
                  {isEdit ? "Update and Publish" : "Save and Publish"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
