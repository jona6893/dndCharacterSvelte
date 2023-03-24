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
     const modifiedValue = parseInt(e.target.value) * 2 + 10;

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

<div class="bg-slate-400 min-w-min w-72 grid gap-2 justify-items-start p-4 rounded text-white">
    {#if $currentCharacter !== null && $currentCharacter.name !== undefined}
    <h2>Stats</h2>
    {/if}
    {#each stats as stat}
        <label for="" class="flex flex-row-reverse gap-2 items-center">
            {stat.stat}
<input
      value={$currentCharacter.stats && $currentCharacter.stats[stat.value] ? $currentCharacter.stats[stat.value] : ''}
      on:change={(e) => updateStatsValues(e, stat.value)}
      class="max-w-[3rem] bg-transparent border-b text-center cursor-pointer"
      type="text"
      >
 <input class="bg-transparent cursor-pointer"
  on:change={(e) => updateStatsValues(e, stat.value)}
  value={$currentCharacter.stats && $currentCharacter.stats[stat.value] ? calculateModifiedValue($currentCharacter.stats[stat.value]) : ''}
  type="number"
/>

        </label>
        {/each}
    </div>