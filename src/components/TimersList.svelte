<script lang="ts">
  import type { Timer } from "../client";
  import StoppedTimer from "./StoppedTimer.svelte";

  export let timers: Array<Timer>;
</script>

{#each timers as timer}
  <StoppedTimer {timer} on:openModal />
{/each}
