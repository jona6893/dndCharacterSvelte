<script>
  import "trix";
  import "trix/dist/trix.css"; // import the styles
  import {currentCharacter} from "../../../storeUser"
 
  let trixEditorFeats;
  let trixEditorTraits;
  let feats = "";
  let traits = "";

  function handleTrixChangeFeat(event) {
    feats = event.target.value;
    console.log(feats);
    currentCharacter.update((character) => {
    return {
      ...character,features:feats 
    };
  });

  }
 
  function handleTrixChangeTraits(event) {
    traits = event.target.value;

    currentCharacter.update((character) => {
    return {
      ...character,traits:traits 
    };
  });

  }

</script>

<h2 class="text-center font-semibold">FEATURES</h2>
<div class="trix-editor-wrapper ">
  <input id="trix-feats" type="hidden" bind:value="{$currentCharacter.features}" />
  <trix-editor input="trix-feats" on:trix-change="{handleTrixChangeFeat}" bind:this="{trixEditorFeats}"></trix-editor>
</div>
<h2 class="text-center mt-4 font-semibold">TRAITS</h2>
<div class="trix-editor-wrapper">
  <input id="trix-traits" type="hidden" bind:value="{$currentCharacter.traits}" />
  <trix-editor input="trix-traits" on:trix-change="{handleTrixChangeTraits}" bind:this="{trixEditorTraits}"></trix-editor>
</div>

<style>
  .trix-editor-wrapper {
    /* You can add custom styles for the editor wrapper here */
  }
  

  /* button[data-trix-action="attachFiles"]{
    display: none;
  }  */
</style>
