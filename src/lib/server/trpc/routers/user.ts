import { z } from 'zod';
import { procedure, router } from '../index';
import { eq } from 'drizzle-orm';
import { user } from '$lib/server/db/schema';

export const userRouter = router({
  getAll: procedure.query(async ({ ctx }) => {
    return await ctx.db.query.user.findMany();
  }),

  getById: procedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
    return await ctx.db.query.user.findFirst({
      where: eq(user.id, input.id)
    });
  }),

  create: procedure
    .input(
      z.object({
        firstName: z.string().optional(),
        fullName: z.string().optional(),
        role: z.enum(['User', 'Moderator']).default('User'),
        age: z.number().optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(user)
        .values({
          firstName: input.firstName,
          fullName: input.fullName,
          role: input.role,
          age: input.age
        })
        .returning();
    })
});
