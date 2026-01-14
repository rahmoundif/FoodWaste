import {
	pgTable,
	serial,
	text,
	timestamp,
	boolean,
	integer,
	index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import z from "zod";

export const list = pgTable("list", {
	id: serial("id").primaryKey(),
	userId: text("user_id").references(() => user.id),
	createdAt: timestamp("created_at").defaultNow(),
});

export const list_recipe = pgTable("list_recipe", {
	list_id: serial("list_id").references(() => list.id),
	recipe_id: serial("recipe_id")
		.notNull()
		.references(() => recipe.id),
	number_of_servings: integer("number_of_servings").notNull(),
});

export const ingredient = pgTable("ingredient", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	picture: text("picture"),
	id_type_ingredient: integer("id_type_ingredient").references(
		() => type_ingredient.id,
	),
});

export const selectIngredientSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	picture: z.string().nullable(),
	id_type_ingredient: z.number().int().nullable(),
});

export const insertIngredientSchema = z.object({
	name: z.string(),
	picture: z.string().nullable(),
	id_type_ingredient: z.number().int().nullable(),
});

export const existingIngredientSchema = z.object({
	name: z.string(),
});

export const deleteIngredientSchema = z.object({
	id: z.number().int(),
});

export const recipe_ingredient = pgTable("recipe_ingredient", {
	recipe_id: serial("recipe_id")
		.notNull()
		.references(() => recipe.id),
	ingredient_id: serial("ingredient_id").references(() => ingredient.id),
	quantity: integer("quantity").notNull(),
	unit: integer("unit")
		.notNull()
		.references(() => unit.id),
});

export const recipe = pgTable("recipe", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
	picture: text("picture"),
	kcal: integer("kcal"),
	difficulty: text("difficulty"),
	time_preparation: integer("time_preparation"),
	id_category: integer("id_category")
		.notNull()
		.references(() => category.id),
	id_diet: integer("id_diet")
		.notNull()
		.references(() => diet.id),
	step1: text("step1").notNull(),
	step2: text("step2"),
	step3: text("step3"),
	step4: text("step4"),
	step5: text("step5"),
	step6: text("step6"),
	step7: text("step7"),
	createdAt: timestamp("created_at").defaultNow(),
});

export const recipe_ustensil = pgTable("recipe_ustensil", {
	recipe_id: serial("recipe_id")
		.notNull()
		.references(() => recipe.id),
	ustensil_id: serial("ustensil_id")
		.notNull()
		.references(() => ustensil.id),
});

export const ustensil = pgTable("ustensil", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	picture: text("picture"),
});

export const selectUstensilSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	picture: z.string().nullable(),
});

export const insertUstensilSchema = z.object({
	name: z.string(),
	picture: z.string().nullable(),
});

export const deleteUstensilSchema = z.object({
	id: z.number().int(),
});

export const unit = pgTable("unit", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
});

export const selectUnitSchema = z.object({
	id: z.number().int(),
	name: z.string(),
});

export const insertUnitSchema = z.object({
	name: z.string(),
});

export const deleteUnitSchema = z.object({
	id: z.number().int(),
});

export const type_ingredient = pgTable("type_ingredient", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
});

export const category = pgTable("category", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
});

export const selectCategorySchema = z.object({
	id: z.number().int(),
	name: z.string(),
});

export const diet = pgTable("diet", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	gluten: boolean("gluten"),
});

export const selectDietSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	gluten: z.boolean().nullable(),
});

export const action = pgTable("action", {
	user_id: text("user_id").references(() => user.id),
	recipe_id: serial("recipe_id").references(() => recipe.id),
	rate: integer("rate"),
	is_favorite: boolean("is_favorite").default(false),
	comment: text("comment"),
});

// BETTER AUTH TABLES //

export const roleEnum = ["user", "admin", "moderator"] as const;
export type Role = (typeof roleEnum)[number];

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	role: text("role", { enum: roleEnum }).default("user").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const session = pgTable(
	"session",
	{
		id: text("id").primaryKey(),
		expiresAt: timestamp("expires_at").notNull(),
		token: text("token").notNull().unique(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
	},
	(table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
	"account",
	{
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
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
	"verification",
	{
		id: text("id").primaryKey(),
		identifier: text("identifier").notNull(),
		value: text("value").notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));
