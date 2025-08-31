import HomeFilter from "@/components/filters/HomeFilters";
import LocalSearch from "@/components/search/LocalSearch";
import PostCard from "@/components/cards/PostCard";
import { posts } from "@/constants";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: SearchParams) {
  const { query = "", filter = "" } = await searchParams;

  const filteredPosts = posts.filter((post) => {
    const matchesQuery =
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.summary.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter
      ? post.title.toLowerCase().includes(filter.toLowerCase()) ||
        post.summary.toLowerCase().includes(filter.toLowerCase())
      : true;
    return matchesQuery && matchesFilter;
  });

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

      <div>
        <HomeFilter />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
