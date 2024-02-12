<script lang="ts">
  import type { IRoomReservations } from '../../models/interfaces';
  import { isAvailable } from '../../utils/availability';
  import SlotAvailability from '../slot-availability/Slot-availability.svelte';

  export let room: IRoomReservations;
  export let currentDate: Date;

  $: availability = isAvailable(currentDate, room.reservations);
</script>

<tr>
  <td class="border border-gray-500 bg-slate-50 text-gray-800">
    <div class="h-full w-full flex items-center p-2">
      <div
        style:background={room.color}
        class="h-5 w-5 rounded-full border border-slate-600">
      </div>
      <p class="px-3 flex-1">{room.name}</p>
    </div>
  </td>

  <SlotAvailability available={availability.currentHour} />
  <SlotAvailability available={availability.nextHour} />
</tr>
