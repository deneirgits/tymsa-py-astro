<script lang="ts">
  import { onMount } from "svelte";
  import type { Timer } from "../client/models/Timer";

  export let timer: Timer, interval: number;
  let seconds = timer.timesince,
    display: string;

  onMount(async () => {
    clearInterval(interval);
    if (!timer.endDatetime) {
      interval = setInterval(() => {
        seconds++;
      }, 1000);
    }
  });

  $: display = new Date(seconds * 1000).toISOString().slice(11, 19);
</script>

<h1>{display}</h1>
