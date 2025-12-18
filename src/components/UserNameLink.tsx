import { Link } from "@tanstack/react-router";
import { cn } from "~/lib/utils";

interface UserNameLinkProps {
  userId: string;
  name: string | null;
  className?: string;
  fallback?: string;
}

export function UserNameLink({
  userId,
  name,
  className = "",
  fallback = "Anonymous",
}: UserNameLinkProps) {
  return (
    <Link
      to="/profile/$userId"
      params={{ userId }}
      className={cn(
        "font-medium hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded",
        className
      )}
    >
      {name || fallback}
    </Link>
  );
}
