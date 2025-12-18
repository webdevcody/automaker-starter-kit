import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  eventQueryOptions,
  eventsQueryOptions,
  upcomingEventsQueryOptions,
} from "~/queries/events";
import {
  createEventFn,
  updateEventFn,
  deleteEventFn,
  type EventType,
} from "~/fn/events";
import { getErrorMessage } from "~/utils/error";

// Query hooks
export function useEvent(eventId: string, enabled = true) {
  return useQuery({
    ...eventQueryOptions(eventId),
    enabled: enabled && !!eventId,
  });
}

export function useEvents(start: Date, end: Date, enabled = true) {
  return useQuery({
    ...eventsQueryOptions(start, end),
    enabled,
  });
}

export function useUpcomingEvents(limit: number = 10, enabled = true) {
  return useQuery({
    ...upcomingEventsQueryOptions(limit),
    enabled,
  });
}

// Mutation hooks
interface CreateEventData {
  title: string;
  description?: string;
  startTime: string; // ISO datetime string
  endTime?: string; // ISO datetime string
  eventLink?: string;
  eventType?: EventType;
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventData) => createEventFn({ data }),
    onSuccess: () => {
      toast.success("Event created successfully!", {
        description: "The event has been added to the calendar.",
      });
      // Invalidate all event-related queries
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      toast.error("Failed to create event", {
        description: getErrorMessage(error),
      });
    },
  });
}

interface UpdateEventData extends CreateEventData {
  id: string;
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateEventData) => updateEventFn({ data }),
    onSuccess: () => {
      toast.success("Event updated successfully!", {
        description: "The event has been updated.",
      });
      // Invalidate all event-related queries
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event"] });
    },
    onError: (error) => {
      toast.error("Failed to update event", {
        description: getErrorMessage(error),
      });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: string) => deleteEventFn({ data: { id: eventId } }),
    onSuccess: () => {
      toast.success("Event deleted successfully!", {
        description: "The event has been removed from the calendar.",
      });
      // Invalidate all event-related queries
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event"] });
    },
    onError: (error) => {
      toast.error("Failed to delete event", {
        description: getErrorMessage(error),
      });
    },
  });
}
