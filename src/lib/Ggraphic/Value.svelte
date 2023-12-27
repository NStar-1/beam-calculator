<script lang="ts">
  export let value: number;
</script>

<div class:highlight={value != 0}>
  {value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
</div>

<style>
  .highlight {
    font-weight: 700;
    text-decoration: underline;
  }
</style>
