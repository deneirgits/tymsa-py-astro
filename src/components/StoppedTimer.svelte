<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Timer } from "../client";
  import { formatTime } from "../utils/formatTime";

  export let timer: Timer;
  const dispatch = createEventDispatcher();

  $: project = timer.project;
</script>

<button
  on:click={async () => dispatch("openModal", timer)}
  class="flex flex-col cursor-pointer w-full text-left py-1">
  <div class="flex w-full">
    <strong class="text-sm md:text-lg">
      {formatTime(timer.timesince)}
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
</button>
