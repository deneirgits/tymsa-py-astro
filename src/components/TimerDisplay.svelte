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
    if (timer.endDatetime === null) {
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
  class="text-left font-bold text-[2rem] align-middle leading-10 min-w-36 max-w-36 md:min-w-56 md:text-5xl"
  >{display}</strong>
