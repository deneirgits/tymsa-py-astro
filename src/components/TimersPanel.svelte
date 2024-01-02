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
  async function toggleCollapse() {
    if (!checkbox.checked) {
      history.pushState({}, "", null);
    } else {
      history.back();
    }

    checkbox.checked = !checkbox.checked;
  }
  async function handlePopState() {
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  }
  async function handleKeydown(e: KeyboardEvent) {
    if (e.key == "Escape" && checkbox.checked) {
      checkbox.checked = false;
      history.back();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} on:popstate={handlePopState} />
<div
  class="collapse bg-base-200 absolute inset-x-0 bottom-0 rounded-3xl rounded-b-none w-full max-h-dvh">
  <input bind:this={checkbox} type="checkbox" />
  <button
    on:click={toggleCollapse}
    class="collapse-title text-xl font-medium pt-0 px-4 py-0 w-full">
    <div class="badge bg-neutral-400 w-14 h-1.5 mt-3"></div>
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
    <div class="divider my-0"></div>
    <TimersList on:timerEdit={getTimers} {timers} {projects} />
  </div>
</div>
