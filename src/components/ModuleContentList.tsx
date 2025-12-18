import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Video, FileText, Image, File, CheckSquare, Trash2, ExternalLink } from "lucide-react";
import { Button } from "~/components/ui/button";
import { moduleContentsQueryOptions } from "~/queries/modules";
import { useDeleteModuleContent } from "~/hooks/useModules";
import { ConfirmDeleteDialog } from "~/components/ConfirmDeleteDialog";
import type { ModuleContent, ModuleContentType } from "~/db/schema";

const CONTENT_TYPE_ICONS: Record<ModuleContentType, React.ComponentType<{ className?: string }>> = {
  video: Video,
  task: CheckSquare,
  image: Image,
  pdf: File,
  text: FileText,
};

const CONTENT_TYPE_LABELS: Record<ModuleContentType, string> = {
  video: "Video",
  task: "Task",
  image: "Image",
  pdf: "PDF",
  text: "Text",
};

interface ContentItemProps {
  content: ModuleContent;
  isAdmin: boolean;
  moduleId: string;
}

function ContentItem({ content, isAdmin, moduleId }: ContentItemProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const deleteContent = useDeleteModuleContent(moduleId);

  const Icon = CONTENT_TYPE_ICONS[content.type as ModuleContentType] || FileText;

  const handleDelete = () => {
    deleteContent.mutate(content.id, {
      onSuccess: () => setDeleteDialogOpen(false),
    });
  };

  const renderContent = () => {
    switch (content.type) {
      case "video":
        if (content.url) {
          // Check if it's a YouTube or Vimeo embed
          const isYouTube = content.url.includes("youtube.com") || content.url.includes("youtu.be");
          const isVimeo = content.url.includes("vimeo.com");

          if (isYouTube || isVimeo) {
            let embedUrl = content.url;
            if (isYouTube) {
              const videoId = content.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
              embedUrl = `https://www.youtube.com/embed/${videoId}`;
            } else if (isVimeo) {
              const videoId = content.url.match(/vimeo\.com\/(\d+)/)?.[1];
              embedUrl = `https://player.vimeo.com/video/${videoId}`;
            }
            return (
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );
          }

          // Direct video file
          return (
            <video
              src={content.url}
              controls
              className="w-full rounded-lg max-h-96"
            >
              Your browser does not support the video tag.
            </video>
          );
        }
        return <p className="text-muted-foreground text-sm">No video available</p>;

      case "image":
        if (content.url) {
          return (
            <img
              src={content.url}
              alt={content.title}
              className="max-w-full rounded-lg max-h-96 object-contain"
            />
          );
        }
        return <p className="text-muted-foreground text-sm">No image available</p>;

      case "pdf":
        if (content.url) {
          return (
            <div className="flex items-center gap-4">
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <File className="h-5 w-5" />
                View PDF
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          );
        }
        return <p className="text-muted-foreground text-sm">No PDF available</p>;

      case "text":
      case "task":
        if (content.content) {
          return (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap">{content.content}</div>
            </div>
          );
        }
        return <p className="text-muted-foreground text-sm">No content available</p>;

      default:
        return null;
    }
  };

  return (
    <>
      <div className="border rounded-lg p-4 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-3 text-left flex-1 min-w-0 hover:opacity-80"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm line-clamp-1">{content.title}</h4>
              <p className="text-xs text-muted-foreground">
                {CONTENT_TYPE_LABELS[content.type as ModuleContentType]}
              </p>
            </div>
          </button>

          {isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive shrink-0"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {content.description && (
          <p className="text-sm text-muted-foreground">{content.description}</p>
        )}

        {expanded && (
          <div className="pt-3 border-t">
            {renderContent()}
          </div>
        )}
      </div>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Content"
        description={`Are you sure you want to delete "${content.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        isPending={deleteContent.isPending}
      />
    </>
  );
}

interface ModuleContentListProps {
  moduleId: string;
  isAdmin: boolean;
}

export function ModuleContentList({ moduleId, isAdmin }: ModuleContentListProps) {
  const { data: contents, isLoading } = useQuery(moduleContentsQueryOptions(moduleId));

  if (isLoading) {
    return (
      <div className="space-y-3 py-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
                <div className="h-3 bg-muted rounded w-1/4 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!contents || contents.length === 0) {
    return (
      <div className="py-8 text-center">
        <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          {isAdmin
            ? "No content yet. Click the + button to add content."
            : "No content available in this module."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 py-4">
      {contents.map((content) => (
        <ContentItem
          key={content.id}
          content={content}
          isAdmin={isAdmin}
          moduleId={moduleId}
        />
      ))}
    </div>
  );
}
