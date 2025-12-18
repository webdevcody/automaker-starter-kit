import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserProfileFn, deleteUserAccountFn } from "~/fn/storage";
import {
  updateMyProfileFn,
  updateBioFn,
  updateSkillsFn,
  toggleProfileVisibilityFn,
} from "~/fn/profiles";
import { authClient } from "~/lib/auth-client";
import { useNavigate } from "@tanstack/react-router";
import { myProfileQueryOptions, publicProfileQueryOptions } from "~/queries/profiles";

// Hook for updating user profile (avatar, name)
export function useUpdateUserProfile() {
  const { refetch: refetchSession } = authClient.useSession();
  
  return useMutation({
    mutationFn: updateUserProfileFn,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      refetchSession();
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });
}

// Hook for deleting user account
export function useDeleteUserAccount() {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: deleteUserAccountFn,
    onSuccess: () => {
      toast.success("Account deleted successfully");
      // Navigate to home page after successful deletion
      navigate({ to: "/" });
      // Force page reload to clear all authentication state
      window.location.reload();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete account");
    },
  });
}

// Hook for fetching current user's extended profile
export function useMyProfile() {
  return useQuery(myProfileQueryOptions());
}

// Hook for fetching a public profile
export function usePublicProfile(userId: string) {
  return useQuery(publicProfileQueryOptions(userId));
}

// Hook for updating extended profile (bio, skills, social links, etc.)
export function useUpdateExtendedProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfileFn,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });
}

// Hook for updating bio only
export function useUpdateBio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBioFn,
    onSuccess: () => {
      toast.success("Bio updated successfully");
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
    },
    onError: () => {
      toast.error("Failed to update bio");
    },
  });
}

// Hook for updating skills only
export function useUpdateSkills() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSkillsFn,
    onSuccess: () => {
      toast.success("Skills updated successfully");
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
    },
    onError: () => {
      toast.error("Failed to update skills");
    },
  });
}

// Hook for toggling profile visibility
export function useToggleProfileVisibility() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleProfileVisibilityFn,
    onSuccess: (data) => {
      toast.success(data.isPublic ? "Profile is now public" : "Profile is now private");
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
    },
    onError: () => {
      toast.error("Failed to update profile visibility");
    },
  });
}