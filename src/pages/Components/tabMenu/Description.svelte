<script>
  import "trix";
  import "trix/dist/trix.css"; // import the styles
  import {currentCharacter} from "../../../storeUser"
 
  let trixEditorPerson;
  let trixEditorIdeals;
  let trixEditorBonds;
  let trixEditorFlaws;
  let lang = "";
  let equip = "";

  function handleTextfields(event) {
    let value = event.target.value;
    let name = event.target.name;
    console.log(lang);
    currentCharacter.update((character) => {
    return {
      ...character,[name]:value 
    };
  });
  console.log($currentCharacter[name]);
  }
 

</script>

<h2 class="text-center font-semibold">PERSONALITY TRAITS</h2>
<div class="trix-editor-wrapper">
  <input name="personalityTraits" id="trix-person" type="hidden" bind:value="{$currentCharacter.personalityTraits}" />
  <trix-editor input="trix-person" on:trix-change="{handleTextfields}" bind:this="{trixEditorPerson}"></trix-editor>
</div>
<h2 class="text-center mt-4 font-semibold">IDEALS</h2>
<div class="trix-editor-wrapper">
  <input name="ideals" id="trixi-ideals" type="hidden" bind:value="{$currentCharacter.ideals}" />
  <trix-editor input="trixi-ideals" on:trix-change="{handleTextfields}" bind:this="{trixEditorIdeals}"></trix-editor>
</div>
<h2 class="text-center mt-4 font-semibold">BONDS</h2>
<div class="trix-editor-wrapper">
  <input name="bonds" id="trix-bonds" type="hidden" bind:value="{$currentCharacter.bonds}" />
  <trix-editor input="trix-bonds" on:trix-change="{handleTextfields}" bind:this="{trixEditorBonds}"></trix-editor>
</div>
<h2 class="text-center mt-4 font-semibold">FLAWS</h2>
<div class="trix-editor-wrapper">
  <input name="flaws" id="trix-flaws" type="hidden" bind:value="{$currentCharacter.flaws}" />
  <trix-editor input="trix-flaws" on:trix-change="{handleTextfields}" bind:this="{trixEditorFlaws}"></trix-editor>
</div>

<style>
  .trix-editor-wrapper {
    /* You can add custom styles for the editor wrapper here */
  }
  

  /* button[data-trix-action="attachFiles"]{
    display: none;
  }  */
</style>
