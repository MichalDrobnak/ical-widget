<script lang="ts">
  export let available: boolean;

  $: slotText = available ? 'Free' : 'Occupied';
  $: colorClass = available
    ? 'border-slate-600'
    : 'bg-slate-200 border-slate-600';
</script>

<td class={'border ' + colorClass} align="center">{slotText}</td>
