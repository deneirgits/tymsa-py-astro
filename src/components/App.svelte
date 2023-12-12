<script lang="ts">
  import { onMount } from "svelte";
  import type { Timer } from "../client/models";
  import StopButton from "./StopButton.svelte";
  import Stopwatch from "./Stopwatch.svelte";

  export let timer: Timer;
  let id = 2,
    interval: number;

  onMount(async () => {});
</script>

<main>
  {#if timer}
    <StopButton {id} {interval} />
    <Stopwatch bind:interval {timer} />
  {/if}
</main>
