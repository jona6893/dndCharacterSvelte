<script>
  import Actions from "./tabMenu/Actions.svelte";


</script>



<div class="bg-slate-400 text-white grid p-4 col-span-2">
    <ul class="flex gap-4">
        <button class="p-2 border border-white hover:bg-slate-500">
            ACTIONS
        </button>
        <button class="p-2 border border-white hover:bg-slate-500">
            SPELLS
        </button>
        <button class="p-2 border border-white hover:bg-slate-500">
            FEATURES & TRAITS
        </button>
        <button class="p-2 border border-white hover:bg-slate-500">
            LANGUAGES & EQUIPMENT
        </button>
    </ul>
    <div class="min-h-[250px]">
        <Actions/>
    </div>
</div>