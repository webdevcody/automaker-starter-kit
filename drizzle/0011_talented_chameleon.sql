CREATE TABLE "post_attachment" (
	"id" text PRIMARY KEY NOT NULL,
	"post_id" text,
	"comment_id" text,
	"type" text NOT NULL,
	"file_key" text NOT NULL,
	"file_name" text,
	"file_size" integer,
	"mime_type" text,
	"position" integer NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "post_attachment" ADD CONSTRAINT "post_attachment_post_id_community_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."community_post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_attachment" ADD CONSTRAINT "post_attachment_comment_id_post_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."post_comment"("id") ON DELETE cascade ON UPDATE no action;