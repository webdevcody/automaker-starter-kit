import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPortfolioItemFn,
  updatePortfolioItemFn,
  deletePortfolioItemFn,
} from "~/fn/portfolio";
import {
  myPortfolioQueryOptions,
  userPortfolioQueryOptions,
  portfolioItemQueryOptions,
} from "~/queries/portfolio";

// Hook for fetching current user's portfolio items
export function useMyPortfolio() {
  return useQuery(myPortfolioQueryOptions());
}

// Hook for fetching a user's portfolio items
export function useUserPortfolio(userId: string) {
  return useQuery(userPortfolioQueryOptions(userId));
}

// Hook for fetching a single portfolio item
export function usePortfolioItem(id: string) {
  return useQuery(portfolioItemQueryOptions(id));
}

// Hook for creating a portfolio item
export function useCreatePortfolioItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPortfolioItemFn,
    onSuccess: () => {
      toast.success("Portfolio item created successfully");
      queryClient.invalidateQueries({ queryKey: ["my-portfolio"] });
    },
    onError: () => {
      toast.error("Failed to create portfolio item");
    },
  });
}

// Hook for updating a portfolio item
export function useUpdatePortfolioItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePortfolioItemFn,
    onSuccess: (data) => {
      toast.success("Portfolio item updated successfully");
      queryClient.invalidateQueries({ queryKey: ["my-portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-item", data.id] });
    },
    onError: () => {
      toast.error("Failed to update portfolio item");
    },
  });
}

// Hook for deleting a portfolio item
export function useDeletePortfolioItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePortfolioItemFn,
    onSuccess: () => {
      toast.success("Portfolio item deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["my-portfolio"] });
    },
    onError: () => {
      toast.error("Failed to delete portfolio item");
    },
  });
}
