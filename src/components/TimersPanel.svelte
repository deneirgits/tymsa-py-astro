<script lang="ts">
  import type { Project, Timer } from "../client";
  import CurrentTimer from "./CurrentTimer.svelte";
  import TimersList from "./TimersList.svelte";

  export let timer: Timer, timers: Array<Timer>, projects: Array<Project>;
  let checkbox: HTMLInputElement;

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

<div
  class="collapse bg-base-200 absolute inset-x-0 bottom-0 rounded-3xl rounded-b-none w-full max-h-dvh">
  <input bind:this={checkbox} type="checkbox" />
  <button
    on:click={() => {
      checkbox.checked = !checkbox.checked;
    }}
    class="collapse-title text-xl font-medium pt-0 px-4 w-full">
    <div class="badge bg-neutral-400 w-14 h-2 my-3"></div>
    <CurrentTimer
      on:new={async () => {
        await getCurrentTimer();
        await getTimers();
      }}
      on:edit={getCurrentTimer}
      {timer}
      {projects} />
  </button>
  <div class="collapse-content overflow-auto">
    <div class="divider mt-0"></div>
    <TimersList on:timerEdit={getTimers} {timers} {projects} />
  </div>
</div>
