CREATE TABLE "post_reaction" (
	"id" text PRIMARY KEY NOT NULL,
	"post_id" text,
	"comment_id" text,
	"user_id" text NOT NULL,
	"type" text,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "post_reaction" ADD CONSTRAINT "post_reaction_post_id_community_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."community_post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_reaction" ADD CONSTRAINT "post_reaction_comment_id_post_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."post_comment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_reaction" ADD CONSTRAINT "post_reaction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_post_reaction_post_id" ON "post_reaction"("post_id");--> statement-breakpoint
CREATE INDEX "idx_post_reaction_comment_id" ON "post_reaction"("comment_id");--> statement-breakpoint
CREATE INDEX "idx_post_reaction_user_id" ON "post_reaction"("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_user_post_reaction" ON "post_reaction"("user_id", "post_id") WHERE "post_id" IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_user_comment_reaction" ON "post_reaction"("user_id", "comment_id") WHERE "comment_id" IS NOT NULL;