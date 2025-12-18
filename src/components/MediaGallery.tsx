import { useState } from "react";
import { Play, Loader2, ImageIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import type { PostAttachment } from "~/db/schema";
import { useAttachmentUrls } from "~/hooks/useAttachments";
import { MediaLightbox } from "./MediaLightbox";

interface MediaGalleryProps {
  attachments: PostAttachment[];
  className?: string;
  maxVisible?: number;
  size?: "sm" | "md" | "lg";
  layout?: "gallery" | "thumbnails";
}

function MediaThumbnail({
  attachment,
  url,
  onClick,
  className,
}: {
  attachment: PostAttachment;
  url: string | undefined;
  onClick: () => void;
  className?: string;
}) {
  const [imageError, setImageError] = useState(false);

  if (!url) {
    return (
      <div
        className={cn(
          "bg-muted animate-pulse flex items-center justify-center",
          className
        )}
      >
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (attachment.type === "video") {
    return (
      <button
        className={cn(
          "relative bg-muted overflow-hidden group cursor-pointer",
          className
        )}
        onClick={onClick}
      >
        <video
          src={url}
          className="w-full h-full object-cover"
          muted
          preload="metadata"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="h-5 w-5 text-black ml-0.5" />
          </div>
        </div>
      </button>
    );
  }

  if (imageError) {
    return (
      <div
        className={cn(
          "bg-muted flex items-center justify-center",
          className
        )}
      >
        <ImageIcon className="h-6 w-6 text-muted-foreground" />
      </div>
    );
  }

  return (
    <button
      className={cn(
        "relative bg-muted overflow-hidden group cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <img
        src={url}
        alt={attachment.fileName || ""}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        onError={() => setImageError(true)}
      />
    </button>
  );
}

export function MediaGallery({
  attachments,
  className,
  maxVisible = 4,
  size = "md",
  layout = "gallery",
}: MediaGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { data: urlMap, isLoading } = useAttachmentUrls(attachments);

  if (attachments.length === 0) return null;

  const visibleAttachments = attachments.slice(0, maxVisible);
  const remainingCount = attachments.length - maxVisible;

  const sizeClasses = {
    sm: "h-24",
    md: "h-32",
    lg: "h-48",
  };

  const thumbnailSizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Thumbnails layout - small squares in a row
  if (layout === "thumbnails") {
    return (
      <>
        <div className={cn("flex flex-wrap gap-2", className)}>
          {visibleAttachments.map((attachment, index) => (
            <div key={attachment.id} className="relative">
              <MediaThumbnail
                attachment={attachment}
                url={urlMap?.[attachment.fileKey]}
                onClick={() => handleOpenLightbox(index)}
                className={cn("rounded-lg", thumbnailSizeClasses[size])}
              />
              {/* Overlay for showing remaining count on last visible item */}
              {index === maxVisible - 1 && remainingCount > 0 && (
                <button
                  className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors rounded-lg"
                  onClick={() => handleOpenLightbox(index)}
                >
                  <span className="text-white text-sm font-bold">
                    +{remainingCount}
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
        <MediaLightbox
          attachments={attachments}
          initialIndex={lightboxIndex}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          urlMap={urlMap}
        />
      </>
    );
  }

  // Single image layout
  if (attachments.length === 1) {
    return (
      <>
        <div className={cn("rounded-lg overflow-hidden", className)}>
          <MediaThumbnail
            attachment={attachments[0]}
            url={urlMap?.[attachments[0].fileKey]}
            onClick={() => handleOpenLightbox(0)}
            className={cn("w-full", sizeClasses[size])}
          />
        </div>
        <MediaLightbox
          attachments={attachments}
          initialIndex={lightboxIndex}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          urlMap={urlMap}
        />
      </>
    );
  }

  // Two images layout
  if (attachments.length === 2) {
    return (
      <>
        <div className={cn("grid grid-cols-2 gap-1 rounded-lg overflow-hidden", className)}>
          {attachments.map((attachment, index) => (
            <MediaThumbnail
              key={attachment.id}
              attachment={attachment}
              url={urlMap?.[attachment.fileKey]}
              onClick={() => handleOpenLightbox(index)}
              className={sizeClasses[size]}
            />
          ))}
        </div>
        <MediaLightbox
          attachments={attachments}
          initialIndex={lightboxIndex}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          urlMap={urlMap}
        />
      </>
    );
  }

  // Three images layout
  if (attachments.length === 3) {
    return (
      <>
        <div className={cn("grid grid-cols-2 gap-1 rounded-lg overflow-hidden", className)}>
          <MediaThumbnail
            attachment={attachments[0]}
            url={urlMap?.[attachments[0].fileKey]}
            onClick={() => handleOpenLightbox(0)}
            className={cn("row-span-2", size === "sm" ? "h-48" : size === "md" ? "h-64" : "h-96")}
          />
          <MediaThumbnail
            attachment={attachments[1]}
            url={urlMap?.[attachments[1].fileKey]}
            onClick={() => handleOpenLightbox(1)}
            className={sizeClasses[size]}
          />
          <MediaThumbnail
            attachment={attachments[2]}
            url={urlMap?.[attachments[2].fileKey]}
            onClick={() => handleOpenLightbox(2)}
            className={sizeClasses[size]}
          />
        </div>
        <MediaLightbox
          attachments={attachments}
          initialIndex={lightboxIndex}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          urlMap={urlMap}
        />
      </>
    );
  }

  // Four or more images layout
  return (
    <>
      <div className={cn("grid grid-cols-2 gap-1 rounded-lg overflow-hidden", className)}>
        {visibleAttachments.map((attachment, index) => (
          <div key={attachment.id} className="relative">
            <MediaThumbnail
              attachment={attachment}
              url={urlMap?.[attachment.fileKey]}
              onClick={() => handleOpenLightbox(index)}
              className={sizeClasses[size]}
            />
            {/* Overlay for showing remaining count on last visible item */}
            {index === maxVisible - 1 && remainingCount > 0 && (
              <button
                className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
                onClick={() => handleOpenLightbox(index)}
              >
                <span className="text-white text-2xl font-bold">
                  +{remainingCount}
                </span>
              </button>
            )}
          </div>
        ))}
      </div>
      <MediaLightbox
        attachments={attachments}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        urlMap={urlMap}
      />
    </>
  );
}
