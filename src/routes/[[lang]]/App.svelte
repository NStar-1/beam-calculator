<script>
  import Graph from "$lib/Ggraphic/index.svelte";
  import Options from "$lib/Options/Options.svelte";
  import {
    applySerializableModel,
    getSerializableModel,
    solveModel2,
    subscribeAutoRefresh,
    subscribeModelChanges,
  } from "$lib/store";
  import { onMount } from "svelte";
  import { t } from "$lib/translations";

  function clearUrlHash() {
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`
    );
  }

  function replaceUrlHash(hash) {
    if (window.location.hash === hash) return;
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${hash}`
    );
  }

  onMount(() => {
    const initialHash = window.location.hash;
    let disposed = false;
    let isFirstUrlSync = true;
    let shouldSkipFirstUrlSync = true;
    let serializationModulePromise;
    let unsubscribeUrlSync = () => {};
    let unsubscribeAutoRefresh = () => {};

    const getSerializationModule = () =>
      (serializationModulePromise ??= import("$lib/modelSerialization"));

    async function syncUrlHash() {
      if (isFirstUrlSync && shouldSkipFirstUrlSync) {
        isFirstUrlSync = false;
        return;
      }

      isFirstUrlSync = false;
      const { encodeAnchorLink } = await getSerializationModule();
      if (disposed) return;

      const encoded = encodeAnchorLink(getSerializableModel());
      if (encoded.error) {
        console.error("Failed to encode model into URL", encoded.message);
        return;
      }

      replaceUrlHash(encoded.data);
    }

    async function initialize() {
      if (initialHash) {
        const { decodeAnchorLink } = await getSerializationModule();
        if (disposed) return;

        const decoded = decodeAnchorLink(initialHash);
        if (decoded.error) {
          alert(decoded.message);
          clearUrlHash();
        } else {
          applySerializableModel(decoded.data);
          shouldSkipFirstUrlSync = false;
          solveModel2();
        }
      }

      unsubscribeUrlSync = subscribeModelChanges(() => {
        syncUrlHash();
      });
      unsubscribeAutoRefresh = subscribeAutoRefresh();
    }

    initialize();

    return () => {
      disposed = true;
      unsubscribeUrlSync();
      unsubscribeAutoRefresh();
    };
  });
</script>

<h1>{$t("app.title")}</h1>
<p>{$t("page.main.helpText")}</p>
<div class="CalculatorWrapper">
  <div class="OptionsWrapper">
    <Options />
  </div>
  <div class="PictureWrapper">
    <Graph />
  </div>
</div>

<style>
  .CalculatorWrapper {
    border: #ff8d48 1px solid;
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    padding: 1rem;
    justify-content: space-between;
  }

  .OptionsWrapper {
    padding: 5px;
    width: 300px;
    min-width: 30%;
    overflow-y: scroll;
  }

  .PictureWrapper {
    width: 70%;
    height: content-box;
    border: #ff8d48 1px solid;
  }

  @media (max-width: 480px) {
    .CalculatorWrapper {
      border: none;
      column-gap: 0;
      row-gap: 10px;
      padding: 0;
      flex-direction: column-reverse;
      justify-content: unset;
      height: auto;
    }
    .OptionsWrapper {
      width: 100%;
      overflow: unset;
    }
    .PictureWrapper {
      width: 100%;
      min-height: 35vh;
      border: none;
    }
  }
</style>
