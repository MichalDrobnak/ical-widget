<script lang="ts">
    import { fetchIcal } from "../../utils/fetch-ical";
    import CalendarTable from "../calendar-table/Calendar-table.svelte";
    import rooms from "./rooms";
    import LoadingSpinner from "../loading-spinner/Loading-spinner.svelte";

    const roomData = Promise.all(rooms.map((room) => fetchIcal(room)));
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