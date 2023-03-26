<script>

  import { onMount } from "svelte";
  import { currentCharacter } from '../../../storeUser';
  import DisplaySpells from "./DisplaySpells.svelte";
  import SpellsManage from "./SpellsManage.svelte";
  import ViewSpell from "./ViewSpell.svelte";

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

<div class="grid gap-4">
  <div class="grid grid-cols-3 gap-4">
    <div class="col-start-2 flex gap-4 text-center">
      <label for="" class="group grid gap-1 justify-items-center text-xs">
        <span class="flex">
          <input
          class="w-6 bg-transparent border-b cursor-pointer text-center text-base"
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
    <label for="" class="group grid gap-1 justify-items-center text-xs">
      <span class="flex">
        <input
          class="w-6 bg-transparent border-b cursor-pointer text-center text-base"
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

    <label for="" class="group grid gap-1 justify-items-center text-xs">
      <span class="flex">
        <input
          class="w-6 bg-transparent border-b cursor-pointer text-center text-base"
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
    </div>
    <button class="col-start-3"
      on:click={() => {
        spellsPopup = !spellsPopup;
      }}>MANAGE</button>
  </div>
  <div class="relative">
<ul class="grid grid-cols-6 text-xs text-gray-500 text-center mb-2">
          <li>Level</li>
          <li>Spell</li>
          <li>Time</li>
          <li>Range</li>
          <li>HIT/DC</li>
          <li>Effect</li>
        </ul>

        {#if currentCharacter && $currentCharacter.spells}
          <DisplaySpells bind:viewKnownSpell bind:selectedSpell spellLevel={'Cantrip'}/>
          <DisplaySpells bind:viewKnownSpell bind:selectedSpell spellLevel={'1'}/>
          <DisplaySpells bind:viewKnownSpell bind:selectedSpell spellLevel={'2'}/>
          <DisplaySpells bind:viewKnownSpell bind:selectedSpell spellLevel={'3'}/>
          <DisplaySpells bind:viewKnownSpell bind:selectedSpell spellLevel={'4'}/>
          <DisplaySpells bind:viewKnownSpell bind:selectedSpell spellLevel={'5'}/>
          <DisplaySpells bind:viewKnownSpell bind:selectedSpell spellLevel={'6'}/>
          <DisplaySpells bind:viewKnownSpell bind:selectedSpell spellLevel={'7'}/>
          <DisplaySpells bind:viewKnownSpell bind:selectedSpell spellLevel={'8'}/>
          <DisplaySpells bind:viewKnownSpell bind:selectedSpell spellLevel={'9'}/>
        {/if}

        <!-- Popup -->
        {#if viewKnownSpell}
          <ViewSpell bind:viewKnownSpell bind:selectedSpell/>
      {/if}
</div>
</div>

<!-- SPELLS POPUP -->
{#if spellsPopup}
    <SpellsManage bind:showSpellsPopup={spellsPopup}/>
{/if}
