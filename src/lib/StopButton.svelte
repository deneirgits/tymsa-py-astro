<script lang="ts">
  import { TimersApi } from "../client/apis/TimersApi";
  import { get } from "svelte/store";
  import { config } from "../stores/config";

  export let id: number, interval: number;

  async function stopTimer() {
    clearInterval(interval);
    const timersApi = new TimersApi(get(config));
    await timersApi.timersStop({ id: id });
  }
</script>

<button on:click={async () => await stopTimer()}>Stop</button>
