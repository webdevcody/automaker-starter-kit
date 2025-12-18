import { Loader2, Film, X } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import type { PostAttachment } from "~/db/schema";
import type { MediaUploadResult } from "~/utils/storage/media-helpers";

export interface AttachmentThumbnailProps {
  /** PostAttachment from database */
  attachment?: PostAttachment;
  /** MediaUploadResult for newly uploaded files */
  uploadResult?: MediaUploadResult;
  /** URL for the attachment (required if using attachment) */
  url?: string | null;
  /** Size of the thumbnail */
  size?: "sm" | "md" | "lg";
  /** Whether to show a delete button */
  showDelete?: boolean;
  /** Callback when delete button is clicked */
  onDelete?: () => void;
  /** Whether the delete action is disabled */
  deleteDisabled?: boolean;
  /** Additional className */
  className?: string;
  /** Callback when thumbnail is clicked */
  onClick?: () => void;
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-20 h-20",
};

export function AttachmentThumbnail({
  attachment,
  uploadResult,
  url,
  size = "md",
  showDelete = false,
  onDelete,
  deleteDisabled = false,
  className,
  onClick,
}: AttachmentThumbnailProps) {
  // Determine which source we're using
  const isUploadResult = !!uploadResult;
  const attachmentData = uploadResult || attachment;

  if (!attachmentData) {
    return null;
  }

  // Get the URL - prefer provided url, then uploadResult previewUrl
  const displayUrl = url ?? uploadResult?.previewUrl;
  const fileName = attachmentData.fileName || "";
  const type = attachmentData.type;

  const containerClasses = cn(
    "relative group rounded-lg overflow-hidden bg-muted",
    sizeClasses[size],
    onClick && "cursor-pointer",
    className
  );

  const content = (
    <>
      {displayUrl ? (
        type === "video" ? (
          <>
            <video
              src={displayUrl}
              className="w-full h-full object-cover"
              muted
            />
            <div className="absolute top-1 left-1 bg-black/60 rounded p-0.5">
              <Film
                className={cn(
                  size === "sm"
                    ? "h-2 w-2"
                    : size === "md"
                      ? "h-2.5 w-2.5"
                      : "h-3 w-3",
                  "text-white"
                )}
              />
            </div>
          </>
        ) : (
          <img
            src={displayUrl}
            alt={fileName}
            className="w-full h-full object-cover"
          />
        )
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {isUploadResult ? (
            <span
              className={cn(
                "text-xs text-muted-foreground",
                size === "sm" && "text-[10px]"
              )}
            >
              {type === "video" ? "Video" : "Image"}
            </span>
          ) : (
            <Loader2
              className={cn(
                "animate-spin text-muted-foreground",
                size === "sm"
                  ? "h-3 w-3"
                  : size === "md"
                    ? "h-3 w-3"
                    : "h-4 w-4"
              )}
            />
          )}
        </div>
      )}
      {showDelete && onDelete && (
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          disabled={deleteDisabled}
          className={cn(
            "absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
            size === "sm" ? "h-4 w-4" : size === "md" ? "h-4 w-4" : "h-5 w-5"
          )}
        >
          <X
            className={cn(
              size === "sm"
                ? "h-2 w-2"
                : size === "md"
                  ? "h-2.5 w-2.5"
                  : "h-3 w-3"
            )}
          />
        </Button>
      )}
    </>
  );

  if (onClick) {
    return (
      <div className={containerClasses} onClick={onClick}>
        {content}
      </div>
    );
  }

  return <div className={containerClasses}>{content}</div>;
}
