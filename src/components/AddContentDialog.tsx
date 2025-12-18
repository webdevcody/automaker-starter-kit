import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { ContentForm, type ContentSubmitData } from "~/components/ContentForm";
import { useCreateModuleContent } from "~/hooks/useModules";

interface AddContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleId: string;
  moduleTitle: string;
}

export function AddContentDialog({
  open,
  onOpenChange,
  moduleId,
  moduleTitle,
}: AddContentDialogProps) {
  const createContentMutation = useCreateModuleContent();

  const handleSubmit = async (data: ContentSubmitData) => {
    createContentMutation.mutate(
      { moduleId, ...data },
      { onSuccess: () => onOpenChange(false) }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Content</DialogTitle>
          <DialogDescription>
            Add content to "{moduleTitle}". You can add videos, tasks, PDFs, images, or text.
          </DialogDescription>
        </DialogHeader>
        <ContentForm
          key={moduleId}
          onSubmit={handleSubmit}
          isPending={createContentMutation.isPending}
          submitLabel="Add Content"
          onCancel={() => onOpenChange(false)}
          cancelLabel="Cancel"
        />
      </DialogContent>
    </Dialog>
  );
}
