<script lang="ts">
    import type { IRoomReservations } from "../../models/interfaces";
    import { isAvailable } from "../../utils/availability";
    import SlotAvailability from "../slot-availability/Slot-availability.svelte";

    export let room: IRoomReservations;
    export let currentDate: Date;

    $: availability = isAvailable(currentDate, room.reservations);
</script>

<tr>
    <td class="border border-gray-500 p-2 bg-gray-200 text-gray-800">{ room.roomName }</td>
    <SlotAvailability available={ availability.currentHour } />
    <SlotAvailability available={ availability.nextHour } />
</tr>