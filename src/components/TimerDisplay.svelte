<script lang="ts">
  import { onMount } from "svelte";
  import { formatTime } from "../utils/formatTime";
  import type { Timer } from "../client";

  export let interval: NodeJS.Timeout, timer: Timer;
  let display: string, seconds: number;

  onMount(async () => {
    await resetInterval(timer);
  });

  async function resetInterval(timer: Timer) {
    clearInterval(interval);
    if (timer.endDatetime === undefined) {
      interval = setInterval(() => {
        seconds++;
      }, 1000);
    }
  }

  $: seconds = timer.timesince;
  $: resetInterval(timer);
  $: display = formatTime(seconds);
</script>

<strong
  class="text-left font-bold text-[1.5rem] leading-[3rem] min-w-28 md:min-w-36 md:text-3xl md:leading-[3rem]"
  >{display}</strong>
