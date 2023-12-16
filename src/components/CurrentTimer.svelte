<script lang="ts">
  import type { Timer } from "../client/models";
  import StopButton from "./StopButton.svelte";
  import TimerDisplay from "./TimerDisplay.svelte";

  export let timer: Timer;
  let interval: number;
</script>

<main>
  {#if timer.startDatetime != null}
    <StopButton {interval} />
    <TimerDisplay
      bind:interval
      seconds={timer.timesince}
      endDatetime={timer.endDatetime} />
    {timer.note}
    {timer.project.name}
  {:else}
    <TimerDisplay bind:interval seconds={0} endDatetime={new Date()} />
  {/if}
</main>
