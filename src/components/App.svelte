<script lang="ts">
  import { onMount } from "svelte";
  import type { Timer } from "../client/models";
  import StopButton from "./StopButton.svelte";
  import Stopwatch from "./Stopwatch.svelte";

  export let timer: Timer;
  let interval: number;

  onMount(async () => {});
</script>

<main>
  {#if timer}
    <StopButton {interval} />
    <Stopwatch bind:interval {timer} />
  {/if}
</main>
