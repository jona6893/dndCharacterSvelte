<script>
 import  {currentCharacter} from "../../storeUser"

 const stats = [
    {stat: 'Strength', value: 'strength'},
    {stat: 'Dexterity', value: 'dexterity'},
    {stat: 'Constitution', value: 'constitution'},
    {stat: 'Intelligence', value: 'intelligence'},
    {stat: 'Wisdom', value: 'wisdom'},
    {stat: 'Charisma', value: 'charisma'}
 ]


  function updateStatsValues(e, statKey) {
    const inputElement = e.target;

    currentCharacter.update((data) => {
      if (!data.stats) {
        data.stats = {};
      }
      data.stats[statKey] = inputElement.value;
      return data;
    });
  }

</script>

<div class="bg-slate-400 min-w-min w-72 grid gap-2 justify-items-start p-4 rounded text-white">
    {#if $currentCharacter !== null && $currentCharacter.name !== undefined}
    <h2>{$currentCharacter.name}</h2>
    {/if}
    {#each stats as stat}
        <label for="" class="flex flex-row-reverse gap-2">
            {stat.stat}
<input
      value={$currentCharacter.stats && $currentCharacter.stats[stat.value] ? $currentCharacter.stats[stat.value] : ''}
      on:change={(e) => updateStatsValues(e, stat.value)}
      class="max-w-[3rem] bg-transparent border-b text-center cursor-pointer"
      type="text"
      >
      <!-- <input type="checkbox" checked="{($currentCharacter.skills && $currentCharacter.skills[skill.checkValue]) || false}" on:change={(e) => updateSkillValues(e, skill.checkValue, true)} />
 -->

        </label>
        {/each}
    </div>