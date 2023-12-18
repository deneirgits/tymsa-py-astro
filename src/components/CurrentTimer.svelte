<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Timer } from "../client/models";
  import StopButton from "./StopButton.svelte";
  import TimerDisplay from "./TimerDisplay.svelte";

  export let timer: Timer;
  let interval: number;
  const dispatch = createEventDispatcher();
</script>

<div>
  {#if timer}
    <StopButton on:new {interval} />
    <button
      on:click={async () => dispatch("openModal", timer)}
      class="text-left">
      <TimerDisplay bind:interval {timer} />

      {timer.note}
      {#if timer.project}
        {timer.project.name}
      {/if}
    </button>
  {/if}
</div>
