<script lang="ts">
  export let value: number;
</script>

<span class:highlight={value != 0}>
  {value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
</span>

<style>
  .highlight {
    font-weight: 700;
    text-decoration: underline;
  }
</style>
