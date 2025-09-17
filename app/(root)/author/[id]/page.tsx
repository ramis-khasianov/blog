import PostCard from "@/components/cards/PostCard";
import { getPosts } from "@/lib/actions/post.action";
import { EMPTY_POSTS } from "@/constants/states";
import DataRenderer from "@/components/DataRenderer";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import UserAvatar from "@/components/UserAvatar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AuthorPage({ params }: Props) {
  const { id } = await params;

  // Get author details
  const author = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      image: true,
    },
  });

  if (!author) {
    notFound();
  }

  // Get posts by this author
  const { success, data, error } = await getPosts({
    page: 1,
    pageSize: 20,
    query: "",
    filter: "",
    authorId: id,
  });

  const { posts } = data || {};

  return (
    <div className="flex flex-col justify-start items-center gap-8 w-full mx-auto">
      {/* Author Header */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <UserAvatar
            id={author.id}
            name={author.name || "Anonymous"}
            imageUrl={author.image || undefined}
            className="size-16"
            fallbackClassName="text-lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-dark-100 dark:text-light-900">
              Posts by {author.name || "Anonymous"}
            </h1>
            <p className="text-dark-400 dark:text-light-500 mt-1">
              {posts?.length || 0} {(posts?.length || 0) === 1 ? "post" : "posts"}
            </p>
          </div>
        </div>
      </div>

      <DataRenderer
        success={success}
        error={error}
        data={posts}
        empty={EMPTY_POSTS}
        render={(authorPosts) => (
          <div className="w-full max-w-7xl mx-auto">
            <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
              {authorPosts.map((post) => (
                <div key={post.id} className="break-inside-avoid mb-6">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        )}
      />
    </div>
  );
}