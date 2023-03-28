<script>
      import  {currentCharacter} from "../../storeUser"
let stats = ['speed', 'armor', 'initiative', 'proficiency', 'inspiration']
let BasicStats = {speed:0, armor:0, initiative:0, proficiency:0, inspiration:false}

function updateBasicStats(attribute) {
  let name = attribute.target.name;
  let value = attribute.target.type === "checkbox" ? attribute.target.checked : attribute.target.value;

  console.log(name, value);

  currentCharacter.update((character) => {
    if (!character.basicStats) {
      console.log('basicStats is empty');
      let updateAttributes = BasicStats;
      updateAttributes[name] = value;
      return { ...character, basicStats: updateAttributes };
    } else {
      console.log('basicStats is not empty');
      let updateAttributes = { ...character.basicStats };
      updateAttributes[name] = value;
      return { ...character, basicStats: updateAttributes }; // Update basicStats instead of savingThrows
    }
  });
  console.log($currentCharacter);
}


</script>

<div class="col-start-3 row-start-1 flex flex-col h-full w-full items-center justify-around gap-4 ">
    <div class="flex gap-4">
    <!-- WALKING -->
    <div class="bg-gray-100 shadow-md flex flex-col justify-center w-28 items-center gap-2 p-4 ">
        <span class="text-xs">WALKING</span>
        <input on:change={(e) =>updateBasicStats(e)} class="w-8 bg-transparent border-b border-gray-400 text-lg text-center" type="text" name="speed" id="">
        <span class="text-xs">SPEED</span>
    </div>
     <!-- ARMOR CLASS -->
    <div class="bg-gray-100 shadow-md flex flex-col justify-center w-28 items-center gap-2 p-4 ">
        <span class="text-xs">ARMOR</span>
        <input on:change={(e) =>updateBasicStats(e)} class="w-8 bg-transparent border-b border-gray-400 text-lg text-center" type="text" name="armor" id="">
        <span class="text-xs">CLASS</span>
    </div>
</div>
<div class="flex justify-between gap-4 col-span-2">
    <!-- INITIATIVE -->
    <div class="bg-gray-100 shadow-md flex flex-col justify-center w-28 items-center gap-2 p-2 py-4">
       
        <input on:change={(e) =>updateBasicStats(e)} class="w-8 bg-transparent border-b border-gray-400 text-lg text-center" type="text" name="initiative" id="">
        <span class="text-xs">INITIATIVE</span>
    </div>
   
     <!-- PROFICIENCY -->
    <div class="bg-gray-100 shadow-md flex flex-col justify-center w-28 items-center gap-2 p-2 py-4 h-full">
        <span class="text-xs">PROFICIENCY</span>
        <input on:change={(e) =>updateBasicStats(e)} class="w-8 bg-transparent border-b border-gray-400 text-lg text-center" type="text" name="proficiency" id="">
        <span class="text-xs">BONUS</span>
    </div>
    <!-- INSPIRATION -->
    <div class="bg-gray-100 shadow-md flex flex-col justify-center items-center gap-2 p-2 py-4 relative">
        <input on:change={(e) =>updateBasicStats(e)} class="inspiration z-[1] w-8 bg-transparent border-b border-gray-400 text-lg text-center" type="checkbox" name="inspiration">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30" class="z-0 absolute top-[15px] w-10 h-10 text-blue-500 {$currentCharacter?.basicStats?.inspiration? 'block' : 'hidden'}"><g><path fill="#C53131" d="M25,14.2c-6.4,0-11.7,5.1-12.2,11.5H2.2V30h10.9h23.8h10.9v-4.3H37.2C36.7,19.3,31.4,14.2,25,14.2z"></path><path fill="#C53131" d="M26.9,10.3V0h-3.7v10.3c0.6-0.1,1.2-0.1,1.9-0.1S26.3,10.2,26.9,10.3z"></path><path fill="#C53131" d="M42.4,5.3l-3-2.3l-6.4,9.1c1.1,0.5,2.2,1.2,3.1,2.1L42.4,5.3z"></path><path fill="#C53131" d="M41.7,22.1l8.3-3.1l-1.3-3.6L40,18.7C40.7,19.7,41.3,20.9,41.7,22.1z"></path><path fill="#C53131" d="M17.1,12.1L10.6,3l-3,2.3l6.3,8.9C14.9,13.3,16,12.6,17.1,12.1z"></path><path fill="#C53131" d="M10,18.7l-8.7-3.3L0,18.9l8.3,3.1C8.7,20.9,9.3,19.7,10,18.7z"></path></g></svg>
        <span class="text-xs">INSPIRATION</span>
    </div>
</div>
</div>


<style>
      .inspiration {
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid #9ca3af;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
}

.inspiration:checked {
    background-color: #b91c1c;
    border:none;
}
</style>