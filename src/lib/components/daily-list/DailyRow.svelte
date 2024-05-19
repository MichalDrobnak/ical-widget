<script lang="ts">
  import { format } from 'date-fns';
  import type { IReservation } from '../../models/interfaces';

  export let reservation: IReservation;
  export let isCurrent = false;

  const defaultClasses =
    'flex items-center justify-start px-4 py-1 rounded-md gap-6';

  const formatDate = (date: Date): string => {
    return format(date, 'HH:mm');
  };

  $: classes =
    defaultClasses +
    (isCurrent ? ' bg-slate-100 border border-sky-500' : ' bg-slate-200');
</script>

<div class={classes}>
  <div>
    <p class="text-sm font-medium">Začátek slotu:</p>
    <p class="leading-5">{formatDate(reservation.start)}</p>
  </div>

  <div>
    <p class="text-sm font-medium">Konec slotu:</p>
    <p class="leading-5">{formatDate(reservation.end)}</p>
  </div>

  <div>
    <p class="text-sm font-medium">Popis:</p>
    <p class="leading-5">{reservation.summary}</p>
  </div>

  {#if isCurrent}
    <div class="ml-auto flex items-center gap-2">
      <div class="w-4 h-4 bg-green-300 rounded-full"></div>
      <span class="text-sm">Právě probíhá</span>
    </div>
  {/if}
</div>
