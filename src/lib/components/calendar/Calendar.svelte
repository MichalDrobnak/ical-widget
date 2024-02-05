<script lang="ts">
    import { fetchIcal } from "../../utils/fetch-ical";
    import CalendarTable from "../calendar-table/calendar-table.svelte";
    import rooms from "./rooms";
  import LoadingSpinner from "../loading-spinner/loading-spinner.svelte";

    const roomData = Promise.all(rooms.map(fetchIcal));

    let currentDate = new Date();
</script>

<div class="h-full w-full flex items-center justify-center">
    {#await roomData}
        <LoadingSpinner></LoadingSpinner>
    {:then res}
        <CalendarTable rooms={res} {currentDate} />
    {:catch}
        <p>Something went wrong!</p>
    {/await}
</div>