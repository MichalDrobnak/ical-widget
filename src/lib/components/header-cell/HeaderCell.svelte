<script lang="ts">
  export let content: string;
  export let colspan = 1;
</script>

<th class="p-2 bg-slate-800 text-slate-100" {colspan}>{content}</th>
