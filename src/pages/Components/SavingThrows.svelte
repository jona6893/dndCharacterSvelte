<script>
  import { onMount } from "svelte";
    import  {currentCharacter} from "../../storeUser"
let attributes = ['STR', 'DEX','CON','INT', 'WIS', 'CHA'];
let savingThrows = {
    STR: 0,
    DEX: 0,
    CON: 0,
    INT: 0,
    WIS: 0,
    CHA: 0
}

function updateSavingThrows(attribute) {
let name = attribute.target.name;
let value = attribute.target.value;

console.log(name, value);

currentCharacter.update((character) => {
    if(!character.savingThrows) {
        console.log('savingThrows is empty');
        let updateAttributes = savingThrows
        updateAttributes[name] = value;
    return { ...character, savingThrows: updateAttributes };
    }
    let updateAttributes = {...character.savingThrows}
    updateAttributes[name] = value;
    return { ...character, savingThrows: updateAttributes };
})
console.log($currentCharacter);
}


</script>

<div class="flex flex-col gap-2 col-start-3 row-start-1 bg-gray-100 shadow-md p-4">
    <div class="grid grid-cols-3 gap-4">
    {#each attributes as atr }
        <label for="">
            <span class="text-sm text-gray-700">{atr}</span>
            <input on:change={updateSavingThrows} value={$currentCharacter?.savingThrows ? $currentCharacter?.savingThrows[atr] : 0} class="w-8 bg-transparent border-b border-gray-400 text-center" type="text" name={atr} id="">
        </label>
    
    {/each}
   </div>
   <p class="text-center text-xs text-gray-600 w-full">SAVING THROWS</p>
</div>