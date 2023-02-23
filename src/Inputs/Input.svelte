<script>
  export let title;
  export let onChange;
  export let value = "";
</script>

<input placeholder={title} bind:value on:input={onChange} />

<style>
  input {
    border: 2px solid #ababab;
    width: 100%;
    outline: none;
    margin: 0;
  }
  input:focus-visible {
    border-color: #656565;
  }
</style>
