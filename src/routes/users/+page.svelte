<script lang="ts">
  import { trpc } from '$lib/trpc/client';
  import { onMount } from 'svelte';

  let users: Array<{
    id: number;
    age: number | null;
    firstName: string | null;
    fullName: string | null;
    role: string;
  }> = [];

  let loading = true;
  let error = false;
  let newUserAge: number | null = null;
  let newUserFirstName = '';
  let newUserFullName = '';
  let newUserRole: 'User' | 'Moderator' = 'User';
  let isCreating = false;

  async function fetchUsers() {
    loading = true;
    error = false;

    try {
      users = await trpc().user.getAll.query();
    } catch (e) {
      console.error(e);
      error = true;
    } finally {
      loading = false;
    }
  }

  async function createUser() {
    if (isCreating) return;

    isCreating = true;
    try {
      const ageParam = newUserAge === null ? undefined : newUserAge;
      await trpc().user.create.mutate({
        firstName: newUserFirstName || undefined,
        fullName: newUserFullName || undefined,
        role: newUserRole,
        age: ageParam
      });
      await fetchUsers();
      newUserAge = null;
      newUserFirstName = '';
      newUserFullName = '';
      newUserRole = 'User';
    } finally {
      isCreating = false;
    }
  }

  onMount(fetchUsers);
</script>

<div class="container">
  <h1>User Management</h1>
  <p class="mb-6 text-gray-600">Manage users for your todo application</p>

  <div class="mb-8">
    <h2>Add New User</h2>
    <form
      onsubmit={(e) => {
        e.preventDefault();
        createUser();
      }}
      class="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <div>
        <label for="firstName" class="mb-1 block text-sm font-medium text-gray-700"
          >First Name</label
        >
        <input
          id="firstName"
          type="text"
          bind:value={newUserFirstName}
          class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="fullName" class="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
        <input
          id="fullName"
          type="text"
          bind:value={newUserFullName}
          class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="role" class="mb-1 block text-sm font-medium text-gray-700">Role</label>
        <select
          id="role"
          bind:value={newUserRole}
          class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="User">User</option>
          <option value="Moderator">Moderator</option>
        </select>
      </div>

      <div>
        <label for="age" class="mb-1 block text-sm font-medium text-gray-700">Age</label>
        <input
          id="age"
          type="number"
          bind:value={newUserAge}
          class="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          min="0"
          max="120"
        />
      </div>

      <div class="md:col-span-2">
        <button type="submit" class="btn-primary w-full md:w-auto" disabled={isCreating}>
          {isCreating ? 'Creating...' : 'Create User'}
        </button>
      </div>
    </form>
  </div>

  <h2>Users</h2>

  {#if loading}
    <div class="flex justify-center p-8">
      <p class="text-gray-500">Loading users...</p>
    </div>
  {:else if error}
    <div class="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
      <p>Failed to load users. Please try again.</p>
      <button class="btn-secondary mt-2" onclick={fetchUsers}>Retry</button>
    </div>
  {:else if users.length === 0}
    <div class="p-8 text-center">
      <p class="text-gray-500">No users yet. Create your first one above!</p>
    </div>
  {:else}
    <div class="overflow-hidden rounded-lg bg-white shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >ID</th
            >
            <th
              class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >First Name</th
            >
            <th
              class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >Full Name</th
            >
            <th
              class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >Role</th
            >
            <th
              class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >Age</th
            >
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          {#each users as user (user.id)}
            <tr>
              <td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900"
                >{user.id}</td
              >
              <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500"
                >{user.firstName ?? '-'}</td
              >
              <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500"
                >{user.fullName ?? '-'}</td
              >
              <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                <span
                  class={`rounded-full px-2 py-1 text-xs font-medium ${user.role === 'Moderator' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}
                >
                  {user.role ?? 'User'}
                </span>
              </td>
              <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500"
                >{user.age ?? 'Not specified'}</td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  <div class="mt-8">
    <a href="/" class="text-blue-500 hover:underline">Back to Todos</a>
  </div>
</div>
