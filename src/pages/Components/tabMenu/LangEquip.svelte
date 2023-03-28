<script>
  import "trix";
  import "trix/dist/trix.css"; // import the styles
  import {currentCharacter} from "../../../storeUser"
 
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

<style>
  .trix-editor-wrapper {
    /* You can add custom styles for the editor wrapper here */
  }
  

  /* button[data-trix-action="attachFiles"]{
    display: none;
  }  */
</style>
