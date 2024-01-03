<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import type { Project, Timer } from "../client";
  import StoppedTimer from "./StoppedTimer.svelte";
  import TimerUpdateModal from "./TimerUpdateModal.svelte";

  export let timers: Array<Timer>, projects: Array<Project>;
  let modal: SvelteComponent;
</script>

{#each timers as timer}
  <div class="divider my-0"></div>
  <StoppedTimer
    on:openModal={async (event) => await modal.openModal(event)}
    {timer} />
{/each}

<TimerUpdateModal bind:this={modal} on:timerEdit {projects} />
