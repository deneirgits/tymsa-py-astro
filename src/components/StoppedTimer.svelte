<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Timer } from "../client";
  import { formatTime } from "../utils/formatTime";

  export let timer: Timer;
  const dispatch = createEventDispatcher();
</script>

<button
  on:click={async () => dispatch("openModal", timer)}
  class="border-b-2 border-b-gray-200 cursor-pointer">
  {formatTime(timer.timesince)}
  {#if timer.project}
    {timer.project.name}
  {/if}
  {timer.note}
  {timer.url}
</button>
