<script>
  import Actions from "./tabMenu/Actions.svelte";
  import Spells from "./tabMenu/Spells.svelte";

  let menuOption = 0

</script>



<div class="bg-slate-400 text-white grid p-4 col-span-2">
    <ul class="flex gap-4">
        <button on:click={()=>menuOption = 0} class="p-2 border border-white hover:bg-slate-500 rounded">
            ACTIONS
        </button>
        <button on:click={()=>menuOption = 1} class="p-2 border border-white hover:bg-slate-500 rounded">
            SPELLS
        </button>
        <button on:click={()=>menuOption = 2} class="p-2 border border-white hover:bg-slate-500 rounded">
            FEATURES & TRAITS
        </button>
        <button on:click={()=>menuOption = 3} class="p-2 border border-white hover:bg-slate-500 rounded">
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