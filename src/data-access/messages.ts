import { eq, and, desc, sql, count } from "drizzle-orm";
import { database } from "~/db";
import {
  message,
  user,
  type Message,
  type CreateMessageData,
  type User,
} from "~/db/schema";
import { updateConversationLastMessageAt } from "./conversations";

export type MessageWithSender = Message & {
  sender: Pick<User, "id" | "name" | "image">;
};

export async function createMessage(
  messageData: CreateMessageData
): Promise<Message> {
  const [newMessage] = await database
    .insert(message)
    .values(messageData)
    .returning();

  // Update the conversation's lastMessageAt
  await updateConversationLastMessageAt(messageData.conversationId);

  return newMessage;
}

export async function findMessageById(id: string): Promise<Message | null> {
  const [result] = await database
    .select()
    .from(message)
    .where(eq(message.id, id))
    .limit(1);

  return result || null;
}

export async function findMessagesByConversationId(
  conversationId: string,
  limit: number = 50,
  offset: number = 0
): Promise<MessageWithSender[]> {
  const results = await database
    .select({
      id: message.id,
      conversationId: message.conversationId,
      senderId: message.senderId,
      content: message.content,
      isRead: message.isRead,
      readAt: message.readAt,
      createdAt: message.createdAt,
      sender: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(message)
    .innerJoin(user, eq(message.senderId, user.id))
    .where(eq(message.conversationId, conversationId))
    .orderBy(desc(message.createdAt))
    .limit(limit)
    .offset(offset);

  // Reverse to get chronological order (oldest first)
  return results.reverse();
}

export async function countMessagesByConversationId(
  conversationId: string
): Promise<number> {
  const [result] = await database
    .select({ count: count() })
    .from(message)
    .where(eq(message.conversationId, conversationId));

  return result?.count ?? 0;
}

export async function markMessagesAsRead(
  conversationId: string,
  userId: string
): Promise<number> {
  // Mark all unread messages in this conversation that were NOT sent by the user
  const result = await database
    .update(message)
    .set({
      isRead: true,
      readAt: new Date(),
    })
    .where(
      and(
        eq(message.conversationId, conversationId),
        eq(message.isRead, false),
        sql`${message.senderId} != ${userId}`
      )
    )
    .returning();

  return result.length;
}

export async function countUnreadMessages(userId: string): Promise<number> {
  // Count all unread messages across all conversations where user is a participant
  // but the message was NOT sent by the user
  const [result] = await database
    .select({ count: sql<number>`count(*)::int` })
    .from(message)
    .innerJoin(
      sql`conversation AS c`,
      sql`${message.conversationId} = c.id AND (c.participant1_id = ${userId} OR c.participant2_id = ${userId})`
    )
    .where(
      and(
        eq(message.isRead, false),
        sql`${message.senderId} != ${userId}`
      )
    );

  return result?.count ?? 0;
}
