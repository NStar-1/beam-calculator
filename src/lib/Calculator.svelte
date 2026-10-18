<script lang="ts">
  import Graph from "$lib/graphics/index.svelte";
  import Options from "$lib/Options/Options.svelte";
  import { resolveInitialState } from "$lib/calculatorInit";
  import type {
    AnchorLinkModel,
    AnchorLinkResult,
  } from "$lib/modelSerialization";
  import {
    applySerializableModel,
    getSerializableModel,
    preloadFrame3DD,
    solveModel2,
    subscribeAutoRefresh,
    subscribeModelChanges,
  } from "$lib/store";
  import { onMount } from "svelte";

  /**
   * Pre-configured model applied when the URL carries no `#v1-...` anchor link.
   *
   * An anchor link always wins, so a shared link reproduces the exact state it
   * was copied from even when it was opened from a pre-configured page.
   *
   * This is a **mount-only** prop: it is read once inside `onMount`, and later
   * changes are ignored. Switching models means remounting the component —
   * `<Calculator initialModel={...} />` inside `{#key slug}` — which is what
   * `/solve/<slug>` does per problem, since navigating between problems reuses
   * the same route component with new props.
   */
  export let initialModel: AnchorLinkModel | null = null;

  function clearUrlHash() {
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`
    );
  }

  function replaceUrlHash(hash: string) {
    if (window.location.hash === hash) return;
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${hash}`
    );
  }

  onMount(() => {
    preloadFrame3DD();

    let disposed = false;
    let appliedInitialState = false;
    let serializationModulePromise;
    let unsubscribeUrlSync = () => {};
    let unsubscribeAutoRefresh = () => {};

    const getSerializationModule = () =>
      (serializationModulePromise ??= import("$lib/modelSerialization"));

    async function syncUrlHash() {
      const { encodeAnchorLink } = await getSerializationModule();
      if (disposed) return;

      const encoded = encodeAnchorLink(getSerializableModel());
      if (encoded.error) {
        console.error("Failed to encode model into URL", encoded.message);
        return;
      }

      replaceUrlHash(encoded.data);
    }

    /**
     * Applies whatever the location's hash encodes — or the page preset when
     * the URL carries no hash. Shared by mount and hashchange, so both go
     * through the same precedence rules, which are pure and tested in
     * calculatorInit.spec.ts.
     */
    async function applyLocationState() {
      // Only a hash needs the codec, which is why it stays lazily imported.
      const hash = window.location.hash;
      let decodedHash: AnchorLinkResult<AnchorLinkModel> | null = null;
      if (hash) {
        const { decodeAnchorLink } = await getSerializationModule();
        if (disposed) return;
        decodedHash = decodeAnchorLink(hash);
      }

      const state = resolveInitialState(decodedHash, initialModel);
      if (state.source === "hash-error") {
        alert(state.message);
        clearUrlHash();
      } else if (state.source !== "empty") {
        applySerializableModel(state.model);
        appliedInitialState = true;
        solveModel2();
      }
    }

    async function initialize() {
      await applyLocationState();
      // The await above yields even on the no-hash path, and with a hash it
      // waits for the codec import. If the component was destroyed meanwhile,
      // cleanup has already run and these subscriptions would never be
      // removed — so bail out instead of subscribing.
      if (disposed) return;

      unsubscribeUrlSync = subscribeModelChanges(
        () => {
          syncUrlHash();
        },
        { skipInitial: true }
      );
      unsubscribeAutoRefresh = subscribeAutoRefresh({
        skipInitial: appliedInitialState,
      });
    }

    // The preset link and the browser's back/forward buttons move the location
    // between hashes without remounting this component — SvelteKit deliberately
    // leaves a same-page hash link to the browser so `hashchange` fires. So a
    // hash change re-applies whatever the new hash encodes: clicking the preset
    // link after editing returns the calculator to the page preset, and
    // back/forward step between the two states.
    function handleHashChange() {
      applyLocationState();
    }

    initialize();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      disposed = true;
      window.removeEventListener("hashchange", handleHashChange);
      unsubscribeUrlSync();
      unsubscribeAutoRefresh();
    };
  });
</script>

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
