<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { TimersApi } from "../client/apis/TimersApi";
  import type { Timer } from "../client/models";
  import StopButton from "./StopButton.svelte";
  import Stopwatch from "./Stopwatch.svelte";
  import { config } from "../stores/config";

  let timer: Timer,
    id = 1,
    interval: number;

  onMount(async () => {
    const timersApi = new TimersApi(get(config));
    timer = await timersApi.timersRetrieve({ id: id });
  });
</script>

<main>
  {#if timer}
    <StopButton {id} {interval} />
    <Stopwatch bind:interval {timer} />
  {/if}
</main>
