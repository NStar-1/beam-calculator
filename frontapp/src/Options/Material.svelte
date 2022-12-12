<script>
  import { material } from "../store";
  import TextField from "@smui/textfield";
  import { TreeView } from "carbon-components-svelte";
  // FIXME Remove - it took 500kb, treeview part should be copied
  import "carbon-components-svelte/css/g10.css";
  import materials from "./materials.js";

  let activeId = "";

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

  let filtered = [];
  $: filtered = filter(materials, query);
</script>

<TextField label="Filter" bind:value={query} />
<TreeView
  labelText="List of materials"
  children={filtered}
  bind:activeId={$material}
/>
