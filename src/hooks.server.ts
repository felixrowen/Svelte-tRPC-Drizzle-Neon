import { createContext } from '$lib/server/trpc/context';
import { appRouter } from '$lib/server/trpc/router';
import { createTRPCHandle } from 'trpc-sveltekit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = createTRPCHandle({ router: appRouter, createContext });
