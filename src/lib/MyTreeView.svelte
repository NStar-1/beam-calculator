<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import InspireTree, { type NodeConfig } from "inspire-tree";
  import InspireTreeDOM from "inspire-tree-dom";

  export let data: NodeConfig[] = [];
  export let activeId: string | undefined;
  export let search: string = "";

  let clazz = "";
  export { clazz as class };

  const dispatch = createEventDispatcher();
  const tree = new InspireTree({ data });
  let element: HTMLDivElement;

  let synchronizing = false;
  let previousData = data;

  function syncTree(data: NodeConfig[], activeId: string | undefined) {
    synchronizing = true;
    try {
      if (data !== previousData) {
        tree.removeAll();
        tree.addNodes(data);
        previousData = data;
      }
      tree.deselect();
      if (activeId !== undefined) tree.node(activeId)?.select();
    } finally {
      synchronizing = false;
    }
  }

  $: syncTree(data, activeId);

  $: if (search !== "") {
    tree.search(search);
  } else {
    tree.clearSearch();
  }

  tree.on("node.selected", (node) => {
    // InspireTree emits this event for programmatic selection too. Only
    // forward user selections to the model owner.
    if (synchronizing) return;
    activeId = node.id;
    dispatch("select", node);
  });

  onMount(() => {
    new InspireTreeDOM(tree, {
      target: element,
    });
  });
</script>

<div bind:this={element} class="inspire-tree {clazz}" />

<style lang="scss">
  .inspire-tree {
    max-height: 12rem;
    overflow-y: scroll;
  }
</style>
