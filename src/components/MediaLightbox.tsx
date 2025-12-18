import { useEffect, useCallback, useState } from "react";
import { X, ChevronLeft, ChevronRight, Play, Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import type { PostAttachment } from "~/db/schema";
import { useAttachmentUrl } from "~/hooks/useAttachments";

interface MediaLightboxProps {
  attachments: PostAttachment[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
  urlMap?: Record<string, string>;
}

function MediaItem({
  attachment,
  url,
  isActive,
}: {
  attachment: PostAttachment;
  url: string | null | undefined;
  isActive: boolean;
}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  if (!url) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (attachment.type === "video") {
    return (
      <div className="relative max-h-[90vh] max-w-[90vw]">
        <video
          src={url}
          className="max-h-[90vh] max-w-[90vw] object-contain"
          controls={isActive && isVideoPlaying}
          autoPlay={isActive && isVideoPlaying}
          onClick={() => setIsVideoPlaying(true)}
        />
        {!isVideoPlaying && (
          <button
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
            onClick={() => setIsVideoPlaying(true)}
          >
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="h-8 w-8 text-black ml-1" />
            </div>
          </button>
        )}
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={attachment.fileName || ""}
      className="max-h-[90vh] max-w-[90vw] object-contain"
    />
  );
}

function MediaItemWithUrl({
  attachment,
  isActive,
  urlMap,
}: {
  attachment: PostAttachment;
  isActive: boolean;
  urlMap?: Record<string, string>;
}) {
  // If URL is provided in map, use it directly
  if (urlMap && urlMap[attachment.fileKey]) {
    return (
      <MediaItem
        attachment={attachment}
        url={urlMap[attachment.fileKey]}
        isActive={isActive}
      />
    );
  }

  // Otherwise fetch it
  const { data: url, isLoading } = useAttachmentUrl(attachment.fileKey);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return <MediaItem attachment={attachment} url={url} isActive={isActive} />;
}

export function MediaLightbox({
  attachments,
  initialIndex = 0,
  open,
  onClose,
  urlMap,
}: MediaLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset index when opening or when initialIndex changes
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? attachments.length - 1 : prev - 1
    );
  }, [attachments.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === attachments.length - 1 ? 0 : prev + 1
    );
  }, [attachments.length]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, handlePrevious, handleNext]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || attachments.length === 0) return null;

  const currentAttachment = attachments[currentIndex];
  const showNavigation = attachments.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Previous button */}
      {showNavigation && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 z-10 text-white hover:bg-white/10 h-12 w-12"
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      )}

      {/* Main content */}
      <div
        className="flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <MediaItemWithUrl
          attachment={currentAttachment}
          isActive={true}
          urlMap={urlMap}
        />
      </div>

      {/* Next button */}
      {showNavigation && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 z-10 text-white hover:bg-white/10 h-12 w-12"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      )}

      {/* Counter */}
      {showNavigation && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
          {currentIndex + 1} / {attachments.length}
        </div>
      )}

      {/* Thumbnail strip */}
      {showNavigation && attachments.length <= 10 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
          {attachments.map((att, idx) => {
            const thumbUrl = urlMap?.[att.fileKey];
            return (
              <button
                key={att.id}
                className={cn(
                  "w-12 h-12 rounded overflow-hidden border-2 transition-all",
                  idx === currentIndex
                    ? "border-white scale-110"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
              >
                {thumbUrl ? (
                  att.type === "video" ? (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Play className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <img
                      src={thumbUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
