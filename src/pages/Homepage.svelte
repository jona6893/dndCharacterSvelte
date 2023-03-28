<script>
  import Skills from "./Components/Skills.svelte";
  import Stats from "./Components/Stats.svelte";
  import { userData } from "../storeUser";
  import { fade } from "svelte/transition";
  import TabMenu from "./Components/TabMenu.svelte";
  import { onDestroy, onMount } from "svelte";
  import { currentCharacter } from "../storeUser";
import { deepEqualStore } from "../deepEqualStore";
  import HitPoints from "./Components/HitPoints.svelte";
  import SavingThrows from "./Components/SavingThrows.svelte";
  import BasicStats from "./Components/BasicStats.svelte";

/*   let previousCharacter;
let interval;
let counter = 0
onMount(() => {
  previousCharacter = $currentCharacter;
  interval = setInterval(() => {
    if(counter == 0){
      counter++
    } else {
    if (previousCharacter !== $currentCharacter) {
      console.log("currentCharacter value has changed");
      previousCharacter = $currentCharacter;
    }}
  }, 3000);
});

onDestroy(() => {
  console.log('Cleared')
  clearInterval(interval);
});  */

/* let previousCharacter;


$: {
  if (JSON.stringify(previousCharacter) !== JSON.stringify($currentCharacter)) {
    console.log("currentCharacter value has changed");
    previousCharacter = $currentCharacter;
  }
} */


/* const currentCharacterStore = deepEqualStore($currentCharacter);

$: {
  if ($currentCharacterStore !== $currentCharacter) {
    console.log("currentCharacter value has changed");
    console.log($currentCharacterStore);
    currentCharacterStore.set($currentCharacter);
  }
}
 */

</script>

{#if $userData}
  <div in:fade class="grid grid-mainLayout gap-4 p-4 max-w-[1200px] mx-auto font-Outfit" id="dice-container">
    <Skills />
    <Stats />
    <TabMenu />
    <div class="flex flex-col gap-4 col-start-4 row-start-1">
      <HitPoints />
      <SavingThrows />
    </div>
    <BasicStats/>
  </div>
{:else}
  <div class="fixed w-full h-full inset-0 flex items-center justify-center">
    <h1 class="text-white text-5xl">LOADING DATA</h1>
  </div>
{/if}
