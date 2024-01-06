<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {onMount} from "svelte";
  import InspireTree, {type NodeConfigsProvider} from 'inspire-tree'
  import InspireTreeDOM from 'inspire-tree-dom'
  import "/node_modules/inspire-tree-dom/dist/inspire-tree-dark.min.css"

  export let data: NodeConfigsProvider = [];
  export let activeId: string | undefined;
  export let search: string = '';

  let clazz = ''
  export {clazz as class}
  
  const dispatch = createEventDispatcher();
  const tree = new InspireTree({data});

  $: if (activeId === undefined) {
    tree.deselect()
  } else {
    tree.node(activeId)?.select()
  };

  $: if (search !== '') {
    tree.search(search)
  } else {
    tree.clearSearch()
  }

  tree.on('node.selected', (node) => {
    console.log(node)
    activeId = node.id
    dispatch("select", node)
  })

  onMount(() => {
    new InspireTreeDOM(tree, {target: document.querySelector('.inspire-tree')!})
  })
</script>

<div class="inspire-tree {clazz}"></div>

<style lang="scss">
  .inspire-tree {
    max-height: 12rem;
    overflow-y: scroll;
  }
</style>
