<script lang="ts">
  import { trpc } from '$lib/server/trpc/client';

  const {
    id,
    title,
    completed,
    onChange
  }: { id: number; title: string; completed: boolean; onChange?: () => void } = $props();

  async function toggleTodo() {
    await trpc().todo.toggle.mutate({ id });
    if (onChange) onChange();
  }
</script>

<div class="mb-2 flex items-center justify-between rounded-lg bg-white p-4 shadow">
  <div class="flex items-center gap-3">
    <input
      type="checkbox"
      checked={completed}
      class="h-5 w-5 rounded text-blue-500 focus:ring-blue-500"
      onchange={toggleTodo}
    />
    <span class={completed ? 'text-gray-500 line-through' : 'text-gray-800'}>
      {title}
    </span>
  </div>
</div>
