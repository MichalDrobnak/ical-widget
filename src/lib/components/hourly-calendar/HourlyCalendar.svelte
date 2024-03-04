<script lang="ts">
  import { addHours, getHours } from 'date-fns';
  import type { IRoomReservations } from '../../models/interfaces';
  import HourlyAvailability from './HourlyAvailability.svelte';
  import HeaderCell from '../header-cell/HeaderCell.svelte';

  export let currentDate = new Date();
  export let roomReservations: IRoomReservations[] = [];

  $: currentHour = getHours(currentDate);
  $: nextHour = getHours(addHours(currentDate, 1));
  $: secondHour = getHours(addHours(currentDate, 2));

  $: currentHourString = `${currentHour}:00 - ${nextHour}:00`;
  $: nextHourString = `${nextHour}:00 - ${secondHour}:00`;
</script>

<table class="h-full w-full table-fixed border border-slate-800">
  <thead>
    <tr>
      <HeaderCell colspan={3}
        >Obsazení zasedacích místností v Telehouse</HeaderCell>
    </tr>
    <tr>
      <HeaderCell>Místnost</HeaderCell>
      <HeaderCell>{currentHourString}</HeaderCell>
      <HeaderCell>{nextHourString}</HeaderCell>
    </tr>
  </thead>

  <tbody>
    {#each roomReservations as room}
      <HourlyAvailability {room} {currentDate} />
    {/each}
  </tbody>
</table>
