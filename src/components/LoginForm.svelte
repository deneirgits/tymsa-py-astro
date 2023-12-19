<script lang="ts">
  let responseMessage: string;

  async function submitForm(e: SubmitEvent) {
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: formData,
    });

    if (res.redirected == true) {
      window.location.href = res.url;
    }

    const data = await res.json();
    responseMessage = data.message;
  }
</script>

<form on:submit|preventDefault={submitForm}>
  <input
    type="text"
    id="username"
    name="username"
    class="mt-1 block w-full"
    placeholder="Username"
    required />
  <input
    type="password"
    id="password"
    name="password"
    class="mt-1 block w-full"
    placeholder="Password"
    required />
  <input type="submit" value="Send" class="btn btn-primary btn-block" />
  {#if responseMessage}
    <p class="text-error">{responseMessage}</p>
  {/if}
</form>
