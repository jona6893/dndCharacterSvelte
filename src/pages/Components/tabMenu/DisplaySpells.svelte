<script>
  import { currentCharacter } from "../../../storeUser";

  export let viewKnownSpell;
  export let selectedSpell;
  export let spellLevel;

  // empty function to aviod errors
  function handleKeypress() {}

  console.log(spellLevel)
</script>


 {#if $currentCharacter.spells.filter((spell) => spell.equipped === true && spell.spellSlotLevel === spellLevel).length > 0}   
<div class="grid grid-cols-6 font-bold text-xs border-b border-t">
    <span class="text-center">{spellLevel}</span>
   {#if $currentCharacter.spellSlots}
  {#each Array.from({length: $currentCharacter.spellSlots[spellLevel]}) as _, index}
    <!-- <span class="text-center">Span {index + 1}</span> -->
    <input  type="checkbox">
  {/each}
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
