<script>
  import { currentCharacter } from "../../../storeUser";
  import CharacterDetails from "../CharacterDetails.svelte";

  export let viewKnownSpell;
  export let selectedSpell;
  export let spellLevel;

  // empty function to aviod errors
  function handleKeypress() {}


function updateSpellSlotValue(event, index) {
  let value = event.target.checked

  currentCharacter.update((data) => {
    const updatedSpellSlots = data.spellSlots.map((slot, i) => {
      if (i == spellLevel) {
        if (Array.isArray(slot.slot)) {
          const updatedSlot = slot.slot.map((currentValue, j) => {
            if (j === index) {
              return value;
            }
            return currentValue;
          });
          return { ...slot, slot: updatedSlot };
        } else {
          return { ...slot, slot: value };
        }
      }
      return slot;
    });

    return { ...data, spellSlots: updatedSpellSlots };
  });
}
  
</script>


 {#if $currentCharacter.spells.filter((spell) => spell.equipped === true && spell.spellSlotLevel === spellLevel).length > 0}   
<div class="grid grid-cols-6 text-gray-500 text-xs border-b border-t  border-gray-400">
    <span class="text-center">{spellLevel}</span>
    {#if $currentCharacter.spellSlots}
    <div class="col-span-5 flex gap-2"> 
      <span class="font-normal">Spell Slot:</span>
 {#each Array.from({length: $currentCharacter.spellSlots[spellLevel]?.level}) as _, index}
  <input
  class="checkbox"
    type="checkbox"
    checked={$currentCharacter.spellSlots[spellLevel].slot[index]}
    on:change={(e) => updateSpellSlotValue(e, index)}
  >
{/each} 
</div>
{/if}
</div>
{/if}
{#each $currentCharacter.spells.filter((spell) => spell.equipped === true && spell.spellSlotLevel === spellLevel) as spell, index}
  <ul class="grid grid-cols-6 text-sm text-center rounded  items-center mb-1 mt-1 text-gray-700">
    <li class="col-start-2 font-semibold">{spell.name}</li>
    <li>
      {spell.casting_time}
    </li>
    <li>{spell.range}</li>
    <li>-+</li>
    <li
      on:keydown={handleKeypress}
      on:click={() => {
        (viewKnownSpell = !viewKnownSpell), (selectedSpell = spell);
      }}
      class="cursor-pointer border border-gray-400 hover:bg-blue-500 hover:text-white rounded p-2"
    >
      {spell.damage?.damage_type?.name ?? "view"}
    </li>
  </ul>
{/each}

<style>

    .checkbox {
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 2px solid #9ca3af;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
}

.checkbox:checked {
    background-color: #7c3aed;
}
</style>