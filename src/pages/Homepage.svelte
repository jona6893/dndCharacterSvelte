<script>
  import Skills from "./Components/Skills.svelte";
  import Stats from "./Components/Stats.svelte";
  import { userData, currentCharacter, googleUser, selectedCharacter} from "../storeUser";
  import { fade } from "svelte/transition";
  import TabMenu from "./Components/TabMenu.svelte";
  import { onDestroy, onMount } from "svelte";
  import HitPoints from "./Components/HitPoints.svelte";
  import SavingThrows from "./Components/SavingThrows.svelte";
  import BasicStats from "./Components/BasicStats.svelte";
  import { db } from "../firebase";
  import { updateCurrentCharacterInFirebase } from '../updateCharacter.js';
import isEqual from "lodash.isequal";

let previousCharacter;
let updateTimeout;


/* listen to Screen Width */
let windowWidth;

function handleResize() {
  windowWidth = window.innerWidth;
}

onMount(() => {
  windowWidth = window.innerWidth;
  window.addEventListener('resize', handleResize);
});

onDestroy(() => {
  window.removeEventListener('resize', handleResize);
});

// Subscribe to the currentCharacter store
const unsubscribe = currentCharacter.subscribe(($currentCharacter) => {
  // Create copies of the objects without the "updatedAt" property
  const previousCharacterWithoutUpdatedAt = { ...previousCharacter };
  delete previousCharacterWithoutUpdatedAt.updatedAt;

  const currentCharacterWithoutUpdatedAt = { ...$currentCharacter };
  delete currentCharacterWithoutUpdatedAt.updatedAt;
  
  // Check if previousCharacter is set and if it's different from the new value
  if (previousCharacter && !isEqual(previousCharacterWithoutUpdatedAt, currentCharacterWithoutUpdatedAt)) {
    console.log('currentCharacter value has changed');
    // Clear any previously scheduled update
    clearTimeout(updateTimeout);
    // Schedule an update after 2 seconds
    updateTimeout = setTimeout(() => {
      console.log('updating currentCharacter');
      updateCharacterInFirebaseWrapper()
    }, 3000);
  } else{
    console.log('currentCharacter value is the same');
  }
  // Update previousCharacter with the new value
  previousCharacter = $currentCharacter;
});

onDestroy(() => {
  unsubscribe();
  clearTimeout(updateTimeout);
});

async function updateCharacterInFirebaseWrapper() {
  const updatedCharacterData = await updateCurrentCharacterInFirebase(db, $googleUser, $userData, $selectedCharacter, $currentCharacter);
  previousCharacter = updatedCharacterData;
}




</script>

{#if $userData}
  {#if windowWidth > 1105}
  <div in:fade class="grid grid-mainLayout gap-4 p-4 max-w-[1200px] mx-auto font-Outfit" id="dice-container">
    <Skills/>
    <Stats/>
    <TabMenu />
    <div class="flex flex-col gap-4 col-start-4 row-start-1">
      <HitPoints />
      <SavingThrows />
    </div>
    <BasicStats/>
  </div>
  {:else if windowWidth < 1105}
  <div in:fade class="">
        <Stats/>
        <Skills/>
  </div>
  {/if}
{:else}
  <div class="fixed w-full h-full inset-0 flex items-center justify-center">
    <h1 class="text-white text-5xl">LOADING DATA</h1>
  </div>
  
{/if}
