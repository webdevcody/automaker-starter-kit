import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { MediaDropzone } from "~/components/MediaDropzone";
import type { MediaUploadResult } from "~/utils/storage/media-helpers";
import { cn } from "~/lib/utils";

export interface MediaUploadToggleProps {
  /** Callback when uploads are complete */
  onUploadsComplete: (results: MediaUploadResult[]) => void;
  /** Maximum number of files allowed */
  maxFiles: number;
  /** Current number of attachments (existing + uploaded) */
  currentAttachmentCount: number;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Button variant */
  buttonVariant?:
    | "default"
    | "outline"
    | "ghost"
    | "destructive"
    | "secondary"
    | "link";
  /** Button size */
  buttonSize?: "default" | "sm" | "lg" | "icon";
  /** Additional button className */
  buttonClassName?: string;
  /** Button label text */
  buttonLabel?: string;
  /** Label when max files reached */
  maxFilesReachedLabel?: string;
  /** Whether to use compact MediaDropzone */
  compact?: boolean;
  /** Whether to show cancel button when no attachments */
  showCancelButton?: boolean;
  /** Controlled state for dropzone visibility (if not provided, uses internal state) */
  showDropzone?: boolean;
  /** Callback when dropzone visibility changes (for controlled mode) */
  onShowDropzoneChange?: (show: boolean) => void;
  /** Additional className for container */
  className?: string;
}

export function MediaUploadToggle({
  onUploadsComplete,
  maxFiles,
  currentAttachmentCount,
  disabled = false,
  buttonVariant = "ghost",
  buttonSize = "sm",
  buttonClassName,
  buttonLabel = "Add media",
  maxFilesReachedLabel = "Maximum files reached",
  compact = false,
  showCancelButton = true,
  showDropzone: controlledShowDropzone,
  onShowDropzoneChange,
  className,
}: MediaUploadToggleProps) {
  const [internalShowDropzone, setInternalShowDropzone] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const showDropzone = controlledShowDropzone ?? internalShowDropzone;
  const setShowDropzone = (value: boolean) => {
    if (onShowDropzoneChange) {
      onShowDropzoneChange(value);
    } else {
      setInternalShowDropzone(value);
    }
  };

  const isMaxReached = currentAttachmentCount >= maxFiles;
  const availableSlots = Math.max(0, maxFiles - currentAttachmentCount);
  const hasNoAttachments = currentAttachmentCount === 0;

  if (!showDropzone) {
    return (
      <Button
        type="button"
        variant={buttonVariant}
        size={buttonSize}
        className={cn(buttonClassName)}
        onClick={() => setShowDropzone(true)}
        disabled={disabled || isMaxReached}
      >
        <ImagePlus className="h-4 w-4 mr-1" />
        {isMaxReached ? maxFilesReachedLabel : buttonLabel}
      </Button>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <MediaDropzone
        onUploadsComplete={(results) => {
          onUploadsComplete(results);
          // Auto-hide dropzone after successful upload if we have max files
          // Only auto-hide if using internal state (not controlled)
          if (
            !onShowDropzoneChange &&
            currentAttachmentCount + results.length >= maxFiles
          ) {
            setShowDropzone(false);
          }
        }}
        maxFiles={availableSlots}
        disabled={disabled}
        compact={compact}
      />
      {showCancelButton && hasNoAttachments && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowDropzone(false)}
        >
          Cancel
        </Button>
      )}
    </div>
  );
}
