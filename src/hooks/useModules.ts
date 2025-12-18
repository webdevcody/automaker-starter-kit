import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  modulesQueryOptions,
  moduleQueryOptions,
  moduleContentsQueryOptions,
} from "~/queries/modules";
import {
  createModuleFn,
  updateModuleFn,
  deleteModuleFn,
  createModuleContentFn,
  updateModuleContentFn,
  deleteModuleContentFn,
  type ModuleContentType,
} from "~/fn/modules";
import { getErrorMessage } from "~/utils/error";

// Module Query Hooks
export function useModules(enabled = true) {
  return useQuery({
    ...modulesQueryOptions(),
    enabled,
  });
}

export function useModule(moduleId: string, enabled = true) {
  return useQuery({
    ...moduleQueryOptions(moduleId),
    enabled: enabled && !!moduleId,
  });
}

export function useModuleContents(moduleId: string, enabled = true) {
  return useQuery({
    ...moduleContentsQueryOptions(moduleId),
    enabled: enabled && !!moduleId,
  });
}

// Module Mutation Hooks
interface CreateModuleData {
  title: string;
  description?: string;
  isPublished?: boolean;
}

export function useCreateModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateModuleData) => createModuleFn({ data }),
    onSuccess: () => {
      toast.success("Module created successfully!", {
        description: "The module has been added to the classroom.",
      });
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },
    onError: (error) => {
      toast.error("Failed to create module", {
        description: getErrorMessage(error),
      });
    },
  });
}

interface UpdateModuleData extends CreateModuleData {
  id: string;
  order?: number;
}

export function useUpdateModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateModuleData) => updateModuleFn({ data }),
    onSuccess: (_, variables) => {
      toast.success("Module updated successfully!", {
        description: "The module has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["modules"] });
      queryClient.invalidateQueries({ queryKey: ["module", variables.id] });
    },
    onError: (error) => {
      toast.error("Failed to update module", {
        description: getErrorMessage(error),
      });
    },
  });
}

export function useDeleteModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (moduleId: string) => deleteModuleFn({ data: { id: moduleId } }),
    onSuccess: () => {
      toast.success("Module deleted successfully!", {
        description: "The module has been removed.",
      });
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },
    onError: (error) => {
      toast.error("Failed to delete module", {
        description: getErrorMessage(error),
      });
    },
  });
}

// Module Content Mutation Hooks
interface CreateModuleContentData {
  moduleId: string;
  type: ModuleContentType;
  title: string;
  description?: string;
  fileKey?: string;
  url?: string;
  content?: string;
}

export function useCreateModuleContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateModuleContentData) => createModuleContentFn({ data }),
    onSuccess: (_, variables) => {
      toast.success("Content added successfully!", {
        description: "The content has been added to the module.",
      });
      queryClient.invalidateQueries({ queryKey: ["modules"] });
      queryClient.invalidateQueries({ queryKey: ["module", variables.moduleId] });
      queryClient.invalidateQueries({ queryKey: ["module-contents", variables.moduleId] });
    },
    onError: (error) => {
      toast.error("Failed to add content", {
        description: getErrorMessage(error),
      });
    },
  });
}

interface UpdateModuleContentData {
  id: string;
  type?: ModuleContentType;
  title?: string;
  description?: string;
  fileKey?: string;
  url?: string;
  content?: string;
  position?: number;
}

export function useUpdateModuleContent(moduleId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateModuleContentData) => updateModuleContentFn({ data }),
    onSuccess: () => {
      toast.success("Content updated successfully!", {
        description: "The content has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["modules"] });
      queryClient.invalidateQueries({ queryKey: ["module", moduleId] });
      queryClient.invalidateQueries({ queryKey: ["module-contents", moduleId] });
    },
    onError: (error) => {
      toast.error("Failed to update content", {
        description: getErrorMessage(error),
      });
    },
  });
}

export function useDeleteModuleContent(moduleId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contentId: string) => deleteModuleContentFn({ data: { id: contentId } }),
    onSuccess: () => {
      toast.success("Content deleted successfully!", {
        description: "The content has been removed.",
      });
      queryClient.invalidateQueries({ queryKey: ["modules"] });
      queryClient.invalidateQueries({ queryKey: ["module", moduleId] });
      queryClient.invalidateQueries({ queryKey: ["module-contents", moduleId] });
    },
    onError: (error) => {
      toast.error("Failed to delete content", {
        description: getErrorMessage(error),
      });
    },
  });
}
