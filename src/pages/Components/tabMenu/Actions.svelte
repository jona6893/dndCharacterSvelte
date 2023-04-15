<script>
  import { currentCharacter } from "../../../storeUser";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import ModalPopup from "../modal/ModalPopup.svelte";
  
  let mobileMenuSwitcher = 0
  let attackPopup = false;
  let modalStatus = false;
  //
  //
  //
  // Stop the popup from closing when the user clicks the children of the popup
  function handleChildClick(event) {
    event.stopPropagation();
  }
  //
  // empty function to aviod errors
  function handleKeypress() {}
  //

  function handleFromSubmit(event) {
    event.preventDefault();
    let atk = event.target.attack.value;
    let range = event.target.range.value;
    let hitdc = event.target.hitdc.value;
    let damage = event.target.damage.value;
    let notes = event.target.notes.value;

    // Create an action object
    let action = {
      attack: atk,
      range: range,
      hitdc: hitdc,
      damage: damage,
      notes: notes,
      equipped: false,
    };

    // Add the action object to the actions array in the currentCharacter
    if (currentCharacter && $currentCharacter) {
      currentCharacter.update((data) => {
        data.actions = data.actions || [];
        data.actions.push(action);
        return data;
      });
    }
    
}

 
  // Remove the action from known Actions
    function removeAction(actionToRemove) {
  currentCharacter.update((data) => {
    return {
      ...data,
      actions: data.actions.filter((action) => action !== actionToRemove),
    };
  });
}


// Equip a spell or unequip a spell
function equipAction(actionToUnequip) {

  currentCharacter.update((data) => {
    return {
      ...data,
      actions: data.actions.map((action) =>
        action === actionToUnequip ? { ...action, equipped: !actionToUnequip.equipped } : action
      ),
    };
  });
}
// Equip a spell or unequip a spell
function updateActionValues(event, index) {
  let field = event.target.name;
  let value = event.target.value;


  currentCharacter.update((data) => {
    return {
      ...data,
      actions: data.actions.map((action, i) => i === index ? { ...action,[field]: value } : action
       /*  action[index] && { ...action, [field]: value }  */
      ),
    };
  });
}



</script>

<div class="flex flex-col gap-2">
  <!-- <ul class="flex gap-2 text-xs">
    <button>ATTACKS</button>
  </ul> -->
  <button
    on:click={() => {
      attackPopup = !attackPopup;
      modalStatus = !modalStatus;
    }}>MANAGE</button
  >
  <div class="grid gap-2">
    <div
      class="grid grid-cols-5 text-xs text-xs text-gray-500 text-center mb-2"
    >
      <span>ATTACK</span>
      <span>RANGE</span>
      <span>HIT / DC</span>
      <span>DAMAGE</span>
      <span>NOTES</span>
    </div>
    <div class="grid gap-2">
      {#if $currentCharacter.actions}
        {#each $currentCharacter.actions.filter((action) => action.equipped === true) as action}
          <ul
            class="grid grid-cols-5 text-sm text-center rounded  items-center mb-2 mt-2 text-gray-700 border-b border-gray-300"
          >
            <li>{action.attack}</li>
            <li>{action.range}</li>
            <li>{action.hitdc}</li>
            <li>{action.damage}</li>
            <li>{action.notes}</li>
          </ul>
        {/each}
      {/if}
    </div>
  </div>
</div>

<!-- Attack POPUP -->

<ModalPopup bind:modalStatus>
  <div class="flex flex-col w-full gap-2">
    <div class="laptop:hidden mx-auto flex gap-4">
      <button class="text-sm cursor-pointer {mobileMenuSwitcher === 0 && 'underline'}" on:click={()=> mobileMenuSwitcher = 0}>
        My Actions
      </button>
      <button class="text-sm cursor-pointer {mobileMenuSwitcher === 1 && 'underline'}" on:click={()=> mobileMenuSwitcher = 1}>
        Add Action
      </button>
    </div>
  <div class="grid grid-rows-2 gap-2 {mobileMenuSwitcher === 1 && 'max-laptop:hidden'} max-laptop:h-full">
        <div
          class="flex flex-col items-center border rounded p-2 overflow-auto"
        >
          <span class="mb-2">Inventory</span>
          <ul
            class="grid grid-cols-6 justify-evenly w-full text-xs text-gray-500 text-center mb-2"
          >
            <li>Attack</li>
            <li>Range</li>
            <li>HIT/DC</li>
            <li>DAMAGE</li>
            <li>NOTES</li>
            <li>REMOVE</li>
          </ul>
          {#if $currentCharacter.actions}
            {#each $currentCharacter.actions.filter((action) => action.equipped === false) as action}
              <ul
                transition:fly={{ y: 25, duration: 300 }}
                on:keydown={handleKeypress}
                on:click={() =>equipAction(action)}
                class="grid group grid-cols-6 text-xs cursor-pointer text-center hover:bg-green-500 hover:text-white rounded items-center w-full "
              >
                <li
                  class="h-full w-full group flex items-center justify-start gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 text-transparent group-hover:text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                    />
                  </svg>
                  {action.attack}
                </li>
                <li class="h-full w-full flex items-center justify-center">
                  {action.range}
                </li>
                <li class="h-full w-full flex items-center justify-center">
                  {action.hitdc}
                </li>
                <li class="h-full w-full flex items-center justify-center">
                  {action.damage}
                </li>
                <li class="h-full w-full flex items-center justify-center">
                  {action.notes}
                </li>
                <button
                  class="flex justify-center items-center rounded-tr rounded-br h-full group-hover:bg-red-500 p-2"
                  on:click={() => removeAction(action)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </ul>
            {/each}
          {/if}
        </div>
        <div
          class="flex flex-col items-center border rounded p-2 overflow-auto"
        >
          <span class="mb-2">Equipped </span>
          <ul
            class="grid grid-cols-6 justify-evenly w-full text-xs text-gray-500 text-center mb-2"
          >
            <li>Move</li>
            <li>Attack</li>
            <li>Range</li>
            <li>HIT/DC</li>
            <li>DAMAGE</li>
            <li>NOTES</li>
          </ul>
          {#if $currentCharacter.actions}
            {#each $currentCharacter.actions.filter((action) => action.equipped === true) as action, index}
              <ul
              transition:fly="{{ y: 25, duration: 300 }}"
                class="grid grid-cols-6 text-xs text-center rounded items-center w-full"
              >
                <span
                  on:keydown={handleKeypress}
                  on:click={() =>equipAction(action)}
                  class="text-center h-full w-full flex items-center justify-center hover:bg-red-500 hover:text-white cursor-pointer p-2 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 group-hover:text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                    />
                  </svg>
                </span>
                <input
                  class="text-center bg-transparent border rounded h-full"
                  value={action.attack}
                  name="attack"
                  on:change={(e) => updateActionValues(e, index)}
                  type="text"
                />
                <input
                  class="text-center bg-transparent border rounded h-full"
                  value={action.range}
                  name="range"
                  on:change={(e) => updateActionValues(e, index)}
                  type="text"
                />
                <input
                  name="hitdc"
                  class="text-center bg-transparent border rounded h-full"
                  value={action.hitdc}
                  on:change={(e) => updateActionValues(e, index)}
                  type="text"
                />
                <input
                  name="damage"  
                  class="text-center bg-transparent border rounded h-full"
                  value={action.damage}
                  on:change={(e) => updateActionValues(e, index)}
                  type="text"
                />
                <input
                  name="notes"
                  class="text-center bg-transparent border rounded h-full"
                  value={action.notes}
                  on:change={(e) => updateActionValues(e, index)}
                  type="text"
                />
              </ul>
            {/each}
          {/if}
        </div>
      </div>
      <div class="border rounded p-4 grid justify-items-center {mobileMenuSwitcher === 0 && 'max-laptop:hidden'}">
        <span>Submit Action</span>
        <form
          action=""
          on:submit={handleFromSubmit}
          class="flex flex-col gap-4"
        >
          <label for="" class="grid text-xs gray-700">
            ATTACK
            <input
              name="attack"
              required
              placeholder="Attack"
              class="bg-transparent border p-1 rounded text-black text-base"
              type="text"
            />
          </label>
          <label for="" class="grid text-xs gray-700">
            RANGE
            <input
              name="range"
              placeholder="Range"
              class="bg-transparent border p-1 rounded text-black text-base"
              type="text"
            />
          </label>
          <label for="" class="grid text-xs gray-700">
            HIT / DC
            <input
              name="hitdc"
              placeholder="HIT / DC"
              class="bg-transparent border p-1 rounded text-black text-base"
              type="text"
            />
          </label>
          <label for="" class="grid text-xs gray-700">
            DAMAGE
            <input
              name="damage"
              placeholder="Damage"
              class="bg-transparent border p-1 rounded text-black text-base"
              type="text"
            />
          </label>
          <label for="" class="grid text-xs gray-700">
            NOTES
            <input
              name="notes"
              placeholder="Notes"
              class="bg-transparent border p-1 rounded text-black text-base"
              type="text"
            />
          </label>
          <button class="bg-green-500 hover:bg-green-400 text-white p-2 rounded"
            >Add Action</button
          >
        </form>
      </div>
    </div>
</ModalPopup>

