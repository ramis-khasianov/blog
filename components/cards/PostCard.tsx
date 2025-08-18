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

const PostCard = () => {
  return (
    <Card className="min-w-60 max-w-160">
      <CardHeader>
        <CardTitle>Blog post about NextJS</CardTitle>
        <CardDescription>by Post Author</CardDescription>
        <CardAction>
          <Button variant="link">Follow</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="paragraph-regular text-dark-400 dark:text-light-500">
          Next.js 15 introduces game-changing features that make React
          development faster and more efficient. The new App Router brings
          improved performance with nested layouts, while server components
          reduce bundle sizes significantly. Learn how to migrate from Pages
          Router and take advantage of the latest optimizations.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Read</Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
