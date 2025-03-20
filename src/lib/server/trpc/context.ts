import type { RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';

export interface Context {
  event: RequestEvent;
  db: typeof db;
}

export async function createContext(event: RequestEvent): Promise<Context> {
  return {
    event,
    db
  };
} 