import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticatedMiddleware } from "./middleware";
import { isUserParticipantInConversation } from "~/data-access/conversations";
import {
  createMessage,
  findMessagesByConversationId,
  countMessagesByConversationId,
  markMessagesAsRead,
  countUnreadMessages,
} from "~/data-access/messages";

// Send a message in a conversation
export const sendMessageFn = createServerFn({
  method: "POST",
})
  .inputValidator(
    z.object({
      conversationId: z.string().min(1, "Conversation ID is required"),
      content: z.string().min(1, "Message content is required").max(5000, "Message too long"),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    // Verify user is a participant in the conversation
    const isParticipant = await isUserParticipantInConversation(
      context.userId,
      data.conversationId
    );

    if (!isParticipant) {
      throw new Error("You are not a participant in this conversation");
    }

    const newMessage = await createMessage({
      id: crypto.randomUUID(),
      conversationId: data.conversationId,
      senderId: context.userId,
      content: data.content,
      isRead: false,
      createdAt: new Date(),
    });

    return newMessage;
  });

// Get messages in a conversation
export const getMessagesFn = createServerFn({
  method: "GET",
})
  .inputValidator(
    z.object({
      conversationId: z.string().min(1, "Conversation ID is required"),
      limit: z.number().optional().default(50),
      offset: z.number().optional().default(0),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    // Verify user is a participant in the conversation
    const isParticipant = await isUserParticipantInConversation(
      context.userId,
      data.conversationId
    );

    if (!isParticipant) {
      throw new Error("You are not a participant in this conversation");
    }

    const messages = await findMessagesByConversationId(
      data.conversationId,
      data.limit,
      data.offset
    );

    const totalCount = await countMessagesByConversationId(data.conversationId);

    return {
      messages,
      totalCount,
      hasMore: data.offset + data.limit < totalCount,
    };
  });

// Mark messages as read in a conversation
export const markMessagesAsReadFn = createServerFn({
  method: "POST",
})
  .inputValidator(
    z.object({
      conversationId: z.string().min(1, "Conversation ID is required"),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    // Verify user is a participant in the conversation
    const isParticipant = await isUserParticipantInConversation(
      context.userId,
      data.conversationId
    );

    if (!isParticipant) {
      throw new Error("You are not a participant in this conversation");
    }

    const count = await markMessagesAsRead(data.conversationId, context.userId);

    return { count };
  });

// Get total unread message count for the user
export const getUnreadMessageCountFn = createServerFn({
  method: "GET",
})
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    const count = await countUnreadMessages(context.userId);
    return { count };
  });
