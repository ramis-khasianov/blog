import CategoryBadge from "./CategoryBadge";

interface Props {
  categories: PostCategory[];
  maxCategories?: number;
  className?: string;
  variant?: "default" | "overlay";
}

const PostCategories = ({ 
  categories, 
  maxCategories = 3, 
  className = "", 
  variant = "default" 
}: Props) => {
  if (!categories || categories.length === 0) return null;

  const badgeClassName = variant === "overlay" 
    ? "primary-gradient !text-light-850 border-0 shadow-md"
    : "";

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {categories.map((postCategory) => (
        <CategoryBadge
          key={postCategory.category.id}
          _id={postCategory.category.id.toString()}
          name={postCategory.category.name}
          compact
          className={badgeClassName}
        />
      ))}
    </div>
  );
};

export default PostCategories;