<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Project, Timer } from "../client/models";
  import StopButton from "./StopButton.svelte";
  import TimerDisplay from "./TimerDisplay.svelte";
  import ProjectSelect from "./ProjectSelect.svelte";

  export let timer: Timer, projects: Array<Project>;
  let interval: NodeJS.Timeout,
    timeoutId: NodeJS.Timeout,
    form: HTMLFormElement;
  const dispatch = createEventDispatcher();

  $: id = timer ? timer?.id : -1;
  $: project = timer ? timer?.project : null;
  $: note = timer?.note ? timer?.note : "";

  async function submitForm() {
    const formData = new FormData(form as HTMLFormElement);

    try {
      const res = await fetch("/api/timer/edit", {
        method: "post",
        body: formData,
      });

      if (res.redirected == true) {
        window.location.href = res.url;
      }

      dispatch("edit");
    } catch (error) {}
  }

  async function handleNoteChange() {
    clearTimeout(timeoutId);

    // Set a new timeout/delay for 1 second
    timeoutId = setTimeout(submitForm, 1000);
  }
</script>

<div class="text-left flex">
  {#if timer}
    <div class="flex flex-col">
      <form bind:this={form}>
        <input type="hidden" name="id" bind:value={id} />
        <div class="flex gap-1">
          <TimerDisplay bind:interval {timer} />
          <ProjectSelect on:projectChange={submitForm} {project} {projects} />
        </div>
        <input
          on:click|stopPropagation
          on:keyup|preventDefault={handleNoteChange}
          value={note}
          type="text"
          name="note"
          maxlength="30"
          autocomplete="off"
          placeholder="Note..."
          class="input input-ghost h-auto p-0 pb-4 text-sm md:text-lg focus:bg-transparent focus:border-none focus:outline-none" />
      </form>
    </div>

    <div class="self-center w-full text-right">
      <StopButton
        on:new={async () => {
          await submitForm();
          dispatch("new");
        }}
        {interval} />
    </div>
  {/if}
</div>
