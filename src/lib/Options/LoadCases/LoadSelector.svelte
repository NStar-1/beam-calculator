<script lang="ts">
  import { AnchorPoint } from "$lib/store";
  import { t } from "$lib/translations";
  import Button from "@smui/button";
  import IconLeftSide from "$lib/assets/icons/leftSide.svg";
  import IconRightSide from "$lib/assets/icons/rightSide.svg";
  import IconMiddlePoint from "$lib/assets/icons/middlePoint.svg";

  export let selected: AnchorPoint = AnchorPoint.START;
</script>

<Button
  variant="outlined"
  title="{$t('options.loadCaseForm.leftSide')}"
  color={selected === AnchorPoint.START ? "primary" : "secondary"}
  on:click={() => (selected = AnchorPoint.START)}
>
  <IconLeftSide />
</Button>

<Button
  variant="outlined"
  title="{$t('options.loadCaseForm.middlePoint')}"
  color={selected === AnchorPoint.MIDDLE ? "primary" : "secondary"}
  on:click={() => (selected = AnchorPoint.MIDDLE)}
>
  <IconMiddlePoint />
</Button>

<Button
  variant="outlined"
  title="{$t('options.loadCaseForm.rightSide')}"
  color={selected === AnchorPoint.END ? "primary" : "secondary"}
  on:click={() => (selected = AnchorPoint.END)}
>
  <IconRightSide />
</Button>
