<script>
 import  {currentCharacter} from "../../storeUser"

 const stats = [
    {stat: 'Strength', value: 'strength'},
    {stat: 'Dexterity', value: 'dexterity', modify:''},
    {stat: 'Constitution', value: 'constitution', modify:''},
    {stat: 'Intelligence', value: 'intelligence', modify:''},
    {stat: 'Wisdom', value: 'wisdom', modify:''},
    {stat: 'Charisma', value: 'charisma', modify:''}
 ]

function calculateModifiedValue(value) {
  return Math.floor((value - 10) / 2);
}

  function updateStatsValues(e, stat) {
    let modifiedValue;
    if(e.target.name === 'modify'){
      modifiedValue = parseInt(e.target.value) * 2 + 10;
    } else {
      modifiedValue = parseInt(e.target.value);
    }

  currentCharacter.update((character) => {
    return {
      ...character,
      stats: {
        ...character.stats,
        [stat]: modifiedValue,
      },
    };
  });
  console.log($currentCharacter);
  }

</script>

<div class="min-w-min w-72 flex gap-2 items-center justify-center rounded text-gray-700 row-start-1 col-start-1 col-span-3">
    {#if $currentCharacter !== null && $currentCharacter.name !== undefined}
    
    {#each stats as stat}
        <label for="" class="flex w-28 flex-col gap-2 justify-center items-center bg-gray-100 shadow-md p-4 rounded">
            {stat.stat}
            <!-- Stats -->
<input name="stat"
      value={$currentCharacter.stats && $currentCharacter.stats[stat.value] ? $currentCharacter.stats[stat.value] : ''}
      on:change={(e) => updateStatsValues(e, stat.value)}
      class="max-w-[3rem] bg-transparent border-b border-gray-400 text-center cursor-pointer"
      type="text"
      >
      <!-- Modifier -->
 <input name="modify" class="bg-transparent cursor-pointer border  border-gray-400 rounded-full h-[2rem] max-w-[2rem] text-center text-sm"
  on:change={(e) => updateStatsValues(e, stat.value)}
  value={$currentCharacter.stats && $currentCharacter.stats[stat.value] ? calculateModifiedValue($currentCharacter.stats[stat.value]) : ''}
  type="text" inputmode="numeric"
/>

        </label>
        {/each}
        {/if}
    </div>