<script lang="ts">
  import { trpc } from '$lib/server/trpc/client';
  import { onMount } from 'svelte';

  const { onSubmit }: { onSubmit?: () => void } = $props();

  let title = $state('');
  let loading = $state(false);
  let users = $state<Array<{
    id: number;
    age: number | null;
    firstName: string | null;
    fullName: string | null;
    role: string;
  }>>([]);
  let selectedUserId = $state<number | null>(null);
  let loadingUsers = $state(true);

  async function fetchUsers() {
    loadingUsers = true;
    try {
      users = await trpc().user.getAll.query();
      if (users.length > 0) {
        selectedUserId = users[0].id;
      }
    } catch (e) {
      console.error('Failed to load users:', e);
    } finally {
      loadingUsers = false;
    }
  }

  async function handleSubmit() {
    if (!title.trim() || !selectedUserId) return;

    loading = true;
    try {
      await trpc().todo.create.mutate({
        title,
        userId: selectedUserId
      });
      title = '';
      if (onSubmit) onSubmit();
    } catch (e) {
      console.error('Failed to create todo:', e);
      alert("Failed to create todo. Make sure you've created a user first.");
    } finally {
      loading = false;
    }
  }

  onMount(fetchUsers);
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    handleSubmit();
  }}
  class="mb-6"
>
  <div class="flex flex-col gap-4">
    <div>
      <label for="title" class="mb-1 block text-sm font-medium text-gray-700">Todo Title</label>
      <input
        id="title"
        type="text"
        bind:value={title}
        placeholder="Add a new todo..."
        class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        disabled={loading || loadingUsers}
      />
    </div>

    <div>
      <label for="user" class="mb-1 block text-sm font-medium text-gray-700">Assign to User</label>
      <select
        id="user"
        bind:value={selectedUserId}
        class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        disabled={loading || loadingUsers}
      >
        {#if users.length === 0}
          <option value={null}>No users available - create one first</option>
        {:else}
          {#each users as user}
            <option value={user.id}>
              {user.firstName || ''} {user.fullName || ''} 
              {user.firstName || user.fullName ? `(${user.role})` : `User #${user.id} (${user.role})`}
            </option>
          {/each}
        {/if}
      </select>
    </div>

    <button
      type="submit"
      class="btn-primary"
      disabled={loading || loadingUsers || !title.trim() || !selectedUserId || users.length === 0}
    >
      {#if loadingUsers}
        Loading Users...
      {:else if loading}
        Adding...
      {:else if users.length === 0}
        Please Create a User First
      {:else}
        Add Todo
      {/if}
    </button>
  </div>
</form>
