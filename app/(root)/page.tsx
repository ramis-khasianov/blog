import LocalSearch from "@/components/search/LocalSearch";
import PostCard from "@/components/cards/PostCard";
import PostCardSmall from "@/components/cards/PostCardSmall";
import { getPosts } from "@/lib/actions/post.action";
import { EMPTY_POSTS } from "@/constants/states";
import DataRenderer from "@/components/DataRenderer";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: SearchParams) {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getPosts({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 12,
    query: query || "",
    filter: filter || "",
  });

  const { posts } = data || {};

  // Split posts for main and featured sections
  const mainPosts = posts?.slice(0, 4) || [];
  const featuredPosts = posts?.slice(4, 12) || [];

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

      <DataRenderer
        success={success}
        error={error}
        data={posts}
        empty={EMPTY_POSTS}
        render={() => (
          <div className="mt-10 w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Posts Section */}
              <div className="lg:col-span-3">
                <h2 className="text-2xl font-bold text-dark-100 dark:text-light-900 mb-6">
                  Popular posts
                </h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {mainPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>

              {/* Featured Posts Sidebar */}
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
            </div>
          </div>
        )}
      />
    </div>
  );
}
