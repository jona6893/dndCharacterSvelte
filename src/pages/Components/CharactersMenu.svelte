<script>
  import { onMount } from 'svelte';
  import { db } from '../../firebase';
    import {userData} from '../../storeUser'
   import { collection, doc, addDoc } from "firebase/firestore";
    setTimeout(() => {
        console.log($userData)
    },500)
let showChar = false
let showChar2 = false

let classes;
let races;
let alignments;

function closePopup() {
    showChar2 = false;
  }
function handleChildClick(event) {
    event.stopPropagation();
  }
function handleKeypress() {

  }
 function handleCharacterCreate(event) {
    event.preventDefault();

   console.log(event.target.name.value)
} 
onMount(() =>{
//fetch Data
async function fetchData(endpoint) {
  const response = await fetch(`https://www.dnd5eapi.co/api/${endpoint}`);
  const data = await response.json();
  return data;
}
//fetch Classes
async function getDndClasses() {
  classes = await fetchData('classes');
  console.log(classes.results);
}
// fetch Races
async function getDndRaces() {
  races = await fetchData('races');
  // console.log(races.results);
}
// fetch Alignments
async function getDndAlignments() {
  alignments = await fetchData('alignments');
  // console.log(alignments.results);
}

getDndRaces();
getDndClasses();
getDndAlignments();
})





  async function addCharacter(character) {
    if (userData) {
      try {
        const charactersRef = collection(doc(db, 'Dnd', $userData.uid), 'Characters');
        await addDoc(charactersRef, character);
      } catch (error) {
        console.error("Error adding character:", error);
      }
    } else {
      console.error("User not signed in");
    }
  }

  async function createNewCharacter(event) {
    event.preventDefault();
    let name = event.target.name.value
    let race = event.target.race.value
    let raceSelct = event.target.raceSelct.value
    let level = event.target.level.value
    let klass = event.target.class.value
    let classSelct = event.target.classSelct.value
    let alignment = event.target.alignment.value
    let alignmentSelct = event.target.alignmentSelct.value

    if(raceSelct.length > 0 && race.length > 0){
        raceSelct = ''
    }
    if(classSelct.length > 0 && klass.length > 0){
        classSelct = ''
    }
    if(alignmentSelct.length > 0 && race.alignment > 0){
        alignmentSelct = ''
    }


    const newCharacter = {
      name,
      level,
      ...(race.length <= 0 ? { race: raceSelct } : { race: race }),
      ...(klass.length <= 0 ? { class: classSelct } : { class: klass }),
      ...(alignment.length <= 0 ? { alignment:alignmentSelct } : { alignment:alignment }),
      // Add more character properties here
    };
    await addCharacter(newCharacter);
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
        <div class="bg-slate-600 min-w-min w-80 flex flex-col p-4 rounded" on:click={handleChildClick} on:keydown={handleKeypress}>
            <button on:click={()=>showChar2 = false}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</button>
            <form action="" class="flex flex-col p-4 gap-4 items-center" on:submit={createNewCharacter}>
                <label for="" class="grid gap-1 text-sm font-thin">
                    Name:
                    <input name="name" required placeholder="Character Name" type="text" class="text-base font-normal text-black p-1 rounded">
                </label>
                <label for="" class="grid gap-1 text-sm font-thin">
                    Level:
                    <input name="level" placeholder="Character Level" type="text" class="text-base font-normal text-black p-1 rounded">
                </label>
                <label for="" class="grid gap-1 text-sm font-thin border border-white rounded p-2">
                    Type a Race:
                    <input name="race" placeholder="Character Race" type="text" class="text-base font-normal text-black p-1 rounded">
                    or Select a Race:
                    <select name="raceSelct" id="" class="text-base font-normal text-black p-1 rounded">
                        <option value="select">Select a Race</option>
                        {#if races !== undefined}
                            
                        
                        {#each races.results as race }
                            <option value={race.name}>{race.name}</option>
                        {/each}{/if}
                    </select>
                </label>
                <label for="" class="grid gap-1 text-sm font-thin border border-white rounded p-2">
                    Type a Class:
                    <input name="class" placeholder="Character Class" type="text" class="text-base font-normal text-black p-1 rounded">
                    or Select a Class:
                    <select name="classSelct" id="" class="text-base font-normal text-black p-1 rounded">
                        <option value="select">Select a Race</option>
                        {#if classes !== undefined}
                            
                        
                        {#each classes.results as klass }
                            <option value={klass.name}>{klass.name}</option>
                        {/each}{/if}
                    </select>
                </label>
                <label for="" class="grid gap-1 text-sm font-thin border border-white rounded p-2">
                   Type an Alignment:
                    <input name="alignment" placeholder="Character Alignment" type="text" class="text-base font-normal text-black p-1 rounded">
                    or Select an Alignment:
                    <select name="alignmentSelct" id="" class="text-base font-normal text-black p-1 rounded">
                        <option value="select">Select a Race</option>
                        {#if alignments !== undefined}
                            
                        
                        {#each alignments.results as align }
                            <option value={align.name}>{align.name}</option>
                        {/each}{/if}
                    </select>
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    </div>

</div>
