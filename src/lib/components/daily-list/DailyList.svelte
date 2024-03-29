<script lang="ts">
  import { format } from 'date-fns';
  import type { IRoomReservations } from '../../models/interfaces';
  import HeaderCell from '../header-cell/HeaderCell.svelte';

  export let currentDate = new Date();
  export let roomReservations: IRoomReservations;

  const formatDate = (date: Date): string => {
    return format(date, 'd. M. y');
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
