<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import type { Project, Timer } from "../client";
  import CurrentTimer from "./CurrentTimer.svelte";
  import TimersList from "./TimersList.svelte";
  import TimerUpdateModal from "./TimerUpdateModal.svelte";

  export let timer: Timer, timers: Array<Timer>, projects: Array<Project>;
  let modal: SvelteComponent;

  async function getCurrentTimer() {
    let res = await fetch("/api/timer/current");

    if (res.redirected == true) {
      window.location.href = res.url;
    }

    const data = await res.json();
    timer = data.timer;
  }

  async function getTimers() {
    let res = await fetch("/api/timer/list");

    if (res.redirected == true) {
      window.location.href = res.url;
    }

    const data = await res.json();
    timers = data.timers;
  }
</script>

<div>
  <CurrentTimer
    on:new={async () => {
      await getCurrentTimer();
      await getTimers();
    }}
    on:openModal={async (event) => await modal.openModal(event)}
    {timer} />
  <TimersList
    on:openModal={async (event) => await modal.openModal(event)}
    {timers} />

  <TimerUpdateModal
    bind:this={modal}
    {projects}
    on:timerEdit={async () => {
      await getCurrentTimer();
      await getTimers();
    }} />
</div>
