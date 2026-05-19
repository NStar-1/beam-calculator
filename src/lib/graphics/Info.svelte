<script lang="ts">
  import { t } from "$lib/translations";
  import { fixations } from "$lib/fixations";
  import {
    length,
    firstPoint,
    lastPoint,
    material,
    profile,
    results,
    lengthUnit,
    forceUnit,
    structuralMode,
  } from "$lib/store";
  import ResultTable from "./ResultTable";

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
      <ResultTable
        title={$t("results.displacements")}
        unitName={lengthUnitName}
        kind="displacement"
        mode={$structuralMode}
        rows={$results?.D}
        lengthUnit={$lengthUnit}
        forceUnit={$forceUnit}
      />
      <ResultTable
        title={$t("results.reactions")}
        unitName={forceUnitName}
        kind="reaction"
        mode={$structuralMode}
        rows={$results?.R}
        lengthUnit={$lengthUnit}
        forceUnit={$forceUnit}
      />
    </section>
  </details>
</div>

<style lang="scss">
  .root {
    margin-left: 2rem;
    margin-bottom: 1rem;
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

  td {
    padding-right: 1rem;
    text-align: right;
  }
</style>
