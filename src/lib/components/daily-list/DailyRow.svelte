<script lang="ts">
  import { format } from 'date-fns';
  import type { IReservation } from '../../models/interfaces';

  export let reservation: IReservation;
  export let isCurrent = false;

  const defaultClasses = 'border text-center border-slate-600';

  const formatDate = (date: Date): string => {
    return format(date, 'HH:mm');
  };

  $: classes = defaultClasses + (isCurrent ? ' bg-slate-100 font-medium' : '');
</script>

<tr class="h-8">
  <td class={classes}>{formatDate(reservation.start)}</td>
  <td class={classes}>{formatDate(reservation.end)}</td>
  <td class={classes}>{reservation.summary}</td>
</tr>
