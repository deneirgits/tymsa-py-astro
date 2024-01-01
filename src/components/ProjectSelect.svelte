<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Project } from "../client";

  export let project: Project | null, projects: Array<Project>;
  const dispatch = createEventDispatcher();

  $: id = project ? project.id : "0";
  $: color = project ? project.color : "a3a3a3";
</script>

<div class="flex gap-1 md:gap-2">
  <div
    class="badge bg-neutral-400 badge-xs self-center ml-1 md:ml-0"
    style="background-color: #{color};">
  </div>
  <select
    on:change={async () => {
      dispatch("projectChange");
    }}
    on:click|stopPropagation
    name="project"
    value={id}
    class="select select-ghost bg-none p-0 text-md md:text-lg font-semibold focus:bg-transparent focus:border-none focus:outline-none"
    style="color: #{color};">
    <option value="0" style="color: #000000;"> ——</option>
    {#each projects as project}
      <option
        value={project.id}
        data-color={project.color}
        style="color: #000000;">
        {project.name}</option>
    {/each}
  </select>
</div>
