import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import PostCategories from "./PostCategories";

interface Props {
  post: Post;
}

const PostCardSmall = ({
  post: { slug, title, createdAt, author, categories },
}: Props) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <h3 className="font-semibold text-dark-100 dark:text-light-900 line-clamp-2 mb-2">
          <Link href={ROUTES.POST(slug)} className="hover:underline">
            {title}
          </Link>
        </h3>
        <div className="flex items-center gap-2 paragraph-regular text-muted-foreground mb-2">
          <span>by</span>
          <Link href={ROUTES.AUTHOR(author.id)} className="hover:underline">
            {author.name}
          </Link>
          <span>•</span>
          <span>{getTimeStamp(createdAt)}</span>
        </div>
        <PostCategories categories={categories} maxCategories={2} />
      </CardContent>
    </Card>
  );
};

export default PostCardSmall;
