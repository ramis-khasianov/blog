import CategoryBadge from "@/components/cards/CategoryBadge";
import { Preview } from "@/components/editor/Preview";
import Metric from "@/components/Metric";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { incrementViews } from "@/lib/actions/post.action";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { after } from "next/server";
import { Clock, Eye, Edit } from "lucide-react";
import Image from "next/image";
import PublishToggle from "@/components/PublishToggle";
import React from "react";

export default async function PostDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();

  const post = await prisma.post.findUnique({
    where: { slug: slug },
    include: {
      author: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  const {
    author,
    createdAt,
    categories,
    views,
    content,
    title,
    featuredImage,
    published,
  } = post;
  const isAuthor = session?.user?.id === author.id;

  // Increment views after the page renders
  after(async () => {
    await incrementViews({ postId: post.id });
  });

  return (
    <div className="mx-auto max-w-4xl px-6">
      <div className="flex-start w-full flex-col">
        <div className="flex w-full justify-between items-start mb-4">
          <div className="flex items-center justify-start gap-1">
            <UserAvatar
              id={author.id}
              name={author.name || "Anonymous"}
              imageUrl={author.image || undefined}
              className="size-[22px]"
              fallbackClassName="text-[10px]"
            />
            <Link href={ROUTES.AUTHOR(author.id)}>
              <p className="base-semibold text-dark-300 dark:text-light-700">
                {author.name}
              </p>
            </Link>
          </div>

          {isAuthor && (
            <div className="flex items-center gap-2">
              <PublishToggle slug={slug} isPublished={published} />
              <Link href={ROUTES.POST_EDIT(slug)}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Edit size={16} />
                  Edit Post
                </Button>
              </Link>
            </div>
          )}
        </div>

        <h1 className="h1-bold text-dark-200 dark:text-light-900 mt-3.5 w-full">
          {title}
        </h1>
      </div>

      {featuredImage && (
        <div className="relative w-full h-64 md:h-80 lg:h-96 my-8 rounded-lg overflow-hidden">
          <Image
            src={featuredImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          icon={Clock}
          value={`published ${getTimeStamp(createdAt)}`}
          title=""
          textStyles="paragraph-semibold text-dark-400 dark:text-light-700"
        />
        <Metric
          icon={Eye}
          value={formatNumber(views)}
          title=" views"
          textStyles="paragraph-semibold text-dark-400 dark:text-light-700"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((postCategory) => (
          <CategoryBadge
            key={postCategory.category.id}
            _id={postCategory.category.id.toString()}
            name={postCategory.category.name}
            compact
          />
        ))}
      </div>

      <Preview content={content} />
    </div>
  );
}
