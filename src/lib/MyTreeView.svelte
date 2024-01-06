<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {onMount} from "svelte";
  import InspireTree, {type NodeConfigsProvider} from 'inspire-tree'
  import InspireTreeDOM from 'inspire-tree-dom'
  import "/node_modules/inspire-tree-dom/dist/inspire-tree-dark.min.css"

  export let data: NodeConfigsProvider = [];
  export let activeId: string | undefined;
  
  const dispatch = createEventDispatcher();
  const tree = new InspireTree({data});

  $: if (activeId === undefined) {
    tree.deselect()
  } else {
    tree.node(activeId)?.select()
  };

  tree.on('node.selected', (node) => {
    console.log(node)
    activeId = node.id
    dispatch("select", node)
  })

  onMount(() => {
    new InspireTreeDOM(tree, {target: document.querySelector('.inspire-tree')!})
  })
</script>

<div class="inspire-tree"></div>

<style lang="scss">
</style>
