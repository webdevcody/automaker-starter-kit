import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Home,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
} from "lucide-react";
import { Page } from "~/components/Page";
import { PageTitle } from "~/components/PageTitle";
import { AppBreadcrumb } from "~/components/AppBreadcrumb";
import { EmptyState } from "~/components/EmptyState";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
  PanelDescription,
} from "~/components/ui/panel";
import { modulesQueryOptions } from "~/queries/modules";
import { useIsAdmin } from "~/hooks/usePosts";
import { useDeleteModule } from "~/hooks/useModules";
import { ModuleDialog } from "~/components/ModuleDialog";
import { AddContentDialog } from "~/components/AddContentDialog";
import { ModuleContentList } from "~/components/ModuleContentList";
import { ConfirmDeleteDialog } from "~/components/ConfirmDeleteDialog";
import type { ClassroomModuleWithUser } from "~/data-access/modules";
import { formatRelativeTime } from "~/utils/song";

export const Route = createFileRoute("/dashboard/classroom")({
  loader: ({ context }) => {
    const { queryClient } = context;
    queryClient.ensureQueryData(modulesQueryOptions());
  },
  component: Classroom,
});

function ModuleCard({
  module,
  isAdmin,
}: {
  module: ClassroomModuleWithUser;
  isAdmin: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addContentDialogOpen, setAddContentDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteModule = useDeleteModule();

  const handleDelete = () => {
    deleteModule.mutate(module.id, {
      onSuccess: () => setDeleteDialogOpen(false),
    });
  };

  return (
    <>
      <Panel className="overflow-hidden">
        <PanelHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <PanelTitle className="text-lg line-clamp-1">
                  {module.title}
                </PanelTitle>
                {!module.isPublished && (
                  <Badge variant="secondary" className="text-xs">
                    <EyeOff className="h-3 w-3 mr-1" />
                    Draft
                  </Badge>
                )}
              </div>
              {module.description && (
                <PanelDescription className="line-clamp-2">
                  {module.description}
                </PanelDescription>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Created{" "}
                {formatRelativeTime(new Date(module.createdAt).toISOString())}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {isAdmin && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAddContentDialogOpen(true)}
                    title="Add content"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditDialogOpen(true)}
                    title="Edit module"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setDeleteDialogOpen(true)}
                    title="Delete module"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </PanelHeader>

        {expanded && (
          <PanelContent className="pt-0 border-t border-border/50">
            <ModuleContentList moduleId={module.id} isAdmin={isAdmin} />
          </PanelContent>
        )}
      </Panel>

      <ModuleDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        module={module}
      />

      <AddContentDialog
        open={addContentDialogOpen}
        onOpenChange={setAddContentDialogOpen}
        moduleId={module.id}
        moduleTitle={module.title}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Module"
        description={`Are you sure you want to delete "${module.title}"? This will also delete all content within this module. This action cannot be undone.`}
        onConfirm={handleDelete}
        isPending={deleteModule.isPending}
      />
    </>
  );
}

function ModuleListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Panel key={i}>
          <PanelHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-muted/50 rounded w-1/3 animate-pulse" />
                <div className="h-4 bg-muted/50 rounded w-2/3 animate-pulse" />
                <div className="h-3 bg-muted/50 rounded w-1/4 animate-pulse" />
              </div>
              <div className="h-8 w-8 bg-muted/50 rounded animate-pulse" />
            </div>
          </PanelHeader>
        </Panel>
      ))}
    </div>
  );
}

function Classroom() {
  const { data: modules, isLoading } = useQuery(modulesQueryOptions());
  const { data: adminData } = useIsAdmin();
  const isAdmin = adminData?.isAdmin ?? false;
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <Page>
      <div className="space-y-8">
        <AppBreadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard", icon: Home },
            { label: "Classroom", icon: BookOpen },
          ]}
        />

        <div className="flex items-center justify-between">
          <PageTitle
            title="Classroom"
            description="Educational modules and learning resources"
          />
          {isAdmin && (
            <Button
              onClick={() => setCreateDialogOpen(true)}
              className="bg-primary/90 hover:bg-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Module
            </Button>
          )}
        </div>

        <section className="space-y-4" aria-labelledby="modules-heading">
          <h2 id="modules-heading" className="sr-only">
            Classroom Modules
          </h2>

          {isLoading ? (
            <ModuleListSkeleton count={3} />
          ) : modules && modules.length > 0 ? (
            <div className="space-y-4">
              {modules.map((module) => (
                <ModuleCard key={module.id} module={module} isAdmin={isAdmin} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<BookOpen className="h-10 w-10 text-primary/60" />}
              title="No modules yet"
              description={
                isAdmin
                  ? "Create your first module to start adding educational content."
                  : "No educational modules are available yet. Check back later."
              }
              actionLabel={isAdmin ? "Create First Module" : undefined}
              onAction={isAdmin ? () => setCreateDialogOpen(true) : undefined}
            />
          )}
        </section>
      </div>

      <ModuleDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </Page>
  );
}
