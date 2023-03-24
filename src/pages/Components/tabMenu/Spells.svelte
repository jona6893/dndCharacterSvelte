<script>

  import { onMount } from "svelte";
  import { currentCharacter } from '../../../storeUser';
  import SpellsPopup from "./SpellsPopup.svelte";

  let spellsPopup = false;
  let viewKnownSpell = false;
  let selectedSpell = null

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

</script>

<div>
  <div class="flex gap-4">
    <label for="" class="group grid justify-items-center">
      <span class="flex">
        <input
          class="w-6 bg-transparent border-b cursor-pointer text-center"
          type="text"
          name=""
          id=""
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 hidden group-hover:block"
           >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </span>
      MODIFIER
    </label>
    <label for="" class="group grid justify-items-center">
      <span class="flex">
        <input
          class="w-6 bg-transparent border-b cursor-pointer text-center"
          type="text"
          name=""
          id=""
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 hidden group-hover:block"
            >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </span>
      SPELL ATTACK
    </label>

    <label for="" class="group grid justify-items-center">
      <span class="flex">
        <input
          class="w-6 bg-transparent border-b cursor-pointer text-center"
          type="text"
          name=""
          id=""
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 hidden group-hover:block"
           >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </span>
      SAVE DC
    </label>

    <button
      on:click={() => {
        spellsPopup = !spellsPopup;
      }}>MANAGE</button
    >
  </div>
  <div class="relative">
<ul class="grid grid-cols-5 text-xs text-center mb-2">
          <li>Spell</li>
          <li>Time</li>
          <li>Range</li>
          <li>HIT/DC</li>
          <li>Effect</li>
        </ul>

        {#if currentCharacter && $currentCharacter.spells}
          {#each $currentCharacter.spells.filter((spell) => spell.equipped === true) as spell, index}
            <ul
              class="grid grid-cols-5 text-sm text-center rounded  items-center"
            >
              <li >{spell.name}</li>
              <li>
                {spell.casting_time}
              </li>
              <li >{spell.range}</li>
              <li >-+</li>
              <li on:keydown={handleKeypress} on:click={()=> {viewKnownSpell = !viewKnownSpell, selectedSpell = spell}} class="cursor-pointer hover:bg-blue-500 rounded p-2">
                {spell.damage?.damage_type?.name ?? "view"}
              </li>
            </ul>
          {/each}
        {/if}

        <!-- Popup -->
        {#if viewKnownSpell}
      <div
  on:click={() => {
    viewKnownSpell = !viewKnownSpell;
  }}
  on:keydown={handleKeypress} class="fixed w-full h-full inset-0 bg-slate-600/25 flex items-center justify-center">
        <div  on:click={handleChildClick}
    on:keydown={handleKeypress} class="w-9/12 h-4/6 bg-white text-black flex gap-2 overflow-auto justify-between p-8 rounded relative">
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
            Duration: {selectedSpell.duration
              ? selectedSpell.duration
              : ""}
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
    </div>
      {/if}
</div>
</div>

<!-- SPELLS POPUP -->
{#if spellsPopup}
    <SpellsPopup bind:showSpellsPopup={spellsPopup}/>
{/if}
