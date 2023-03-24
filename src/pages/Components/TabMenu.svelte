<script>
  import Actions from "./tabMenu/Actions.svelte";

  let menuOption = 0

</script>



<div class="bg-slate-400 text-white grid p-4 col-span-2">
    <ul class="flex gap-4">
        <button on:click={()=>menuOption = 0} class="p-2 border border-white hover:bg-slate-500">
            ACTIONS
        </button>
        <button on:click={()=>menuOption = 1} class="p-2 border border-white hover:bg-slate-500">
            SPELLS
        </button>
        <button on:click={()=>menuOption = 2} class="p-2 border border-white hover:bg-slate-500">
            FEATURES & TRAITS
        </button>
        <button on:click={()=>menuOption = 3} class="p-2 border border-white hover:bg-slate-500">
            LANGUAGES & EQUIPMENT
        </button>
    </ul>
    <div class="min-h-[250px]">
        {#if menuOption == 0}
        <Actions/>
        {:else if menuOption == 1}
        {:else if menuOption == 2}
        {:else if menuOption == 3}
        {/if}
    </div>
</div>