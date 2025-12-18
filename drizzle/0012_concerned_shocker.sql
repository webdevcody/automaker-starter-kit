CREATE TABLE "event" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp,
	"event_link" text,
	"event_type" text NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "event" ADD CONSTRAINT "event_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_event_start_time" ON "event" USING btree ("start_time");--> statement-breakpoint
CREATE INDEX "idx_event_created_by" ON "event" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "idx_event_event_type" ON "event" USING btree ("event_type");