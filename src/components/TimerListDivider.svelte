<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Timer } from "../client";
  import { startTimeForList } from "../utils/time";

  export let timer: Timer;
  const dispatch = createEventDispatcher();
  $: betweenDatetime = timer.startDatetime!;
  $: datetime = startTimeForList(betweenDatetime);
</script>

<div class="divider divider-end my-0">
  <button
    on:click|stopPropagation={() =>
      dispatch("editTime", {
        timer: timer,
      })}>
    <p class="m-0 text-[0.7rem] md:text-sm italic font-thin">
      {datetime}
    </p>
  </button>
</div>
