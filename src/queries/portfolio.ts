import { queryOptions } from "@tanstack/react-query";
import {
  getMyPortfolioItemsFn,
  getUserPortfolioItemsFn,
  getPortfolioItemFn,
} from "~/fn/portfolio";

/**
 * Query for current user's portfolio items
 */
export const myPortfolioQueryOptions = () =>
  queryOptions({
    queryKey: ["my-portfolio"],
    queryFn: () => getMyPortfolioItemsFn(),
  });

/**
 * Query for a specific user's portfolio items
 */
export const userPortfolioQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["portfolio", userId],
    queryFn: () => getUserPortfolioItemsFn({ data: { userId } }),
  });

/**
 * Query for a single portfolio item
 */
export const portfolioItemQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["portfolio-item", id],
    queryFn: () => getPortfolioItemFn({ data: { id } }),
  });
