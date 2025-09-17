import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { getPosts } from "@/lib/actions/post.action";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Eye, Edit, Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getTimeStamp, formatNumber } from "@/lib/utils";
import PublishToggle from "@/components/PublishToggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SearchParams {
  page?: string;
  filter?: string;
  query?: string;
}

export default async function MyPostsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect(ROUTES.SIGN_IN);
  }

  const { page = "1", filter = "all", query } = await searchParams;

  const result = await getPosts({
    page: Number(page),
    pageSize: 10,
    query,
    filter: filter === "all" ? undefined : filter,
    authorId: session.user.id,
  });

  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-red-500">Failed to load posts</p>
      </div>
    );
  }

  const { posts } = result.data || { posts: [] };

  return (
    <div className="mx-auto w-full px-6 pb-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="h1-bold text-dark-200 dark:text-light-900">
            My Posts
          </h1>
          <p className="paragraph-regular text-dark-500 dark:text-light-500 mt-2">
            Manage your published and draft posts
          </p>
        </div>
        <Link href={ROUTES.NEW_POST}>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            New Post
          </Button>
        </Link>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-6">
        <Link
          href={`${ROUTES.MY_POSTS}?filter=all`}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === "all" || !filter
              ? "bg-primary-500 text-white"
              : "bg-light-800 dark:bg-dark-300 text-dark-500 dark:text-light-500 hover:bg-light-700 dark:hover:bg-dark-400"
          }`}
        >
          All Posts
        </Link>
        <Link
          href={`${ROUTES.MY_POSTS}?filter=published`}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === "published"
              ? "bg-primary-500 text-white"
              : "bg-light-800 dark:bg-dark-300 text-dark-500 dark:text-light-500 hover:bg-light-700 dark:hover:bg-dark-400"
          }`}
        >
          Published
        </Link>
        <Link
          href={`${ROUTES.MY_POSTS}?filter=draft`}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === "draft"
              ? "bg-primary-500 text-white"
              : "bg-light-800 dark:bg-dark-300 text-dark-500 dark:text-light-500 hover:bg-light-700 dark:hover:bg-dark-400"
          }`}
        >
          Drafts
        </Link>
      </div>

      {/* Posts table */}
      {posts.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="w-[100px] hidden md:table-cell">
                  Status
                </TableHead>
                <TableHead className="w-[120px] hidden md:table-cell">
                  Created
                </TableHead>
                <TableHead className="w-[100px] hidden md:table-cell">
                  Views
                </TableHead>
                <TableHead className="w-[200px] text-center hidden md:table-cell">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <div className="truncate" title={post.title}>
                        {post.title}
                      </div>
                      <div className="flex flex-wrap gap-4 mt-2 md:hidden">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          {getTimeStamp(post.createdAt)}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Eye className="mr-1 h-3 w-3" />
                          {formatNumber(post.views)}
                        </div>
                        <Badge
                          variant={post.published ? "default" : "secondary"}
                          className="w-fit"
                        >
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2 md:hidden">
                        <Link href={ROUTES.POST(post.slug)}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View
                          </Button>
                        </Link>
                        <Link href={ROUTES.POST_EDIT(post.slug)}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                        </Link>
                        <PublishToggle
                          slug={post.slug}
                          isPublished={post.published}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {getTimeStamp(post.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    <div className="flex items-center justify-start text-sm text-muted-foreground">
                      <Eye className="mr-1 h-3 w-3" />
                      {formatNumber(post.views)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    <div className="flex items-center justify-start gap-1">
                      <Link href={ROUTES.POST(post.slug)}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View
                        </Button>
                      </Link>
                      <Link href={ROUTES.POST_EDIT(post.slug)}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                      </Link>
                      <PublishToggle
                        slug={post.slug}
                        isPublished={post.published}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <h3 className="h3-bold text-dark-200 dark:text-light-900 mb-2">
            {filter === "draft"
              ? "No drafts yet"
              : filter === "published"
              ? "No published posts yet"
              : "No posts yet"}
          </h3>
          <p className="paragraph-regular text-dark-500 dark:text-light-500 mb-4">
            {filter === "draft"
              ? "Create your first draft to get started"
              : filter === "published"
              ? "Publish your first post to see it here"
              : "Create your first post to get started"}
          </p>
          <Link href={ROUTES.NEW_POST}>
            <Button>Create New Post</Button>
          </Link>
        </div>
      )}

      {/* Pagination would go here if needed */}
    </div>
  );
}
