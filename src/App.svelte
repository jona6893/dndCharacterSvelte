<script>
  import GoogleAuth from "./GoogleAuth.svelte";
  import { googleUser, userData } from "./storeUser";
  import { onDestroy, onMount } from "svelte";
  import { Router, Route, Link } from "svelte-routing";
  import { onAuthStateChanged, signOut } from "firebase/auth";
  import { auth } from "./firebase";
  import { navigate } from "svelte-routing";
  import Homepage from "./pages/Homepage.svelte";
  import { checkUserDocument } from "./GoogleAuth.svelte";
  import { currentCharacter } from "./storeUser";
  import CharactersMenu from "./pages/Components/CharactersMenu.svelte";
  import { fade } from "svelte/transition";
  import CharacterDetails from "./pages/Components/CharacterDetails.svelte";
  import MobileMenu from "./pages/MobileMenu.svelte";

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
        navigate("/main"); // Navigate to the main page once the user is logged in
      } else {
        googleUser.set(null); // Set googleUser store value to null if the user is logged out
        navigate("/login"); // Navigate to the login page if the user is logged out
      }
      console.log($googleUser);
    });
  });

  /* listen to Screen Width */
  let windowWidth;

  function handleResize() {
    windowWidth = window.innerWidth;
  }

  onMount(() => {
    windowWidth = window.innerWidth;
    window.addEventListener("resize", handleResize);
  });

  onDestroy(() => {
    window.removeEventListener("resize", handleResize);
  });
</script>

<main class="">
  <Router>
    {#if $googleUser && windowWidth}
      {#if windowWidth >= 1105}
        <nav transition:fade class="bg-slate-800 text-white font-Outfit p-4">
          <div
            class="flex gap-4 items-center justify-between max-w-[1200px] mx-auto"
          >
            <div class="flex gap-4 items-center">
              <button
                class="bg-slate-600 p-2 rounded hover:bg-slate-500 cursor-pointer h-fit"
                on:click={logout}>Logout</button
              >
              <CharacterDetails />
            </div>
            <div class="flex gap-2 items-center">
              <CharactersMenu />
              <p class="bg-slate-600 p-2 rounded">
                <span class="font-thin">user: </span>{$googleUser.displayName}
              </p>
            </div>
          </div>
        </nav>
      {:else if windowWidth < 1105}
        <MobileMenu on:buttenClick={logout} windowWidth={windowWidth}/>
      {/if}
    {/if}
    <div>
      <Route path="/login" component={GoogleAuth} />
      <Route path="/main" component={Homepage} />
    </div>
  </Router>
</main>

<style>
  .hide {
    left: 0% !important;
    transition: 0.3s;
  }
</style>
