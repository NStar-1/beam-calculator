<script lang="ts">
  export let hash: string;

  const repositoryUrl = "https://github.com/NStar-1/beam-calculator";
</script>

<a class="commit" href={`${repositoryUrl}/commit/${hash}`}>{hash}</a>

<style>
  .commit {
    font-size: 0.85em;
    white-space: nowrap;
  }
</style>
