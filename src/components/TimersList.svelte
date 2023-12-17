<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Timer } from "../client";
  import StoppedTimer from "./StoppedTimer.svelte";

  export let timers: Array<Timer>;
  let modal: HTMLDialogElement,
    id: number,
    note: string,
    noteInput: HTMLInputElement,
    selectedTimer: Timer;
  const dispatch = createEventDispatcher();

  async function openModal(event: CustomEvent) {
    selectedTimer = event.detail;
    modal.classList.add("modal-open");
    noteInput.focus();
  }

  async function submitForm(e: SubmitEvent) {
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    await fetch("/api/timer/edit", {
      method: "post",
      body: formData,
    });

    modal.classList.remove("modal-open");
    dispatch("timerEdit");
  }

  $: id = selectedTimer?.id;
  $: note = selectedTimer?.note ? selectedTimer?.note : "";
</script>

{#each timers as timer}
  <StoppedTimer
    {timer}
    on:openModal={async (event) => await openModal(event)} />
{/each}

<dialog bind:this={modal} class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Edit timer</h3>
    <form on:submit|preventDefault={submitForm}>
      <input type="hidden" name="id" bind:value={id} />
      <label class="block">
        <span>Note</span>
        <input bind:this={noteInput} value={note} type="text" name="note" />
      </label>
      <div class="modal-action">
        <button
          on:click|preventDefault={() => {
            modal.classList.remove("modal-open");
          }}
          class="btn">Cancel</button>
        <button class="btn btn-primary" type="submit">Save</button>
      </div>
    </form>
  </div>
</dialog>
