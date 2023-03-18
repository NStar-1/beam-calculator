<script>
  import { fixationConst } from "./constants";
  import Select, { Option } from "@smui/select";
  import { _ } from "svelte-i18n";

  export let value;
  export let side;
</script>

<Select bind:value label={$_(`options.config.${side}`)} style="width: 50%">
  {#each fixationConst as fixation, i}
    <Option value={i}>
      {#if fixation.src === "none"}
        <div />
        <div class="label">
          {$_(`options.config.fixType.${fixation.desc}`)}
        </div>
      {:else}
        <img
          alt={$_(`options.config.fixType.${fixation.desc}`)}
          src={fixation.src}
          style={fixation.desc === "fixed end" && side === "right"
            ? "transform: scaleX(-1)"
            : null}
        />
        <div class="label">
          {$_(`options.config.fixType.${fixation.desc}`)}
        </div>
      {/if}
    </Option>
  {/each}
</Select>

<style>
  img {
    height: 60%;
  }
  .label {
    position: absolute;
    left: 50%;
    padding: 0;
    margin: 0;
    text-align: left;
  }
</style>
