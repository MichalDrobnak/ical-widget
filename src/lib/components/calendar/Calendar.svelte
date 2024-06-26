<script lang="ts">
  import HourlyCalendar from '../hourly-calendar/HourlyCalendar.svelte';
  import { ROOMS } from '../../constants/rooms';
  import WeeklyCalendar from '../weekly-calendar/WeeklyCalendar.svelte';
  import { REFETCH_DATA_INTERVAL_MS } from '../../constants/intervals';
  import type { IRoom, IRoomReservations } from '../../models/interfaces';
  import { fetchRoom, fetchRooms } from '../../utils';
  import LoadingSpinner from '../loading-spinner/LoadingSpinner.svelte';

  export let currentDate: Date;
  export let room: IRoom | null;

  let loading = true;
  let error = false;
  let singleReservations: IRoomReservations;
  let allReservations: IRoomReservations[] = [];

  const fetchSingleRoom = async (): Promise<void> => {
    singleReservations = await fetchRoom(room!);
  };
  const fetchAllRooms = async (): Promise<void> => {
    allReservations = await fetchRooms(ROOMS);
  };

  const fetchFn = room ? fetchSingleRoom : fetchAllRooms;

  const fetchData = async (showLoading: boolean) => {
    showLoading && (loading = true);

    try {
      await fetchFn();
      error = false;
    } catch (e) {
      error = true;
    } finally {
      loading = false;
    }
  };

  const main = () => {
    // Initial data fetch
    fetchData(true);

    // Refetch data every 5 minutes
    setInterval(async () => fetchData(false), REFETCH_DATA_INTERVAL_MS);
  };

  main();
</script>

<div class="h-full w-full flex items-center justify-center">
  {#if loading}
    <LoadingSpinner></LoadingSpinner>
  {:else if error}
    <p>Something went wrong</p>
  {:else if room}
    <WeeklyCalendar {currentDate} roomReservations={singleReservations} />
  {:else}
    <HourlyCalendar {currentDate} roomReservations={allReservations} />
  {/if}
</div>
