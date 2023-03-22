<script>
  import GoogleAuth from "./GoogleAuth.svelte";
  import { googleUser } from "./storeUser";
  import { onMount } from "svelte";
  import { Router, Route, Link } from "svelte-routing";
  import { onAuthStateChanged, signOut } from "firebase/auth";
  import { auth } from "./firebase";
  import { navigate } from "svelte-routing";
  import Homepage from "./pages/Homepage.svelte";
  import { checkUserDocument } from './GoogleAuth.svelte';
  import { space } from "svelte/internal";
  import CharactersMenu from "./pages/Components/CharactersMenu.svelte";
  import {fade} from 'svelte/transition'

   let unsubscribeCharacters;

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };
  onMount(() => {
  onAuthStateChanged(auth, async (newUser) => {
    if (unsubscribeCharacters) {
      unsubscribeCharacters(); // Unsubscribe from the previous user's characters
    }

    if (newUser) {
      unsubscribeCharacters = await checkUserDocument(newUser.uid);
      googleUser.set(newUser); // Update the googleUser store with the new user value
      navigate('/main'); // Navigate to the main page once the user is logged in
    } else {
      googleUser.set(null); // Set googleUser store value to null if the user is logged out
      navigate('/login'); // Navigate to the login page if the user is logged out
    }
    console.log($googleUser);
  });
});


</script>

<main >
  <Router>
    {#if $googleUser}
    <nav transition:fade class="bg-slate-800 text-white font-Outfit p-4 flex gap-4 items-center justify-between	">
        <button class="bg-slate-600 p-2 rounded hover:bg-slate-500 cursor-pointer" on:click={logout}>Logout</button>
        <div class="flex gap-2 items-center ">
          <CharactersMenu/>
          <p class="bg-slate-600 p-2 rounded"><span class="font-thin">user: </span>{$googleUser.displayName} </p>
        </div>
      </nav>
      {/if}
    <div>
      <Route path="/login" component={GoogleAuth} />
      <Route path="/main" component={Homepage} />
    </div>
  </Router>
</main>
