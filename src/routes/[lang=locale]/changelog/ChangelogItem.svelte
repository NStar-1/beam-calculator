<script lang="ts">
  export let date: string;
  export let title: string;

  $: displayDate = new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
</script>

<article class="item">
  <div class="meta">
    <time datetime={date}>{displayDate}</time>
  </div>
  <h2>{title}</h2>
  <div class="body">
    <slot />
  </div>
</article>

<style>
  .item {
    border-top: 1px solid rgba(120, 120, 120, 0.24);
    padding: 28px 0;
  }

  .meta {
    color: #6c6c6c;
    display: flex;
    flex-wrap: wrap;
    font-size: 0.85rem;
    gap: 8px 14px;
    margin-bottom: 8px;
  }

  h2 {
    font-size: 1.25rem;
    margin: 0 0 10px;
  }

  .body {
    line-height: 1.6;
  }

  :global(.body ul) {
    margin: 0;
    padding-left: 1.2rem;
  }
</style>
