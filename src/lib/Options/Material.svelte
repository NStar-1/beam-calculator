<script lang="ts">
  import { material } from "../store";
  import TextField from "@smui/textfield";
  import Icon from '@smui/textfield/icon';
  import { t, locale } from "$lib/translations";
  import materials from "../materials";
  import MyTreeView from "$lib/MyTreeView.svelte";
  import type { NodeConfig } from "inspire-tree";

  let query = "";

  /**
   * Groups materials accordingly with their classification
   * e.g. Steels -> Constructional Steels -> Steel 3
   */
  function groupByCategory(items: typeof materials, _: string) {
    const grouped: NodeConfig[] = [];
    items.map((d, idx) => {
      const group = d.categories.reduce((parent, category) => {
        const catName = $t(`materials.${category}`);
        const group = parent.find((d) => d.text === catName);
        if (group) {
          return group.children as Array<NodeConfig>;
        } else {
          const children: NodeConfig[] = [];
          parent.push({
            id: undefined,
            text: catName,
            children,
          });
          return children;
        }
      }, grouped);
      const val = {
        id: "" + idx,
        text: d.name,
        children: false,
      };
      group.push(val);
    });
    return grouped;
  }

  // Enable reactive rerender for $t change
  $: data = groupByCategory(materials, $locale);

  let materialId: string | undefined = "0";

  let isDirty = false;

  $: {
    // Set material to other
    if (isDirty) {
      // Deselect
      materialId = undefined;
      $material.name = $t("options.material.other");
    } else if (materialId !== undefined) {
      // Check if ID is number (real material ID) and not a group ID (group as 'Construction Steels')
      if (Number.isInteger(+materialId)) {
        // Copying
        $material = Object.assign({}, materials[+materialId]);
      }
    }
  }
</script>

<div class="container">
<TextField
  type="number"
  label={`${$t("results.density")}`}
  on:input={() => (isDirty = true)}
  bind:value={$material.density}
/>
<TextField
  type="number"
  label={`${$t("results.eModulus")} (E, ${$t("units.mpa")})`}
  on:input={() => (isDirty = true)}
  bind:value={$material.E}
/>
<TextField
  type="number"
  label={`${$t("results.gModulus")} (G, ${$t("units.mpa")})`}
  on:input={() => (isDirty = true)}
  bind:value={$material.G}
/>
<TextField
  variant="outlined"
  label={$t("options.material.filter")}
  bind:value={query}
>
  <Icon slot="leadingIcon" class="material-icons">search</Icon>
</TextField>
<MyTreeView
  search={query}
  {data}
  on:select={() => (isDirty = false)}
  bind:activeId={materialId}
/>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
