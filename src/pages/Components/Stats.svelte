<script>
    import  {currentCharacter} from "../../storeUser"
const skills = [
  'Acrobatics (Dex)',
  'Animals Handling (Str)',
  'Arcana (Int)',
  'Athletics (Str)',
  'Deception (Cha)',
  'History (Int)',
  'Insight (Wis)',
  'Intimidation (Cha)',
  'Investigation (Int)',
  'Medicine (Wis)',
  'Nature (Int)',
  'Perception (Wis)',
  'Performance (Cha)',
  'Persuasion (Cha)',
  'Religion (Int)',
  'Sleight of Hand (Dex)',
  'Stealth (Dex)',
  'Survival (Wis)'
];


</script>

<div class="bg-slate-400 min-w-min w-72 grid gap-2 justify-items-start p-4 rounded text-white">
    {#if currentCharacter !== null}
    <h2>{$currentCharacter.name}</h2>
    {/if}
    {#each skills as skill}
        <label for="" class="flex flex-row-reverse gap-2">
            {skill}
            <input class="max-w-[3rem] bg-transparent border-b text-center" type="text">
            <input type="checkbox">
        </label>
    {/each}
</div>
