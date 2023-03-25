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
  on:keydown={handleKeypress} class="fixed w-full h-full inset-0 bg-slate-600/25 flex items-center justify-center">
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
          <p>Spell: {selectedSpell.name ?? ""}</p>
          <p>
            Description: {selectedSpell.desc
              ? selectedSpell.desc.join(", ")
              : ""}
          </p>
          <p>Range: {selectedSpell.range ? selectedSpell.range : ""}</p>
          <p>
            Casting Time: {selectedSpell.casting_time
              ? selectedSpell.casting_time
              : ""}
          </p>
          <p>
            Duration: {selectedSpell.duration
              ? selectedSpell.duration
              : ""}
          </p>
          <p>Level: {selectedSpell.level ? selectedSpell.level : ""}</p>
          {#if selectedSpell.higher_level}
            <p>
              Higher Level: {selectedSpell.higher_level
                ? selectedSpell.higher_level
                : ""}
            </p>
          {/if}
          {#if selectedSpell.damage}
            <ul>
              <li>Damage</li>
              <li>Type: {selectedSpell.damage.damage_type.name}</li>
              <li>Damage At Slot Level:</li>
              {#if selectedSpell.damage.damage_at_slot_level}
                {#each Object.entries(selectedSpell.damage.damage_at_slot_level) as [slot, damage]}
                  <li>Slot {slot}: {damage}</li>
                {/each}
              {/if}
              {#if selectedSpell.damage.damage_at_character_level}
                {#each Object.entries(selectedSpell.damage.damage_at_character_level) as [slot, damage]}
                  <li>Slot {slot}: {damage}</li>
                {/each}
              {/if}
            </ul>
          {/if}
          {#if selectedSpell.area_of_effect}
            <ul class="flex gap-2">
              <li>Area of Effect:</li>
              <li>
                Type: {selectedSpell.area_of_effect
                  ? selectedSpell.area_of_effect.type
                  : ""}
              </li>
              <li>
                Size: {selectedSpell.area_of_effect
                  ? selectedSpell.area_of_effect.size
                  : ""}
              </li>
            </ul>
          {/if}
          {#if selectedSpell.dc}
            <ul>
              <li>DC:</li>
              <li>
                Type: {selectedSpell.dc.dc_type.name
                  ? selectedSpell.dc.dc_type.name
                  : ""}
              </li>
              <li>
                DC Success: {selectedSpell.dc.dc_success
                  ? selectedSpell.dc.dc_success
                  : ""}
              </li>
              <li>
                Description: {selectedSpell.dc.desc
                  ? selectedSpell.dc.desc
                  : ""}
              </li>
            </ul>
          {/if}
          {#if selectedSpell.classes?.length > 0}
            <ul class="flex gap-2">
              <li>Classes:</li>
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