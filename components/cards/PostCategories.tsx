import CategoryBadge from "./CategoryBadge";

interface Props {
  categories: PostCategory[];
  maxCategories?: number;
  className?: string;
  variant?: "default" | "overlay";
}

const PostCategories = ({ 
  categories, 
  maxCategories = 2, 
  className = "", 
  variant = "default" 
}: Props) => {
  if (!categories || categories.length === 0) return null;

  const visibleCategories = categories.slice(0, maxCategories);
  const remainingCount = categories.length - maxCategories;

  const badgeClassName = variant === "overlay" 
    ? "primary-gradient !text-light-850 border-0 shadow-md"
    : "";

  const counterClassName = variant === "overlay"
    ? "primary-gradient text-white px-2 py-1 rounded text-xs font-medium shadow-md"
    : "bg-light-700 dark:bg-dark-300 text-light-400 dark:text-light-500 px-2 py-1 rounded text-xs font-medium";

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {visibleCategories.map((postCategory) => (
        <CategoryBadge
          key={postCategory.category.id}
          _id={postCategory.category.id.toString()}
          name={postCategory.category.name}
          compact
          className={badgeClassName}
        />
      ))}
      {remainingCount > 0 && (
        <div className={counterClassName}>
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default PostCategories;