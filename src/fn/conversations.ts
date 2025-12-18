import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticatedMiddleware } from "./middleware";
import {
  getOrCreateConversation,
  findUserConversations,
  findConversationById,
  isUserParticipantInConversation,
} from "~/data-access/conversations";

// Get or create a conversation with another user
export const getOrCreateConversationFn = createServerFn({
  method: "POST",
})
  .inputValidator(
    z.object({
      otherUserId: z.string().min(1, "Other user ID is required"),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    // Cannot start conversation with self
    if (data.otherUserId === context.userId) {
      throw new Error("Cannot start a conversation with yourself");
    }

    const conversation = await getOrCreateConversation(
      context.userId,
      data.otherUserId
    );

    return conversation;
  });

// Get all conversations for the authenticated user
export const getConversationsFn = createServerFn({
  method: "GET",
})
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    return await findUserConversations(context.userId);
  });

// Get a specific conversation by ID
export const getConversationByIdFn = createServerFn({
  method: "GET",
})
  .inputValidator(
    z.object({
      conversationId: z.string().min(1, "Conversation ID is required"),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    // Verify user is a participant
    const isParticipant = await isUserParticipantInConversation(
      context.userId,
      data.conversationId
    );

    if (!isParticipant) {
      throw new Error("You are not a participant in this conversation");
    }

    const conversation = await findConversationById(data.conversationId);

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    return conversation;
  });
