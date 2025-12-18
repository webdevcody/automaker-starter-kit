import { useQuery } from "@tanstack/react-query";
import { getMembersQuery, type MembersQueryParams } from "~/queries/members";

export function useMembers(params: MembersQueryParams = {}) {
  return useQuery(getMembersQuery(params));
}

