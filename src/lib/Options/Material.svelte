<script lang="ts">
  import { material } from "../store";
  import TextField from "@smui/textfield";
  import { TreeView } from "carbon-components-svelte";
  import materials from "../materials";

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
      id: idx,
      text: d.name,
      children: undefined,
    }));
  }

  let materialId: number = 0;
  let filtered: TreeNode[] = [];
  $: $material = materials[materialId];
  $: filtered = mfilter(materials, query);
</script>

<TextField label="Filter" bind:value={query} />
<br>
<TreeView
  style="padding-left: 0"
  labelText="List of materials:"
  children={filtered}
  bind:activeId={materialId}
/>
