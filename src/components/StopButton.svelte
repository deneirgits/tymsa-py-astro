<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let interval: NodeJS.Timeout;

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

<button
  on:click|stopPropagation={async () => await newTimer()}
  class="btn btn-circle btn-outline">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="12"
    viewBox="0 0 384 512"
    ><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
      d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" /></svg>
</button>
