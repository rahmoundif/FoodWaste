import { relations } from "drizzle-orm/relations";
import { users, list, listRecipe, recipe, typeIngredient, ingredient, recipeIngredient, unit, recipeUstensil, ustensil, category, diet } from "./schema";

export const listRelations = relations(list, ({one, many}) => ({
	user: one(users, {
		fields: [list.userId],
		references: [users.id]
	}),
	listRecipes: many(listRecipe),
}));

export const usersRelations = relations(users, ({many}) => ({
	lists: many(list),
}));

export const listRecipeRelations = relations(listRecipe, ({one}) => ({
	list: one(list, {
		fields: [listRecipe.listId],
		references: [list.id]
	}),
	recipe: one(recipe, {
		fields: [listRecipe.recipeId],
		references: [recipe.id]
	}),
}));

export const recipeRelations = relations(recipe, ({one, many}) => ({
	listRecipes: many(listRecipe),
	recipeIngredients: many(recipeIngredient),
	recipeUstensils: many(recipeUstensil),
	category: one(category, {
		fields: [recipe.idCategory],
		references: [category.id]
	}),
	diet: one(diet, {
		fields: [recipe.idDiet],
		references: [diet.id]
	}),
}));

export const ingredientRelations = relations(ingredient, ({one, many}) => ({
	typeIngredient: one(typeIngredient, {
		fields: [ingredient.idTypeIngredient],
		references: [typeIngredient.id]
	}),
	recipeIngredients: many(recipeIngredient),
}));

export const typeIngredientRelations = relations(typeIngredient, ({many}) => ({
	ingredients: many(ingredient),
}));

export const recipeIngredientRelations = relations(recipeIngredient, ({one}) => ({
	ingredient: one(ingredient, {
		fields: [recipeIngredient.ingredientId],
		references: [ingredient.id]
	}),
	recipe: one(recipe, {
		fields: [recipeIngredient.recipeId],
		references: [recipe.id]
	}),
	unit: one(unit, {
		fields: [recipeIngredient.unit],
		references: [unit.id]
	}),
}));

export const unitRelations = relations(unit, ({many}) => ({
	recipeIngredients: many(recipeIngredient),
}));

export const recipeUstensilRelations = relations(recipeUstensil, ({one}) => ({
	recipe: one(recipe, {
		fields: [recipeUstensil.recipeId],
		references: [recipe.id]
	}),
	ustensil: one(ustensil, {
		fields: [recipeUstensil.ustensilId],
		references: [ustensil.id]
	}),
}));

export const ustensilRelations = relations(ustensil, ({many}) => ({
	recipeUstensils: many(recipeUstensil),
}));

export const categoryRelations = relations(category, ({many}) => ({
	recipes: many(recipe),
}));

export const dietRelations = relations(diet, ({many}) => ({
	recipes: many(recipe),
}));