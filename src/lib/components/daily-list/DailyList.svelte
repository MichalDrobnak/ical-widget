<script lang="ts">
  import {
    endOfDay,
    format,
    startOfDay,
    type Interval,
    areIntervalsOverlapping,
    isWithinInterval,
  } from 'date-fns';
  import type {
    IReservation,
    IRoomReservations,
  } from '../../models/interfaces';
  import DailyRow from './DailyRow.svelte';

  export let currentDate = new Date();
  export let roomReservations: IRoomReservations;

  $: reservations = getDailyReservations(roomReservations, currentDate);

  const formatDate = (date: Date): string => {
    return format(date, 'd. M. y');
  };

  const getDailyReservations = (
    reservations: IRoomReservations,
    date: Date,
  ): IReservation[] => {
    const interval: Interval = { start: startOfDay(date), end: endOfDay(date) };

    return reservations.reservations
      .filter((r) => {
        const reservationInterval: Interval = { start: r.start, end: r.end };
        return areIntervalsOverlapping(interval, reservationInterval);
      })
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  };

  const isCurrent = ({ start, end }: IReservation) => {
    const reservationInterval: Interval = { start, end };
    return isWithinInterval(currentDate, reservationInterval);
  };
</script>

<div class="flex flex-col h-full w-full gap-3 p-4">
  <h1 class="text-xl font-medium">
    {roomReservations.name} - {formatDate(currentDate)}
  </h1>

  {#each reservations as reservation}
    <DailyRow {reservation} isCurrent={isCurrent(reservation)}></DailyRow>
  {/each}

  {#if reservations.length === 0}
    <div class="flex justify-center items-center h-full">
      <p class="text-slate-600">Žádné rezervace na tento den</p>
    </div>
  {/if}

  <div class="flex-grow"></div>

  <div class="flex justify-between items-center p-2">
    <img src="logo-cesnet-dark.png" alt="CESNET" width="150" height="57" />
    <img src="qr.png" alt="CESNET Meetings QR" width="100" height="100" />
  </div>
</div>
