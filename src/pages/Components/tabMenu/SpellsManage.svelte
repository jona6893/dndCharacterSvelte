<script>
  import { fade } from "svelte/transition";
  import { fly } from 'svelte/transition';
  import { onMount } from "svelte";
  import { currentCharacter } from "../../../storeUser";
  import Spells from "./Spells.svelte";

  export let showSpellsPopup;
  let mobileMenuSwitcher = 0
  let viewKnownSpell = false;
  let selectedSpell = null;
  let curSelectedItem = null;
  let showSpellsSlot = false;
  let slots = ['Cantrip',1,2,3,4,5,6,7,8,9]
  let slotUpdate = [0,0,0,0,0,0,0,0,0]
  let chaosBolt = {
    name: "Chaos Bolt",
    desc: ["You hurl an undulating, warbling mass of chaotic energy at one creature in range. Make a ranged spell attack against the target. On a hit, the target takes 2d8 + 1d6 damage. Choose one of the d8s. The number rolled on that die determines the attack's damage type, as shown below. If you roll the same number on both d8s, the chaotic energy leaps from the target to a different creature of your choice within 30 feet of it. Make a new attack roll against the new target, and make a new damage roll, which could cause the chaotic energy to leap again. A creature can be targeted only once by each casting of this spell.", 'Damage Type: 1-Acid, 2-Cold, 3-Fire, 4-Force, 5-Lightining, 6-Poion, 7-Psychic, 8-Thunder'],
    range: "120 feet",
    casting_time: '1 action',
    level: 1,
    duration: 'Instantaneous',
    damage: {damage_type:{name: 'Multiple'}, damage_at_slot_level: {1: '2d8+1d6', 2: '2d8+2d6', 3: '2d8+2d6', 4: '2d8+4d6', 5:'2d8+5d6', 6:'2d8+6d6', 7:'2d8+7d6', 8:'2d8+8d6', 9:'2d8+9d6'}},
    higher_level: 1,
    url: 'chaosBolt'
  }
  let mindSliver = {
    name: "Mind Sliver",
    desc: ["You drive a disorienting spike of psychic energy into the mind of one creature you can see within range. The target must succeed on an Intelligence saving throw or take 1d6 psychic damage and subtract 1d4 from the next saving throw it makes before the end of your next turn."],
    range: "60 feet",
    casting_time: '1 action',
    level: 1,
    duration: '1 round',
    damage: {damage_type:{name: 'Multiple'}, damage_at_slot_level: {1: '1d1d6', 2: '2d8+2d6', 3: '2d8+2d6', 4: '2d8+4d6', 5:'2d8+5d6', 6:'2d8+6d6', 7:'2d8+7d6', 8:'2d8+8d6', 9:'2d8+9d6'}},
    higher_level: 1,
    url: 'mindsliver'
  }
  //console.log($currentCharacter)
  //
  // Stop the popup from closing when the user clicks the children of the popup
  function handleChildClick(event) {
    event.stopPropagation();
  }
  //
  // empty function to aviod errors
  function handleKeypress() {
  }
  //
  //
  // Variables needed for fetching data from the API
  const spellsUrl = "https://www.dnd5eapi.co/api/spells";
  let spellsData = [];
  let selectedItemData = {};
  //
  // Filter the spellsData
  let searchTerm = "";
  //
  $: filteredSpells = spellsData.filter((spell) =>
    spell.name.toLowerCase().includes(searchTerm.toLowerCase())

  );
  //
  //
  // Fetch the spells from the API
  async function fetchData() {
    try {
      const response = await fetch(spellsUrl);
      const data = await response.json();
      spellsData = data.results;
      spellsData.push(chaosBolt,mindSliver);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    console.log(spellsData);
  }
  //
  //
  // Fetch the selected item from the API
  async function fetchSelectedItemData(url) {
    if(url == 'chaosBolt') {
      selectedItemData = chaosBolt;
    } else if(url == 'mindsliver') {
       selectedItemData = mindSliver;
    }else {
    try {
      const response = await fetch("https://www.dnd5eapi.co" + url);
      selectedItemData = await response.json();
    } catch (error) {
      console.error("Error fetching item data: ", error);
    }
  }
    console.log(selectedItemData);

  }

  function addSpellToCharacter() {
    //console.log(selectedItemData);
    if (Object.keys(selectedItemData).length > 0) {
      const spellWithEquipped = {
        ...selectedItemData,
        equipped: false,
        spellSlotLevel: "Cantrip",
      };

      const spellExists = $currentCharacter.spells?.some(
        // @ts-ignore
        (spell) => spell.name === spellWithEquipped.name
      );

      if (!spellExists) {
        const updatedSpells = $currentCharacter.spells
          ? [...$currentCharacter.spells, spellWithEquipped]
          : [spellWithEquipped];

        currentCharacter.update((character) => {
          return { ...character, spells: updatedSpells };
        });
      } else {
        //console.log("Spell already exists in the list.");
      }
    } else {
      //console.log("No spell is selected.");
    }
    //console.log($currentCharacter);
  }
  //
  //
  // Render the spell from known spells
  function removeSpell(spellToRemove) {
  currentCharacter.update((data) => {
    return {
      ...data,
      spells: data.spells.filter((spell) => spell !== spellToRemove),
    };
  });
}
//update the spell slot level
  function incrementSpellSlot(index) {
  currentCharacter.update((data) => {
    const updatedSpellSlots = [...data.spellSlots];
    updatedSpellSlots[index].level++;
    updatedSpellSlots[index].slot.push(false);

    return { ...data, spellSlots: updatedSpellSlots };
  });
}
//update the spell slot level
function decrementSpellSlot(index) {
  currentCharacter.update((data) => {
    if (data.spellSlots[index].level > 0) {
      const updatedSpellSlots = [...data.spellSlots];
      updatedSpellSlots[index].level--;
      updatedSpellSlots[index].slot.pop();

      return { ...data, spellSlots: updatedSpellSlots };
    }
    return data;
  });
}

// Equip a spell or unequip a spell
function equipSpell(spellToUnequip) {

  currentCharacter.update((data) => {
    return {
      ...data,
      spells: data.spells.map((spell) =>
        spell === spellToUnequip ? { ...spell, equipped: !spellToUnequip.equipped } : spell
      ),
    };
  });
}

function updateSpellSlotLevel(event, targetSpell) {
  const updatedValue = event.target.value;

  currentCharacter.update((data) => {
    const updatedSpells = data.spells.map((spell) => {
      if (spell === targetSpell) {
        return { ...spell, spellSlotLevel: updatedValue };
      }
      return spell;
    });

    return { ...data, spells: updatedSpells };
  });
}

  onMount(fetchData);
  onMount(() => {
  if ($currentCharacter && !$currentCharacter.spellSlots) {
    $currentCharacter.spellSlots = Array.from({ length: 10 }, (_, index) => ({
      level: 0,
      slot: [],
    }));
  }
});
</script>

<div
  transition:fade
  on:click={() => {
    showSpellsPopup = !showSpellsPopup;
  }}
  on:keydown={handleKeypress}
  class="fixed w-full h-full inset-0 bg-slate-600/25 flex items-center justify-center z-10"
>
  <div
    on:click={handleChildClick}
    on:keydown={handleKeypress}
    class="laptop:w-9/12 laptop:h-4/6 max-laptop:h-[90%] max-laptop:w-[90%] bg-white text-black flex max-laptop:flex-col gap-2 overflow-auto justify-between p-8 rounded relative"
  >
    <!-- Close Button -->
    <button
      class="absolute hover:bg-gray-200 rounded-full top-[5px] left-[5px] border-2 border-black"
      on:click={() => {
        showSpellsPopup = !showSpellsPopup;
      }}
    >
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
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <!-- Known Spells -->
    <div class="laptop:hidden mx-auto flex gap-4">
      <button class="text-sm cursor-pointer {mobileMenuSwitcher === 0 && 'underline'}" on:click={()=> mobileMenuSwitcher = 0}>
        My spells
      </button>
      <button class="text-sm cursor-pointer {mobileMenuSwitcher === 1 && 'underline'}" on:click={()=> mobileMenuSwitcher = 1}>
        Find Spell
      </button>
    </div>
    <div class="flex-1 grid gap-2 relative {mobileMenuSwitcher === 1 && 'max-laptop:hidden'}">
      <!-- Not equipped Spells -->
      <div class="border p-2 rounded overflow-auto">
        <p class="text-sm text-gray-700 text-center w-full">Known Spells</p>
        <ul class="grid grid-cols-5 text-xs text-gray-500 text-center mb-2">
          <li>Spell</li>
          <li>Range</li>
          <li>Level</li>
          <li>Effect</li>
          <li>Remove</li>
        </ul>
        {#if currentCharacter && $currentCharacter.spells}
          {#each $currentCharacter.spells.filter((spell) => spell.equipped === !true) as spell, index}
            <ul
            transition:fly="{{ y: 25, duration: 300 }}"
              class="grid group grid-cols-5 text-xs cursor-pointer text-center hover:bg-green-500 hover:text-white rounded items-center" >
              <li
                class="h-full w-full grid group grid-cols-[10px_minmax(100%,_1fr)_100px] items-center justify-start gap-2"
                on:keydown={handleKeypress}
                on:click={() => equipSpell(spell)}
              ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-transparent group-hover:text-white">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
</svg>

                <span class="w-full break-words">{spell.name}</span>
              </li>
              <li
                class="h-full flex items-center justify-center"
                on:keydown={handleKeypress}
                on:click={() => equipSpell(spell)}
              >
                {spell.range}
              </li>
              <li
                class="h-full flex items-center justify-center"
                on:keydown={handleKeypress}
                on:click={() => equipSpell(spell)}
              >
                {spell.level}
              </li>
              <li
                on:keydown={handleKeypress}
                on:click={() => {
                  viewKnownSpell = !viewKnownSpell;
                  selectedSpell = spell;
                }}
                class="group-hover:bg-blue-500 rounded-tl rounded-bl  p-2"
              >
                {spell.damage?.damage_type?.name ?? "view"}
              </li>
              <button
                class="flex justify-center items-center rounded-tr rounded-br h-full group-hover:bg-red-500"
                on:click={() => removeSpell(spell)}
              >
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
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </ul>
          {/each}
        {/if}
      </div>
      <!-- Equipped Spells -->
      <div class="border p-2 rounded overflow-auto">
        <p class="text-sm text-gray-700 text-center w-full">Equipped Spells</p>
        <ul class="grid grid-cols-5 text-xs text-gray-500 text-center mb-2">
          <li>Spell</li>
          <li>Slot</li>
          <li>Range</li>
          <li>Level</li>
          <li>Effect</li>
        </ul>
        {#if currentCharacter && $currentCharacter.spells}
          {#each $currentCharacter.spells.filter((spell) => spell.equipped === true) as spell, index}
            <ul
            transition:fly="{{ y: -25, duration: 300 }}"
              class="grid group grid-cols-5 text-xs text-center hover:bg-red-500 hover:text-white rounded cursor-pointer items-center"
            >
                <li
                class="h-full w-full grid group grid-cols-[10px_minmax(100%,_1fr)_100px] items-center justify-start gap-2 text-left"
                on:keydown={handleKeypress}
                on:click={() => equipSpell(spell)}
              ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-transparent group-hover:text-white">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
</svg>

                <span class="w-[90%] break-words">{spell.name}</span>
              </li>
              <select
                name=""
                id=""
                class="group-hover:bg-blue-500 bg-transparent cursor-pointer text-center h-full"
                on:change={(e) => updateSpellSlotLevel(e, spell)}
              >
                <option
                  value="Cantrip"
                  selected={spell.spellSlotLevel === "Cantrip"}>Cantrip</option
                >
                <option value="1" selected={spell.spellSlotLevel === "1"}
                  >1</option
                >
                <option value="2" selected={spell.spellSlotLevel === "2"}
                  >2</option
                >
                <option value="3" selected={spell.spellSlotLevel === "3"}
                  >3</option
                >
                <option value="4" selected={spell.spellSlotLevel === "4"}
                  >4</option
                >
                <option value="5" selected={spell.spellSlotLevel === "5"}
                  >5</option
                >
                <option value="6" selected={spell.spellSlotLevel === "6"}
                  >6</option
                >
                <option value="7" selected={spell.spellSlotLevel === "7"}
                  >7</option
                >
                <option value="8" selected={spell.spellSlotLevel === "8"}
                  >8</option
                >
                <option value="9" selected={spell.spellSlotLevel === "9"}
                  >9</option
                >
              </select>

              <li
                class="h-full flex items-center justify-center"
                on:keydown={handleKeypress}
                on:click={() => equipSpell(spell)}
              >
                {spell.range}
              </li>
              <li
                class="h-full flex items-center justify-center"
                on:keydown={handleKeypress}
                on:click={() => equipSpell(spell)}
              >
                {spell.level}
              </li>
              <li
                on:keydown={handleKeypress}
                on:click={() => {
                  viewKnownSpell = !viewKnownSpell;
                  selectedSpell = spell;
                }}
                class="group-hover:bg-blue-500 rounded-tr rounded-br p-2"
              >
                {spell.damage?.damage_type?.name ?? "view"}
              </li>
            </ul>
          {/each}
        {/if}
      </div>
      <!-- view known or Equipped spell info popup -->
      {#if viewKnownSpell}
        <div
          class="absolute w-full h-full bg-gray-100 rounded p-8 overflow-auto"
        >
          <!-- Close Button -->
          <button
            class="absolute hover:bg-gray-200 rounded-full top-[5px] left-[5px] border-2 border-black"
            on:click={() => {
              viewKnownSpell = !viewKnownSpell;
            }}
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div class="pb-8 overflow-auto flex flex-col gap-2 p-2 rounded">
            <p>Spell: {selectedSpell.name ?? ""}</p>
            <p>
              Description: {selectedSpell.desc
                ? selectedSpell.desc.join(", ")
                : ""}
            </p>
            <p>Range: {selectedSpell.range ? selectedSpell.range : ""}</p>
            <p>
              Casting Time: {selectedSpell.casting_time
                ? selectedSpell.casting_time
                : ""}
            </p>
            <p>
              Duration: {selectedSpell.duration ? selectedSpell.duration : ""}
            </p>
            <p>Level: {selectedSpell.level ? selectedSpell.level : ""}</p>
            {#if selectedSpell.higher_level}
              <p>
                Higher Level: {selectedSpell.higher_level
                  ? selectedSpell.higher_level
                  : ""}
              </p>
            {/if}
            {#if selectedSpell.damage}
              <ul>
                <li>Damage</li>
                <li>Type: {selectedSpell.damage.damage_type.name}</li>
                <li>Damage At Slot Level:</li>
                {#if selectedSpell.damage.damage_at_slot_level}
                  {#each Object.entries(selectedSpell.damage.damage_at_slot_level) as [slot, damage]}
                    <li>Slot {slot}: {damage}</li>
                  {/each}
                {/if}
                {#if selectedSpell.damage.damage_at_character_level}
                  {#each Object.entries(selectedSpell.damage.damage_at_character_level) as [slot, damage]}
                    <li>Slot {slot}: {damage}</li>
                  {/each}
                {/if}
              </ul>
            {/if}
            {#if selectedSpell.area_of_effect}
              <ul class="flex gap-2">
                <li>Area of Effect:</li>
                <li>
                  Type: {selectedSpell.area_of_effect
                    ? selectedSpell.area_of_effect.type
                    : ""}
                </li>
                <li>
                  Size: {selectedSpell.area_of_effect
                    ? selectedSpell.area_of_effect.size
                    : ""}
                </li>
              </ul>
            {/if}
            {#if selectedSpell.dc}
              <ul>
                <li>DC:</li>
                <li>
                  Type: {selectedSpell.dc.dc_type.name
                    ? selectedSpell.dc.dc_type.name
                    : ""}
                </li>
                <li>
                  DC Success: {selectedSpell.dc.dc_success
                    ? selectedSpell.dc.dc_success
                    : ""}
                </li>
                <li>
                  Description: {selectedSpell.dc.desc
                    ? selectedSpell.dc.desc
                    : ""}
                </li>
              </ul>
            {/if}
            {#if selectedSpell.classes?.length > 0}
              <ul class="flex gap-2">
                <li>Classes:</li>
                {#each selectedSpell.classes as klass}
                  <li>
                    {klass.name},
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        </div>
      {/if}
    </div>
    <!-- LIST OF SPELLS  -->
    <div class="flex flex-col flex-1 gap-2 {mobileMenuSwitcher === 0 && 'max-laptop:hidden'} max-laptop:h-full">
      <!-- Search And Add button -->
      <div class="flex gap-4">
        <input
          type="text"
          placeholder="Search spells..."
          bind:value={searchTerm}
          class="mb-1 p-2 border-2 border-gray-300 rounded "
        />
        <button
          on:click={() => addSpellToCharacter()}
          class="bg-green-500 hover:bg-green-400 text-white p-2 rounded mb-1"
        >
          Add Spell
        </button>
        <button
          on:click={() => (showSpellsSlot = !showSpellsSlot)}
          class="bg-green-500 hover:bg-green-400 text-white p-2 rounded mb-1"
        >
          Spell Slots
        </button>
      </div>
      <!-- Rendered list of spells -->
      <ul class="w-full h-1/2 pb-8 overflow-auto border p-1 rounded">
        {#if filteredSpells}
          {#each filteredSpells as spell, index}
            <li
              class="cursor-pointer hover:bg-gray-100 rounded p-1 {curSelectedItem ==
                index && 'bg-gray-100'}"
              on:click={() => {
                fetchSelectedItemData(spell.url), (curSelectedItem = index);
              }}
              on:keydown={handleKeypress}
            >
              {spell.name}
            </li>
          {/each}
        {:else}
          <span>Getting List of Spells</span>
        {/if}
      </ul>
      <!-- VIEW SELECTED SPELL -->
      <div
        class="w-full h-1/2 pb-8 overflow-auto flex flex-col gap-2 border p-1 rounded"
      >
        <p><span class="text-gray-600 text-xs">Spell:</span> {selectedItemData.name ? selectedItemData.name : ""}</p>
        <p><span class="text-gray-600 text-xs">
          Description:
        </span>
           {selectedItemData.desc
            ? selectedItemData.desc.join(", ")
            : ""}
        </p>
        <p><span class="text-gray-600 text-xs">Range:</span> {selectedItemData.range ? selectedItemData.range : ""}</p>
        <p><span class="text-gray-600 text-xs">Casting Time: </span>
          {selectedItemData.casting_time
            ? selectedItemData.casting_time
            : ""}
        </p>
        <p>
          <span class="text-gray-600 text-xs">Duration:</span> {selectedItemData.duration ? selectedItemData.duration : ""}
        </p>
        <p><span class="text-gray-600 text-xs">Level:</span> {selectedItemData.level ? selectedItemData.level : ""}</p>
        {#if selectedItemData.higher_level}
          <p>
            <span class="text-gray-600 text-xs">Higher Level:</span> {selectedItemData.higher_level
              ? selectedItemData.higher_level
              : ""}
          </p>
        {/if}
        {#if selectedItemData.damage}
          <ul>
            <li class="text-gray-600 text-xs font-semibold">Damage</li>
            <li> <span class="text-gray-600 text-xs">Type:</span> {selectedItemData.damage.damage_type.name}</li>
            <li class="text-gray-600 text-xs">Damage At Slot Level:</li>
            {#if selectedItemData.damage.damage_at_slot_level}
              {#each Object.entries(selectedItemData.damage.damage_at_slot_level) as [slot, damage]}
                <li><span class="text-gray-600 text-xs">Slot</span> {slot}: {damage}</li>
              {/each}
            {/if}
            {#if selectedItemData.damage.damage_at_character_level}
              {#each Object.entries(selectedItemData.damage.damage_at_character_level) as [slot, damage]}
                <li><span class="text-gray-600 text-xs">Slot</span> {slot}: {damage}</li>
              {/each}
            {/if}
          </ul>
        {/if}
        {#if selectedItemData.area_of_effect}
          <ul class="flex gap-2">
            <li class="text-gray-600 text-xs font-semibold">Area of Effect:</li>
            <li>
              Type: {selectedItemData.area_of_effect
                ? selectedItemData.area_of_effect.type
                : ""}
            </li>
            <li> <span class="text-gray-600 text-xs">Size: </span>
               {selectedItemData.area_of_effect
                ? selectedItemData.area_of_effect.size
                : ""}
            </li>
          </ul>
        {/if}
        {#if selectedItemData.dc}
          <ul>
            <li class="text-gray-600 text-xs font-semibold">DC:</li>
            <li>
              <span class="text-gray-600 text-xs">Type:</span> {selectedItemData.dc.dc_type.name
                ? selectedItemData.dc.dc_type.name
                : ""}
            </li>
            <li>  <span class="text-gray-600 text-xs">DC Success: </span>
               {selectedItemData.dc.dc_success
                ? selectedItemData.dc.dc_success
                : ""}
            </li>
            <li> <span class="text-gray-600 text-xs">Description: </span>
               {selectedItemData.dc.desc
                ? selectedItemData.dc.desc
                : ""}
            </li>
          </ul>
        {/if}
        {#if selectedItemData.classes?.length > 0}
          <ul class="flex gap-2 items-center">
            <li class="text-gray-600 text-xs">Classes:</li>
            {#each selectedItemData.classes as klass}
              <li>
                {klass.name},
              </li>
            {/each}
          </ul>
        {/if}
        <!--  <pre>{JSON.stringify(selectedItemData, null, 2)}</pre>  -->
      </div>
    <!-- MANAGE SPELLSLOTS -->
      {#if showSpellsSlot}
        <div
          on:click={() => {
            showSpellsSlot = !showSpellsSlot;
          }}
          on:keydown={handleKeypress}
          class="fixed w-full h-full inset-0 bg-slate-600/25 flex items-center justify-center"
        >
          <div
            on:click={handleChildClick}
            on:keydown={handleKeypress}
            class="w-9/12 h-4/6 bg-white text-black flex gap-2 overflow-auto justify-between p-8 rounded relative"
          >
            <!-- Close Button -->
            <button
              class="absolute hover:bg-gray-200 rounded-full top-[5px] left-[5px] border-2 border-black"
              on:click={() => {
                showSpellsSlot = !showSpellsSlot;
              }}>
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div class="grid grid-cols-3 gap-2 w-full items-center justify-items-center justify-center ">
            {#each $currentCharacter?.spellSlots as slot, index}
            <div class="grid justify-items-center gap-2">
              <span>Level {index}</span>
              <div class="flex gap-4">
                
            <button class="px-2 bg-green-500 hover:bg-green-400 rounded text-white" on:click={() => incrementSpellSlot(index)}>+</button>
            <span>{slot.level}</span>
            <button class="px-2 bg-red-500 hover:bg-red-400 rounded text-white" on:click={() => decrementSpellSlot(index)}>-</button>
            
          </div>
            </div>
            {/each}
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
