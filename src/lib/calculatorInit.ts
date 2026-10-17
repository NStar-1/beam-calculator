import type {
  AnchorLinkModel,
  AnchorLinkResult,
} from "$lib/modelSerialization";

/**
 * What a mounting calculator applies to the stores.
 */
export type InitialModelState =
  /** An anchor link was present and decoded: it always wins. */
  | { source: "hash"; model: AnchorLinkModel }
  /** An anchor link was present but broken; the caller reports and clears it. */
  | { source: "hash-error"; message: string }
  /** No anchor link; the mount-only page preset applies. */
  | { source: "preset"; model: AnchorLinkModel }
  /** Neither: the stores keep whatever they already hold. */
  | { source: "empty" };

/**
 * Decides what a mounting calculator applies, in precedence order: anchor
 * link, page preset, nothing.
 *
 * A broken anchor link still wins over the preset: the caller reports the
 * error and clears the URL instead of silently showing a different model than
 * the shared link asked for.
 *
 * @param decodedHash result of decoding `window.location.hash`, or `null`
 * when the URL carries no hash.
 * @param presetModel the mount-only `initialModel` prop, if any.
 */
export function resolveInitialState(
  decodedHash: AnchorLinkResult<AnchorLinkModel> | null,
  presetModel: AnchorLinkModel | null
): InitialModelState {
  if (decodedHash !== null) {
    return decodedHash.error
      ? { source: "hash-error", message: decodedHash.message }
      : { source: "hash", model: decodedHash.data };
  }

  return presetModel !== null
    ? { source: "preset", model: presetModel }
    : { source: "empty" };
}
