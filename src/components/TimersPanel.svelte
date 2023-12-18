<script lang="ts">
  import type { Project, Timer } from "../client";
  import CurrentTimer from "./CurrentTimer.svelte";
  import TimersList from "./TimersList.svelte";

  export let timer: Timer, timers: Array<Timer>, projects: Array<Project>;

  async function getNewTimer() {
    let response = await fetch("/api/timer/current");
    const data = await response.json();
    timer = data.timer;
  }

  async function getTimers() {
    let response = await fetch("/api/timer/list");
    const data = await response.json();
    timers = data.timers;
  }
</script>

<div>
  <CurrentTimer
    on:new={async () => {
      await getNewTimer();
      await getTimers();
    }}
    {timer} />
  <TimersList
    on:timerEdit={async () => {
      await getTimers();
    }}
    {timers}
    {projects} />
</div>
