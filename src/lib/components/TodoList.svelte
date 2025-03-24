<script lang="ts">
  import { trpc } from '$lib/server/trpc/client';
  import TodoItem from './TodoItem.svelte';
  import TodoForm from './TodoForm.svelte';
  import { onMount } from 'svelte';

  let todos: Array<{
    id: number;
    title: string;
    completed: boolean;
    userId: number;
  }> = [];

  let loading = true;
  let error = false;

  async function fetchTodos() {
    loading = true;
    error = false;

    try {
      todos = await trpc().todo.getAll.query();
    } catch (e) {
      console.error(e);
      error = true;
    } finally {
      loading = false;
    }
  }

  onMount(fetchTodos);
</script>

<div class="container">
  <div class="mb-4 flex items-center justify-between">
    <h1>Todo List</h1>
    <a href="/users" class="text-blue-500 hover:underline">Manage Users</a>
  </div>
  <p class="mb-6 text-gray-600">A simple Todo app using Svelte, tRPC, Drizzle and Neon Postgres</p>

  <TodoForm onSubmit={fetchTodos} />

  {#if loading}
    <div class="flex justify-center p-8">
      <p class="text-gray-500">Loading todos...</p>
    </div>
  {:else if error}
    <div class="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
      <p>Failed to load todos. Please try again.</p>
      <button class="btn-secondary mt-2" on:click={fetchTodos}>Retry</button>
    </div>
  {:else if todos.length === 0}
    <div class="p-8 text-center">
      <p class="text-gray-500">No todos yet. Add your first one above!</p>
    </div>
  {:else}
    <div>
      {#each todos as todo (todo.id)}
        <TodoItem {...todo} onChange={fetchTodos} />
      {/each}
    </div>
  {/if}
</div>
