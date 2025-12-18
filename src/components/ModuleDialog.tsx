import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { ModuleForm, type ModuleSubmitData } from "~/components/ModuleForm";
import { useCreateModule, useUpdateModule } from "~/hooks/useModules";
import type { ClassroomModuleWithUser } from "~/data-access/modules";

interface ModuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Module to edit. If null/undefined, dialog is in create mode */
  module?: ClassroomModuleWithUser | null;
}

function getDefaultValuesForEdit(module: ClassroomModuleWithUser) {
  return {
    title: module.title,
    description: module.description || "",
    isPublished: module.isPublished,
  };
}

export function ModuleDialog({
  open,
  onOpenChange,
  module,
}: ModuleDialogProps) {
  const createModuleMutation = useCreateModule();
  const updateModuleMutation = useUpdateModule();

  const isEditMode = !!module;
  const mutation = isEditMode ? updateModuleMutation : createModuleMutation;

  const defaultValues = isEditMode
    ? getDefaultValuesForEdit(module)
    : undefined;

  const handleSubmit = async (data: ModuleSubmitData) => {
    if (isEditMode) {
      updateModuleMutation.mutate(
        { id: module.id, ...data },
        { onSuccess: () => onOpenChange(false) }
      );
    } else {
      createModuleMutation.mutate(data, {
        onSuccess: () => onOpenChange(false),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Module" : "Create Module"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the module details."
              : "Add a new module to organize educational content."}
          </DialogDescription>
        </DialogHeader>
        <ModuleForm
          key={isEditMode ? module.id : "create"}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isPending={mutation.isPending}
          submitLabel={isEditMode ? "Save Changes" : "Create Module"}
          onCancel={() => onOpenChange(false)}
          cancelLabel="Cancel"
        />
      </DialogContent>
    </Dialog>
  );
}
