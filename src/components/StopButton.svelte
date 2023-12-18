<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let interval: number;

  const dispatch = createEventDispatcher();

  async function newTimer() {
    clearInterval(interval);
    await fetch("/api/timer/current", { method: "post" });
    dispatch("new");
  }
</script>

<button on:click={async () => await newTimer()} class="block">Stop</button>
