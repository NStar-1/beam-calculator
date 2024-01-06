<script lang="ts">
  import { material } from "../store";
  import TextField from "@smui/textfield";
  import { t } from "$lib/translations";
  import materials from "../materials";
  import MyTreeView from "$lib/MyTreeView.svelte";
  import type { NodeConfig } from "inspire-tree";

  let query = "";

  function groupByCategory(items: typeof materials) {
    const grouped: NodeConfig[] = []
    items.map((d, idx) => {
      const group = d.categories.reduce((parent, category) => {
        const group = parent.find((d) => d.text === category)
        if (group) {
          return group.children as Array<NodeConfig>
        } else {
          const children: NodeConfig[] = []
          parent.push({
            id: undefined,
            text: category,
            children,
          })
          return children
        }
      }, grouped)
      const val = {
        id: '' + idx,
        text: d.name,
        children: false,
      }
      group.push(val)
    })
    return grouped
  }

  const data = groupByCategory(materials)

  let materialId: string | undefined = '0';

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
<TextField label={$t("options.material.filter")} bind:value={query} />
<br />

<MyTreeView
  search={query}
  data={data}
  on:select={() => (isDirty = false)}
  bind:activeId={materialId}
/>

<style lang="scss">
</style>
