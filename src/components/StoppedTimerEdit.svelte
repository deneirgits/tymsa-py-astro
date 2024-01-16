<script lang="ts">
  import type { PreviousTimer, Timer } from "../client";
  import { formatTime } from "../utils/formatTime";

  export let timer: Timer | PreviousTimer, duration: number;

  $: project = timer ? timer.project : null;
</script>

{#if timer}
  <div class="flex flex-col cursor-pointer w-full text-left py-1">
    <div class="flex w-full">
      <strong class="text-sm md:text-lg">
        <!-- {formatTime(timer.timesince)} -->
        {formatTime(duration)}
      </strong>

      {#if project}
        <div class="flex gap-1">
          <div
            class="badge bg-neutral-400 badge-xs self-center ml-1 md:ml-2"
            style="background-color: #{project.color};">
          </div>
          <p
            class="font-normal inline m-0 text-sm self-center md:text-base"
            style="color: #{project.color};">
            {project.name}
          </p>
        </div>
      {/if}
    </div>
    <div class="flex w-full">
      <p class="inline w-full m-0 text-xs md:text-sm">
        {timer.note}
      </p>
    </div>
  </div>
{/if}
