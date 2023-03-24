<script>
    import  {currentCharacter} from "../../storeUser"
    import {userData} from "../../storeUser"
const skills = [
  { skill: 'Acrobatics (Dex)', value: 'acrobatics',checkValue:'acrobaticsCheck' },
  { skill: 'Animals Handling (Str)', value: 'animals_handling',checkValue:'animals_handlingCheck' },
  { skill: 'Arcana (Int)', value: 'arcana', checkValue:'arcanaCheck' },
  { skill: 'Athletics (Str)', value: 'athletics',checkValue:'athleticsCheck' },
  { skill: 'Deception (Cha)', value: 'deception',checkValue:'deceptionCheck' },
  { skill: 'History (Int)', value: 'history',checkValue:'historyCheck' },
  { skill: 'Insight (Wis)', value: 'insight',checkValue:'insightCheck' },
  { skill: 'Intimidation (Cha)', value: 'intimidation',checkValue:'intimidationCheck' },
  { skill: 'Investigation (Int)', value: 'investigation',checkValue:'investigationCheck' },
  { skill: 'Medicine (Wis)', value: 'medicine',checkValue:'medicineCheck' },
  { skill: 'Nature (Int)', value: 'nature',checkValue:'natureCheck' },
  { skill: 'Perception (Wis)', value: 'perception',checkValue:'perceptionCheck' },
  { skill: 'Performance (Cha)', value: 'performance',checkValue:'performanceCheck' },
  { skill: 'Persuasion (Cha)', value: 'persuasion',checkValue:'persuasionCheck' },
  { skill: 'Religion (Int)', value: 'religion',checkValue:'religionCheck' },
  { skill: 'Sleight of Hand (Dex)', value: 'sleight_of_hand',checkValue:'sleight_of_handCheck' },
  { skill: 'Stealth (Dex)', value: 'stealth',checkValue:'stealthCheck' },
  { skill: 'Survival (Wis)', value: 'survival', checkValue:'survivalCheck'}
];



function updateSkillValues(e, skillKey, isCheckbox = false) {
    const inputElement = e.target;

    currentCharacter.update((data) => {
      if (!data.skills) {
        data.skills = {};
      }
      data.skills[skillKey] = isCheckbox ? inputElement.checked : inputElement.value;
      return data;
    });

    console.log($userData)
  }

  

</script>

<div class="bg-slate-400 min-w-min w-72 grid gap-2 justify-items-start p-4 rounded text-white">
    {#if $currentCharacter !== null && $currentCharacter.name !== undefined}
    <h2>Skills</h2>
    {/if}
    {#each skills as skill}
        <label for="" class="flex flex-row-reverse gap-2">
            {skill.skill}
<input
      value={$currentCharacter.skills && $currentCharacter.skills[skill.value] ? $currentCharacter.skills[skill.value] : ''}
      on:change={(e) => updateSkillValues(e, skill.value)}
      class="max-w-[3rem] bg-transparent border-b text-center cursor-pointer"
      type="text"
      >
      <input type="checkbox" class="cursor-pointer" checked="{($currentCharacter.skills && $currentCharacter.skills[skill.checkValue]) || false}" on:change={(e) => updateSkillValues(e, skill.checkValue, true)} />


        </label>
        {/each}
    </div>
    