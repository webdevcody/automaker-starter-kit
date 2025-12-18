import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Sparkles,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Eye,
  EyeOff,
  Loader2,
  Save,
} from "lucide-react";

// Constants
const MAX_BIO_LENGTH = 1000;
const MAX_SKILL_LENGTH = 50;
const MAX_SKILLS = 20;
const MAX_LOOKING_FOR_LENGTH = 500;
const BIO_WARNING_THRESHOLD = 900;
const LOOKING_FOR_WARNING_THRESHOLD = 450;
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import {
  Panel,
  PanelContent,
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "~/components/ui/panel";
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
import {
  useMyProfile,
  useUpdateExtendedProfile,
  useToggleProfileVisibility,
} from "~/hooks/useProfile";
import type { UserProfile } from "~/db/schema";

const profileFormSchema = z.object({
  bio: z
    .string()
    .max(MAX_BIO_LENGTH, `Bio must be ${MAX_BIO_LENGTH} characters or less`)
    .optional()
    .nullable(),
  skills: z.array(z.string().max(MAX_SKILL_LENGTH)).max(MAX_SKILLS).optional(),
  lookingFor: z
    .string()
    .max(
      MAX_LOOKING_FOR_LENGTH,
      `Looking for must be ${MAX_LOOKING_FOR_LENGTH} characters or less`
    )
    .optional()
    .nullable(),
  githubUrl: z
    .string()
    .url("Invalid URL")
    .optional()
    .nullable()
    .or(z.literal("")),
  linkedinUrl: z
    .string()
    .url("Invalid URL")
    .optional()
    .nullable()
    .or(z.literal("")),
  websiteUrl: z
    .string()
    .url("Invalid URL")
    .optional()
    .nullable()
    .or(z.literal("")),
  twitterUrl: z
    .string()
    .url("Invalid URL")
    .optional()
    .nullable()
    .or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

export function ExtendedProfileForm() {
  const { data: profile, isLoading } = useMyProfile();
  const updateProfileMutation = useUpdateExtendedProfile();
  const toggleVisibilityMutation = useToggleProfileVisibility();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      bio: "",
      skills: [],
      lookingFor: "",
      githubUrl: "",
      linkedinUrl: "",
      websiteUrl: "",
      twitterUrl: "",
    },
  });

  // Update form when profile loads
  useEffect(() => {
    if (profile) {
      form.reset({
        bio: profile.bio || "",
        skills: profile.skills || [],
        lookingFor: profile.lookingFor || "",
        githubUrl: profile.githubUrl || "",
        linkedinUrl: profile.linkedinUrl || "",
        websiteUrl: profile.websiteUrl || "",
        twitterUrl: profile.twitterUrl || "",
      });
    }
  }, [profile, form]);

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate({ data });
  };

  const handleToggleVisibility = () => {
    if (profile) {
      toggleVisibilityMutation.mutate({
        data: { isPublic: !profile.isPublic },
      });
    }
  };

  if (isLoading) {
    return (
      <Panel>
        <PanelContent className="p-8 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </PanelContent>
      </Panel>
    );
  }

  const bioLength = form.watch("bio")?.length || 0;
  const lookingForLength = form.watch("lookingFor")?.length || 0;

  return (
    <Panel className="border-border/60 shadow-sm">
      <PanelHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <PanelTitle className="text-lg">Extended Profile</PanelTitle>
              <PanelDescription>
                Tell the community more about yourself
              </PanelDescription>
            </div>
          </div>

          {/* Visibility toggle */}
          <div className="flex items-center gap-2">
            <Label
              htmlFor="visibility"
              className="text-sm text-muted-foreground"
            >
              {profile?.isPublic ? (
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  Public
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <EyeOff className="h-4 w-4" />
                  Private
                </span>
              )}
            </Label>
            <Switch
              id="visibility"
              checked={profile?.isPublic ?? true}
              onCheckedChange={handleToggleVisibility}
              disabled={toggleVisibilityMutation.isPending}
            />
          </div>
        </div>
      </PanelHeader>

      <PanelContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value || ""}
                      placeholder="Tell us about yourself, your background, and what you're passionate about..."
                      className="min-h-[120px] resize-none"
                      disabled={updateProfileMutation.isPending}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between">
                    <span>A brief introduction about yourself</span>
                    <span
                      className={
                        bioLength > BIO_WARNING_THRESHOLD
                          ? "text-destructive"
                          : ""
                      }
                    >
                      {bioLength} / {MAX_BIO_LENGTH}
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Skills */}
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills & Technologies</FormLabel>
                  <FormControl>
                    <SkillsInput
                      skills={field.value || []}
                      onChange={field.onChange}
                      disabled={updateProfileMutation.isPending}
                      placeholder="e.g., React, TypeScript, Node.js..."
                    />
                  </FormControl>
                  <FormDescription>
                    Add technologies, frameworks, and skills you're proficient
                    in
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Looking For */}
            <FormField
              control={form.control}
              name="lookingFor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are you looking for?</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value || ""}
                      placeholder="Looking to collaborate on open source projects, seeking mentorship in backend development, open to freelance opportunities..."
                      className="min-h-[80px] resize-none"
                      disabled={updateProfileMutation.isPending}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between">
                    <span>
                      What kind of connections or opportunities are you
                      interested in?
                    </span>
                    <span
                      className={
                        lookingForLength > LOOKING_FOR_WARNING_THRESHOLD
                          ? "text-destructive"
                          : ""
                      }
                    >
                      {lookingForLength} / {MAX_LOOKING_FOR_LENGTH}
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Social Links */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Social Links</Label>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder="https://github.com/username"
                            className="pl-10"
                            disabled={updateProfileMutation.isPending}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder="https://linkedin.com/in/username"
                            className="pl-10"
                            disabled={updateProfileMutation.isPending}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="twitterUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder="https://twitter.com/username"
                            className="pl-10"
                            disabled={updateProfileMutation.isPending}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder="https://yourwebsite.com"
                            className="pl-10"
                            disabled={updateProfileMutation.isPending}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="min-w-[140px]"
              >
                {updateProfileMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </PanelContent>
    </Panel>
  );
}
