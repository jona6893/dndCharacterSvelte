<script>
  import Actions from "./tabMenu/Actions.svelte";
  import Spells from "./tabMenu/Spells.svelte";

  let menuOption = 0

</script>



<div class="bg-gray-100 shadow-md text- flex flex-col gap-4 p-4 col-span-2 rounded">
    <ul class="flex gap-4 max-h-12">
        <button on:click={()=>menuOption = 0} class="p-2 border border-gray-400 hover:bg-gray-400 hover:text-white rounded {menuOption === 0 && 'bg-gray-400 text-white'}">
            ACTIONS
        </button>
        <button on:click={()=>menuOption = 1} class="p-2 border border-gray-400 hover:bg-gray-400 hover:text-white rounded {menuOption === 1 && 'bg-gray-400 text-white'}">
            SPELLS
        </button>
        <button on:click={()=>menuOption = 2} class="p-2 border border-gray-400 hover:bg-gray-400 hover:text-white rounded {menuOption === 2 && 'bg-gray-400 text-white'}">
            FEATURES & TRAITS
        </button>
        <button on:click={()=>menuOption = 3} class="p-2 border border-gray-400 hover:bg-gray-400 hover:text-white rounded {menuOption === 3 && 'bg-gray-400 text-white'}">
            LANGUAGES & EQUIPMENT
        </button>
    </ul>
    <div class="min-h-[250px]">
        {#if menuOption == 0}
        <Actions/>
        {:else if menuOption == 1}
        <Spells/>
        {:else if menuOption == 2}
            <h2>FEATURES & TRAITS</h2>
        {:else if menuOption == 3}
        <h2>LANGUAGES & EQUIPMENT</h2>
        {/if}
    </div>
</div>