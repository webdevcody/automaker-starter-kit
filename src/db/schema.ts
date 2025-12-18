import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  isAdmin: boolean("is_admin")
    .$default(() => false)
    .notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  subscriptionId: text("subscription_id"),
  plan: text("plan").$default(() => "free").notNull(),
  subscriptionStatus: text("subscription_status"),
  subscriptionExpiresAt: timestamp("subscription_expires_at"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const song = pgTable("song", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  album: text("album"),
  genre: text("genre"),
  description: text("description"),
  audioKey: text("audio_key"),
  coverImageKey: text("cover_image_key"),
  status: text("status")
    .$default(() => "processing")
    .notNull(),
  duration: integer("duration"),
  playCount: integer("play_count")
    .$default(() => 0)
    .notNull(),
  downloadCount: integer("download_count")
    .$default(() => 0)
    .notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const heart = pgTable("heart", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  songId: text("song_id")
    .notNull()
    .references(() => song.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const playlist = pgTable("playlist", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  isPublic: boolean("is_public")
    .$default(() => false)
    .notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const playlistSong = pgTable("playlist_song", {
  id: text("id").primaryKey(),
  playlistId: text("playlist_id")
    .notNull()
    .references(() => playlist.id, { onDelete: "cascade" }),
  songId: text("song_id")
    .notNull()
    .references(() => song.id, { onDelete: "cascade" }),
  position: integer("position").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const communityPost = pgTable("community_post", {
  id: text("id").primaryKey(),
  title: text("title"),
  content: text("content").notNull(),
  category: text("category").$default(() => "general"),
  isPinned: boolean("is_pinned")
    .$default(() => false)
    .notNull(),
  isQuestion: boolean("is_question")
    .$default(() => false)
    .notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const postComment = pgTable("post_comment", {
  id: text("id").primaryKey(),
  postId: text("post_id")
    .notNull()
    .references(() => communityPost.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  parentCommentId: text("parent_comment_id"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const postReaction = pgTable("post_reaction", {
  id: text("id").primaryKey(),
  postId: text("post_id").references(() => communityPost.id, {
    onDelete: "cascade",
  }),
  commentId: text("comment_id").references(() => postComment.id, {
    onDelete: "cascade",
  }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: text("type").$default(() => "like"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const postAttachment = pgTable("post_attachment", {
  id: text("id").primaryKey(),
  postId: text("post_id").references(() => communityPost.id, {
    onDelete: "cascade",
  }),
  commentId: text("comment_id").references(() => postComment.id, {
    onDelete: "cascade",
  }),
  type: text("type").notNull(), // 'image', 'video'
  fileKey: text("file_key").notNull(), // R2 storage key
  fileName: text("file_name"),
  fileSize: integer("file_size"),
  mimeType: text("mime_type"),
  position: integer("position").$default(() => 0).notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const event = pgTable("event", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  eventLink: text("event_link"), // Zoom, Google Meet, etc.
  eventType: text("event_type")
    .$default(() => "live-session")
    .notNull(), // 'live-session', 'workshop', 'meetup', 'assignment-due'
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
}, (table) => [
  index("idx_event_start_time").on(table.startTime),
  index("idx_event_created_by").on(table.createdBy),
  index("idx_event_event_type").on(table.eventType),
]);

// User Profile - Extended profile information
export const userProfile = pgTable("user_profile", {
  id: text("id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  bio: text("bio"),
  skills: text("skills").array(), // Array of skills
  lookingFor: text("looking_for"),
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  websiteUrl: text("website_url"),
  twitterUrl: text("twitter_url"),
  isPublic: boolean("is_public")
    .$default(() => true)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
}, (table) => [
  index("idx_user_profile_is_public").on(table.isPublic),
]);

// Portfolio Items - Projects users are working on
export const portfolioItem = pgTable("portfolio_item", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  imageKey: text("image_key"), // R2 storage key
  url: text("url"), // Link to project
  technologies: text("technologies").array(), // Array of tech used
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
}, (table) => [
  index("idx_portfolio_item_user_id").on(table.userId),
  index("idx_portfolio_item_created_at").on(table.createdAt),
]);

export const songRelations = relations(song, ({ one, many }) => ({
  user: one(user, {
    fields: [song.userId],
    references: [user.id],
  }),
  hearts: many(heart),
  playlistSongs: many(playlistSong),
}));

export const heartRelations = relations(heart, ({ one }) => ({
  user: one(user, {
    fields: [heart.userId],
    references: [user.id],
  }),
  song: one(song, {
    fields: [heart.songId],
    references: [song.id],
  }),
}));

export const playlistRelations = relations(playlist, ({ one, many }) => ({
  user: one(user, {
    fields: [playlist.userId],
    references: [user.id],
  }),
  playlistSongs: many(playlistSong),
}));

export const playlistSongRelations = relations(playlistSong, ({ one }) => ({
  playlist: one(playlist, {
    fields: [playlistSong.playlistId],
    references: [playlist.id],
  }),
  song: one(song, {
    fields: [playlistSong.songId],
    references: [song.id],
  }),
}));

export const communityPostRelations = relations(communityPost, ({ one, many }) => ({
  user: one(user, {
    fields: [communityPost.userId],
    references: [user.id],
  }),
  comments: many(postComment),
  reactions: many(postReaction),
  attachments: many(postAttachment),
}));

export const postCommentRelations = relations(postComment, ({ one, many }) => ({
  post: one(communityPost, {
    fields: [postComment.postId],
    references: [communityPost.id],
  }),
  user: one(user, {
    fields: [postComment.userId],
    references: [user.id],
  }),
  parentComment: one(postComment, {
    fields: [postComment.parentCommentId],
    references: [postComment.id],
    relationName: "commentReplies",
  }),
  replies: many(postComment, { relationName: "commentReplies" }),
  reactions: many(postReaction),
  attachments: many(postAttachment),
}));

export const postAttachmentRelations = relations(postAttachment, ({ one }) => ({
  post: one(communityPost, {
    fields: [postAttachment.postId],
    references: [communityPost.id],
  }),
  comment: one(postComment, {
    fields: [postAttachment.commentId],
    references: [postComment.id],
  }),
}));

export const postReactionRelations = relations(postReaction, ({ one }) => ({
  post: one(communityPost, {
    fields: [postReaction.postId],
    references: [communityPost.id],
  }),
  comment: one(postComment, {
    fields: [postReaction.commentId],
    references: [postComment.id],
  }),
  user: one(user, {
    fields: [postReaction.userId],
    references: [user.id],
  }),
}));

export const eventRelations = relations(event, ({ one }) => ({
  user: one(user, {
    fields: [event.createdBy],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ one, many }) => ({
  songs: many(song),
  hearts: many(heart),
  playlists: many(playlist),
  communityPosts: many(communityPost),
  postComments: many(postComment),
  postReactions: many(postReaction),
  events: many(event),
  profile: one(userProfile, {
    fields: [user.id],
    references: [userProfile.id],
  }),
  portfolioItems: many(portfolioItem),
  notifications: many(notification),
  classroomModules: many(classroomModule),
  conversationsAsParticipant1: many(conversation, { relationName: "conversationsAsParticipant1" }),
  conversationsAsParticipant2: many(conversation, { relationName: "conversationsAsParticipant2" }),
  sentMessages: many(message),
}));

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(user, {
    fields: [userProfile.id],
    references: [user.id],
  }),
}));

export const portfolioItemRelations = relations(portfolioItem, ({ one }) => ({
  user: one(user, {
    fields: [portfolioItem.userId],
    references: [user.id],
  }),
}));

// Notifications
export const notification = pgTable("notification", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // 'post-reply', 'comment-reply', 'new-message', etc.
  title: text("title").notNull(),
  content: text("content"),
  relatedId: text("related_id"), // postId, messageId, commentId, etc.
  relatedType: text("related_type"), // 'post', 'comment', 'message'
  isRead: boolean("is_read")
    .$default(() => false)
    .notNull(),
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
}, (table) => [
  index("idx_notification_user_id").on(table.userId),
  index("idx_notification_is_read").on(table.userId, table.isRead),
  index("idx_notification_created_at").on(table.userId, table.createdAt),
]);

export const notificationRelations = relations(notification, ({ one }) => ({
  user: one(user, {
    fields: [notification.userId],
    references: [user.id],
  }),
}));

// Classroom Modules
export const classroomModule = pgTable("classroom_module", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  order: integer("order").notNull(),
  isPublished: boolean("is_published")
    .$default(() => false)
    .notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
}, (table) => [
  index("idx_classroom_module_order").on(table.order),
  index("idx_classroom_module_is_published").on(table.isPublished),
  index("idx_classroom_module_created_by").on(table.createdBy),
]);

// Module Content
export const moduleContent = pgTable("module_content", {
  id: text("id").primaryKey(),
  moduleId: text("module_id")
    .notNull()
    .references(() => classroomModule.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // 'video', 'task', 'image', 'pdf', 'text'
  title: text("title").notNull(),
  description: text("description"),
  fileKey: text("file_key"), // R2 storage key
  url: text("url"), // External link or presigned URL
  content: text("content"), // For text content
  position: integer("position").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
}, (table) => [
  index("idx_module_content_module_id").on(table.moduleId),
  index("idx_module_content_position").on(table.moduleId, table.position),
]);

export const classroomModuleRelations = relations(classroomModule, ({ one, many }) => ({
  user: one(user, {
    fields: [classroomModule.createdBy],
    references: [user.id],
  }),
  contents: many(moduleContent),
}));

export const moduleContentRelations = relations(moduleContent, ({ one }) => ({
  module: one(classroomModule, {
    fields: [moduleContent.moduleId],
    references: [classroomModule.id],
  }),
}));

// Conversations - Private messaging between two users
export const conversation = pgTable("conversation", {
  id: text("id").primaryKey(),
  participant1Id: text("participant1_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  participant2Id: text("participant2_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  lastMessageAt: timestamp("last_message_at"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
}, (table) => [
  index("idx_conversation_participant1").on(table.participant1Id),
  index("idx_conversation_participant2").on(table.participant2Id),
  index("idx_conversation_last_message_at").on(table.lastMessageAt),
]);

// Messages within conversations
export const message = pgTable("message", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id")
    .notNull()
    .references(() => conversation.id, { onDelete: "cascade" }),
  senderId: text("sender_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  isRead: boolean("is_read")
    .$default(() => false)
    .notNull(),
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
}, (table) => [
  index("idx_message_conversation_id").on(table.conversationId),
  index("idx_message_sender_id").on(table.senderId),
  index("idx_message_created_at").on(table.conversationId, table.createdAt),
]);

export const conversationRelations = relations(conversation, ({ one, many }) => ({
  participant1: one(user, {
    fields: [conversation.participant1Id],
    references: [user.id],
    relationName: "conversationsAsParticipant1",
  }),
  participant2: one(user, {
    fields: [conversation.participant2Id],
    references: [user.id],
    relationName: "conversationsAsParticipant2",
  }),
  messages: many(message),
}));

export const messageRelations = relations(message, ({ one }) => ({
  conversation: one(conversation, {
    fields: [message.conversationId],
    references: [conversation.id],
  }),
  sender: one(user, {
    fields: [message.senderId],
    references: [user.id],
  }),
}));

export type Song = typeof song.$inferSelect;
export type CreateSongData = typeof song.$inferInsert;
export type UpdateSongData = Partial<
  Omit<CreateSongData, "id" | "createdAt">
>;

export type User = typeof user.$inferSelect;
export type Heart = typeof heart.$inferSelect;
export type CreateHeartData = typeof heart.$inferInsert;

export type Playlist = typeof playlist.$inferSelect;
export type CreatePlaylistData = typeof playlist.$inferInsert;
export type UpdatePlaylistData = Partial<
  Omit<CreatePlaylistData, "id" | "createdAt">
>;

export type PlaylistSong = typeof playlistSong.$inferSelect;
export type CreatePlaylistSongData = typeof playlistSong.$inferInsert;

export type CommunityPost = typeof communityPost.$inferSelect;
export type CreateCommunityPostData = typeof communityPost.$inferInsert;
export type UpdateCommunityPostData = Partial<
  Omit<CreateCommunityPostData, "id" | "createdAt">
>;

export type PostComment = typeof postComment.$inferSelect;
export type CreatePostCommentData = typeof postComment.$inferInsert;
export type UpdatePostCommentData = Partial<
  Omit<CreatePostCommentData, "id" | "createdAt" | "postId" | "userId">
>;

export type PostReaction = typeof postReaction.$inferSelect;
export type CreatePostReactionData = typeof postReaction.$inferInsert;

export type PostAttachment = typeof postAttachment.$inferSelect;
export type CreatePostAttachmentData = typeof postAttachment.$inferInsert;

export type AttachmentType = "image" | "video";

export type SubscriptionPlan = "free" | "basic" | "pro";
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "unpaid" | "incomplete";

export type Event = typeof event.$inferSelect;
export type CreateEventData = typeof event.$inferInsert;
export type UpdateEventData = Partial<
  Omit<CreateEventData, "id" | "createdAt" | "createdBy">
>;

export type EventType = "live-session" | "workshop" | "meetup" | "assignment-due";

export type UserProfile = typeof userProfile.$inferSelect;
export type CreateUserProfileData = typeof userProfile.$inferInsert;
export type UpdateUserProfileData = Partial<
  Omit<CreateUserProfileData, "id">
>;

export type PortfolioItem = typeof portfolioItem.$inferSelect;
export type CreatePortfolioItemData = typeof portfolioItem.$inferInsert;
export type UpdatePortfolioItemData = Partial<
  Omit<CreatePortfolioItemData, "id" | "userId" | "createdAt">
>;

export type Notification = typeof notification.$inferSelect;
export type CreateNotificationData = typeof notification.$inferInsert;
export type NotificationType = "post-reply" | "comment-reply" | "new-message";
export type NotificationRelatedType = "post" | "comment" | "message";

export type ClassroomModule = typeof classroomModule.$inferSelect;
export type CreateClassroomModuleData = typeof classroomModule.$inferInsert;
export type UpdateClassroomModuleData = Partial<
  Omit<CreateClassroomModuleData, "id" | "createdAt" | "createdBy">
>;

export type ModuleContent = typeof moduleContent.$inferSelect;
export type CreateModuleContentData = typeof moduleContent.$inferInsert;
export type UpdateModuleContentData = Partial<
  Omit<CreateModuleContentData, "id" | "createdAt" | "moduleId">
>;

export type ModuleContentType = "video" | "task" | "image" | "pdf" | "text";

export type Conversation = typeof conversation.$inferSelect;
export type CreateConversationData = typeof conversation.$inferInsert;

export type Message = typeof message.$inferSelect;
export type CreateMessageData = typeof message.$inferInsert;
