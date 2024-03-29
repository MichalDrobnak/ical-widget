<script lang="ts">
  import type { IReservation } from '../../models/interfaces';

  export let reservation: IReservation;
</script>

<tr>
  <td class="border border-slate-600">{reservation.start}</td>
  <td class="border border-slate-600">{reservation.end}</td>
  <td class="border border-slate-600">{reservation.summary}</td>
</tr>
