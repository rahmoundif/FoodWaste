import { pgTable, foreignKey, serial, timestamp, unique, text, boolean, integer } from "drizzle-orm/pg-core"


export const list = pgTable("list", {
	id: serial().primaryKey().notNull(),
	userId: serial("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "list_user_id_users_id_fk"
		}),
]);

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	password: text().notNull(),
	admin: boolean().default(false),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

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
