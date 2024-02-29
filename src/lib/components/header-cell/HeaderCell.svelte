<script lang="ts">
  export let content: string;
  export let colspan = 1;
  export let align: 'left' | 'center' | 'right' = 'center';

  const baseClasses = 'p-2 bg-slate-800 text-slate-100';
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  $: alignClass = alignClasses[align];
  $: classes = `${baseClasses} ${alignClass}`;
</script>

<th class={classes} {colspan}>{content}</th>
