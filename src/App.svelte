<script>
  import GoogleAuth from './GoogleAuth.svelte';
  import { googleUser } from './storeUser';
  import { onMount } from 'svelte';

  let currentUser = null;

  onMount(() => {
    const unsubscribe = googleUser.subscribe((value) => {
      currentUser = value;
    });

    return unsubscribe;
  });
</script>

<main>
  <div class="flex gap-2 p-4 items-center justify-center">
    {#if currentUser !== null && currentUser.email !== undefined}
    <p>Logged in as {currentUser.email}</p> 
    {/if}
    <GoogleAuth />
  </div>

</main>




