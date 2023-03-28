<script>
    import { currentCharacter } from "../../storeUser";
    import {onMount} from "svelte";
    let dead = false;
    const defaultHitpoints = {current: 1, max: 1, temp: 0, fails: [false, false, false],saves: [false, false, false],}
    let validHitpoints = $currentCharacter?.hitpoints || defaultHitpoints;

// Step 2: Update the currentCharacter object with the new hitpoints object

function updateHitpoints(event) {
  let field = event.target.name;
  let value = event.target.value;

  //console.log(field);
  //console.log(value);

  currentCharacter.update((character) => {
    const newHitpoints = {...character.hitpoints}
    newHitpoints[field] = value;
    return { ...character, hitpoints: newHitpoints };
  });
  //console.log($currentCharacter);
}

function incrementCurrentHitpoints(event) {
    event.preventDefault();
    if ($currentCharacter.hitpoints.current <= 0) {
    //console.log('we hit zero')
  dead = true;
}
    //console.log(event)
    //console.log(event.target.form[1].value);
    if(event.target.form[1].value.toString().substring(0,1) !== "-") {
    currentCharacter.update((character) => {
    const newHitpoints = {...character.hitpoints}
    newHitpoints.current = parseInt($currentCharacter.hitpoints.current) + parseInt(event.target.form[1].value)
    return { ...character, hitpoints: newHitpoints };
  }) }
  if ($currentCharacter.hitpoints.current > 0){
    dead = false;
  }
}
function decrementCurrentHitpoints(event) {
    event.preventDefault();
    //console.log(event.target.form[1].value);
    if(event.target.form[1].value.toString().substring(0,1) !== "-") {
    currentCharacter.update((character) => {
    const newHitpoints = {...character.hitpoints}
    newHitpoints.current = parseInt($currentCharacter.hitpoints.current) - parseInt(event.target.form[1].value)
    return { ...character, hitpoints: newHitpoints };
  }) }
  if ($currentCharacter.hitpoints.current <= 0) {
    console.log('we hit zero')
  dead = true;
  currentCharacter.update((character) => {
    const newHitpoints = {...character.hitpoints}
    newHitpoints.current = 0
    return { ...character, hitpoints: newHitpoints }})
}
}

function updateFails(event) {
  console.log(event);
  currentCharacter.update((character) => {
    const newDeathSave = {...character.hitpoints};
    newDeathSave.fails[event.target.name] = event.target.checked;
    return {
      ...character,
      hitpoints: newDeathSave
    };
  });
  //console.log($currentCharacter);
}
function updateSaves(event) {
  console.log(event);
  currentCharacter.update((character) => {
    const newDeathSave = {...character.hitpoints};
    newDeathSave.saves[event.target.name] = event.target.checked;
    return {
      ...character,
      hitpoints: newDeathSave
    };
  });
  //console.log($currentCharacter);
}


onMount(()=> {
    if ($currentCharacter.hitpoints.current <= 0){
    dead = true;
  }
 
})



</script>

<div class="bg-gray-100 p-4 shadow-md col-start-4 row-start-1 rounded w-full h-fit">
    {#if !dead}
    <!-- Hit Points -->
    
    <div class="flex flex-col items-center justify-center  gap-2">
        <h3>Hit Points</h3>
        <div class="flex gap-4">
        <form class="grid justify-items-center gap-1">
            <button type="submit" on:click={incrementCurrentHitpoints} class="bg-green-500 hover:bg-green-400 text-white rounded p-1 w-full">ADD</button>
            <label for="" class="relative group">
                <input value="0" class="max-w-[3rem]  bg-transparent border-b border-gray-400 text-center" min="0" type="number">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hidden absolute top-0 left-[3rem] group-hover:block">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </label>
            <button on:click={decrementCurrentHitpoints} class="bg-red-500 hover:bg-red-400 text-white rounded p-1 w-full">MINUS</button>
        </form>
        <div class="flex gap-8">
            <div class="flex gap-4">
                <label class="flex group relative flex-col items-center gap-1" for="">
                    <span class="p-1">CURRENT</span> 
                    <input value={$currentCharacter?.hitpoints.current ? $currentCharacter.hitpoints?.current: 1} name="current" on:change={(e) =>updateHitpoints(e)} class="max-w-[3rem] bg-transparent border-b border-gray-400 text-center" type="text">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hidden absolute top-1/3 left-[4rem] group-hover:block">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </label>
                
                <label class="flex flex-col items-center relative group gap-1" for="">
                   <span class="p-1">MAX</span> 
                    <input value={$currentCharacter?.hitpoints.max ? $currentCharacter.hitpoints?.max:1} name="max" on:change={(e) =>updateHitpoints(e)} class="max-w-[3rem] bg-transparent border-b border-gray-400 text-center" type="text">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hidden absolute top-1/3 left-[3rem] group-hover:block">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </label>
            </div>
            
            <label class="flex flex-col items-center relative group gap-1" for="">
                <span class="p-1">TEMP</span>
                <input value={$currentCharacter?.hitpoints.temp ? $currentCharacter.hitpoints?.temp:0} name="temp" on:change={(e) =>updateHitpoints(e)} class="max-w-[3rem] bg-transparent border-b border-gray-400" type="text">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hidden absolute top-1/3 left-[3rem] group-hover:block">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
            </label>
            
        </div></div>
    </div>
    
    {:else}
    
    <!-- Death Save -->
    
    <div class="flex gap-8 items-center justify-center h-full" >
        <form class="grid justify-items-center gap-1">
            <button type="submit" on:click={incrementCurrentHitpoints} class="bg-green-500 hover:bg-green-400 text-white rounded p-1 w-full">ADD</button>
            <label for="" class="relative group">
                <input value="0" class="max-w-[3rem]  bg-transparent border-b border-gray-400 text-center" type="number" min="0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hidden absolute top-0 left-[3rem] group-hover:block">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </label>
           
        </form>
        
        <div class="grid gap-4 justify-items-center items-center">
    
        <div class="flex gap-4 items-center justify-center ">
        <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18 18v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3H3a1 1 0 0 1-1-1v-5C2 6.477 6.477 2 12 2s10 4.477 10 10v5a1 1 0 0 1-1 1h-3zM7.5 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
        <div>
        <div class="flex gap-4 justify-between">
            <span class="font-bold">FAILURE:</span>
            <div class="flex gap-2">
                <input name="0" bind:checked={validHitpoints.fails[0]} on:click={updateFails} class="fail-check" type="checkbox">
                <input name="1" bind:checked={validHitpoints.fails[1]} on:click={updateFails} class="fail-check" type="checkbox">
                <input name="2" bind:checked={validHitpoints.fails[2]} on:click={updateFails} class="fail-check" type="checkbox">
            </div>
        </div>
        <div class="flex gap-4 justify-between">
            <span class="font-bold">SUCCESS:</span>
            <div class="flex gap-2">
                <input name="0" bind:checked={validHitpoints.saves[0]} on:click={updateSaves} class="save-check" type="checkbox">
                <input name="1" bind:checked={validHitpoints.saves[1]} on:click={updateSaves} class="save-check" type="checkbox">
                <input name="2" bind:checked={validHitpoints.saves[2]} on:click={updateSaves} class="save-check" type="checkbox">
            </div>
        </div>
        </div> 
    </div>
        <span class="text-xs text-gray-500">DEATH SAVES</span>
    </div>
     </div>
    {/if}
</div>


<style>
      .fail-check, .save-check {
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid #374151;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
}

.fail-check:checked {
    background-color: #ef4444;
}
.save-check:checked {
    background-color: #22c55e;
}
</style>