<script lang="ts">
  import { addHours, getHours } from "date-fns";
    import type { IRoomReservations } from "../../models/interfaces";
    import RoomAvailability from "../room-availability/room-availability.svelte";
  import HeaderCell from "../header-cell/header-cell.svelte";

    export let rooms: IRoomReservations[];
    export let currentDate: Date;

    const currentHour = getHours(currentDate);
    const nextHour = getHours(addHours(currentDate, 1));
    const secondHour = getHours(addHours(currentDate, 2));

    const currentHourString = `${currentHour}:00 - ${nextHour}:00`;
    const nextHourString = `${nextHour}:00 - ${secondHour}:00`;
</script>

<table class="h-full w-full table-fixed">
    <thead>
        <tr>
            <HeaderCell content="Room name" />
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