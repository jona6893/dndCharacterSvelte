<script>
  import CharacterDetails from "./Components/CharacterDetails.svelte";
  import Skills from "./Components/Skills.svelte";
  import Stats from "./Components/Stats.svelte";
  import { userData } from "../storeUser";
  import { fade } from "svelte/transition";
  import TabMenu from "./Components/TabMenu.svelte";
</script>

{#if $userData}
  <div in:fade class="grid grid-cols-3 gap-4 p-4">
    <CharacterDetails />
    <Skills />
    <Stats />
    <TabMenu />
  </div>
{:else}
  <div class="fixed w-full h-full inset-0 flex items-center justify-center">
    <h1 class="text-white text-5xl">LOADING DATA</h1>
  </div>
{/if}
