import Link from "next/link";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import CategoryBadge from "./CategoryBadge";

interface Props {
  post: Post;
}

const PostCard = ({
  post: { slug, title, summary, createdAt, author, categories },
}: Props) => {
  return (
    <Card className="min-w-60 max-w-160">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>published {getTimeStamp(createdAt)}</CardDescription>
        <CardAction>
          <Button variant="link" className="!paragraph-regular" asChild>
            <Link href={ROUTES.AUTHOR(author.id)}>by {author.name}</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="">
        <p className="paragraph-regular text-dark-400 dark:text-light-500">
          {summary}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-4">
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((postCategory) => (
                <CategoryBadge
                  key={postCategory.category.id}
                  _id={postCategory.category.id.toString()}
                  name={postCategory.category.name}
                  compact
                />
              ))}
            </div>
          )}
          <Link href={ROUTES.POST(slug)}>
            <Button>Read</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
