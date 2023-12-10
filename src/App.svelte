<script lang="ts">
  import { TimersApi } from "../assets/client/apis/TimersApi";

  import { Configuration } from "../assets/client/runtime";

  import { onMount } from "svelte";
  import type { Timer } from "../assets/client/models";
  import Stopwatch from "./lib/Stopwatch.svelte";

  let timer: Timer;

  onMount(async () => {
    const config = new Configuration({
      basePath: "http://localhost:8000",
      username: "admin",
      password: "admin",
    });
    const timersApi = new TimersApi(config);
    timer = await timersApi.timersRetrieve({ id: 1 });
  });
</script>

<main>
  {#if timer}
    <Stopwatch seconds={timer.timesince} />
  {/if}
</main>
