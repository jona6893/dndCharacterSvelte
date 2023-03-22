<script>
    import {userData} from '../../storeUser'
    setTimeout(() => {
        console.log($userData)
    },500)
let showChar = false
let showChar2 = false

function closePopup() {
    showChar2 = false;
  }
function handleChildClick(event) {
    event.stopPropagation();
  }
function handleKeypress() {

  }
function handleCharacterCreate(event) {
   
}



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
    <div on:click={closePopup} on:keydown={handleKeypress} class="fixed flex-col bg-slate-600/25 rounded p-4 flex items-center justify-center w-screen h-screen inset-0 {showChar2 ? 'flex':'hidden' }">
        <div class="bg-slate-600 flex flex-col p-4" on:click={handleChildClick} on:keydown={handleKeypress}>
            <button on:click={()=>showChar2 = false}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</button>
            <form action="" class="flex flex-col p-4 gap-4 items-end" on:submit={handleCharacterCreate}>
                <label for="" class="grid gap-1 text-sm font-thin">
                    Character Name:
                    <input name="name" required type="text" class="text-base font-normal text-black p-1 rounded">
                </label>
                <label for="" class="grid gap-1 text-sm font-thin">
                    Level:
                    <input name="level" required type="text" class="text-base font-normal text-black p-1 rounded">
                </label>
                <label for="" class="grid gap-1 text-sm font-thin">
                    Race:
                    <input name="race" required type="text" class="text-base font-normal text-black p-1 rounded">
                </label>
                <label for="" class="grid gap-1 text-sm font-thin">
                    Class:
                    <input name="class" required type="text" class="text-base font-normal text-black p-1 rounded">
                </label>
                <label for="" class="grid gap-1 text-sm font-thin">
                    Alignment:
                    <input name="alignment" type="text" class="text-base font-normal text-black p-1 rounded">
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    </div>

</div>
