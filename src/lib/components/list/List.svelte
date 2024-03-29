<script lang="ts">
  import { REFETCH_DATA_INTERVAL_MS } from '../../constants';
  import type { IRoom, IRoomReservations } from '../../models/interfaces';
  import { fetchRoom } from '../../utils';
  import DailyList from '../daily-list/DailyList.svelte';

  export let currentDate: Date;
  export let room: IRoom;

  let loading = true;
  let error = false;
  let roomReservations: IRoomReservations;

  const fetchReservations = async (): Promise<void> => {
    roomReservations = await fetchRoom(room!);
  };

  const fetchData = async (showLoading: boolean) => {
    showLoading && (loading = true);

    try {
      await fetchReservations();
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

<DailyList {currentDate} {roomReservations}></DailyList>
