CREATE TABLE "classroom_module" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"order" integer NOT NULL,
	"is_published" boolean NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "module_content" (
	"id" text PRIMARY KEY NOT NULL,
	"module_id" text NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"file_key" text,
	"url" text,
	"content" text,
	"position" integer NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "classroom_module" ADD CONSTRAINT "classroom_module_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "module_content" ADD CONSTRAINT "module_content_module_id_classroom_module_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."classroom_module"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_classroom_module_order" ON "classroom_module" USING btree ("order");--> statement-breakpoint
CREATE INDEX "idx_classroom_module_is_published" ON "classroom_module" USING btree ("is_published");--> statement-breakpoint
CREATE INDEX "idx_classroom_module_created_by" ON "classroom_module" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "idx_module_content_module_id" ON "module_content" USING btree ("module_id");--> statement-breakpoint
CREATE INDEX "idx_module_content_position" ON "module_content" USING btree ("module_id","position");