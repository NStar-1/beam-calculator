import { materials, type Material } from "$lib/materials";
import { encodeAnchorLink, type AnchorLinkModel } from "$lib/modelSerialization";
import type { ProblemPreset } from "./types";

/**
 * Resolves a material name to a material record.
 *
 * Presets reference materials by name rather than by id because ids are
 * positional and would silently drift if the material list is reordered.
 */
export function resolveMaterial(name: string): Material {
  const matches = materials.filter((material) => material.name === name);

  if (matches.length === 0) {
    throw new Error(`Unknown material in problem preset: "${name}"`);
  }

  if (matches.length > 1) {
    throw new Error(
      `Ambiguous material in problem preset: "${name}" matches ${matches.length} materials`
    );
  }

  return matches[0];
}

/**
 * Turns a readable preset into the model shape used by the anchor link codec.
 *
 * The result is fresh, editable state: the stores edit the profile data, the
 * material and the loads in place — the material selector even renames the
 * record to "Other" when a field is edited — so all three are cloned here and
 * an edit made in the calculator never reaches the catalog.
 */
export function resolvePreset(preset: ProblemPreset): AnchorLinkModel {
  return {
    length: preset.length,
    lengthUnit: preset.lengthUnit,
    forceUnit: preset.forceUnit,
    firstPoint: { isFixed: preset.firstPoint },
    lastPoint: { isFixed: preset.lastPoint },
    // The spread keeps the profile type and data correlated, which a manual
    // field copy would not.
    ...structuredClone(preset.profile),
    material: structuredClone(resolveMaterial(preset.material)),
    loads: preset.loads.map((load) => ({ ...load })),
  };
}

/**
 * Encodes a preset into its canonical `#v1-...` anchor link.
 *
 * Throws when the preset is not representable, so a broken catalog entry fails
 * the build instead of shipping a dead page.
 */
export function encodePreset(preset: ProblemPreset): string {
  const encoded = encodeAnchorLink(resolvePreset(preset));

  if (encoded.error) {
    throw new Error(`Invalid problem preset: ${encoded.message}`);
  }

  return encoded.data;
}
