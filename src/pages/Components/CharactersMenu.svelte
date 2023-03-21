<script>
    import {userData} from '../../storeUser'
    setTimeout(() => {
        console.log($userData)
    },500)
let showChar = false
let showChar2 = false
</script>

<div class="relative">
    <button on:click={()=>showChar2 = !showChar2} class="bg-slate-600 p-2 rounded hover:bg-slate-500 cursor-pointer">Create Character</button>
    <button on:click={()=>showChar = !showChar} class="bg-slate-600 p-2 rounded hover:bg-slate-500 cursor-pointer">View Characters</button>
   
    <div  on:mouseleave={()=>showChar = false} class="absolute flex-col bg-slate-600 rounded p-4 top-[110%] left-[52%] {showChar ? 'flex':'hidden' }">
        {#if  $userData !== null }
        <span class="p-2 font-thin">Characters:</span>
{#each $userData as data}
            <span class="hover:bg-slate-500 p-2 cursor-pointer">{data.id}</span>
        {/each}
        {/if}
    
    </div>
    <div  class="fixed flex-col bg-slate-600/25 rounded p-4 flex items-center justify-center w-screen h-screen inset-0 {showChar ? 'flex':'hidden' }">
        <div class="bg-slate-600 flex flex-col p-4">
            <button on:click={()=>showChar2 = false}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</button>
            <form action="" class="flex flex-col p-4 gap-4">
                <label for="">
                    Character Name
                    <input required type="text">
                </label>
                    Level
                <label for="">
                    Race
                    <input required type="text">
                </label>
                <label for="">
                    Class
                    <input required type="text">
                </label>
                <label for="">
                    Alignment
                    <input type="text">
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    </div>

</div>
