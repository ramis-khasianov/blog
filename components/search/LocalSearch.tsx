"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface Props {
  route: string; // Target route for search navigation
  placeholder: string; // Input placeholder text
  otherClasses?: string; // Additional CSS classes
}

/**
 * Search component that updates URL query parameters with debounced input
 * Maintains search state in URL for bookmarking and navigation
 */
const LocalSearch = ({ route, placeholder, otherClasses }: Props) => {
  // Get current page info and navigation tools
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize search with existing query parameter
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  // Debounced search - updates URL 300ms after user stops typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        // Add/update query parameter in URL
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        // Remove query parameter when search is cleared
        if (pathname === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 900); // 900ms debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, route, searchParams, pathname]);

  return (
    <div
      className={`bg-light-800 dark:dark-gradient flex min-h-[48px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {/* Search icon */}
      <Search size={20} className="shrink-0 text-muted-foreground" />

      {/* Search input field */}
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="paragraph-regular no-focus text-dark-400 dark:text-light-700 border-none shadow-none outline-none bg-transparent!"
      />
    </div>
  );
};

export default LocalSearch;
