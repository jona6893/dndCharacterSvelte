<script>
  import { currentCharacter } from "../../../storeUser";

  export let viewKnownSpell;
  export let selectedSpell;
  export let spellLevel;

  // empty function to aviod errors
  function handleKeypress() {}


  function updateSpellSlotValue(value, index) {
    console.log(value)
    $currentCharacter.spellSlots[spellLevel].slot[index] = value;
   console.log($currentCharacter.spellSlots[spellLevel].slot[index])
  }
  
</script>


 {#if $currentCharacter.spells.filter((spell) => spell.equipped === true && spell.spellSlotLevel === spellLevel).length > 0}   
<div class="grid grid-cols-6 font-bold text-xs border-b border-t">
    <span class="text-center">{spellLevel}</span>
    {#if $currentCharacter.spellSlots}
    <div class="col-span-5 flex gap-2"> 
      <span class="font-normal">Spell Slot:</span>
 {#each Array.from({length: $currentCharacter.spellSlots[spellLevel]?.level}) as _, index}
  <input
    type="checkbox"
    checked={$currentCharacter.spellSlots[spellLevel].slot[index]}
    on:change={(e) => updateSpellSlotValue(e.target.checked, index)}
  >
{/each} 
</div>
{/if}
</div>
{/if}
{#each $currentCharacter.spells.filter((spell) => spell.equipped === true && spell.spellSlotLevel === spellLevel) as spell, index}
  <ul class="grid grid-cols-6 text-sm text-center rounded  items-center">
    <li class="col-start-2">{spell.name}</li>
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
      class="cursor-pointer border hover:bg-blue-500 rounded p-2"
    >
      {spell.damage?.damage_type?.name ?? "view"}
    </li>
  </ul>
{/each}
