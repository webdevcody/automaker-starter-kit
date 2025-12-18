import { MessageSquare, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useStartConversation } from "~/hooks/useConversations";

interface StartConversationButtonProps {
  userId: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function StartConversationButton({
  userId,
  variant = "default",
  size = "default",
  className,
}: StartConversationButtonProps) {
  const startConversation = useStartConversation();

  const handleClick = () => {
    startConversation.mutate(userId);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={startConversation.isPending}
      className={className}
    >
      {startConversation.isPending ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : (
        <MessageSquare className="h-4 w-4 mr-2" />
      )}
      Send Message
    </Button>
  );
}
