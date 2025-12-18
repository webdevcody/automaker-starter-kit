CREATE TABLE "portfolio_item" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"image_key" text,
	"url" text,
	"technologies" text[],
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_profile" (
	"id" text PRIMARY KEY NOT NULL,
	"bio" text,
	"skills" text[],
	"looking_for" text,
	"github_url" text,
	"linkedin_url" text,
	"website_url" text,
	"twitter_url" text,
	"is_public" boolean NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "portfolio_item" ADD CONSTRAINT "portfolio_item_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_portfolio_item_user_id" ON "portfolio_item" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_portfolio_item_created_at" ON "portfolio_item" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_user_profile_is_public" ON "user_profile" USING btree ("is_public");