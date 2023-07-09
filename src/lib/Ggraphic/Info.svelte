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
  } from "$lib/store";

  $: leftSideFixation = fixations.find((d) => d.value === $firstPoint.isFixed);
  $: rightSideFixation = fixations.find((d) => d.value === $lastPoint.isFixed);
</script>

<div class="root">
  <section>
    <h3>Input data:</h3>
    <details open>
      <summary class="h4">{$_("options.config.title")}:</summary>
      <subsection>
        <div>{$_("options.config.length")}: {$length} &lt;units&gt;</div>
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
          </div>
        </div></subsection
      >
    </details>
    <details open>
      <summary class="h4">
        {$_("graph.material")}:
      </summary>
      <subsection>
        <div>Name: {$material.name}</div>
        <div>Density: {$material.density} &lt;units&gt;</div>
        <div>
          <dfn title="Elastic modulus">E</dfn>: {$material.E}
          {$_("graph.gpa")}
        </div>
        <div>
          <dfn title="Shear modulus">G</dfn>: {$material.G}
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
          <td><dfn>A<sub>x</sub></dfn>: {$profile.Ax.toFixed(2)}</td>
          <td><dfn>J<sub>x</sub></dfn>: {$profile.Jx.toFixed(2)}</td>
        </tr>
        <tr>
          <td><dfn>A<sub>sz</sub></dfn>: {$profile.Asz.toFixed(2)}</td>
          <td><dfn>I<sub>y</sub></dfn> {$profile.Iy.toFixed(2)}</td>
        </tr>
        <tr>
          <td><dfn>J<sub>x</sub></dfn>: {$profile.Jx.toFixed(2)}</td>
          <td><dfn>I<sub>z</sub></dfn>: {$profile.Iz.toFixed(2)}</td>
        </tr>
      </table>
    </details>
  </section>
  <section>
    <h3>Output data:</h3>
    <details open>
      <summary class="h4">Displacements:</summary>
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
              <td>{d.x.toFixed(2)}</td>
              <td>{d.y.toFixed(2)}</td>
              <td>{d.z.toFixed(2)}</td>
              <td>{d.xx.toFixed(2)}</td>
              <td>{d.yy.toFixed(2)}</td>
              <td>{d.zz.toFixed(2)}</td>
            </tr>
          {/each}
        {/if}
      </table>
    </details>
    <details open>
      <summary class="h4">Reactions:</summary>
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
              <td>{d.x.toFixed(2)}</td>
              <td>{d.y.toFixed(2)}</td>
              <td>{d.z.toFixed(2)}</td>
              <td>{d.xx.toFixed(2)}</td>
              <td>{d.yy.toFixed(2)}</td>
              <td>{d.zz.toFixed(2)}</td>
            </tr>
          {/each}
        {/if}
      </table>
    </details>
  </section>
</div>

<style lang="scss">
  .root {
    margin-left: 2rem;
    font-size: 18px;
  }

  subsection {
    padding: 0;
  }

  h3,
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

  dfn {
    text-decoration: underline;
    text-decoration-style: dotted;
  }

  td,
  th {
    padding-right: 1rem;
  }
</style>
