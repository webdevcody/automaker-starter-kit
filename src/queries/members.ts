import { queryOptions } from "@tanstack/react-query";
import { getMembersFn } from "~/fn/members";

export interface MembersQueryParams {
  searchQuery?: string;
  limit?: number;
  offset?: number;
}

export const getMembersQuery = (params: MembersQueryParams = {}) =>
  queryOptions({
    queryKey: ["members", params.searchQuery, params.limit, params.offset],
    queryFn: () =>
      getMembersFn({
        data: {
          searchQuery: params.searchQuery,
          limit: params.limit,
          offset: params.offset,
        },
      }),
  });
