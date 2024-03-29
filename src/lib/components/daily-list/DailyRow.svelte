<script lang="ts">
  import { format } from 'date-fns';
  import type { IReservation } from '../../models/interfaces';

  export let reservation: IReservation;

  const formatDate = (date: Date): string => {
    return format(date, 'HH:mm');
  };
</script>

<tr class="h-10">
  <td class="border border-slate-600 text-center"
    >{formatDate(reservation.start)}</td>
  <td class="border border-slate-600 text-center"
    >{formatDate(reservation.end)}</td>
  <td class="border border-slate-600 text-center">{reservation.summary}</td>
</tr>
