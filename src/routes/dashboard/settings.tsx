import { createFileRoute } from "@tanstack/react-router";
import { Page } from "~/components/Page";
import { PageTitle } from "~/components/PageTitle";
import { SubscriptionStatus } from "~/components/SubscriptionStatus";
import { AppBreadcrumb } from "~/components/AppBreadcrumb";
import { PricingCard } from "~/components/PricingCard";
import { SUBSCRIPTION_PLANS } from "~/lib/plans";
import {
  useUserPlan,
  useCreateCheckoutSession,
  useCreatePortalSession,
  useCancelSubscription,
} from "~/hooks/useSubscription";
import { useUpdateUserProfile, useDeleteUserAccount } from "~/hooks/useProfile";
import { uploadImageWithPresignedUrl } from "~/utils/storage/helpers";
import { toast } from "sonner";
import { useState, useCallback, useEffect, useRef } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Upload,
  User,
  Home,
  Trash2,
  AlertTriangle,
  CreditCard,
  Briefcase,
  UserCircle,
} from "lucide-react";
import { assertAuthenticatedFn } from "~/fn/guards";
import { ExtendedProfileForm } from "~/components/ExtendedProfileForm";
import { PortfolioSection } from "~/components/PortfolioSection";
import { cn } from "~/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
  beforeLoad: async () => {
    await assertAuthenticatedFn();
  },
});

interface SettingsNavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

function SettingsNavigation({
  items,
  activeSection,
  contentRef,
}: {
  items: SettingsNavItem[];
  activeSection: string;
  contentRef: React.RefObject<HTMLDivElement | null>;
}) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const container = contentRef.current;

    if (element && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const scrollTop = container.scrollTop;
      const offset = elementRect.top - containerRect.top + scrollTop - 24; // 24px offset for padding

      container.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="space-y-0.5">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={cn(
              "w-full flex items-center gap-2 px-2 py-2 text-sm rounded-md transition-colors text-left",
              isActive
                ? "bg-primary/20 text-primary font-medium"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}

const accountDeletionSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type AccountDeletionFormData = z.infer<typeof accountDeletionSchema>;

function AccountDeletionSettings() {
  const { data: session } = authClient.useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const deleteAccountMutation = useDeleteUserAccount();

  const form = useForm<AccountDeletionFormData>({
    resolver: zodResolver(accountDeletionSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleDeleteRequest = () => {
    setIsDialogOpen(true);
  };

  const onSubmit = (data: AccountDeletionFormData) => {
    // Custom validation to ensure email matches session email
    if (data.email !== session?.user?.email) {
      form.setError("email", {
        type: "manual",
        message: "Email does not match your account email",
      });
      return;
    }

    deleteAccountMutation.mutate({
      data: { email: data.email },
    });
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <>
      <Panel className="border-red-500/30 bg-red-500/5">
        <PanelHeader>
          <PanelTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </PanelTitle>
        </PanelHeader>
        <PanelContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">
              Delete Account
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated data. This
              action cannot be undone. All your subscription data will be
              permanently removed.
            </p>
            <Button
              variant="destructive"
              onClick={handleDeleteRequest}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </PanelContent>
      </Panel>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertTriangle className="h-5 w-5" />
              Confirm Account Deletion
            </DialogTitle>
            <DialogDescription className="text-left">
              This will permanently delete your account and all data associated
              with it.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 my-4">
            <div className="space-y-3">
              <p className="text-sm text-foreground">
                The following data will be permanently deleted:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>All liked posts and hearts</li>
                <li>Your subscription and billing information</li>
                <li>Your profile and account settings</li>
              </ul>
              <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      To confirm, type your email address:
                    </FormLabel>
                    <p className="text-sm text-muted-foreground font-mono mb-2">
                      {session?.user?.email}
                    </p>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email to confirm"
                        className="border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400"
                        disabled={deleteAccountMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex gap-3 sm:justify-start">
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={
                    deleteAccountMutation.isPending || !form.formState.isValid
                  }
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  {deleteAccountMutation.isPending
                    ? "Deleting..."
                    : "Delete My Account"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelDelete}
                  disabled={deleteAccountMutation.isPending}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

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

  const currentAvatarUrl = avatarUrl;

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
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch user's current plan and subscription info
  const { data: userPlan, isLoading: planLoading } = useUserPlan();

  // Subscription mutation hooks
  const checkoutMutation = useCreateCheckoutSession();
  const portalMutation = useCreatePortalSession();
  const cancelMutation = useCancelSubscription();

  const handleUpgrade = (priceId: string) => {
    setIsLoading(true);
    checkoutMutation.mutate(
      { data: { priceId } },
      {
        onSettled: () => setIsLoading(false),
      }
    );
  };

  const handleManageBilling = () => {
    setIsLoading(true);
    portalMutation.mutate(
      { data: undefined },
      {
        onSettled: () => setIsLoading(false),
      }
    );
  };

  const handleCancelSubscription = () => {
    if (
      confirm(
        "Are you sure you want to cancel your subscription? You'll continue to have access until the end of your billing period."
      )
    ) {
      setIsLoading(true);
      cancelMutation.mutate(
        { data: undefined },
        {
          onSettled: () => setIsLoading(false),
        }
      );
    }
  };

  // Determine if sections should be shown
  const currentPlan = (userPlan?.data?.plan || "free") as
    | "free"
    | "basic"
    | "pro";
  const subscriptionStatus = userPlan?.data?.subscriptionStatus;
  const hasNoPlan = !currentPlan || currentPlan === "free";
  const isNotSubscribed = !subscriptionStatus;

  // Define navigation items based on what sections are visible
  const navItems: SettingsNavItem[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "extended-profile", label: "Extended Profile", icon: UserCircle },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },
    ...((!isNotSubscribed
      ? [{ id: "subscription", label: "Subscription", icon: CreditCard }]
      : []) as SettingsNavItem[]),
    ...((hasNoPlan
      ? [{ id: "plans", label: "Plans", icon: CreditCard }]
      : []) as SettingsNavItem[]),
    { id: "danger", label: "Danger Zone", icon: AlertTriangle },
  ];

  // Track active section based on scroll position within content container
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const containerRect = container.getBoundingClientRect();
      const scrollTop = container.scrollTop;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const elementTop = element.offsetTop;
          if (elementTop <= scrollTop + 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  if (planLoading) {
    return (
      <Page>
        <AppBreadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard", icon: Home },
            { label: "Settings" },
          ]}
        />
        <div className="flex gap-6 mt-8 h-[calc(100vh-12rem)] overflow-hidden">
          {/* Sidebar Skeleton */}
          <div className="w-48 flex-shrink-0">
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-muted/50 animate-pulse rounded"
                />
              ))}
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="flex-1 space-y-6 overflow-y-auto pr-2">
            <Panel className="p-6">
              <div className="space-y-4">
                <div className="h-6 bg-muted/50 animate-pulse rounded w-1/3" />
                <div className="h-4 bg-muted/50 animate-pulse rounded w-2/3" />
                <div className="h-4 bg-muted/50 animate-pulse rounded w-1/2" />
              </div>
            </Panel>
          </div>
        </div>
      </Page>
    );
  }

  const subscriptionExpiresAt = userPlan?.data?.subscriptionExpiresAt
    ? new Date(userPlan.data.subscriptionExpiresAt)
    : null;

  return (
    <Page>
      <AppBreadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard", icon: Home },
          { label: "Settings" },
        ]}
      />

      <div className="flex gap-6 mt-8 h-[calc(100vh-12rem)] overflow-hidden">
        {/* Left Navigation Sidebar */}
        <aside className="w-48 flex-shrink-0">
          <SettingsNavigation
            items={navItems}
            activeSection={activeSection}
            contentRef={contentRef}
          />
        </aside>

        {/* Main Content */}
        <div
          ref={contentRef}
          className="flex-1 space-y-12 overflow-y-auto px-4"
        >
          {/* Profile Settings */}
          <section id="profile">
            <SectionHeader
              title="Profile"
              description="Manage your basic profile information and avatar"
            />
            <ProfileSettings />
          </section>

          {/* Extended Profile Settings */}
          <section id="extended-profile">
            <SectionHeader
              title="Extended Profile"
              description="Add more details about yourself including bio, social links, and location"
            />
            <ExtendedProfileForm />
          </section>

          {/* Portfolio Section */}
          <section id="portfolio">
            <SectionHeader
              title="Portfolio"
              description="Showcase your projects and achievements"
            />
            <PortfolioSection />
          </section>

          {/* Current Subscription Status */}
          {!isNotSubscribed && (
            <section id="subscription">
              <SectionHeader
                title="Subscription"
                description="Manage your subscription and billing information"
              />
              <SubscriptionStatus
                plan={currentPlan}
                subscriptionStatus={subscriptionStatus as any}
                subscriptionExpiresAt={subscriptionExpiresAt}
                onManageBilling={handleManageBilling}
                onCancelSubscription={handleCancelSubscription}
                isLoading={isLoading}
              />
            </section>
          )}

          {/* Pricing Plans */}
          {hasNoPlan && (
            <section id="plans">
              <SectionHeader
                title="Choose Your Plan"
                description="Upgrade or change your subscription plan to unlock more features"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PricingCard
                  plan={SUBSCRIPTION_PLANS.FREE}
                  currentPlan={currentPlan}
                  isLoading={isLoading}
                />
                <PricingCard
                  plan={SUBSCRIPTION_PLANS.BASIC}
                  currentPlan={currentPlan}
                  onUpgrade={handleUpgrade}
                  isLoading={isLoading}
                  isPopular={true}
                />
                <PricingCard
                  plan={SUBSCRIPTION_PLANS.PRO}
                  currentPlan={currentPlan}
                  onUpgrade={handleUpgrade}
                  isLoading={isLoading}
                />
              </div>
            </section>
          )}

          {/* Account Deletion */}
          <section id="danger">
            <SectionHeader
              title="Danger Zone"
              description="Irreversible actions that require extra caution"
            />
            <AccountDeletionSettings />
          </section>
        </div>
      </div>
    </Page>
  );
}
