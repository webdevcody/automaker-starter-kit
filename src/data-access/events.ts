import { eq, gte, lte, and, asc, desc } from "drizzle-orm";
import { database } from "~/db";
import {
  event,
  user,
  type Event,
  type CreateEventData,
  type UpdateEventData,
  type User,
} from "~/db/schema";

export type EventWithUser = Event & {
  user: Pick<User, "id" | "name" | "image">;
};

export async function createEvent(
  eventData: CreateEventData
): Promise<Event> {
  const [newEvent] = await database
    .insert(event)
    .values({
      ...eventData,
      updatedAt: new Date(),
    })
    .returning();

  return newEvent;
}

export async function findEventById(id: string): Promise<Event | null> {
  const [result] = await database
    .select()
    .from(event)
    .where(eq(event.id, id))
    .limit(1);

  return result || null;
}

export async function findEventByIdWithUser(
  id: string
): Promise<EventWithUser | null> {
  const result = await database
    .select({
      id: event.id,
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      eventLink: event.eventLink,
      eventType: event.eventType,
      createdBy: event.createdBy,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(event)
    .innerJoin(user, eq(event.createdBy, user.id))
    .where(eq(event.id, id))
    .limit(1);

  return result[0] || null;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export async function findEventsByDateRange(
  dateRange: DateRange
): Promise<EventWithUser[]> {
  const results = await database
    .select({
      id: event.id,
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      eventLink: event.eventLink,
      eventType: event.eventType,
      createdBy: event.createdBy,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(event)
    .innerJoin(user, eq(event.createdBy, user.id))
    .where(
      and(
        gte(event.startTime, dateRange.start),
        lte(event.startTime, dateRange.end)
      )
    )
    .orderBy(asc(event.startTime));

  return results;
}

export async function findUpcomingEvents(
  limit: number = 10
): Promise<EventWithUser[]> {
  const now = new Date();

  const results = await database
    .select({
      id: event.id,
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      eventLink: event.eventLink,
      eventType: event.eventType,
      createdBy: event.createdBy,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(event)
    .innerJoin(user, eq(event.createdBy, user.id))
    .where(gte(event.startTime, now))
    .orderBy(asc(event.startTime))
    .limit(limit);

  return results;
}

export async function updateEvent(
  id: string,
  eventData: UpdateEventData
): Promise<Event> {
  const [updatedEvent] = await database
    .update(event)
    .set({
      ...eventData,
      updatedAt: new Date(),
    })
    .where(eq(event.id, id))
    .returning();

  return updatedEvent;
}

export async function deleteEvent(id: string): Promise<void> {
  await database.delete(event).where(eq(event.id, id));
}
