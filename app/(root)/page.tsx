import LocalSearch from "@/components/search/LocalSearch";
import PostCard from "@/components/cards/PostCard";
import PostCardSmall from "@/components/cards/PostCardSmall";
import HomeFilter from "@/components/filters/HomeFilters";
import { getPosts } from "@/lib/actions/post.action";
import { EMPTY_POSTS } from "@/constants/states";
import DataRenderer from "@/components/DataRenderer";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: SearchParams) {
  const { page, pageSize, query, filter } = await searchParams;

  // Get popular posts (sorted by views)
  const popularResult = await getPosts({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 8,
    query: query || "",
    filter: filter || "popular",
  });

  // Get recent posts for featured section (sorted by newest)
  // If category filter is active, apply it to featured posts too
  const featuredResult = await getPosts({
    page: 1,
    pageSize: 4,
    query: "",
    filter: filter && !["newest", "popular", "recommended"].includes(filter) ? filter : "newest",
  });

  const { success, error } = popularResult;
  const popularPosts = popularResult.data?.posts || [];
  const featuredPosts = featuredResult.data?.posts || [];

  return (
    <div className="flex flex-col justify-start items-center gap-8 w-full mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-dark-100 dark:text-light-900">
          Welcome to <span className="text-primary-gradient">Raports Blog</span>
        </h1>

        <p className="text-lg md:text-xl text-dark-300 dark:text-light-700 max-w-2xl mx-auto leading-relaxed">
          Master the art of data management and analytics with expert insights,
          tool comparisons, and practical guides. From database optimization to
          advanced analytics platforms, we help data professionals make informed
          decisions.
        </p>
      </div>

      {/* Search Section */}
      <div className="w-full max-w-xl">
        <LocalSearch
          route="/"
          placeholder="Search tools, tutorials, or data topics..."
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
        data={popularPosts}
        empty={EMPTY_POSTS}
        render={() => (
          <div className="mt-10 w-full max-w-7xl mx-auto">
            <div className={`grid gap-8 ${query ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-4"}`}>
              {/* Main Posts Section */}
              <div className={query ? "col-span-1" : "lg:col-span-3"}>
                <h2 className="text-2xl font-bold text-dark-100 dark:text-light-900 mb-6">
                  {query ? "Search results" : "Popular posts"}
                </h2>
                <div className="columns-1 xl:columns-2 gap-6 space-y-6">
                  {popularPosts.map((post) => (
                    <div key={post.id} className="break-inside-avoid mb-6">
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Posts Sidebar - Hidden when searching */}
              {!query && (
                <div className="lg:col-span-1">
                  <div className="sticky top-6">
                    <h2 className="text-2xl font-bold text-dark-100 dark:text-light-900 mb-6">
                      Featured Posts
                    </h2>
                    <div className="flex flex-col gap-4">
                      {featuredPosts.map((post) => (
                        <PostCardSmall key={`featured-${post.id}`} post={post} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
}
