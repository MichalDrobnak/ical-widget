<script lang="ts">
  import Calendar from './lib/components/calendar/Calendar.svelte';
  import List from './lib/components/list/List.svelte';

  const urlParams = new URLSearchParams(window.location.search);
  const viewQuery = urlParams.get('view');
</script>

<main class="h-dvh w-dvw">
  {#if viewQuery === 'list'}
    <List />
  {:else}
    <Calendar />
  {/if}
</main>
