<script>
  import Actions from "./tabMenu/Actions.svelte";
  import Spells from "./tabMenu/Spells.svelte";
  import FeaturesTraits from "./tabMenu/FeaturesTraits.svelte";
  import LangEquip from "./tabMenu/LangEquip.svelte";
  import Description from "./tabMenu/Description.svelte";
  let menuOption = 0

</script>



<div class="bg-gray-100 h-full shadow-md text- flex flex-col gap-4 p-4 col-span-3 rounded col-start-2 row-start-2">
    <ul class="flex gap-4 max-h-12">
        <button on:click={()=>menuOption = 0} class="p-2 border border-gray-400 hover:bg-gray-400 hover:text-white rounded {menuOption === 0 && 'bg-gray-400 text-white'}">
            ACTIONS
        </button>
        <button on:click={()=>menuOption = 1} class="p-2 border border-gray-400 hover:bg-gray-400 hover:text-white rounded {menuOption === 1 && 'bg-gray-400 text-white'}">
            SPELLS
        </button>
        <button on:click={()=>menuOption = 2} class="p-2 border border-gray-400 hover:bg-gray-400 hover:text-white rounded {menuOption === 2 && 'bg-gray-400 text-white'}">
            DESCRIPTIONS
        </button>
        <button on:click={()=>menuOption = 3} class="p-2 border border-gray-400 hover:bg-gray-400 hover:text-white rounded {menuOption === 3 && 'bg-gray-400 text-white'}">
            FEATURES & TRAITS
        </button>
        <button on:click={()=>menuOption = 4} class="p-2 border border-gray-400 hover:bg-gray-400 hover:text-white rounded {menuOption === 4 && 'bg-gray-400 text-white'}">
            LANGUAGES & EQUIPMENT
        </button>
    </ul>
    <div class="max-h-[600px] overflow-auto">
        {#if menuOption == 0}
        <Actions/>
        {:else if menuOption == 1}
        <Spells/>
        {:else if menuOption == 2}
            <Description/>
        {:else if menuOption == 3}
            <FeaturesTraits/>
        {:else if menuOption == 4}
        <LangEquip/>
        {/if}
    </div>
</div>