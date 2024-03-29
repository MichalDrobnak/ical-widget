<script lang="ts">
  import {
    endOfDay,
    format,
    startOfDay,
    type Interval,
    isWithinInterval,
    areIntervalsOverlapping,
  } from 'date-fns';
  import type {
    IReservation,
    IRoomReservations,
  } from '../../models/interfaces';
  import HeaderCell from '../header-cell/HeaderCell.svelte';

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

    return reservations.reservations.filter((r) => {
      const reservationInterval: Interval = { start: r.start, end: r.end };
      return areIntervalsOverlapping(interval, reservationInterval);
    });
  };
</script>

<table class="h-full w-full table-fixed border border-slate-800">
  <thead>
    <tr>
      <HeaderCell align="left">{roomReservations.name}</HeaderCell>
      <HeaderCell align="right">{formatDate(currentDate)}</HeaderCell>
    </tr>
    <tr>
      <HeaderCell>Čas</HeaderCell>
      <HeaderCell>Popis</HeaderCell>
    </tr>
  </thead>

  <tbody> </tbody>
</table>
