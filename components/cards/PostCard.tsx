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

interface Props {
  post: Post;
}

const PostCard = ({
  post: { id, title, createdAt, content, summary, published, author },
}: Props) => {
  return (
    <Card className="min-w-60 max-w-160">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>published {getTimeStamp(createdAt)}</CardDescription>
        <CardAction>
          <Link href={ROUTES.AUTHOR(author.id)}>
            <Button variant="link">by {author.name}</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="paragraph-regular text-dark-400 dark:text-light-500">
          {summary}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={ROUTES.POST(id)}>
          <Button>Read</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
