<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Timer } from "../client";
  import { formatTime } from "../utils/formatTime";

  export let timer: Timer;
  let startTime: string, endTime: string;
  const dispatch = createEventDispatcher();

  $: project = timer.project;
  $: startTime = new Date(timer.startDatetime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  $: endTime = timer.endDatetime
    ? new Date(timer.endDatetime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
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

    <div class="w-full text-right">
      <p
        class="m-0 text-xs md:text-sm italic font-light text-teal-600 dark:text-teal-300">
        {startTime}
      </p>
    </div>
  </div>
  <div class="flex w-full">
    <p class="inline w-full m-0 text-xs md:text-sm">
      {timer.note}
    </p>

    <div class="w-full text-right">
      <p
        class="m-0 text-xs md:text-sm italic font-light text-rose-600 dark:text-rose-300">
        {endTime}
      </p>
    </div>
  </div>
</button>
