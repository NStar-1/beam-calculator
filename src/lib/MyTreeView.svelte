<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import InspireTree, { type NodeConfig } from "inspire-tree";
  import InspireTreeDOM from "inspire-tree-dom";
  import "/node_modules/inspire-tree-dom/dist/inspire-tree-dark.min.css";

  export let data: NodeConfig[] = [];
  export let activeId: string | undefined;
  export let search: string = "";

  let clazz = "";
  export { clazz as class };

  const dispatch = createEventDispatcher();
  const tree = new InspireTree({ data });

  function reloadData(data: NodeConfig[]) {
    tree.removeAll();
    tree.addNodes(data);
  }

  $: reloadData(data);

  $: if (activeId === undefined) {
    tree.deselect();
  } else {
    tree.node(activeId)?.select();
  }

  $: if (search !== "") {
    tree.search(search);
  } else {
    tree.clearSearch();
  }

  tree.on("node.selected", (node) => {
    activeId = node.id;
    dispatch("select", node);
  });

  onMount(() => {
    new InspireTreeDOM(tree, {
      target: document.querySelector(".inspire-tree")!,
    });
  });
</script>

<div class="inspire-tree {clazz}" />

<style lang="scss">
  .inspire-tree {
    max-height: 12rem;
    overflow-y: scroll;
  }
</style>
