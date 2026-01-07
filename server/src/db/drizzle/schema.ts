import { pgTable, foreignKey, serial, integer, timestamp, boolean, text, index, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const listRecipe = pgTable("list_recipe", {
	listId: serial("list_id").notNull(),
	recipeId: serial("recipe_id").notNull(),
	numberOfServings: integer("number_of_servings").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.listId],
			foreignColumns: [list.id],
			name: "list_recipe_list_id_list_id_fk"
		}),
	foreignKey({
			columns: [table.recipeId],
			foreignColumns: [recipe.id],
			name: "list_recipe_recipe_id_recipe_id_fk"
		}),
]);

export const profile = pgTable("profile", {
	id: serial().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	admin: boolean().default(false),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "profile_user_id_user_id_fk"
		}).onDelete("cascade"),
]);

export const ingredient = pgTable("ingredient", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	picture: text(),
	idTypeIngredient: integer("id_type_ingredient"),
}, (table) => [
	foreignKey({
			columns: [table.idTypeIngredient],
			foreignColumns: [typeIngredient.id],
			name: "ingredient_id_type_ingredient_type_ingredient_id_fk"
		}),
]);

export const list = pgTable("list", {
	id: serial().primaryKey().notNull(),
	userId: serial("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [profile.id],
			name: "list_user_id_profile_id_fk"
		}),
]);

export const diet = pgTable("diet", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	gluten: boolean(),
});

export const recipeIngredient = pgTable("recipe_ingredient", {
	recipeId: serial("recipe_id").notNull(),
	ingredientId: serial("ingredient_id").notNull(),
	quantity: integer().notNull(),
	unit: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.ingredientId],
			foreignColumns: [ingredient.id],
			name: "recipe_ingredient_ingredient_id_ingredient_id_fk"
		}),
	foreignKey({
			columns: [table.recipeId],
			foreignColumns: [recipe.id],
			name: "recipe_ingredient_recipe_id_recipe_id_fk"
		}),
	foreignKey({
			columns: [table.unit],
			foreignColumns: [unit.id],
			name: "recipe_ingredient_unit_unit_id_fk"
		}),
]);

export const recipeUstensil = pgTable("recipe_ustensil", {
	recipeId: serial("recipe_id").notNull(),
	ustensilId: serial("ustensil_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.recipeId],
			foreignColumns: [recipe.id],
			name: "recipe_ustensil_recipe_id_recipe_id_fk"
		}),
	foreignKey({
			columns: [table.ustensilId],
			foreignColumns: [ustensil.id],
			name: "recipe_ustensil_ustensil_id_ustensil_id_fk"
		}),
]);

export const ustensil = pgTable("ustensil", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	picture: text(),
});

export const unit = pgTable("unit", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
});

export const typeIngredient = pgTable("type_ingredient", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
});

export const category = pgTable("category", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
});

export const recipe = pgTable("recipe", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	picture: text(),
	kcal: integer(),
	difficulty: text(),
	timePreparation: integer("time_preparation"),
	idCategory: integer("id_category").notNull(),
	idDiet: integer("id_diet").notNull(),
	step1: text().notNull(),
	step2: text(),
	step3: text(),
	step4: text(),
	step5: text(),
	step6: text(),
	step7: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.idCategory],
			foreignColumns: [category.id],
			name: "recipe_id_category_category_id_fk"
		}),
	foreignKey({
			columns: [table.idDiet],
			foreignColumns: [diet.id],
			name: "recipe_id_diet_diet_id_fk"
		}),
]);

export const action = pgTable("action", {
	userId: serial("user_id").notNull(),
	recipeId: serial("recipe_id").notNull(),
	rate: integer(),
	isFavorite: boolean("is_favorite").default(false),
	comment: text(),
}, (table) => [
	foreignKey({
			columns: [table.recipeId],
			foreignColumns: [recipe.id],
			name: "action_recipe_id_recipe_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [profile.id],
			name: "action_user_id_profile_id_fk"
		}),
]);

export const verification = pgTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("verification_identifier_idx").using("btree", table.identifier.asc().nullsLast().op("text_ops")),
]);

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const account = pgTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull(),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'string' }),
	scope: text(),
	password: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	index("account_userId_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_user_id_user_id_fk"
		}).onDelete("cascade"),
]);

export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	token: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull(),
}, (table) => [
	index("session_userId_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_user_id_user_id_fk"
		}).onDelete("cascade"),
	unique("session_token_unique").on(table.token),
]);
