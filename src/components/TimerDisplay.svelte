<script lang="ts">
  import { onMount } from "svelte";
  import { formatTime } from "../utils/formatTime";
  import type { Timer } from "../client";

  export let interval: number, timer: Timer;
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

<h1>{display}</h1>
