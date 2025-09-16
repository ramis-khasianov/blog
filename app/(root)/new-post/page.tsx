import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import PostForm from "@/components/forms/PostForm";

const AskQuestion = async () => {
  const session = await auth();

  if (!session) return redirect("/sign-in");

  return (
    <>
      <h1 className="h1-bold text-dark-100 dark:text-light-900">
        Ask a question
      </h1>

      <div className="mt-9">
        <PostForm />
      </div>
    </>
  );
};

export default AskQuestion;
