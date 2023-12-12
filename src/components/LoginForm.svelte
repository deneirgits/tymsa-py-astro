<script lang="ts">
  let responseMessage: string;

  async function submitForm(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: formData,
    });
    let data;
    try {
      data = await response.json();
    } catch (error) {
      window.location.href = response.url;
    }
    responseMessage = data.message;
  }
</script>

<form on:submit={submitForm}>
  <label class="block">
    <span class="text-gray-700">Username</span>
    <input
      type="text"
      id="username"
      name="username"
      class="mt-1 block w-full"
      placeholder="my-fun-username"
      required />
  </label>
  <label class="block">
    <span class="text-gray-700">Password</span>
    <input
      type="password"
      id="password"
      name="password"
      class="mt-1 block w-full"
      placeholder="*******"
      required />
  </label>
  <input type="submit" value="Send" class="btn btn-primary btn-block" />
  {#if responseMessage}
    <p>{responseMessage}</p>
  {/if}
</form>
