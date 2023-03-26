<script lang="ts">
  import { material_id } from "../store";
  import TextField from "@smui/textfield";
  import { TreeView } from "carbon-components-svelte";
  import materials from "../materials";

  let query = "";

  function filter(items, query) {
    return items.reduce((acc, v) => {
      let children = undefined;
      if (v.hasOwnProperty("children")) {
        children = filter(v.children, query);
      }
      if (v.text.includes(query) || (children && children.length)) {
        return acc.concat({ ...v, children });
      }
      return acc;
    }, []);
  }

  function new_filter(items: typeof materials, query: string) {
    return items.map((d, idx) => ({
      id: idx,
      text: d.name,
      children: null,
    }));
  }

  let filtered: typeof materials = [];
  $: filtered = new_filter(materials, query);
</script>

<TextField label="Filter" bind:value={query} />
<TreeView
  style="padding-left: 0"
  labelText="List of materials"
  children={filtered}
  bind:activeId={$material_id}
/>
