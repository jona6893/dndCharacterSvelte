<script>

export let viewKnownSpell;
export let selectedSpell
 //
// Stop the popup from closing when the user clicks the children of the popup
  function handleChildClick(event) {
    event.stopPropagation();
  }
 // empty function to aviod errors
  function handleKeypress() {
  }
</script>
<div
  on:click={() => {
    viewKnownSpell = !viewKnownSpell;
  }}
  on:keydown={handleKeypress} class="fixed w-full h-full inset-0 bg-slate-600/25 flex items-center justify-center z-10">
        <div  on:click={handleChildClick}
    on:keydown={handleKeypress} class="w-9/12 h-4/6 bg-white text-black flex gap-2 overflow-auto justify-between p-8 rounded relative">
        <!-- Close Button -->
        <button
          class="absolute hover:bg-gray-200 rounded-full top-[5px] left-[5px] border-2 border-black"
          on:click={() => {
            viewKnownSpell = !viewKnownSpell;
          }}
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div class="pb-8 overflow-auto flex flex-col gap-2 p-2 rounded">
          <p><span class="text-gray-600 text-xs">Spell: </span>{selectedSpell.name ?? ""}</p>
          <p class="  { selectedSpell.desc.length >= 0 && 'columns-1', selectedSpell.desc.length == 2 && 'columns-2', selectedSpell.desc.length >=3 && 'columns-3' }">
            <span class="text-gray-600 text-xs" on:click={()=> console.log(selectedSpell.desc)}>Description:</span><br>
             {selectedSpell.desc
              ? selectedSpell.desc.join(", ")
              : ""}
          </p>
          <p><span class="text-gray-600 text-xs">Range: </span>{selectedSpell.range ? selectedSpell.range : ""}</p>
          <p>
           <span class="text-gray-600 text-xs">Casting Time: </span> {selectedSpell.casting_time
              ? selectedSpell.casting_time
              : ""}
          </p>
          <p>
            <span class="text-gray-600 text-xs">Duration:</span> {selectedSpell.duration
              ? selectedSpell.duration
              : ""}
          </p>
          <p><span class="text-gray-600 text-xs">Level: </span>{selectedSpell.level ? selectedSpell.level : ""}</p>
          {#if selectedSpell.higher_level}
            <p>
             <span class="text-gray-600 text-xs">Higher Level: </span>{selectedSpell.higher_level
                ? selectedSpell.higher_level
                : ""}
            </p>
          {/if}
          {#if selectedSpell.damage}
            <ul>
              <li class="text-gray-600 text-xs font-semibold">Damage</li>
              <li class="text-gray-600 text-xs">Type: {selectedSpell.damage.damage_type.name}</li>
              <li class="text-gray-600 text-xs">Damage At Slot Level:</li>
              {#if selectedSpell.damage.damage_at_slot_level}
                {#each Object.entries(selectedSpell.damage.damage_at_slot_level) as [slot, damage]}
                  <li><span class="text-gray-600 text-xs">Slot</span> {slot}: {damage}</li>
                {/each}
              {/if}
              {#if selectedSpell.damage.damage_at_character_level}
                {#each Object.entries(selectedSpell.damage.damage_at_character_level) as [slot, damage]}
                  <li><span class="text-gray-600 text-xs">Slot</span> {slot}: {damage}</li>
                {/each}
              {/if}
            </ul>
          {/if}
          {#if selectedSpell.area_of_effect}
            <ul class="flex gap-2 items-center">
              <li class="text-gray-600 text-xs font-bold">Area of Effect:</li>
              <li>
                <span class="text-gray-600 text-xs">Type:</span>
                 {selectedSpell.area_of_effect
                  ? selectedSpell.area_of_effect.type
                  : ""}
              </li>
              <li>
                <span class="text-gray-600 text-xs">Type:</span> {selectedSpell.area_of_effect
                  ? selectedSpell.area_of_effect.size
                  : ""}
              </li>
            </ul>
          {/if}
          {#if selectedSpell.dc}
            <ul>
              <li class="text-gray-600 text-xs">DC:</li>
              <li>
                <span class="text-gray-600 text-xs">Type:</span>
                 {selectedSpell.dc.dc_type.name
                  ? selectedSpell.dc.dc_type.name
                  : ""}
              </li>
              <li>
                <span class="text-gray-600 text-xs">DC Success: </span>
                {selectedSpell.dc.dc_success
                  ? selectedSpell.dc.dc_success
                  : ""}
              </li>
              <li>
                <span class="text-gray-600 text-xs">Description: </span>
                 {selectedSpell.dc.desc
                  ? selectedSpell.dc.desc
                  : ""}
              </li>
            </ul>
          {/if}
          {#if selectedSpell.classes?.length > 0}
            <ul class="flex gap-2 items-center">
              <li class="text-gray-600 text-xs">Classes:</li>
              {#each selectedSpell.classes as klass}
                <li>
                  {klass.name},
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      </div>
    </div>