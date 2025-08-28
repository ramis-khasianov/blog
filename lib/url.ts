import qs from "query-string";

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

/**
 * Adds or updates a single query parameter in the URL
 * 
 * Example: formUrlQuery({ params: "?page=1", key: "category", value: "electronics" })
 * Result: "/current-path?page=1&category=electronics"
 */
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  // Parse existing query parameters into an object
  const queryString = qs.parse(params);

  // Add or update the specified parameter
  queryString[key] = value;

  // Combine current pathname with updated query parameters
  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
};

export const removeKeysFromUrlQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const queryString = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete queryString[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true }
  );
};
