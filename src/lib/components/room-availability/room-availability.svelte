<script lang="ts">
    import type { IRoomReservations } from "../../models/interfaces";
    import { isAvailable } from "../../utils/availability";
    import SlotAvailability from "../slot-availability/slot-availability.svelte";

    export let room: IRoomReservations;
    export let currentDate: Date;

    const availability = isAvailable(currentDate, room.reservations);
</script>

<tr>
    <td class="border border-black p-2 bg-slate-600 text-white">{ room.roomName }</td>
    <SlotAvailability available={ availability.currentHour } />
    <SlotAvailability available={ availability.nextHour } />
</tr>