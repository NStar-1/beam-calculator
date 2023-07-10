<script lang="ts">
  import Fixation from "./Fixation.svelte";
  import HelperText from "@smui/textfield/helper-text";
  import Textfield from "@smui/textfield";
  import validate from "../../utils/validation";
  import { createLengthRules } from "./validators";
  import { _ } from "svelte-i18n";
  import { length, loads } from "../store";
  import type { ValidationResult } from "../../utils/validation";

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

<Textfield
  type="number"
  label={$_("options.config.length")}
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
<div style="margin: 10px 0">{$_("options.config.fixType.title")}</div>
<Fixation />
