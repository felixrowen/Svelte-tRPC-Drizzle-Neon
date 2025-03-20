import { z } from 'zod';
import { procedure, router } from '../index';
import { eq } from 'drizzle-orm';
import { todo } from '$lib/server/db/schema';

export const todoRouter = router({
  getAll: procedure.query(async ({ ctx }) => {
    return await ctx.db.query.todo.findMany();
  }),
  
  getById: procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.todo.findFirst({
        where: eq(todo.id, input.id)
      });
    }),
  
  create: procedure
    .input(z.object({ 
      title: z.string(),
      completed: z.boolean().default(false),
      userId: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(todo).values({
        title: input.title,
        completed: input.completed,
        userId: input.userId
      }).returning();
    }),
    
  toggle: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const currentTodo = await ctx.db.query.todo.findFirst({
        where: eq(todo.id, input.id)
      });
      
      if (!currentTodo) {
        throw new Error('Todo not found');
      }
      
      return await ctx.db.update(todo)
        .set({ completed: !currentTodo.completed })
        .where(eq(todo.id, input.id))
        .returning();
    })
}); 