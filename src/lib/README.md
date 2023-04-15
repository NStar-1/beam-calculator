# F3DD <-> App interaction

Internally, the app uses it's own independent data model,
which is not compatible with what Frame3DD expects.

That's why the internal model should be converted to F3DD
model, and then converted back to internal repr with node
IDs mapped accordingly.
