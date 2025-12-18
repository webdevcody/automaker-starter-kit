import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { assertAdminMiddleware, authenticatedMiddleware } from "./middleware";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  findEventById,
  findEventByIdWithUser,
  findEventsByDateRange,
  findUpcomingEvents,
  type DateRange,
} from "~/data-access/events";

export const EVENT_TYPES = [
  "live-session",
  "workshop",
  "meetup",
  "assignment-due",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

const eventFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional()
    .or(z.literal("")),
  startTime: z.string().datetime("Invalid start time"),
  endTime: z.string().datetime("Invalid end time").optional().or(z.literal("")),
  eventLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  eventType: z.enum(EVENT_TYPES).optional().default("live-session"),
});

export const createEventFn = createServerFn({
  method: "POST",
})
  .inputValidator(eventFormSchema)
  .middleware([assertAdminMiddleware])
  .handler(async ({ data, context }) => {
    const eventData = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description || null,
      startTime: new Date(data.startTime),
      endTime: data.endTime ? new Date(data.endTime) : null,
      eventLink: data.eventLink || null,
      eventType: data.eventType,
      createdBy: context.userId,
    };

    const newEvent = await createEvent(eventData);
    return newEvent;
  });

export const getEventByIdFn = createServerFn({
  method: "GET",
})
  .inputValidator(z.object({ id: z.string() }))
  .middleware([authenticatedMiddleware])
  .handler(async ({ data }) => {
    const event = await findEventByIdWithUser(data.id);
    if (!event) {
      throw new Error("Event not found");
    }
    return event;
  });

export const getEventsFn = createServerFn()
  .inputValidator(
    z.object({
      start: z.string().datetime(),
      end: z.string().datetime(),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data }) => {
    const dateRange: DateRange = {
      start: new Date(data.start),
      end: new Date(data.end),
    };
    return await findEventsByDateRange(dateRange);
  });

export const getUpcomingEventsFn = createServerFn()
  .inputValidator(
    z
      .object({
        limit: z.number().int().positive().max(50).optional().default(10),
      })
      .optional()
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data }) => {
    const limit = data?.limit ?? 10;
    return await findUpcomingEvents(limit);
  });

const updateEventSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional()
    .or(z.literal("")),
  startTime: z.string().datetime("Invalid start time"),
  endTime: z.string().datetime("Invalid end time").optional().or(z.literal("")),
  eventLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  eventType: z.enum(EVENT_TYPES).optional(),
});

export const updateEventFn = createServerFn({
  method: "POST",
})
  .inputValidator(updateEventSchema)
  .middleware([assertAdminMiddleware])
  .handler(async ({ data, context }) => {
    // Check event exists
    const existingEvent = await findEventById(data.id);
    if (!existingEvent) {
      throw new Error("Event not found");
    }

    const eventData = {
      title: data.title,
      description: data.description || null,
      startTime: new Date(data.startTime),
      endTime: data.endTime ? new Date(data.endTime) : null,
      eventLink: data.eventLink || null,
      eventType: data.eventType,
    };

    const updatedEvent = await updateEvent(data.id, eventData);
    return updatedEvent;
  });

export const deleteEventFn = createServerFn({
  method: "POST",
})
  .inputValidator(z.object({ id: z.string() }))
  .middleware([assertAdminMiddleware])
  .handler(async ({ data, context }) => {
    // Check event exists
    const existingEvent = await findEventById(data.id);
    if (!existingEvent) {
      throw new Error("Event not found");
    }

    await deleteEvent(data.id);
    return { success: true };
  });
