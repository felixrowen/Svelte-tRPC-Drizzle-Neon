import { router } from './index';
import { todoRouter } from './routers/todo';
import { userRouter } from './routers/user';

export const appRouter = router({
  todo: todoRouter,
  user: userRouter
});

export type AppRouter = typeof appRouter; 