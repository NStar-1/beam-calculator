<script lang="ts">
  import { material } from "../store";
  import TextField from "@smui/textfield";
  import Icon from "@smui/textfield/icon";
  import { t, locale } from "$lib/translations";
  import { materials } from "../materials";
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
      // Leaf node
      const val = {
        id: "" + idx,
        // Use self name as fallback
        text: $t(`materials.${d.name}`, { default: d.name }),
        children: false,
      };
      group.push(val);
    });
    return grouped;
  }

  // Enable reactive rerender for $t change
  $: data = groupByCategory(materials, $locale);

  /** Returns material index in materials store */
  function getMaterialId(name: string) {
    const idx = materials.findIndex((d) => d.name === name);
    return idx === -1 ? undefined : "" + idx;
  }

  // Presets and shared links are authoritative; reflecting them in the tree
  // must never write an older selection back into the model.
  $: materialId = getMaterialId($material.name);

  function selectMaterial(event: CustomEvent<{ id: string }>) {
    const id = event.detail.id;
    if (!/^\d+$/.test(id)) return;
    const selected = materials[Number(id)];
    if (selected) $material = structuredClone(selected);
  }

  function editMaterial() {
    // Custom properties must be serialized as values, not as a catalog ID.
    $material = {
      ...$material,
      id: undefined,
      name: $t("options.material.other"),
      categories: [],
    };
  }
</script>

<div class="container">
  <TextField
    type="number"
    label={`${$t("results.density")}`}
    on:input={editMaterial}
    bind:value={$material.density}
  />
  <TextField
    type="number"
    label={`${$t("results.eModulus")} (E, ${$t("units.mpa")})`}
    on:input={editMaterial}
    bind:value={$material.E}
  />
  <TextField
    type="number"
    label={`${$t("results.gModulus")} (G, ${$t("units.mpa")})`}
    on:input={editMaterial}
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
    on:select={selectMaterial}
    activeId={materialId}
  />
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
