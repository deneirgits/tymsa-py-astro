<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let interval: number;

  const dispatch = createEventDispatcher();

  async function newTimer() {
    clearInterval(interval);
    const res = await fetch("/api/timer/current", { method: "post" });

    if (res.redirected == true) {
      window.location.href = res.url;
    }
    dispatch("new");
  }
</script>

<button on:click={async () => await newTimer()} class="block">Stop</button>
