<script lang="ts">
  import { createEventDispatcher, type SvelteComponent } from "svelte";
  import type { Project, Timer } from "../client";
  import StoppedTimer from "./StoppedTimer.svelte";
  import TimerUpdateModal from "./TimerUpdateModal.svelte";
  import TimerUpdateTimesModal from "./TimerUpdateTimesModal.svelte";
  import TimerListDivider from "./TimerListDivider.svelte";

  export let currentTimer: Timer,
    timers: Array<Timer>,
    projects: Array<Project>;
  let noteProjectModal: SvelteComponent, timesModal: SvelteComponent;
  const dispatch = createEventDispatcher();

  async function openModal(event: CustomEvent, modal: SvelteComponent) {
    await modal.openModal(event);
    dispatch("modalOpened");
  }
</script>

<TimerListDivider
  on:editTime={async (event) => openModal(event, timesModal)}
  timer={currentTimer} />

{#each timers as timer}
  <StoppedTimer
    on:openModal={async (event) => openModal(event, noteProjectModal)}
    {timer} />
  <TimerListDivider
    on:editTime={async (event) => openModal(event, timesModal)}
    {timer} />
{/each}

<TimerUpdateModal
  bind:this={noteProjectModal}
  on:timerEdit
  on:modalClosed
  {projects} />
<TimerUpdateTimesModal bind:this={timesModal} on:timerEdit on:modalClosed />
