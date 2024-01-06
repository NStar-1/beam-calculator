<script lang="ts">
  import { material } from "../store";
  import TextField from "@smui/textfield";
  import { t } from "$lib/translations";
  import materials from "../materials";
  import MyTreeView from "$lib/MyTreeView.svelte";

  type TreeNodeId = string | number;

  interface TreeNode {
    id: TreeNodeId;
    text: any;
    icon?: typeof import("svelte").SvelteComponent;
    disabled?: boolean;
    children?: TreeNode[];
  }

  let query = "";

  //function filter(items, query) {
  //  return items.reduce((acc, v) => {
  //    let children = undefined;
  //    if (v.hasOwnProperty("children")) {
  //      children = filter(v.children, query);
  //    }
  //    if (v.text.includes(query) || (children && children.length)) {
  //      return acc.concat({ ...v, children });
  //    }
  //    return acc;
  //  }, []);
  //}

  function mfilter(items: typeof materials, query: string): Array<TreeNode> {
    return items.map((d, idx) => ({
      id: '' + idx,
      text: d.name,
      children: undefined,
    }));
  }

  let materialId: string | undefined = '0';
  let filtered: TreeNode[] = [];
  console.log(filtered)

  let isDirty = false;

  $: {
    // Set material to other
    if (isDirty) {
      // Deselect
      materialId = undefined;
      $material.name = $t("options.material.other");
    } else if (materialId !== undefined) {
      // Copying
      $material = Object.assign({}, materials[materialId]);
    }
  }

  $: console.log(materialId);
  $: filtered = mfilter(materials, query);
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
  data={filtered}
  on:select={() => (isDirty = false)}
  bind:activeId={materialId}
/>

<br />

<style lang="scss">
</style>
