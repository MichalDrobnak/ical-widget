<script lang="ts">
  import { fetchRooms } from '../../utils/fetch-ical';
  import CalendarTable from '../calendar-table/Calendar-table.svelte';
  import rooms from './rooms';
  import LoadingSpinner from '../loading-spinner/Loading-spinner.svelte';
  import { getHours } from 'date-fns';
  import type { IRoomReservations } from '../../models/interfaces';

  const minuteIntervalMs = 1000 * 60;
  const checkHourIntervalMs = minuteIntervalMs;
  const refetchDataIntervalMs = minuteIntervalMs * 5;

  let roomData: IRoomReservations[] = [];
  let currentDate = new Date();
  let currentHour = getHours(currentDate);
  let loading = true;
  let error = false;

  const fetchData = async (showLoading: boolean) => {
    showLoading && (loading = true);

    try {
      roomData = await fetchRooms(rooms);
      error = false;
    } catch (e) {
      error = true;
    } finally {
      loading = false;
    }
  };

  // Initial data fetch
  fetchData(true);

  // Refetch data every 5 minutes
  setInterval(async () => fetchData(false), refetchDataIntervalMs);

  // Check if the hour has changed
  setInterval(() => {
    const newDate = new Date();
    const newHour = getHours(newDate);

    if (newHour !== currentHour) {
      currentDate = newDate;
      currentHour = newHour;
    }
  }, checkHourIntervalMs);
</script>

<div class="h-full w-full flex items-center justify-center">
  {#if loading}
    <LoadingSpinner></LoadingSpinner>
  {:else if error}
    <p>Something went wrong</p>
  {:else}
    <CalendarTable rooms={roomData} {currentDate} />
  {/if}
</div>
