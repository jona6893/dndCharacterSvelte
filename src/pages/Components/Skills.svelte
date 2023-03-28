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
    const newSkills = { ...data.skills };
    newSkills[skillKey] = isCheckbox ? inputElement.checked : inputElement.value;

    return { ...data, skills: newSkills };
  });

  console.log($currentCharacter);
}

  

</script>

<div class="bg-gray-100 min-w-min w-72 grid gap-2 justify-items-start p-4 rounded col-start-1">
    {#each skills as skill}

        <label for="" class="flex flex-row-reverse text-gray-600 gap-2">
            {skill.skill}
<input
      value={$currentCharacter.skills && $currentCharacter.skills[skill.value] ? $currentCharacter.skills[skill.value] : ''}
      on:change={(e) => updateSkillValues(e, skill.value)}
      class="max-w-[3rem] bg-transparent border-b border-gray-400 text-center cursor-pointer text-black"
      type="text"
      >
      <input type="checkbox" class="checkbox-round cursor-pointer" checked="{($currentCharacter.skills && $currentCharacter.skills[skill.checkValue]) || false}" on:change={(e) => updateSkillValues(e, skill.checkValue, true)} />
    </label>
        {/each}
    </div>
    