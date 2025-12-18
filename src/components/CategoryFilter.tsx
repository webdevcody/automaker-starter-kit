import { cn } from "~/lib/utils";
import { POST_CATEGORIES, type PostCategory } from "~/fn/posts";

const CATEGORY_LABELS: Record<PostCategory | "all", string> = {
  all: "All",
  general: "General",
  question: "Question",
  discussion: "Discussion",
  announcement: "Announcement",
  feedback: "Feedback",
  showcase: "Showcase",
};

const CATEGORY_COLORS: Record<PostCategory | "all", string> = {
  all: "bg-muted hover:bg-muted/80 text-foreground",
  general: "bg-muted hover:bg-muted/80 text-muted-foreground",
  question: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400",
  discussion: "bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400",
  announcement: "bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400",
  feedback: "bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400",
  showcase: "bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-400",
};

const ACTIVE_RING_COLORS: Record<PostCategory | "all", string> = {
  all: "ring-2 ring-foreground/20",
  general: "ring-2 ring-muted-foreground/30",
  question: "ring-2 ring-blue-500/50",
  discussion: "ring-2 ring-purple-500/50",
  announcement: "ring-2 ring-amber-500/50",
  feedback: "ring-2 ring-green-500/50",
  showcase: "ring-2 ring-pink-500/50",
};

interface CategoryFilterProps {
  selectedCategory: PostCategory | undefined;
  onCategoryChange: (category: PostCategory | undefined) => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const categories: (PostCategory | "all")[] = ["all", ...POST_CATEGORIES];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive =
          category === "all" ? !selectedCategory : selectedCategory === category;

        return (
          <button
            key={category}
            onClick={() =>
              onCategoryChange(category === "all" ? undefined : category)
            }
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
              CATEGORY_COLORS[category],
              isActive && ACTIVE_RING_COLORS[category]
            )}
          >
            {CATEGORY_LABELS[category]}
          </button>
        );
      })}
    </div>
  );
}
