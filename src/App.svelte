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

  let unsubscribeCharacters;
  let sideMenu = true;

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
            <div class="flex gap-2 items-center ">
              <CharactersMenu />
              <p class="bg-slate-600 p-2 rounded">
                <span class="font-thin">user: </span>{$googleUser.displayName}
              </p>
            </div>
          </div>
        </nav>
      {:else if windowWidth < 1105}
       <div
          class="flex gap-2 max-laptop:bg-slate-700 items-center justify-center relative w-screen overflow-x-hidden"
        >
  <div class="flex items-center justify-between w-full p-4">
    <CharacterDetails />
    <button on:click={() => sideMenu = !sideMenu} class="text-white ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
        >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  </div>
  <div
  class="fixed flex justify-end bg-transparent left-[100%] h-screen w-screen top-0 overflow-scroll text-white ease-linear duration-300 z-10 {sideMenu ? 'left-full' : 'hide'} {windowWidth > 640} "
    >
    <div class="bg-gray-400 {windowWidth <= 640 ? 'w-full':'w-80'}">
    <div class="flex justify-end p-6">
    <button on:click={() => sideMenu = !sideMenu} class="text-white ">
          X
        </button>
      </div>
      <div class="flex flex-col justify- p-6 gap-4">
        <button
    class="bg-slate-600 p-2 rounded hover:bg-slate-500 cursor-pointer h-fit"
    on:click={logout}
  >
    Logout
  </button>
  <p class="bg-slate-600 p-2 rounded text-center">
    <span class="font-thin">user: </span>{$googleUser.displayName}
  </p>
  <CharactersMenu />
      </div>
  
</div>
</div>
</div>



      {/if}
    {/if}
    <div>
      <Route path="/login" component={GoogleAuth} />
      <Route path="/main" component={Homepage} />
    </div>
  </Router>
</main>


<style>
  .hide{
    	left: 0% !important;
      transition: 0.3s;
  }
</style>