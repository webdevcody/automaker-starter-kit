CREATE TABLE "conversation" (
	"id" text PRIMARY KEY NOT NULL,
	"participant1_id" text NOT NULL,
	"participant2_id" text NOT NULL,
	"last_message_at" timestamp,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "message" (
	"id" text PRIMARY KEY NOT NULL,
	"conversation_id" text NOT NULL,
	"sender_id" text NOT NULL,
	"content" text NOT NULL,
	"is_read" boolean NOT NULL,
	"read_at" timestamp,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "is_admin" boolean NOT NULL DEFAULT false;--> statement-breakpoint
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_participant1_id_user_id_fk" FOREIGN KEY ("participant1_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_participant2_id_user_id_fk" FOREIGN KEY ("participant2_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_conversation_id_conversation_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_sender_id_user_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_conversation_participant1" ON "conversation" USING btree ("participant1_id");--> statement-breakpoint
CREATE INDEX "idx_conversation_participant2" ON "conversation" USING btree ("participant2_id");--> statement-breakpoint
CREATE INDEX "idx_conversation_last_message_at" ON "conversation" USING btree ("last_message_at");--> statement-breakpoint
CREATE INDEX "idx_message_conversation_id" ON "message" USING btree ("conversation_id");--> statement-breakpoint
CREATE INDEX "idx_message_sender_id" ON "message" USING btree ("sender_id");--> statement-breakpoint
CREATE INDEX "idx_message_created_at" ON "message" USING btree ("conversation_id","created_at");