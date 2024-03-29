<script lang="ts">
  import Calendar from './lib/components/calendar/Calendar.svelte';
  import List from './lib/components/list/List.svelte';
  import { CHECK_TIME_INTERVAL_MS } from './lib/constants';

  const urlParams = new URLSearchParams(window.location.search);
  const viewQuery = urlParams.get('view');

  let currentDate = new Date();

  const main = () => {
    setInterval(() => {
      currentDate = new Date();
    }, CHECK_TIME_INTERVAL_MS);
  };

  main();
</script>

<main class="h-dvh w-dvw">
  {#if viewQuery === 'list'}
    <List {currentDate} />
  {:else}
    <Calendar {currentDate} />
  {/if}
</main>
