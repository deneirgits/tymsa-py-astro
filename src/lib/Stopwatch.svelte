<script lang="ts">
  import { onMount } from "svelte";

  export let seconds: number;
  let interval: number;
  let display: string;

  onMount(async () => {
    clearInterval(interval);
    interval = setInterval(() => {
      seconds++;
    }, 1000);
  });

  $: display = new Date(seconds * 1000).toISOString().slice(11, 19);
</script>

<button
  on:click={() => {
    clearInterval(interval);
  }}>Stop</button>
<h1>Seconds: {seconds}</h1>
<h1>{display}</h1>
