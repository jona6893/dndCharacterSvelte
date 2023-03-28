<script>
  import Skills from "./Components/Skills.svelte";
  import Stats from "./Components/Stats.svelte";
  import { userData } from "../storeUser";
  import { fade } from "svelte/transition";
  import TabMenu from "./Components/TabMenu.svelte";
  import { onDestroy, onMount } from "svelte";
  import { currentCharacter } from "../storeUser";
import { deepEqualStore } from "../deepEqualStore";

/* let previousCharacter;
let interval;

onMount(() => {
  previousCharacter = $currentCharacter;
  interval = setInterval(() => {
    if (previousCharacter !== $currentCharacter) {
      console.log("currentCharacter value has changed");
      previousCharacter = $currentCharacter;
    }
  }, 2000);
});

onDestroy(() => {
  console.log('Cleared')
  clearInterval(interval);
}); */

/* let previousCharacter;

$: {
  if (JSON.stringify(previousCharacter) !== JSON.stringify($currentCharacter)) {
    console.log("currentCharacter value has changed");
    previousCharacter = $currentCharacter;
  }
} */



const currentCharacterStore = deepEqualStore($currentCharacter);

$: {
  if ($currentCharacterStore !== $currentCharacter) {
    console.log("currentCharacter value has changed");
    console.log($currentCharacterStore);
    currentCharacterStore.set($currentCharacter);
  }
}


</script>

{#if $userData}
  <div in:fade class="grid grid-cols-3 gap-4 p-4 max-w-[1200px] mx-auto" id="dice-container">
    <Skills />
    <Stats />
    <TabMenu />
  </div>
{:else}
  <div class="fixed w-full h-full inset-0 flex items-center justify-center">
    <h1 class="text-white text-5xl">LOADING DATA</h1>
  </div>
{/if}
