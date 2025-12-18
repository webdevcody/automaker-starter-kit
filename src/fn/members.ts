import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticatedMiddleware } from "./middleware";
import { getAllMembers, getMembersCount, type MemberFilters } from "~/data-access/members";

export const getMembersFn = createServerFn({
  method: "GET",
})
  .inputValidator(
    z.object({
      searchQuery: z.string().optional(),
      limit: z.number().int().min(1).max(100).optional().default(50),
      offset: z.number().int().min(0).optional().default(0),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data }) => {
    const filters: MemberFilters = {
      searchQuery: data.searchQuery,
      limit: data.limit,
      offset: data.offset,
    };

    const [members, total] = await Promise.all([
      getAllMembers(filters),
      getMembersCount(filters),
    ]);

    return {
      members,
      total,
      limit: data.limit,
      offset: data.offset,
    };
  });

