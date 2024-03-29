<script lang="ts">
  import Calendar from './lib/components/calendar/Calendar.svelte';
  import List from './lib/components/list/List.svelte';
  import { CHECK_TIME_INTERVAL_MS, ROOMS } from './lib/constants';

  const urlParams = new URLSearchParams(window.location.search);
  const viewQuery = urlParams.get('view');
  const roomQuery = urlParams.get('room');
  const room = ROOMS.find(({ hash }) => hash === roomQuery);

  let currentDate = new Date();

  const main = () => {
    setInterval(() => {
      currentDate = new Date();
    }, CHECK_TIME_INTERVAL_MS);
  };

  main();
</script>

<main class="h-dvh w-dvw">
  {#if viewQuery === 'list' && !!room}
    <List {currentDate} {room} />
  {:else}
    <Calendar {currentDate} room={room ?? null} />
  {/if}
</main>
