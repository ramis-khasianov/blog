import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

import ROUTES from "@/constants/routes";
import { getTimeStamp, formatNumber } from "@/lib/utils";
import PostCategories from "./PostCategories";
import { Eye } from "lucide-react";

interface Props {
  post: Post;
}

const PostCard = ({
  post: {
    slug,
    title,
    summary,
    createdAt,
    author,
    categories,
    featuredImage,
    views,
  },
}: Props) => {
  return (
    <Card className="min-w-60 max-w-160">
      {featuredImage && (
        <Link href={ROUTES.POST(slug)}>
          <div className="relative w-full h-64 overflow-hidden rounded-t-lg cursor-pointer">
            <Image
              src={featuredImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}
      <CardHeader className={!featuredImage ? "pt-6" : ""}>
        <PostCategories categories={categories} className="mb-4" />
        <CardTitle>
          <Link href={ROUTES.POST(slug)} className="hover:underline">
            {title}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>by</span>
          <Link href={ROUTES.AUTHOR(author.id)} className="hover:underline">
            {author.name}
          </Link>
          <span>•</span>
          <span>published {getTimeStamp(createdAt)}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{formatNumber(views)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <p className="paragraph-regular text-dark-400 dark:text-light-500">
          {summary}
        </p>
      </CardContent>
    </Card>
  );
};

export default PostCard;
