<script>
    import {googleUser} from '../storeUser'
  import CharacterDetails from './Components/CharacterDetails.svelte';
  import CharactersMenu from './Components/CharactersMenu.svelte';
    export let windowWidth
    let sideMenu = true;
    export let logout = () => {}

</script>



        <div
          class="flex gap-2 max-laptop:bg-slate-700 items-center justify-center relative w-screen overflow-x-hidden"
        >
          <div class="flex items-center justify-between w-full p-4">
            <CharacterDetails />
            <button on:click={() => (sideMenu = !sideMenu)} class="text-white">
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
            class="fixed flex justify-end bg-transparent left-[100%] h-screen w-screen top-0 overflow-scroll text-white ease-linear duration-300 z-10 {sideMenu
              ? 'left-full'
              : 'hide'} {windowWidth > 640} "
          >
            <div class="bg-gray-400 {windowWidth <= 640 ? 'w-full' : 'w-80'}">
              <div class="flex justify-end p-6">
                <button
                  on:click={() => (sideMenu = !sideMenu)}
                  class="text-white"
                    >
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
                <CharactersMenu/>
              </div>
            </div>
          </div>
        </div>

        <style>
  .hide {
    left: 0% !important;
    transition: 0.3s;
  }
</style>