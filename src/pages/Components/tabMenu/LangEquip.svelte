<script>
  import "trix";
  import "trix/dist/trix.css"; // import the styles
  import {currentCharacter} from "../../../storeUser"
 
  const extras = ['CP','SP','EP','GP','PP']

  let trixEditorLang;
  let trixEditorEquip;
  let lang = "";
  let equip = "";

  function handleTrixChangeLang(event) {
    lang = event.target.value;
    console.log(lang);
    currentCharacter.update((character) => {
    return {
      ...character,languages:lang 
    };
  });
  console.log($currentCharacter);
  }
 
  function handleTrixChangeEquip(event) {
    equip = event.target.value;

    currentCharacter.update((character) => {
    return {
      ...character,equipment:equip 
    };
  });
  
  }
  function updateExtraStats(event) {
  let field = event.target.name;
  let value = event.target.value;


  currentCharacter.update((character) => {
    let newHitpoints = {...character[field]}
    newHitpoints = value;
    return { ...character, [field]: newHitpoints };
  });
  console.log($currentCharacter);
}



</script>

<h2 class="text-center font-semibold">Languages</h2>
<div class="trix-editor-wrapper">
  <input id="trix-lang" type="hidden" bind:value="{$currentCharacter.languages}" />
  <trix-editor input="trix-lang" on:trix-change="{handleTrixChangeLang}" bind:this="{trixEditorLang}"></trix-editor>
</div>
<h2 class="text-center mt-4 font-semibold">Equipment</h2>
<div class="trix-editor-wrapper">
  <input id="trix-equip" type="hidden" bind:value="{$currentCharacter.equipment}" />
  <trix-editor input="trix-equip" on:trix-change="{handleTrixChangeEquip}" bind:this="{trixEditorEquip}"></trix-editor>
</div>

<div class="flex gap-4">
{#each extras as extra }
  <label class="flex flex-row-reverse gap-2" for="">
    <input value={$currentCharacter?.[extra]? $currentCharacter[extra] : 0} on:change={updateExtraStats}
    name={extra}
 type="text" class="w-12 bg-transparent border-gray-400 border-b text-center">
    {extra}
  </label>
{/each}
</div>
<style>
  .trix-editor-wrapper {
    /* You can add custom styles for the editor wrapper here */
  }
  

  /* button[data-trix-action="attachFiles"]{
    display: none;
  }  */
</style>
