<script lang="ts">
  import { onMount } from "svelte";
  import { formatTime } from "../utils/formatTime";

  export let interval: number, seconds: number, endDatetime: Date | null;
  let display: string;

  onMount(async () => {
    clearInterval(interval);
    if (endDatetime === null) {
      interval = setInterval(() => {
        seconds++;
      }, 1000);
    }
  });

  $: display = formatTime(seconds);
</script>

<h1>{display}</h1>
