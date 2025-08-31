"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const filters = [
  { name: "Database", value: "database" },
  { name: "ETL", value: "etl" },

  { name: "AI", value: "ai" },
  { name: "BI", value: "bi" },
  { name: "Popular", value: "popular" },
  { name: "Recommended", value: "recommended" },
];

const HomeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const [active, setActive] = useState(filterParams || "");

  const handleTypeClick = (filter: string) => {
    let newUrl = "";

    if (filter === active) {
      setActive("");

      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      setActive(filter);

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="hidden flex-wrap gap-4 sm:flex">
      {filters.map((filter) => (
        <Button
          key={filter.name}
          variant={active === filter.value ? "default" : "secondary"}
          size="sm"
          className={cn(
            `capitalize`,
            active === filter.value &&
              "bg-primary-500 text-white hover:bg-primary-600"
          )}
          onClick={() => handleTypeClick(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
