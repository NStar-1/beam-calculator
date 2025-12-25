<script lang="ts">
  import { t } from "$lib/translations";
  import { fixations } from "$lib/fixations";
  import convert from "convert";
  import {
    length,
    firstPoint,
    lastPoint,
    material,
    profile,
    results,
    lengthUnit,
    forceUnit,
  } from "$lib/store";
  import Value from "./Value.svelte";

  $: lengthUnitName = $t("units." + $lengthUnit);
  $: leftSideFixation = fixations.find((d) => d.value === $firstPoint.isFixed);
  $: rightSideFixation = fixations.find((d) => d.value === $lastPoint.isFixed);
  $: forceUnitName = $forceUnit;
  $: taxonomy = $material.categories
    .map((d) => $t(`materials.${d}`))
    .join(" / ");
</script>

<div class="root">
  <details open>
    <summary class="h3">{$t("results.inputData")}:</summary>
    <section>
      <details open>
        <summary class="h4">{$t("options.config.title")}:</summary>
        <subsection>
          <div>{$t("options.config.length")}: {$length}{lengthUnitName}</div>
          <div>
            {$t("options.config.left")}: {$t(
              `options.config.fixType.${leftSideFixation?.label}`
            )}
            <div>
              <div>
                {$t("options.config.right")}: {$t(
                  `options.config.fixType.${rightSideFixation?.label}`
                )}
              </div>
            </div>
          </div></subsection
        >
      </details>
      <details open>
        <summary class="h4">
          {$t("graph.material")}: {$material.name} ({taxonomy})
        </summary>
        <subsection>
          <div>
            {$t("results.density")}: {$material.density} kg/m<sup>3</sup>
          </div>
          <div>
            <dfn title={$t("results.eModulus")}>E</dfn>: {$material.E.toLocaleString()}
            {$t("graph.gpa")}
          </div>
          <div>
            <dfn title={$t("results.gModulus")}>G</dfn>: {$material.G.toLocaleString()}
            {$t("graph.gpa")}
          </div>
        </subsection>
      </details>
      <details open>
        <summary class="h4">
          {$t("options.profile.title")}:
        </summary>
        <table>
          <tr>
            <td
              ><dfn title="Cross section area">A<sub>x</sub></dfn>: {$profile.Ax.toFixed(
                2
              )}mm<sup>2</sup></td
            >
            <td
              ><dfn title="Torsional moment of inertia - X axis"
                >J<sub>xx</sub></dfn
              >: {$profile.Jx.toFixed(2)}mm<sup>4</sup></td
            >
          </tr>
          <tr>
            <td
              ><dfn title="Shear area Z-directionfor">A<sub>sy</sub></dfn>: {$profile.Asy.toFixed(
                2
              )}mm<sup>2</sup></td
            >
            <td
              ><dfn title="Bending moment of inertia - Y axis"
                >I<sub>yy</sub></dfn
              >
              {$profile.Iy.toFixed(2)}mm<sup>4</sup></td
            >
          </tr>
          <tr>
            <td
              ><dfn title="Shear area Z-directionfor">A<sub>sz</sub></dfn>: {$profile.Asz.toFixed(
                2
              )}mm<sup>2</sup></td
            >
            <td
              ><dfn title="Bending moment of inertia - Z axis"
                >I<sub>zz</sub></dfn
              >: {$profile.Iz.toFixed(2)}mm<sup>4</sup></td
            >
          </tr>
        </table>
      </details>
    </section>
  </details>
  <details open>
    <summary class="h3">{$t("results.resultData")}:</summary>
    <section>
      <details open>
        <summary class="h4"
          >{$t("results.displacements")} ({lengthUnitName}):</summary
        >
        <table>
          <thead>
            <tr>
              <th class="border">#</th>
              <th>x</th>
              <th>y</th>
              <th class="border">z</th>
              <th>xx</th>
              <th>yy</th>
              <th>zz<br /></th>
            </tr>
          </thead>
          <tbody>
            {#if $results?.D}
              {#each $results.D as d, idx}
                <tr>
                  <td class="border">{idx}</td>
                  <td><Value value={convert(d.x, "mm").to($lengthUnit)} /></td>
                  <td><Value value={convert(d.y, "mm").to($lengthUnit)} /></td>
                  <td class="border"
                    ><Value value={convert(d.z, "mm").to($lengthUnit)} /></td
                  >
                  <td
                    ><Value
                      value={convert(d.xx, "radian").to("degrees")}
                    />°</td
                  >
                  <td
                    ><Value
                      value={convert(d.yy, "radian").to("degrees")}
                    />°</td
                  >
                  <td
                    ><Value
                      value={convert(d.zz, "radian").to("degrees")}
                    />°</td
                  >
                  <br />
                </tr>
              {/each}
            {/if}
          </tbody>
        </table>
      </details>
      <details open>
        <summary class="h4"
          >{$t("results.reactions")} ({forceUnitName}):</summary
        >
        <table>
          <thead>
            <tr>
              <th class="border">#</th>
              <th>x</th>
              <th>y</th>
              <th class="border">z</th>
              <th>xx</th>
              <th>yy</th>
              <th>zz<br /></th>
            </tr>
          </thead>
          <tbody>
            {#if $results?.R}
              {#each $results.R as d, idx}
                <tr>
                  <td class="border">{idx}</td>
                  <td
                    ><Value
                      value={convert(d.x, "newtons").to($forceUnit)}
                    /></td
                  >
                  <td
                    ><Value
                      value={convert(d.y, "newtons").to($forceUnit)}
                    /></td
                  >
                  <td class="border"
                    ><Value
                      value={convert(d.z, "newtons").to($forceUnit)}
                    /></td
                  >
                  <td><Value value={d.xx} /></td>
                  <td><Value value={d.yy} /></td>
                  <td><Value value={d.zz} /></td>
                  <br />
                </tr>
              {/each}
            {/if}
          </tbody>
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
    letter-spacing: 0.1rem;
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

  table {
    border-collapse: collapse;
  }

  td,
  th {
    padding-right: 1rem;
    text-align: right;
  }

  thead {
    border-bottom: 2px solid currentColor;
  }

  .border {
    border-right: 2px solid currentColor;
    padding-right: 0.5rem;
    & + td,
    & + th {
      padding-left: 0.5rem;
    }
  }
</style>
