<script> 
import  {currentCharacter} from "../../storeUser"
</script>

<div  class="bg-slate-400 text-white">
    {#if $currentCharacter !== null && $currentCharacter.name!== undefined}
    <h2>Character's name: {$currentCharacter.name}</h2>
    <p>Level: {$currentCharacter.level}</p>
    <p>Race: {$currentCharacter.race}</p>
    <p>Class: {$currentCharacter.class}</p>
    <p>Alignment: {$currentCharacter.alignment}</p>
    {/if}
</div>