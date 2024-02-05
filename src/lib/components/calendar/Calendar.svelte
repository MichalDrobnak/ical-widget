<script lang="ts">
  import { addHours } from "date-fns";
    import { fetchIcal } from "../../utils/fetch-ical";
    import CalendarTable from "../calendar-table/calendar-table.svelte";
    import rooms from "./rooms";

    const roomData = Promise.all(rooms.map(fetchIcal));

    let currentDate = new Date();
</script>

<div class="h-full w-full">
    {#await roomData}
        <p>Loading...</p>
    {:then res}
        <CalendarTable rooms={res} {currentDate} />
    {:catch err}
        <p>{err.message}</p>
    {/await}
</div>