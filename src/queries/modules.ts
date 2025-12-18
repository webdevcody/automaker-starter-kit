import { queryOptions } from "@tanstack/react-query";
import {
  getModulesFn,
  getModuleByIdFn,
  getModuleContentsFn,
} from "~/fn/modules";

export const modulesQueryOptions = () =>
  queryOptions({
    queryKey: ["modules"],
    queryFn: () => getModulesFn(),
  });

export const moduleQueryOptions = (moduleId: string) =>
  queryOptions({
    queryKey: ["module", moduleId],
    queryFn: () => getModuleByIdFn({ data: { id: moduleId } }),
  });

export const moduleContentsQueryOptions = (moduleId: string) =>
  queryOptions({
    queryKey: ["module-contents", moduleId],
    queryFn: () => getModuleContentsFn({ data: { moduleId } }),
  });
