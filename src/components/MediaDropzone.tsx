import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, Film, X, Loader2, AlertCircle } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  type PendingUpload,
  type MediaUploadResult,
  validateMediaFile,
  createFilePreview,
  revokeFilePreview,
  uploadMediaFile,
  getAcceptedMediaTypes,
  formatFileSize,
  getMediaType,
} from "~/utils/storage/media-helpers";

interface MediaDropzoneProps {
  onUploadsComplete: (results: MediaUploadResult[]) => void;
  maxFiles?: number;
  disabled?: boolean;
  className?: string;
  compact?: boolean;
}

export function MediaDropzone({
  onUploadsComplete,
  maxFiles = 10,
  disabled = false,
  className,
  compact = false,
}: MediaDropzoneProps) {
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      pendingUploads.forEach((upload) => {
        if (upload.preview) {
          revokeFilePreview(upload.preview);
        }
      });
    };
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles: PendingUpload[] = [];
      const errors: string[] = [];

      // Check if adding these files would exceed the limit
      const currentCount = pendingUploads.filter(
        (u) => u.status !== "error"
      ).length;
      const availableSlots = maxFiles - currentCount;

      if (availableSlots <= 0) {
        return;
      }

      const filesToProcess = acceptedFiles.slice(0, availableSlots);

      for (const file of filesToProcess) {
        const validation = validateMediaFile(file);
        if (validation.valid) {
          validFiles.push({
            file,
            preview: createFilePreview(file),
            id: crypto.randomUUID(),
            status: "pending",
            progress: 0,
          });
        } else {
          errors.push(validation.error || "Invalid file");
        }
      }

      if (validFiles.length > 0) {
        setPendingUploads((prev) => [...prev, ...validFiles]);
      }
    },
    [maxFiles, pendingUploads]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: getAcceptedMediaTypes(),
    maxFiles: maxFiles - pendingUploads.length,
    disabled: disabled || isUploading,
    noClick: false,
    noKeyboard: false,
  });

  const removeUpload = (id: string) => {
    setPendingUploads((prev) => {
      const upload = prev.find((u) => u.id === id);
      if (upload?.preview) {
        revokeFilePreview(upload.preview);
      }
      return prev.filter((u) => u.id !== id);
    });
  };

  const uploadFiles = async () => {
    const pendingFiles = pendingUploads.filter((u) => u.status === "pending");
    if (pendingFiles.length === 0) return;

    setIsUploading(true);
    const results: MediaUploadResult[] = [];
    const completedUploads: PendingUpload[] = [];

    for (const upload of pendingFiles) {
      try {
        // Update status to uploading
        setPendingUploads((prev) =>
          prev.map((u) =>
            u.id === upload.id ? { ...u, status: "uploading" as const } : u
          )
        );

        const result = await uploadMediaFile(upload.file, (progress) => {
          setPendingUploads((prev) =>
            prev.map((u) =>
              u.id === upload.id ? { ...u, progress: progress.percentage } : u
            )
          );
        });

        // Include preview URL in the result for display in parent component
        const resultWithPreview: MediaUploadResult = {
          ...result,
          previewUrl: upload.preview,
        };
        results.push(resultWithPreview);
        completedUploads.push(upload);

        // Update status to completed
        setPendingUploads((prev) =>
          prev.map((u) =>
            u.id === upload.id
              ? { ...u, status: "completed" as const, progress: 100, result: resultWithPreview }
              : u
          )
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Upload failed";
        setPendingUploads((prev) =>
          prev.map((u) =>
            u.id === upload.id
              ? { ...u, status: "error" as const, error: errorMessage }
              : u
          )
        );
      }
    }

    setIsUploading(false);

    if (results.length > 0) {
      onUploadsComplete(results);
      // Clear completed uploads from state (don't revoke preview URLs - parent will handle that)
      setPendingUploads((prev) => prev.filter((u) => u.status !== "completed"));
    }
  };

  const hasFiles = pendingUploads.length > 0;
  const hasPendingFiles = pendingUploads.some((u) => u.status === "pending");

  if (compact && !hasFiles) {
    return (
      <div
        {...getRootProps()}
        className={cn(
          "flex items-center gap-2 p-2 rounded-lg border border-dashed border-border cursor-pointer hover:border-primary/50 transition-colors",
          isDragActive && "border-primary bg-primary/5",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <input {...getInputProps()} />
        <ImagePlus className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Add media</span>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50",
          (disabled || isUploading) && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ImagePlus className="h-5 w-5" />
            <Film className="h-5 w-5" />
          </div>
          <p className="text-sm text-muted-foreground">
            {isDragActive
              ? "Drop files here"
              : "Drag and drop images or videos"}
          </p>
          <p className="text-xs text-muted-foreground">
            Images: 5MB max | Videos: 100MB max | Max {maxFiles} files
          </p>
        </div>
      </div>

      {/* Preview Grid */}
      {hasFiles && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {pendingUploads.map((upload) => (
            <div
              key={upload.id}
              className="relative group aspect-square rounded-lg overflow-hidden bg-muted"
            >
              {/* Preview */}
              {getMediaType(upload.file.type) === "video" ? (
                <video
                  src={upload.preview}
                  className="w-full h-full object-cover"
                  muted
                />
              ) : (
                <img
                  src={upload.preview}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}

              {/* Overlay for uploading/error states */}
              {(upload.status === "uploading" || upload.status === "error") && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  {upload.status === "uploading" ? (
                    <div className="text-center text-white">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto mb-1" />
                      <span className="text-xs">{upload.progress}%</span>
                    </div>
                  ) : (
                    <div className="text-center text-destructive-foreground p-2">
                      <AlertCircle className="h-6 w-6 mx-auto mb-1 text-red-400" />
                      <span className="text-xs text-red-300">
                        {upload.error}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Progress bar */}
              {upload.status === "uploading" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${upload.progress}%` }}
                  />
                </div>
              )}

              {/* File info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white truncate">{upload.file.name}</p>
                <p className="text-xs text-white/70">
                  {formatFileSize(upload.file.size)}
                </p>
              </div>

              {/* Remove button */}
              {upload.status !== "uploading" && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeUpload(upload.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}

              {/* Type indicator */}
              {getMediaType(upload.file.type) === "video" && (
                <div className="absolute top-1 left-1 bg-black/60 rounded p-1">
                  <Film className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      {hasPendingFiles && (
        <Button
          type="button"
          onClick={uploadFiles}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              Upload {pendingUploads.filter((u) => u.status === "pending").length}{" "}
              file(s)
            </>
          )}
        </Button>
      )}
    </div>
  );
}
