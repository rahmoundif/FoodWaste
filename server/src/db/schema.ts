import { pgTable, serial, text, timestamp, boolean, integer} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  admin: boolean("admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});


export const list= pgTable("list", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const list_recipe = pgTable("list_recipe", {
  list_id: serial("list_id").references(() => list.id),
  recipe_id: serial("recipe_id").notNull().references(() => recipe.id),
  number_of_servings: integer("number_of_servings").notNull(),
});

export const ingredient = pgTable("ingredient", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  picture: text("picture"),
  id_type_ingredient: integer("id_type_ingredient").references(() => type_ingredient.id),
});

export const recipe_ingredient = pgTable("recipe_ingredient", {
  recipe_id: serial("recipe_id").notNull().references(() => recipe.id),
  ingredient_id: serial("ingredient_id").references(() => ingredient.id),
  quantity: integer("quantity").notNull(),
  unit: integer("unit").notNull().references(() => unit.id),
});

export const recipe = pgTable("recipe", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  picture: text("picture"),
  kcal: integer("kcal"),
  difficulty: text("difficulty"),
  time_preparation: integer("time_preparation"),
  id_category: integer("id_category").notNull().references(() => category.id),
  id_diet: integer("id_diet").notNull().references(() => diet.id),
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
  recipe_id: serial("recipe_id").notNull().references(() => recipe.id),
  ustensil_id: serial("ustensil_id").notNull().references(() => ustensil.id)  ,
});

export const ustensil = pgTable("ustensil", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  picture: text("picture"),
});

export const unit = pgTable("unit", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const type_ingredient = pgTable("type_ingredient", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const diet = pgTable("diet", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  gluten: boolean("gluten"),
});