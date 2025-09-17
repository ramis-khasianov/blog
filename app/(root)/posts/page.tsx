import LocalSearch from "@/components/search/LocalSearch";
import PostCard from "@/components/cards/PostCard";
import HomeFilter from "@/components/filters/HomeFilters";
import { getPosts } from "@/lib/actions/post.action";
import { EMPTY_POSTS } from "@/constants/states";
import DataRenderer from "@/components/DataRenderer";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Posts({ searchParams }: SearchParams) {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getPosts({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 12,
    query: query || "",
    filter: filter || "",
  });

  const { posts } = data || {};

  return (
    <div className="flex flex-col justify-start items-center gap-8 w-full mx-auto">
      <div className="w-full max-w-xl">
        <LocalSearch
          route="/posts"
          placeholder="Search posts, topics, or tools..."
          otherClasses="flex-1"
        />
      </div>

      {/* Filters Section */}
      <div className="w-full max-w-7xl mx-auto flex justify-center">
        <HomeFilter />
      </div>

      <DataRenderer
        success={success}
        error={error}
        data={posts}
        empty={EMPTY_POSTS}
        render={(questions) => (
          <div className="mt-10 w-full columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
            {questions.map((post) => (
              <div key={post.id} className="break-inside-avoid mb-6">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
}
