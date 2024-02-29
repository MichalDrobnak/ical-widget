<script lang="ts">
  import { addDays, startOfWeek } from 'date-fns';
  import { DAYS_OF_WEEK } from '../../constants/days-of-week';
  import type { IDay, IRoomReservations } from '../../models/interfaces';
  import HeaderCell from '../header-cell/HeaderCell.svelte';
  import DailyAvailability from './DailyAvailability.svelte';
  import { HOURS } from '../../constants';

  export let currentDate: Date;
  export let roomReservations: IRoomReservations;

  const formatHour = (hour: number) => `${hour}:00`;

  const generateDays = (monday: Date) => {
    const days: IDay[] = [];

    DAYS_OF_WEEK.forEach((name, index) => {
      days.push({
        date: addDays(monday, index),
        name,
      });
    });

    return days;
  };

  $: monday = startOfWeek(currentDate, { weekStartsOn: 1 });
  $: days = generateDays(monday);
</script>

<table class="h-full w-full table-fixed border border-slate-800">
  <thead>
    <tr>
      <HeaderCell content={roomReservations.name} colspan={14} />
    </tr>
    <tr>
      <HeaderCell content="Day" align="left" />
      {#each HOURS as hour}
        <HeaderCell content={formatHour(hour)} align="left" />
      {/each}
    </tr>
  </thead>

  <tbody>
    {#each days as day}
      <DailyAvailability room={roomReservations} {day}></DailyAvailability>
    {/each}
  </tbody>
</table>
