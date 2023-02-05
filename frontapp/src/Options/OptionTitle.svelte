<script>
  export let title;
</script>

<div class="title">
  {title}
  {#if $$slots.icon || $$slots.info}
    <div class="separator" />
  {/if}
  {#if $$slots.icon}
    <slot name="icon" />
  {/if}
  {#if $$slots.info}
    <slot name="info" />
  {/if}
</div>

<style>
  .title {
    display: flex;
    float: left;
  }
  .separator {
    height: 25px;
    width: 1.5px;
    background-color: black;
    margin: 0 7px;
  }
</style>
