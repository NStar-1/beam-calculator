<script lang="ts">
  import Fixation from "./Fixation.svelte";
  import HelperText from "@smui/textfield/helper-text";
  import Textfield from "@smui/textfield";
  import validate from "../../utils/validation";
  import { createLengthRules } from "./validators";
  import { t } from "$lib/translations";
  import { length, loads } from "../store";
  import type { ValidationResult } from "../../utils/validation";
  import Units from "./Units.svelte";

  let lengthValidation: ValidationResult = { valid: true, errors: [] };

  const validateLength = () => {
    lengthValidation = validate(
      createLengthRules(
        $loads && $loads.length > 0 ? $loads[$loads.length - 1].offset : -1
      ),
      $length
    );
  };
</script>

<Units />
<Textfield
  type="number"
  label={$t("options.config.length")}
  bind:value={$length}
  required
  invalid={!lengthValidation.valid}
  on:blur={validateLength}
  variant="outlined"
>
  <HelperText validationMsg slot="helper"
    >{lengthValidation.errors.join(", ")}</HelperText
  >
</Textfield>
<div style="margin: 10px 0">{$t("options.config.fixType.title")}</div>
<Fixation />
