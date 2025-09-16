import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";

interface Props {
  post: Post;
}

const PostCardSmall = ({ post: { slug, title, createdAt } }: Props) => {
  return (
    <Link href={ROUTES.POST(slug)}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <h3 className="font-semibold text-dark-100 dark:text-light-900 line-clamp-2 mb-2">
            {title}
          </h3>
          <p className="text-sm text-dark-400 dark:text-light-500">
            {getTimeStamp(createdAt)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCardSmall;