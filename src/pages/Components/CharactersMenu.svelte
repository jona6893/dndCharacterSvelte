<script>
  import { onMount } from "svelte";
  import { db } from "../../firebase";
  import { userData, googleUser } from "../../storeUser";
  import { collection, doc, addDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
  import { checkUserDocument } from "../../GoogleAuth.svelte";
  import { currentCharacter } from "../../storeUser";
  import {fade, scale} from 'svelte/transition';
  import { get } from "svelte/store";
  // The current Selected Character
  let selectedCharacter = 0;
  let deleteCharacterIndex;
  //Popup variables
  let showChar = false;
  let showChar2 = false;
  let showDelete = false;

  // Character values
  let classes;
  let races;
  let alignments;
  //
  // close the create character popup
  function closePopup() {
    showChar2 = false;
  }
  //
  // close the delete popup
  function closePopupDelete() {
    showDelete = false;
  }
  //
  // Stop the popup from closing when the user clicks the children of the popup
  function handleChildClick(event) {
    event.stopPropagation();
  }
  //
  // empty function to aviod errors
  function handleKeypress() {}

  //
  // update to display the current selected character
  function updateCurrentCharacter(index) {
    console.log(index)
    selectedCharacter = index;
    userData.subscribe(($userData) => {
      // Set the currentCharacter store value based on the selected index
      if ($userData != null) {
        currentCharacter.set($userData[selectedCharacter]);
      }
    });
  }
  //
  // get the users characters
  onMount(() => {
    userData.subscribe(($userData) => {
      // Set the currentCharacter store value based on the selected index
      if ($userData != null) {
        currentCharacter.set($userData[selectedCharacter]);
      }
    });

    //fetch Data
    async function fetchData(endpoint) {
      const response = await fetch(`https://www.dnd5eapi.co/api/${endpoint}`);
      const data = await response.json();
      return data;
    }
    //fetch Classes
    async function getDndClasses() {
      classes = await fetchData("classes");
      //console.log(classes.results);
    }
    // fetch Races
    async function getDndRaces() {
      races = await fetchData("races");
      // console.log(races.results);
    }
    // fetch Alignments
    async function getDndAlignments() {
      alignments = await fetchData("alignments");
      // console.log(alignments.results);
    }

    getDndRaces();
    getDndClasses();
    getDndAlignments();
  });
  //
  // push the character to the database
  async function addCharacter(character) {
    if (userData) {
      try {
        const charactersRef = collection(
          doc(db, "Dnd", $googleUser.uid),
          "Characters"
        );
        await addDoc(charactersRef, character);
      } catch (error) {
        console.error("Error adding character:", error);
      }
    } else {
      console.error("User not signed in");
    }
    checkUserDocument($googleUser.uid);
  }
  //
  // Create a new character
  async function createNewCharacter(event) {
    event.preventDefault();
    showChar2 = false;
    let name = event.target.name.value;
    let race = event.target.race.value;
    let raceSelct = event.target.raceSelct.value;
    let level = event.target.level.value;
    let klass = event.target.class.value;
    let classSelct = event.target.classSelct.value;
    let alignment = event.target.alignment.value;
    let alignmentSelct = event.target.alignmentSelct.value;

    if (raceSelct.length > 0 && race.length > 0) {
      raceSelct = "";
    }
    if (classSelct.length > 0 && klass.length > 0) {
      classSelct = "";
    }
    if (alignmentSelct.length > 0 && race.alignment > 0) {
      alignmentSelct = "";
    }

    const newCharacter = {
      createdAt: serverTimestamp(),
      name,
      level,
      ...(race.length <= 0 ? { race: raceSelct } : { race: race }),
      ...(klass.length <= 0 ? { class: classSelct } : { class: klass }),
      ...(alignment.length <= 0
        ? { alignment: alignmentSelct }
        : { alignment: alignment }),
      // Add more character properties here
    };
    await addCharacter(newCharacter);
  }

  //
  // Delete a Character
  async function deleteCharacter() {
  showDelete = !showDelete
  const currentUserData = get(userData);
  const currentGoogleUser = get(googleUser);

  const userId = currentGoogleUser.uid;
  
  const characterId = currentUserData[deleteCharacterIndex].id;
  // reset the current selected character
  updateCurrentCharacter(0)

  // delete the character from the database
   try {
    const characterRef = doc(db, "Dnd", userId, "Characters", characterId);
    await deleteDoc(characterRef);
    console.log("Character deleted successfully");
  } catch (error) {
    console.error("Error deleting character: ", error);
  } 
}
</script>

<div class="relative">
  <button
    on:click={() => (showChar2 = !showChar2)}
    class="bg-slate-600 p-2 rounded hover:bg-slate-500 cursor-pointer"
    >Create Character</button
  >
  <button
    on:click={() => (showChar = !showChar)}
    class="bg-slate-600 p-2 rounded hover:bg-slate-500 cursor-pointer"
    >View Characters</button
  >

  <div
    on:mouseleave={() => (showChar = false)}
    class="absolute flex-col bg-slate-600 rounded p-4 top-[110%] left-[25%] w-full shadow {showChar
      ? 'flex'
      : 'hidden'}"
  >
  <!-- List of Characters -->
    {#if $userData !== null}
      <span class="p-2 font-thin">Characters:</span>
      {#each $userData as data, index}
        <div
          class="flex justify-between m-1 bg-slate-500 hover:bg-slate-400 rounded"
        >
          <button
            on:click={() => updateCurrentCharacter(index)}
            class="p-2 rounded grid grid-cols-2 gap-2 justify-items-start"
          >
            <span>{data.name}</span>
            <span><span class="text-sm font-thin">Lvl: </span>{data.level}</span
            >
            <span>{data.race}</span>
            <span>{data.class}</span>
          </button>
          <!-- delete character button -->
          <button
            class="hover:bg-red-500 p-2 rounded"
            on:click={() => (showDelete = !showDelete, deleteCharacterIndex = index)}
            ><svg
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
        <hr class="border border-white" />
      {/each}
    {/if}
  </div>
  <!-- Character Create Popup -->
  {#if showChar2}
  <div
  transition:fade
    on:click={closePopup}
    on:keydown={handleKeypress}
    class="fixed flex-col bg-slate-600/25 rounded p-4 flex items-center justify-center w-screen h-screen inset-0"
  >
    <div
      class="bg-slate-600 min-w-min w-80 flex flex-col p-4 rounded shadow"
      on:click={handleChildClick}
      on:keydown={handleKeypress}
    >
      <button on:click={() => (showChar2 = false)}
        ><svg
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <form
        action=""
        class="flex flex-col p-4 gap-4 items-center"
        on:submit={createNewCharacter}
      >
        <label for="" class="grid gap-1 text-sm font-thin">
          Name:
          <input
            name="name"
            required
            placeholder="Character Name"
            type="text"
            class="text-base font-normal text-black p-1 rounded"
          />
        </label>
        <label for="" class="grid gap-1 text-sm font-thin">
          Level:
          <input
            name="level"
            placeholder="Character Level"
            type="text"
            class="text-base font-normal text-black p-1 rounded"
          />
        </label>
        <label
          for=""
          class="grid gap-1 text-sm font-thin border border-white rounded p-2"
        >
          Type a Race:
          <input
            name="race"
            placeholder="Character Race"
            type="text"
            class="text-base font-normal text-black p-1 rounded"
          />
          or Select a Race:
          <select
            name="raceSelct"
            id=""
            class="text-base font-normal text-black p-1 rounded"
          >
            <option value="select">Select a Race</option>
            {#if races !== undefined}
              {#each races.results as race}
                <option value={race.name}>{race.name}</option>
              {/each}{/if}
          </select>
        </label>
        <label
          for=""
          class="grid gap-1 text-sm font-thin border border-white rounded p-2"
        >
          Type a Class:
          <input
            name="class"
            placeholder="Character Class"
            type="text"
            class="text-base font-normal text-black p-1 rounded"
          />
          or Select a Class:
          <select
            name="classSelct"
            id=""
            class="text-base font-normal text-black p-1 rounded"
          >
            <option value="select">Select a Race</option>
            {#if classes !== undefined}
              {#each classes.results as klass}
                <option value={klass.name}>{klass.name}</option>
              {/each}{/if}
          </select>
        </label>
        <label
          for=""
          class="grid gap-1 text-sm font-thin border border-white rounded p-2"
        >
          Type an Alignment:
          <input
            name="alignment"
            placeholder="Character Alignment"
            type="text"
            class="text-base font-normal text-black p-1 rounded"
          />
          or Select an Alignment:
          <select
            name="alignmentSelct"
            id=""
            class="text-base font-normal text-black p-1 rounded"
          >
            <option value="select">Select a Race</option>
            {#if alignments !== undefined}
              {#each alignments.results as align}
                <option value={align.name}>{align.name}</option>
              {/each}{/if}
          </select>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  </div>
  {/if}
</div>

<!-- Delete Popup -->
{#if showDelete}
<div transition:fade
  on:click={closePopupDelete}
  on:keydown={handleKeypress}
  class="fixed flex-col bg-slate-600/25 rounded p-4 flex items-center justify-center w-screen h-screen inset-0"
>
  <div
    on:click={handleChildClick}
    on:keydown={handleKeypress}
    class="bg-gray-50 min-w-min w-80 h-[200px] shadow p-4 flex flex-col items-center justify-center gap-4 rounded"
  >
    <p class="text-gray-800 text-center">
      Are you sure you want to delete this Character?
    </p>
    <div class="flex gap-4">
      <button on:click={deleteCharacter} class="px-8 py-2 bg-red-500 hover:bg-red-400 rounded">Yes</button>
      <button on:click={() =>{showDelete = ! showDelete}} class="px-8 py-2 bg-green-500 hover:bg-green-400 rounded"
        >No</button>
    </div>
  </div>
</div>
{/if}