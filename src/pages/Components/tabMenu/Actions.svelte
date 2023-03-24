<script>
  import { currentCharacter } from "../../../storeUser";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  let attacks;
  let attackPopup = false;
  let equipmentData = [];
  let selectedItemData = null;
  let curSelectedItem = null;
  //
  //
 const urls = [
  "/api/equipment-categories/martial-melee-weapons",
  "/api/equipment-categories/martial-ranged-weapons",
  "/api/equipment-categories/martial-weapons",
  "/api/equipment-categories/melee-weapons",
  "/api/equipment-categories/ranged-weapons",
  "/api/equipment-categories/simple-melee-weapons",
  "/api/equipment-categories/simple-ranged-weapons",
  "/api/equipment-categories/simple-weapons",
  "/api/equipment-categories/staff",
  "/api/equipment-categories/wand",
  "/api/equipment-categories/weapon",
  "/api/equipment-categories/shields",
];
  //
  // Stop the popup from closing when the user clicks the children of the popup
  function handleChildClick(event) {
    event.stopPropagation();
  }
  //
  // empty function to aviod errors
  function handleKeypress() {}
  //

  onMount(async () => {
    try {
    const results = await Promise.all(
      urls.map((url) => fetch("https://www.dnd5eapi.co" + url).then((res) => res.json()))
    );
    equipmentData = results.flatMap((result) => result.equipment);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
    /* try {
      const response = await fetch("https://www.dnd5eapi.co/api/equipment/");
      const data = await response.json();
      equipmentData = data.results;
    } catch (error) {
      console.error("Error fetching equipment data:", error);
    }
    console.log(equipmentData); */
  });

  async function fetchSelectedItemData(url) {
    try {
      const response = await fetch(`https://www.dnd5eapi.co${url}`);
      const data = await response.json();
      selectedItemData = data;
    } catch (error) {
      console.error("Error fetching selected item data:", error);
    }
  }
</script>

<div>
  <ul class="flex gap-2 text-xs">
    <button>ATTACKS</button>
    <!-- <button>ACTION</button> 
       <button>BONUS ACTION</button> 
       <button>REACTION</button> 
       <button>OTHER</button> 
       <button>LIMITED USE</button>  -->
  </ul>
  <div class="grid">
    <div class="grid grid-cols-5 text-xs">
      <span>ATTACK</span>
      <span>RANGE</span>
      <span>HIT / DC</span>
      <span>DAMAGE</span>
      <button
        on:click={() => {
          attackPopup = !attackPopup;
        }}>MANAGE</button
      >
    </div>
    <div>
      <h1>dsfiovjsdåofivjåofsdi</h1>
    </div>
  </div>
</div>

<!-- Attack POPUP -->
{#if attackPopup}
  <div
    transition:fade
    on:click={() => {
      attackPopup = !attackPopup;
    }}
    on:keydown={handleKeypress}
    class="fixed w-full h-full inset-0 bg-slate-600/25 flex items-center justify-center"
  >
    <div
      on:click={handleChildClick}
      on:keydown={handleKeypress}
      class="w-9/12 h-4/6 bg-white text-black flex justify-between p-4 rounded"
    >
      <div>
        <span>Attacks in Inventory</span>
      </div>
      <div>
        <span>Search for Attacks</span>
        {#if equipmentData.length >= 0}
          <ul class="h-full overflow-auto pb-4">
            {#each equipmentData as item, index}
              <li class="cursor-pointer hover:bg-gray-100 p-1 rounded {curSelectedItem == index && 'bg-gray-100'}" on:click={() => {fetchSelectedItemData(item.url), curSelectedItem = index}}>
                {item.name}
              </li>
            {/each}
          </ul>
        {:else}
          <p>Loading equipment data...</p>
        {/if}
      </div>
      {#if selectedItemData}
  <div class="h-full overflow-auto">
  <h2>{selectedItemData.name}</h2>
  <p>Description: {selectedItemData.desc ? selectedItemData.desc : ''}</p>
  <p>Weapon Range: {selectedItemData.weapon_range ?? ''}</p>
  <p>Range: {selectedItemData.range ? selectedItemData.range.normal + ' - ' + selectedItemData.range.long : ''}</p>
  <p>Damage: {selectedItemData.damage?.damage_dice ?? ''}</p>
  <p>Damage Type: {selectedItemData.damage?.damage_type?.name ?? ''}</p>
  <p>Properties:
    {#if selectedItemData.properties?.length > 0}
    <span>{selectedItemData.properties[0]?.name +',' ?? ''}</span>
    <span>{selectedItemData.properties[1]?.name+',' ?? ''}</span>
    <span>{selectedItemData.properties[2]?.name+',' ?? ''}</span>
    <span>{selectedItemData.properties[3]?.name+',' ?? ''}</span>
    {/if}
</p>
 <p>Throw Range: {selectedItemData.throw_range ? selectedItemData.throw_range.normal + ' - ' + selectedItemData.throw_range.long : ''}</p>
  <p>Two Handed Damage: {selectedItemData.two_handed_damage?.damage_dice ?? ''}</p>
  <p>Armor Category: {selectedItemData.armor_category ?? ''}</p>
  <p>Armor Class: 
    {#if selectedItemData.armor_class !== undefined}
    <span>{selectedItemData.armor_class?.base+',' ?? ''}</span>
    <span>dex bonus: {selectedItemData.armor_class?.dex_bonus+',' ?? ''}</span>
    <span>max bonus: {selectedItemData.armor_class?.max_bonus+',' ?? ''}</span>
    {/if}
</p>
  <p>STR Minimum: {selectedItemData.str_minimum ?? ''}</p>
  <p>Stealth Disadvantage: {selectedItemData.stealth_disadvantage ?? ''}</p>
  <!-- <pre>{JSON.stringify(selectedItemData, null, 2)}</pre> -->
</div>
{/if}
    </div>
  </div>
{/if}
