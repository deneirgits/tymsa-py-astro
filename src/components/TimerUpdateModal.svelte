<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Project, Timer } from "../client";

  export let projects: Array<Project>;
  let modal: HTMLDialogElement,
    id: number,
    note: string,
    projectSelect: HTMLSelectElement,
    project: number | string,
    selectedTimer: Timer | undefined;
  const dispatch = createEventDispatcher();

  $: id = selectedTimer ? selectedTimer?.id : -1;
  $: note = selectedTimer?.note ? selectedTimer?.note : "";
  $: project = selectedTimer?.project ? selectedTimer?.project.id : "0";

  export async function openModal(event: CustomEvent) {
    selectedTimer = event.detail;
    modal.classList.add("modal-open");
    projectSelect.focus();
  }
  export async function closeModal() {
    selectedTimer = undefined;
    modal.classList.remove("modal-open");
    projectSelect.focus();
    dispatch("modalClosed");
  }

  async function submitForm(e: SubmitEvent) {
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const res = await fetch("/api/timer/edit", {
      method: "post",
      body: formData,
    });

    if (res.redirected == true) {
      window.location.href = res.url;
    }

    await closeModal();
    dispatch("timerEdit");
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

    <h1 class="font-bold text-lg">Edit timer</h1>
    <form on:submit|preventDefault={submitForm}>
      <input type="hidden" name="id" bind:value={id} />
      <label>
        <span>Project</span>
        <select name="project" value={project} bind:this={projectSelect}>
          <option value="0">--------</option>
          {#each projects as project}
            <option value={project.id}>{project.name}</option>
          {/each}
        </select>
      </label>
      <label class="block">
        <span>Note</span>
        <input
          value={note}
          type="text"
          name="note"
          autocomplete="off"
          maxlength="30" />
      </label>
      <div class="modal-action">
        <button class="btn btn-primary" type="submit">Save</button>
      </div>
    </form>
  </div>
</dialog>
