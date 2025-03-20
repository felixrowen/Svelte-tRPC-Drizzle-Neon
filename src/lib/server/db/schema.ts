import { pgTable, serial, text, integer, boolean } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  firstName: text('first_name'),
  fullName: text('full_name'),
  role: text('role').default('User').notNull(),
  age: integer('age')
});

export const todo = pgTable('todo', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  completed: boolean('completed').default(false).notNull(),
  userId: integer('user_id')
    .references(() => user.id)
    .notNull()
});
