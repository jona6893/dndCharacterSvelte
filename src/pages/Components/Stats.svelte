<script>
    import  {currentCharacter} from "../../storeUser"
    import {userData} from "../../storeUser"
const skills = [
  { skill: 'Acrobatics (Dex)', value: 'acrobatics' },
  { skill: 'Animals Handling (Str)', value: 'animals_handling' },
  { skill: 'Arcana (Int)', value: 'arcana' },
  { skill: 'Athletics (Str)', value: 'athletics' },
  { skill: 'Deception (Cha)', value: 'deception' },
  { skill: 'History (Int)', value: 'history' },
  { skill: 'Insight (Wis)', value: 'insight' },
  { skill: 'Intimidation (Cha)', value: 'intimidation' },
  { skill: 'Investigation (Int)', value: 'investigation' },
  { skill: 'Medicine (Wis)', value: 'medicine' },
  { skill: 'Nature (Int)', value: 'nature' },
  { skill: 'Perception (Wis)', value: 'perception' },
  { skill: 'Performance (Cha)', value: 'performance' },
  { skill: 'Persuasion (Cha)', value: 'persuasion' },
  { skill: 'Religion (Int)', value: 'religion' },
  { skill: 'Sleight of Hand (Dex)', value: 'sleight_of_hand' },
  { skill: 'Stealth (Dex)', value: 'stealth' },
  { skill: 'Survival (Wis)', value: 'survival' }
];

let skillValues = [];

</script>

<div class="bg-slate-400 min-w-min w-72 grid gap-2 justify-items-start p-4 rounded text-white">
    {#if $currentCharacter !== null && $currentCharacter.name !== undefined}
    <h2>{$currentCharacter.name}</h2>
    {/if}
    {#each skills as skill}
        <label for="" class="flex flex-row-reverse gap-2">
            {skill.skill}
            <input value="" on:change={(e) => {
    const inputElement = e.target;
    const existingSkill = skillValues.find((item) => Object.keys(item)[0] === skill.value);

    if (existingSkill) {
        existingSkill[skill.value] = inputElement.value;
    } else {
        skillValues.push({ [skill.value]: inputElement.value });
    }

    console.log(skillValues);
}} class="max-w-[3rem] bg-transparent border-b text-center" type="text">

        </label>
        {/each}
    </div>
    
    <input type="checkbox">