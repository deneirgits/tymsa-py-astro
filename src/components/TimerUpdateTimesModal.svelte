<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Timer } from "../client";
  import { datetimeForEdit } from "../utils/formatTime";
  import StoppedTimerEdit from "./StoppedTimerEdit.svelte";

  let timer: Timer,
    modal: HTMLDialogElement,
    timeInput: HTMLInputElement,
    datetime: string,
    message: string;
  const dispatch = createEventDispatcher();
  $: duration = timer ? timer.timesince : 0;
  $: prevDuration = timer ? timer.previous.timesince : 0;

  export async function openModal(event: CustomEvent) {
    timer = event.detail.timer;
    datetime = datetimeForEdit(timer.startDatetime!);
    modal.classList.add("modal-open");
    timeInput.focus();
  }
  export async function closeModal() {
    modal.classList.remove("modal-open");
    timeInput.focus();
    dispatch("modalClosed");
  }

  async function submitForm(e: SubmitEvent) {
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const res = await fetch("/api/timer/editTime", {
      method: "post",
      body: formData,
    });

    if (res.redirected == true) {
      window.location.href = res.url;
    }

    const data = await res.json();
    message = data.message;

    if (message == undefined) {
      await closeModal();
    }

    dispatch("timerEdit");
  }
  async function handleOnChange() {
    if (timer.endDatetime) {
      const end = new Date(timer.endDatetime);
      const start = new Date(datetime);

      duration = (end.valueOf() - start.valueOf()) / 1000;
    }

    const end = new Date(datetime);
    const start = new Date(timer.previous.startDatetime);
    prevDuration = (end.valueOf() - start.valueOf()) / 1000;
  }
  async function handleKeydown(e: KeyboardEvent) {
    if (e.key == "Escape" && modal.classList.contains("modal-open")) {
      await closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />
<dialog bind:this={modal} class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button
        on:click|preventDefault={closeModal}
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="12"
          viewBox="0 0 384 512"
          ><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
      </button>
    </form>

    <h1 class="font-bold text-lg">Edit start-end time</h1>
    <form on:submit|preventDefault={submitForm}>
      {#if timer}
        <input type="hidden" name="timerId" bind:value={timer.id} />
        <StoppedTimerEdit {timer} {duration} />
      {/if}

      <div class="divider divider-end my-0">
        <input
          bind:this={timeInput}
          on:change={handleOnChange}
          type="datetime-local"
          name="datetime"
          step="1"
          bind:value={datetime}
          class="text-xs text-black w-full p-1 border-none outline-none bg-none focus:ring-0" />
      </div>
      {#if timer}
        <input
          type="hidden"
          name="previousTimerId"
          bind:value={timer.previous.id} />
        <StoppedTimerEdit timer={timer.previous} duration={prevDuration} />
      {/if}

      <div class="modal-action flex items-baseline">
        {#if message}
          <p class="text-error align-bottom m-0 text-sm">{message}</p>
        {/if}
        <button class="btn btn-primary" type="submit">Save</button>
      </div>
    </form>
  </div>
</dialog>
