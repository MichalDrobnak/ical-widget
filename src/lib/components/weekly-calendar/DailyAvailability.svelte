<script lang="ts">
  import { format } from 'date-fns';
  import { DAY_OF_WEEK_FORMAT, HOURS } from '../../constants';
  import type { IDay, IRoomReservations } from '../../models/interfaces';
  import { getDailyAvailability } from '../../utils/availability';
  import SlotAvailability from '../slot-availability/SlotAvailability.svelte';

  export let room: IRoomReservations;
  export let day: IDay;

  $: availability = getDailyAvailability(day.date, room.reservations);
</script>

<tr>
  <td class="border border-gray-500 bg-slate-50 text-gray-800 text-center">
    <b class="px-3 flex-1">{day.name}</b>
    <p>{format(day.date, DAY_OF_WEEK_FORMAT)}</p>
  </td>

  {#each HOURS as hour}
    <SlotAvailability available={availability[hour]} />
  {/each}
</tr>
