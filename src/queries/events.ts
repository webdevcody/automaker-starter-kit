import { queryOptions } from "@tanstack/react-query";
import { getEventByIdFn, getEventsFn, getUpcomingEventsFn } from "~/fn/events";

export const eventQueryOptions = (eventId: string) =>
  queryOptions({
    queryKey: ["event", eventId],
    queryFn: () => getEventByIdFn({ data: { id: eventId } }),
  });

export const eventsQueryOptions = (start: Date, end: Date) =>
  queryOptions({
    queryKey: ["events", start.toISOString(), end.toISOString()],
    queryFn: () =>
      getEventsFn({
        data: {
          start: start.toISOString(),
          end: end.toISOString(),
        },
      }),
  });

export const upcomingEventsQueryOptions = (limit: number = 10) =>
  queryOptions({
    queryKey: ["events", "upcoming", limit],
    queryFn: () =>
      getUpcomingEventsFn({
        data: { limit },
      }),
  });

export const createEventMutationOptions = () =>
  queryOptions({
    queryKey: ["events", "create"],
  });
