import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2, X, Image as ImageIcon } from "lucide-react";

// Constants
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_IMAGE_SIZE_MB = 5;
const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_TECHNOLOGY_LENGTH = 50;
const MAX_TECHNOLOGIES = 10;
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { SkillsInput } from "~/components/SkillsInput";
import { useCreatePortfolioItem, useUpdatePortfolioItem } from "~/hooks/usePortfolio";
import { useImageUrl } from "~/hooks/useStorage";
import { uploadImageWithPresignedUrl } from "~/utils/storage/helpers";
import { toast } from "sonner";
import { authClient } from "~/lib/auth-client";
import type { PortfolioItem } from "~/db/schema";

const portfolioItemSchema = z.object({
  title: z.string().min(1, "Title is required").max(MAX_TITLE_LENGTH),
  description: z.string().max(MAX_DESCRIPTION_LENGTH).optional().nullable(),
  url: z.string().url("Invalid URL").optional().nullable().or(z.literal("")),
  technologies: z.array(z.string().max(MAX_TECHNOLOGY_LENGTH)).max(MAX_TECHNOLOGIES).optional(),
});

type PortfolioItemFormData = z.infer<typeof portfolioItemSchema>;

interface PortfolioItemFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editItem?: PortfolioItem | null;
}

export function PortfolioItemForm({
  open,
  onOpenChange,
  editItem,
}: PortfolioItemFormProps) {
  const { data: session } = authClient.useSession();
  const [imageKey, setImageKey] = useState<string | null>(editItem?.imageKey || null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const createMutation = useCreatePortfolioItem();
  const updateMutation = useUpdatePortfolioItem();
  const { data: imageData } = useImageUrl(imageKey || "");
  const existingImageUrl = imageData?.imageUrl;

  const isEditing = !!editItem;
  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useForm<PortfolioItemFormData>({
    resolver: zodResolver(portfolioItemSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
      technologies: [],
    },
  });

  // Reset form when editItem changes or dialog opens
  useEffect(() => {
    if (open) {
      if (editItem) {
        form.reset({
          title: editItem.title,
          description: editItem.description || "",
          url: editItem.url || "",
          technologies: editItem.technologies || [],
        });
        setImageKey(editItem.imageKey);
        setPreviewUrl(null);
      } else {
        form.reset({
          title: "",
          description: "",
          url: "",
          technologies: [],
        });
        setImageKey(null);
        setPreviewUrl(null);
      }
    }
  }, [open, editItem, form]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        toast.error(`File size must be less than ${MAX_IMAGE_SIZE_MB}MB`);
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      setIsUploading(true);

      try {
        const userId = session?.user?.id;
        if (!userId) {
          throw new Error("User not authenticated");
        }

        const fileExtension = file.name.split(".").pop() || "";
        const newImageKey = `portfolio/${userId}/${Date.now()}.${fileExtension}`;

        await uploadImageWithPresignedUrl(newImageKey, file);
        setImageKey(newImageKey);
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Image upload error:", error);
        toast.error("Failed to upload image");
        setPreviewUrl(null);
      } finally {
        setIsUploading(false);
      }
    },
    [session]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    disabled: isUploading || isPending,
  });

  const removeImage = () => {
    setImageKey(null);
    setPreviewUrl(null);
  };

  const onSubmit = (data: PortfolioItemFormData) => {
    if (isEditing && editItem) {
      updateMutation.mutate(
        {
          data: {
            id: editItem.id,
            ...data,
            imageKey,
          },
        },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        }
      );
    } else {
      createMutation.mutate(
        {
          data: {
            ...data,
            imageKey,
          },
        },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        }
      );
    }
  };

  const displayImageUrl = previewUrl || existingImageUrl;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Portfolio Item" : "Add Portfolio Item"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update your project details below."
              : "Showcase a project you've built or are working on."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Image Upload */}
            <div className="space-y-2">
              <FormLabel>Project Image</FormLabel>
              {displayImageUrl ? (
                <div className="relative rounded-lg overflow-hidden border border-border">
                  <img
                    src={displayImageUrl}
                    alt="Project preview"
                    className="w-full aspect-video object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                    disabled={isPending}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className={`
                    border-2 border-dashed rounded-lg aspect-video
                    flex flex-col items-center justify-center cursor-pointer
                    transition-colors
                    ${isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
                    ${isUploading ? "cursor-not-allowed opacity-60" : ""}
                  `}
                >
                  <input {...getInputProps()} />
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <span className="text-sm">Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      {isDragActive ? (
                        <>
                          <Upload className="h-8 w-8 text-primary" />
                          <span className="text-sm text-primary">Drop to upload</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="h-8 w-8" />
                          <span className="text-sm">
                            Drag & drop or click to upload
                          </span>
                          <span className="text-xs">PNG, JPG, GIF up to {MAX_IMAGE_SIZE_MB}MB</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="My Awesome Project"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value || ""}
                      placeholder="Describe your project, what it does, and what you learned..."
                      className="min-h-[100px] resize-none"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    {(field.value?.length || 0)} / {MAX_DESCRIPTION_LENGTH} characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* URL */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="https://myproject.com or https://github.com/user/repo"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    Link to the live project or repository
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Technologies */}
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies Used</FormLabel>
                  <FormControl>
                    <SkillsInput
                      skills={field.value || []}
                      onChange={field.onChange}
                      maxSkills={MAX_TECHNOLOGIES}
                      disabled={isPending}
                      placeholder="e.g., React, Node.js, PostgreSQL..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || isUploading}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {isEditing ? "Saving..." : "Creating..."}
                  </>
                ) : isEditing ? (
                  "Save Changes"
                ) : (
                  "Add Project"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
