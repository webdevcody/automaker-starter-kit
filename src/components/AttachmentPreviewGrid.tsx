import { Loader2 } from "lucide-react";
import { AttachmentThumbnail } from "./AttachmentThumbnail";
import type { PostAttachment } from "~/db/schema";
import type { MediaUploadResult } from "~/utils/storage/media-helpers";

export interface AttachmentPreviewGridProps {
  /** Existing attachments from database */
  existingAttachments?: PostAttachment[];
  /** Newly uploaded attachments */
  uploadedAttachments?: MediaUploadResult[];
  /** Map of fileKey to URL for existing attachments */
  existingUrlMap?: Record<string, string>;
  /** IDs of attachments to hide (deleted) */
  deletedAttachmentIds?: string[];
  /** Size of thumbnails */
  size?: "sm" | "md" | "lg";
  /** Whether to show delete buttons */
  showDelete?: boolean;
  /** Callback when an existing attachment is deleted */
  onDeleteExisting?: (id: string) => void;
  /** Callback when an uploaded attachment is removed */
  onDeleteUploaded?: (id: string) => void;
  /** Whether delete actions are disabled */
  deleteDisabled?: boolean;
  /** Whether attachments are loading */
  isLoading?: boolean;
  /** Additional className */
  className?: string;
  /** Label for the grid */
  label?: string;
}

export function AttachmentPreviewGrid({
  existingAttachments = [],
  uploadedAttachments = [],
  existingUrlMap = {},
  deletedAttachmentIds = [],
  size = "md",
  showDelete = false,
  onDeleteExisting,
  onDeleteUploaded,
  deleteDisabled = false,
  isLoading = false,
  className,
  label,
}: AttachmentPreviewGridProps) {
  // Filter out deleted attachments
  const visibleExistingAttachments = existingAttachments.filter(
    (att) => !deletedAttachmentIds.includes(att.id)
  );

  const totalAttachments =
    visibleExistingAttachments.length + uploadedAttachments.length;

  if (isLoading) {
    return (
      <div className="space-y-2">
        {label && <p className="text-sm font-medium">{label}</p>}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading attachments...
        </div>
      </div>
    );
  }

  if (totalAttachments === 0) {
    return null;
  }

  return (
    <div className={className}>
      {label && (
        <p className="text-sm font-medium mb-2">
          {label} ({totalAttachments})
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {/* Existing attachments from database */}
        {visibleExistingAttachments.map((attachment) => (
          <AttachmentThumbnail
            key={attachment.id}
            attachment={attachment}
            url={existingUrlMap[attachment.fileKey]}
            size={size}
            showDelete={showDelete}
            onDelete={() => onDeleteExisting?.(attachment.id)}
            deleteDisabled={deleteDisabled}
          />
        ))}

        {/* Newly uploaded attachments */}
        {uploadedAttachments.map((uploadResult) => (
          <AttachmentThumbnail
            key={uploadResult.id}
            uploadResult={uploadResult}
            size={size}
            showDelete={showDelete}
            onDelete={() => onDeleteUploaded?.(uploadResult.id)}
            deleteDisabled={deleteDisabled}
          />
        ))}
      </div>
    </div>
  );
}
