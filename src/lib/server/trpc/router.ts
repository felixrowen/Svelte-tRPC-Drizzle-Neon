import { router } from './index';
import { todoRouter } from '$lib/server/trpc/routers/todo';
import { userRouter } from '$lib/server/trpc/routers/user';

export const appRouter = router({
  todo: todoRouter,
  user: userRouter
});

export type AppRouter = typeof appRouter;
