<script>
  import { material_id } from "../store";
  import TextField from "@smui/textfield";
  import { TreeView } from "carbon-components-svelte";
  // FIXME Remove - it took 500kb, treeview part should be copied
  import "carbon-components-svelte/css/g10.css";
  import materials from "./materials.js";
  import new_mat from "src/materials.ts";
  import { children } from "svelte/internal";
    import { tree } from "d3";
    import Accordion from "@smui-extra/accordion/src/Accordion.svelte";

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

  function convertToTree(arr) {
  const tree = {};
  for (const item of arr) {
    if (!tree[item.category]) {
      tree[item.category] = {};
    }
    if (!tree[item.category][item.subcategory]) {
      tree[item.category][item.subcategory] = [];
    }
    tree[item.category][item.subcategory].push(item);
  }
  let trueTree = []
  let i = 0;
  for(const category in tree){
    let categoryChildren = [];
    //let j = 0
    for(const subcategory in tree[category]){
      let subcategoryChildren = tree[category][subcategory].map((item) => ({id: i++, text: item.name, children: null}))
      categoryChildren.push({id: i, text: subcategory, children:subcategoryChildren})
      i++
      //j++
    }
    trueTree.push({id: i, text: category, children: categoryChildren})
    i++
  }
  return trueTree;
}

  function new_filter(items, query) {
    return convertToTree(items.filter((item)=> (item.category.includes(query) || item.subcategory.includes(query) || item.name.includes(query))))
  }

  let filtered = [];

  //$: filtered = filter(materials, query);
  $: filtered = new_filter(new_mat, query);
  console.log($material_id)
</script>

<TextField label="Filter" bind:value={query} />
<TreeView
  labelText="List of materials"
  children={filtered}
  bind:activeId={$material_id}
/>
