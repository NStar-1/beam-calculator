<script lang="ts">
  import { _ } from "svelte-i18n";
  import { fixations } from "$lib/fixations";
  import {
    length,
    firstPoint,
    lastPoint,
    material,
    profile,
    results,
    lengthUnit,
    LengthUnit,
    forceUnit,
  } from "$lib/store";
  import Value from "./Value.svelte";

  $: lengthUnitName = $_("units." + LengthUnit[$lengthUnit])
  $: leftSideFixation = fixations.find((d) => d.value === $firstPoint.isFixed);
  $: rightSideFixation = fixations.find((d) => d.value === $lastPoint.isFixed);
  $: forceUnitName = $forceUnit
</script>

<div class="root">
  <details open>
    <summary class="h3">{$_("results.inputData")}:</summary>
    <section>
      <details open>
        <summary class="h4">{$_("options.config.title")}:</summary>
        <subsection>
          <div>{$_("options.config.length")}: {$length}{lengthUnitName}</div>
          <div>
            {$_("options.config.left")}: {$_(
              `options.config.fixType.${leftSideFixation?.label}`
            )}
            <div>
              <div>
                {$_("options.config.right")}: {$_(
                  `options.config.fixType.${rightSideFixation?.label}`
                )}
              </div>
          </div></subsection
        >
      </details>
      <details open>
        <summary class="h4">
          {$_("graph.material")}: {$material.name}
        </summary>
        <subsection>
          <div>{$_("results.density")}: {$material.density} &lt;units&gt;</div>
          <div>
            <dfn title={$_("results.eModulus")}>E</dfn>: {$material.E}
            {$_("graph.gpa")}
          </div>
          <div>
            <dfn title={$_("results.gModulus")}>G</dfn>: {$material.G}
            {$_("graph.gpa")}
          </div>
        </subsection>
      </details>
      <details open>
        <summary class="h4">
          {$_("options.profile.title")}:
        </summary>
        <table>
          <tr>
            <td><dfn>A<sub>x</sub></dfn>: {$profile.Ax.toFixed(2)}{lengthUnitName}<sup>2</sup></td>
            <td><dfn>J<sub>x</sub></dfn>: {$profile.Jx.toFixed(2)}{lengthUnitName}<sup>2</sup></td>
          </tr>
          <tr>
            <td><dfn>A<sub>sz</sub></dfn>: {$profile.Asz.toFixed(2)}{lengthUnitName}<sup>2</sup></td>
            <td><dfn>I<sub>y</sub></dfn> {$profile.Iy.toFixed(2)}{lengthUnitName}<sup>2</sup></td>
          </tr>
          <tr>
            <td><dfn>J<sub>x</sub></dfn>: {$profile.Jx.toFixed(2)}{lengthUnitName}<sup>2</sup></td>
            <td><dfn>I<sub>z</sub></dfn>: {$profile.Iz.toFixed(2)}{lengthUnitName}<sup>2</sup></td>
          </tr>
        </table>
      </details>
    </section>
  </details>
  <details open>
    <summary class="h3">{$_("results.resultData")}:</summary>
    <section>
      <details open>
        <summary class="h4">{$_("results.displacements")} ({lengthUnitName}):</summary>
        <table>
          <tr>
            <th>#</th>
            <th>x</th>
            <th>y</th>
            <th>z</th>
            <th>xx</th>
            <th>yy</th>
            <th>zz</th>
          </tr>
          {#if $results?.D}
            {#each $results.D as d, idx}
              <tr>
                <td>{idx}</td>
                <td><Value value={d.x} /></td>
                <td><Value value={d.y} /></td>
                <td><Value value={d.z} /></td>
                <td><Value value={d.xx} /></td>
                <td><Value value={d.yy} /></td>
                <td><Value value={d.zz} /></td>
              </tr>
            {/each}
          {/if}
        </table>
      </details>
      <details open>
        <summary class="h4">{$_("results.reactions")} ({forceUnitName}):</summary>
        <table>
          <tr>
            <th>#</th>
            <th>x</th>
            <th>y</th>
            <th>z</th>
            <th>xx</th>
            <th>yy</th>
            <th>zz</th>
          </tr>
          {#if $results?.R}
            {#each $results.R as d, idx}
              <tr>
                <td>{idx}</td>
                <td><Value value={d.x} /></td>
                <td><Value value={d.y} /></td>
                <td><Value value={d.z} /></td>
                <td><Value value={d.xx} /></td>
                <td><Value value={d.yy} /></td>
                <td><Value value={d.zz} /></td>
              </tr>
            {/each}
          {/if}
        </table>
      </details>
    </section>
  </details>
</div>

<style lang="scss">
  .root {
    margin-left: 2rem;
    font-size: 18px;
  }

  section {
    margin-left: 8px;
  }

  subsection {
    display: block;
    padding: 0;
    line-height: 24px;
    margin-left: 8px;
  }

  summary {
    cursor: pointer;
  }

  h3,
  .h3,
  .h4 {
    letter-spacing: 0.2rem;
    text-decoration: underline;
    line-height: 2rem;
    margin: 0;
    margin-top: 0.5rem;
  }

  .h4 {
    font-size: 1.25rem;
  }

  .h3 {
    font-size: 1.75rem;
  }

  dfn {
    text-decoration: underline;
    text-decoration-style: dotted;
    cursor: help;
  }

  td,
  th {
    padding-right: 1rem;
  }
</style>
