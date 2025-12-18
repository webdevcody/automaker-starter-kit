import { eq, or, and, desc, sql } from "drizzle-orm";
import { database } from "~/db";
import {
  conversation,
  message,
  user,
  type Conversation,
  type CreateConversationData,
  type User,
} from "~/db/schema";

export type ConversationWithParticipant = Conversation & {
  otherParticipant: Pick<User, "id" | "name" | "image">;
  lastMessage: {
    content: string;
    senderId: string;
    createdAt: Date;
  } | null;
  unreadCount: number;
};

export async function findConversationById(
  id: string
): Promise<Conversation | null> {
  const [result] = await database
    .select()
    .from(conversation)
    .where(eq(conversation.id, id))
    .limit(1);

  return result || null;
}

export async function findConversationBetweenUsers(
  userId1: string,
  userId2: string
): Promise<Conversation | null> {
  const [result] = await database
    .select()
    .from(conversation)
    .where(
      or(
        and(
          eq(conversation.participant1Id, userId1),
          eq(conversation.participant2Id, userId2)
        ),
        and(
          eq(conversation.participant1Id, userId2),
          eq(conversation.participant2Id, userId1)
        )
      )
    )
    .limit(1);

  return result || null;
}

export async function createConversation(
  conversationData: CreateConversationData
): Promise<Conversation> {
  const [newConversation] = await database
    .insert(conversation)
    .values(conversationData)
    .returning();

  return newConversation;
}

export async function getOrCreateConversation(
  userId1: string,
  userId2: string
): Promise<Conversation> {
  // Check if conversation already exists
  const existing = await findConversationBetweenUsers(userId1, userId2);
  if (existing) {
    return existing;
  }

  // Create new conversation
  return await createConversation({
    id: crypto.randomUUID(),
    participant1Id: userId1,
    participant2Id: userId2,
    createdAt: new Date(),
  });
}

export async function findUserConversations(
  userId: string
): Promise<ConversationWithParticipant[]> {
  // Get all conversations where user is a participant
  const conversations = await database
    .select()
    .from(conversation)
    .where(
      or(
        eq(conversation.participant1Id, userId),
        eq(conversation.participant2Id, userId)
      )
    )
    .orderBy(desc(conversation.lastMessageAt));

  // For each conversation, get the other participant and last message
  const results: ConversationWithParticipant[] = [];

  // TODO: This is not performant, refactor
  for (const conv of conversations) {
    const otherParticipantId =
      conv.participant1Id === userId
        ? conv.participant2Id
        : conv.participant1Id;

    // Get other participant info
    const [otherParticipant] = await database
      .select({
        id: user.id,
        name: user.name,
        image: user.image,
      })
      .from(user)
      .where(eq(user.id, otherParticipantId))
      .limit(1);

    // Get last message
    const [lastMessage] = await database
      .select({
        content: message.content,
        senderId: message.senderId,
        createdAt: message.createdAt,
      })
      .from(message)
      .where(eq(message.conversationId, conv.id))
      .orderBy(desc(message.createdAt))
      .limit(1);

    // Get unread count (messages not sent by current user and not read)
    const [unreadResult] = await database
      .select({ count: sql<number>`count(*)::int` })
      .from(message)
      .where(
        and(
          eq(message.conversationId, conv.id),
          eq(message.isRead, false),
          sql`${message.senderId} != ${userId}`
        )
      );

    results.push({
      ...conv,
      otherParticipant: otherParticipant || {
        id: otherParticipantId,
        name: "Unknown",
        image: null,
      },
      lastMessage: lastMessage || null,
      unreadCount: unreadResult?.count || 0,
    });
  }

  return results;
}

export async function updateConversationLastMessageAt(
  conversationId: string
): Promise<void> {
  await database
    .update(conversation)
    .set({ lastMessageAt: new Date() })
    .where(eq(conversation.id, conversationId));
}

export async function isUserParticipantInConversation(
  userId: string,
  conversationId: string
): Promise<boolean> {
  const [result] = await database
    .select()
    .from(conversation)
    .where(
      and(
        eq(conversation.id, conversationId),
        or(
          eq(conversation.participant1Id, userId),
          eq(conversation.participant2Id, userId)
        )
      )
    )
    .limit(1);

  return result !== undefined;
}
