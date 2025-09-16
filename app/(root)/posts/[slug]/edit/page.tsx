import { notFound, redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import PostForm from "@/components/forms/PostForm";
import { getPost } from "@/lib/actions/post.action";
import ROUTES from "@/constants/routes";

const EditPost = async ({ params }: RouteParams) => {
  const { slug } = await params;
  console.log(slug);
  if (!slug) return notFound();

  const session = await auth();
  if (!session) return redirect("/sign-in");

  const { data: post, success } = await getPost({ slug });
  if (!success) return notFound();

  if (post?.author.id !== session?.user?.id) redirect(ROUTES.POST(slug));

  return (
    <>
      <h1 className="h1-bold text-dark-100 dark:text-light-900">Edit Post</h1>
      <div className="mt-9">
        <PostForm post={post} isEdit />
      </div>
    </>
  );
};

export default EditPost;
