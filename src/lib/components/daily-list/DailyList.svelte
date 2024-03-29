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
  import HeaderCell from '../header-cell/HeaderCell.svelte';
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

<div class="flex flex-col h-full w-full">
  <div class="flex-grow w-full">
    <table class="w-full table-fixed border border-slate-800">
      <thead>
        <tr>
          <HeaderCell align="left" colspan={2}
            >{roomReservations.name}</HeaderCell>
          <HeaderCell align="right" colspan={1}
            >{formatDate(currentDate)}</HeaderCell>
        </tr>
        <tr>
          <HeaderCell>Začátek</HeaderCell>
          <HeaderCell>Konec</HeaderCell>
          <HeaderCell>Popis</HeaderCell>
        </tr>
      </thead>

      <tbody>
        {#each reservations as reservation}
          <DailyRow {reservation} isCurrent={isCurrent(reservation)}></DailyRow>
        {:else}
          <tr>
            <td colspan="3" class="text-center">Žádné rezervace</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="flex justify-between items-center p-2">
    <img src="logo-cesnet-dark.png" alt="CESNET" width="150" height="57" />
    <img src="qr.png" alt="CESNET Meetings QR" width="70" height="70" />
  </div>
</div>
