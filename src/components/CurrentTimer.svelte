<script lang="ts">
  import type { Timer } from "../client/models";
  import StopButton from "./StopButton.svelte";
  import TimerDisplay from "./TimerDisplay.svelte";

  export let timer: Timer;
  let interval: number;
</script>

<main>
  {#if timer}
    <StopButton on:new {interval} />
    <TimerDisplay bind:interval {timer} />
    {timer.note}
    {#if timer.project}
      {timer.project.name}
    {/if}
  {/if}
</main>
