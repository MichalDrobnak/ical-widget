<script lang="ts">
    import Block from './Block.svelte';
    import Check from './Check.svelte';

    export let available: boolean;

    let icon = available ? Check : Block;

    let colorClass = available
        ? "bg-green-400 border-green-600"
        : "bg-red-400 border-red-600";
</script>

<td class={"border " + colorClass} align="center">
    <svelte:component this={icon}></svelte:component>
</td>