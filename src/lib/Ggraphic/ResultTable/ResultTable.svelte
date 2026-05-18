<script lang="ts">
  import convert from "convert";
  import type { Force, Length } from "convert";
  import type { F3DD } from "frame3dd-wasm-js";
  import type { StructuralMode } from "$lib/store";
  import Value from "../Value.svelte";
  import {
    hasAxisBorder,
    shouldWarn,
    translationalComponents,
    unexpectedResultsFor,
    visibleComponentsFor,
    type ResultComponent,
    type ResultKind,
  } from "./tablePolicy";

  export let title: string;
  export let unitName: string;
  export let kind: ResultKind;
  export let mode: StructuralMode;
  export let rows: ReadonlyArray<F3DD.Vec6> | undefined;
  export let lengthUnit: Length;
  export let forceUnit: Force;

  let loggedUnexpectedResultSignature = "";

  const valueFor = (row: F3DD.Vec6, component: ResultComponent) => {
    if (kind === "reaction") {
      return translationalComponents.includes(component)
        ? convert(row[component], "newtons").to(forceUnit)
        : row[component];
    }

    return translationalComponents.includes(component)
      ? convert(row[component], "mm").to(lengthUnit)
      : convert(row[component], "radian").to("degrees");
  };

  const suffixFor = (component: ResultComponent) =>
    kind === "displacement" && !translationalComponents.includes(component)
      ? "°"
      : "";

  $: visibleComponents = visibleComponentsFor(mode, rows);
  $: unexpectedResults = unexpectedResultsFor(kind, mode, rows);
  $: unexpectedResultSignature = JSON.stringify(unexpectedResults);
  $: if (unexpectedResults.length === 0) {
    loggedUnexpectedResultSignature = "";
  } else if (unexpectedResultSignature !== loggedUnexpectedResultSignature) {
    loggedUnexpectedResultSignature = unexpectedResultSignature;
    console.error(
      "Unexpected non-zero result components in 1D structural mode",
      unexpectedResults
    );
  }
</script>

<details open>
  <summary class="h4">{title} ({unitName}):</summary>
  <table>
    <thead>
      <tr>
        <th class="border">#</th>
        {#each visibleComponents as component}
          <th
            class:border={hasAxisBorder(component, visibleComponents)}
            class:result-warning={shouldWarn(mode, rows, component)}
          >
            {component}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if rows}
        {#each rows as row, idx}
          <tr>
            <td class="border">{idx}</td>
            {#each visibleComponents as component}
              <td
                class:border={hasAxisBorder(component, visibleComponents)}
                class:result-warning={shouldWarn(mode, rows, component, row)}
              >
                <Value value={valueFor(row, component)} />{suffixFor(component)}
              </td>
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</details>

<style lang="scss">
  summary {
    cursor: pointer;
  }

  .h4 {
    font-size: 1.25rem;
    letter-spacing: 0.1rem;
    line-height: 2rem;
    margin: 0;
    margin-top: 0.5rem;
    text-decoration: underline;
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

  .result-warning {
    color: #b00020;
    font-weight: 700;
  }
</style>
