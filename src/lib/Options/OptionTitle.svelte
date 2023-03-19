<script lang="ts">
  export let title: string;
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
    <span class="info"><slot name="info" /></span>
  {/if}
</div>

<style>
  .title {
    display: flex;
    float: left;
  }
  .info {
    font-family: "GOST type A";
    font-style: italic;
    font-size: 18px;
  }
  .separator {
    height: 25px;
    width: 1.5px;
    background-color: black;
    margin: 0 7px;
  }
</style>
