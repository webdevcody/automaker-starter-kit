CREATE TABLE "community_post" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"content" text NOT NULL,
	"category" text,
	"is_pinned" boolean NOT NULL,
	"is_question" boolean NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "community_post" ADD CONSTRAINT "community_post_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX "idx_community_post_user_id" ON "community_post" ("user_id");
--> statement-breakpoint
CREATE INDEX "idx_community_post_created_at" ON "community_post" ("created_at" DESC);
--> statement-breakpoint
CREATE INDEX "idx_community_post_category" ON "community_post" ("category");
--> statement-breakpoint
CREATE INDEX "idx_community_post_is_pinned" ON "community_post" ("is_pinned");