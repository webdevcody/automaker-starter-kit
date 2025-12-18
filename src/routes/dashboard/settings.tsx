import { createFileRoute } from "@tanstack/react-router";
import { Page } from "~/components/Page";
import { AppBreadcrumb } from "~/components/AppBreadcrumb";
import { useUpdateUserProfile } from "~/hooks/useProfile";
import { uploadImageWithPresignedUrl } from "~/utils/storage/helpers";
import { toast } from "sonner";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { authClient } from "~/lib/auth-client";
import { useUserAvatar } from "~/hooks/useUserAvatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "~/components/ui/panel";
import { UserAvatar } from "~/components/UserAvatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Upload, User, Home } from "lucide-react";
import { assertAuthenticatedFn } from "~/fn/guards";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
  beforeLoad: async () => {
    await assertAuthenticatedFn();
  },
});

const profileSettingsSchema = z.object({
  name: z
    .string()
    .min(1, "Display name is required")
    .min(2, "Display name must be at least 2 characters")
    .max(50, "Display name must be 50 characters or less")
    .trim(),
});

type ProfileSettingsFormData = z.infer<typeof profileSettingsSchema>;

function ProfileSettings() {
  const { data: session } = authClient.useSession();
  const [isUploading, setIsUploading] = useState(false);
  const { avatarUrl } = useUserAvatar();

  const updateProfileMutation = useUpdateUserProfile();

  const form = useForm<ProfileSettingsFormData>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      name: session?.user?.name || "",
    },
  });

  // Update form when session changes
  useEffect(() => {
    if (session?.user?.name) {
      form.reset({ name: session.user.name });
    }
  }, [session?.user?.name, form]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      setIsUploading(true);

      try {
        // Generate image key
        const userId = session?.user?.id;
        if (!userId) {
          throw new Error("User not authenticated");
        }

        const fileExtension = file.name.split(".").pop() || "";
        const imageKey = `profile-images/${userId}/${Date.now()}.${fileExtension}`;

        // Upload using helper function
        await uploadImageWithPresignedUrl(imageKey, file);

        // Update user profile with new image key
        await updateProfileMutation.mutateAsync({
          data: { image: imageKey },
        });

        toast.success("Avatar uploaded successfully");
      } catch (error) {
        console.error("Avatar upload error:", error);
        toast.error("Failed to upload avatar");
      } finally {
        setIsUploading(false);
      }
    },
    [updateProfileMutation, session]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
  });

  const onSubmit = (data: ProfileSettingsFormData) => {
    updateProfileMutation.mutate({
      data: { name: data.name },
    });
  };

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Settings
        </PanelTitle>
      </PanelHeader>
      <PanelContent className="space-y-6">
        {/* Profile Settings Row */}
        <div className="flex items-start gap-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center space-y-2">
            <Label className="self-start">Profile Picture</Label>
            <div
              {...getRootProps()}
              className={`relative cursor-pointer group w-20 h-20 ${
                isUploading ? "cursor-not-allowed" : ""
              }`}
            >
              <input {...getInputProps()} disabled={isUploading} />
              <UserAvatar
                imageKey={session?.user?.image || null}
                name={session?.user?.name || null}
                email={session?.user?.email || null}
                size="xl"
              />
              <div
                className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                  isUploading ? "opacity-100" : ""
                }`}
              >
                {isUploading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                ) : (
                  <Upload className="h-5 w-5 text-white" />
                )}
              </div>
              {isDragActive && (
                <div className="absolute inset-0 border-2 border-dashed border-primary bg-primary/20 rounded-full flex items-center justify-center">
                  <Upload className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Click to upload
              <br />
              PNG, JPG, GIF up to 5MB
            </p>
          </div>

          {/* Display Name */}
          <div className="flex-1">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your display name"
                            disabled={updateProfileMutation.isPending}
                          />
                        </FormControl>
                        <Button
                          type="submit"
                          disabled={
                            updateProfileMutation.isPending ||
                            !form.formState.isDirty ||
                            !form.formState.isValid
                          }
                        >
                          {updateProfileMutation.isPending
                            ? "Saving..."
                            : "Save"}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}

function SettingsPage() {
  return (
    <Page>
      <AppBreadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard", icon: Home },
          { label: "Settings" },
        ]}
      />

      <div className="mt-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your profile information and avatar
          </p>
        </div>

        <ProfileSettings />
      </div>
    </Page>
  );
}
