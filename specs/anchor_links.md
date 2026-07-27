# Anchor Links

BeamCalc can use URL fragment links to encode a complete supported 1d model.

# Design

Anchor links use an unencoded version prefix followed by a base64url-encoded
binary payload:

```text
#v1-<payload>
```

`v1-` is required and is not part of the base64url payload. The payload uses
base64url characters (`A-Z`, `a-z`, `0-9`, `-`, `_`). Padding (`=`) is omitted.

# Binary Encoding

The binary payload is a packed byte stream. It is not a native C struct.

- Fields are encoded in the order listed by this spec.
- No alignment bytes or padding bytes are inserted.
- `u8` is an unsigned 8-bit integer.
- `u16` is an unsigned 16-bit integer, little-endian.
- `f32` is IEEE-754 binary32, little-endian.
- Decoders must reject truncated payloads and unexpected trailing bytes.
- Decoders must reject unknown enum values.
- Decoders must reject non-finite floats (`NaN`, `Infinity`, `-Infinity`).

# Structure

```text
header_0: u8
header_1: u8
length: f32
profile_data: ProfileData
material_data: MaterialData
loads: Load[]
```

Arrays are encoded as:

```text
count: u8
items: T[count]
```

The `count` value is the number of array members, not the byte length. `v1`
therefore supports up to 255 loads.

## Packed Headers

`header_0` packs model and unit enums:

```text
bits 0..1: model_type
bits 2..4: length_unit
bits 5..6: force_unit
bit 7: reserved, must be 0
```

`header_1` packs fixation, profile, and material enums:

```text
bits 0..1: fixation_left
bits 2..3: fixation_right
bits 4..6: profile_type
bit 7: material_encoding
```

### Model Type

```text
1 = 1d
2 = 2d
3 = 3d
```

Only `1d` is supported by BeamCalc in `v1`. Other model types are reserved for
future versions and must be rejected by current decoders.

## Beam

```text
length: f32
```

`length` is stored in `length_unit` from `header_0`.

### Length Unit

```text
0 = mm
1 = cm
2 = m
3 = in
4 = ft
```

### Force Unit

```text
0 = newtons
1 = kgf
2 = lbf
```

### Fixation

```text
0 = none
1 = fixed
2 = roller
3 = pin
```

## Profile

Profiles are discriminated by `profile_type` in `header_1`. Each profile type has
its own corresponding binary struct.

### Profile Type

```text
0 = cylindrical
1 = round_tube
2 = rectangle
3 = rectangular_tube
4 = i_beam
```

Custom profiles are not encoded in `v1`.

### Cylindrical Profile

```text
outer_diameter: f32
```

### Round Tube Profile

```text
outer_diameter: f32
inner_diameter: f32
```

### Rectangle Profile

```text
width: f32
height: f32
```

### Rectangular Tube Profile

```text
width: f32
height: f32
thickness: f32
```

### I-Beam Profile

```text
width: f32
depth: f32
flange_thickness: f32
web_thickness: f32
```

All profile dimensions are stored in `length_unit`.

## Material

Materials are controlled by `material_encoding` in `header_1`.

### Material Encoding

```text
0 = built_in_material_id
1 = custom_material
```

Built-in material JSON entries define explicit sequential `u16` ids. The id is
stable for the material list order used by the current application build.

### Built-In Material

```text
id: u16
```

### Custom Material

```text
E: f32
G: f32
density: f32
```

Material values are stored in the same units already used by the application
material list.

## Loads

`v1` supports point loads only. The load type is not encoded in the binary
payload; decoders construct point-load model entries from each load item.

```text
count: u8
items: Load[count]
```

## Load

```text
anchor: u8
offset: f32
value: f32
angle: f32
```

### Load Anchor

```text
0 = start
1 = end
2 = middle
```

`offset` is stored in `length_unit`. `value` is stored in `force_unit`. `angle`
is stored in degrees.

For `middle` anchors, `offset` is ignored by the application. Encoders should
write `0`.

# Validation

Validation is part of the anchor-link feature. Public decode APIs may return a
simple valid/invalid result, but implementations should log detailed internal
failure reasons for diagnostics.

Top-level encode/decode functions should return a disjoint result union:

```ts
type Result<T> =
  | { error: false; data: T; message: "" }
  | { error: true; data: null; message: string };
```

Decoders must validate at least:

- Required `v<int>-` prefix exists and the version is supported.
- Payload is valid unpadded base64url.
- Binary payload exactly matches the expected `v1` layout.
- Packed header reserved bits are unset.
- Model type is `1d`.
- Enum values are known and supported by `v1`.
- All floats are finite.
- Beam length is greater than zero.
- Profile dimensions are greater than zero and geometrically valid for the
  selected profile type.
- Built-in material ids resolve to a known material.
- Custom material values are finite, with positive `E` and density, and
  non-negative `G`.
- Point-load offsets are within the beam span when the anchor uses offset.

If validation fails, the decoded model must not be applied to the application
state.
