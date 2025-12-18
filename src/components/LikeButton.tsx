import { Heart } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  isLoading?: boolean;
  onClick: () => void;
  size?: "sm" | "default";
  className?: string;
}

export function LikeButton({
  isLiked,
  likeCount,
  isLoading,
  onClick,
  size = "default",
  className,
}: LikeButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <Button
      variant="ghost"
      size={size === "sm" ? "sm" : "sm"}
      className={cn(
        "gap-1 text-muted-foreground hover:text-foreground transition-colors",
        size === "sm" && "h-7 text-xs",
        isLiked && "text-red-500 hover:text-red-600",
        className
      )}
      onClick={handleClick}
      disabled={isLoading}
    >
      <Heart
        className={cn(
          size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5",
          isLiked && "fill-current"
        )}
      />
      <span>{likeCount}</span>
    </Button>
  );
}
