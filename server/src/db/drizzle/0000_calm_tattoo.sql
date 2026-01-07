-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "list" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"password" text NOT NULL,
	"admin" boolean DEFAULT false,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "list_recipe" (
	"list_id" serial NOT NULL,
	"recipe_id" serial NOT NULL,
	"number_of_servings" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ingredient" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"picture" text,
	"id_type_ingredient" integer
);
--> statement-breakpoint
CREATE TABLE "diet" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"gluten" boolean
);
--> statement-breakpoint
CREATE TABLE "recipe_ingredient" (
	"recipe_id" serial NOT NULL,
	"ingredient_id" serial NOT NULL,
	"quantity" integer NOT NULL,
	"unit" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recipe_ustensil" (
	"recipe_id" serial NOT NULL,
	"ustensil_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ustensil" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"picture" text
);
--> statement-breakpoint
CREATE TABLE "unit" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "type_ingredient" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recipe" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"picture" text,
	"kcal" integer,
	"difficulty" text,
	"time_preparation" integer,
	"id_category" integer NOT NULL,
	"id_diet" integer NOT NULL,
	"step1" text NOT NULL,
	"step2" text,
	"step3" text,
	"step4" text,
	"step5" text,
	"step6" text,
	"step7" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "list" ADD CONSTRAINT "list_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "list_recipe" ADD CONSTRAINT "list_recipe_list_id_list_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."list"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "list_recipe" ADD CONSTRAINT "list_recipe_recipe_id_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_id_type_ingredient_type_ingredient_id_fk" FOREIGN KEY ("id_type_ingredient") REFERENCES "public"."type_ingredient"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_ingredient_id_ingredient_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredient"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_recipe_id_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_unit_unit_id_fk" FOREIGN KEY ("unit") REFERENCES "public"."unit"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_ustensil" ADD CONSTRAINT "recipe_ustensil_recipe_id_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_ustensil" ADD CONSTRAINT "recipe_ustensil_ustensil_id_ustensil_id_fk" FOREIGN KEY ("ustensil_id") REFERENCES "public"."ustensil"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_id_category_category_id_fk" FOREIGN KEY ("id_category") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_id_diet_diet_id_fk" FOREIGN KEY ("id_diet") REFERENCES "public"."diet"("id") ON DELETE no action ON UPDATE no action;
*/