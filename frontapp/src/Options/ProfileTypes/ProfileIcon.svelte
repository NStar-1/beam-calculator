<script>
  import { profileType, profileNamesLnKeys } from "../../store";
</script>

<img class="profileIcon" src={"assets/razrez/" + profileNamesLnKeys[$profileType].img + ".svg"} />

<style>
  .profileIcon {
    max-width: 80%;
    max-height: 80%;
  }
</style>
