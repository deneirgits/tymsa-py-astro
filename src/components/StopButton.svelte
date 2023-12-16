<script lang="ts">
  export let interval: number;

  async function stopTimer() {
    clearInterval(interval);
    await fetch("/api/timer/current", { method: "post" });
  }
</script>

<button on:click={async () => await stopTimer()}>Stop</button>
