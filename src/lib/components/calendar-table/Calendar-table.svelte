<script lang="ts">
    import { addHours, getHours } from "date-fns";
    import type { IRoomReservations } from "../../models/interfaces";
    import RoomAvailability from "../room-availability/Room-availability.svelte";
    import HeaderCell from "../header-cell/Header-cell.svelte";

    export let rooms: IRoomReservations[];
    export let currentDate: Date;

    $: currentHour = getHours(currentDate);
    $: nextHour = getHours(addHours(currentDate, 1));
    $: secondHour = getHours(addHours(currentDate, 2));

    $: currentHourString = `${currentHour}:00 - ${nextHour}:00`;
    $: nextHourString = `${nextHour}:00 - ${secondHour}:00`;
</script>

<table class="h-full w-full table-fixed border border-slate-800">
    <thead>
        <tr>
            <HeaderCell content="Room" />
            <HeaderCell content={ currentHourString } />
            <HeaderCell content={ nextHourString } />
        </tr>
    </thead>

    <tbody>
        {#each rooms as room}
            <RoomAvailability {room} {currentDate}/>
        {/each}
    </tbody>
</table>