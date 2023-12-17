<script lang="ts">
  import type { Timer } from "../client";
  import { formatTime } from "../utils/formatTime";

  export let timers: Array<Timer>;
</script>

{#each timers as timer}
  <div class="block">
    {formatTime(timer.timesince)}
    {#if timer.project}
      {timer.project.name}
    {/if}
    {timer.note}
  </div>
{/each}
