<script lang="ts">
    export let available: boolean;
</script>

<td class={
   (available
        ? "bg-green-500"
        : "bg-red-500") + " border border-black"
}></td>