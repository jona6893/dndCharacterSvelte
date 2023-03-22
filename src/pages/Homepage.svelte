<script>
  import CharacterDetails from "./Components/CharacterDetails.svelte";
    import Stats from "./Components/Stats.svelte";
    import {userData} from '../storeUser'
    import {fade} from 'svelte/transition'
</script>


{#if $userData}
<div transition:fade>
    <CharacterDetails/>
    <Stats />
</div>
{:else}
<div class="fixed w-full h-full inset-0 flex items-center justify-center">
    <h1 class="text-white text-5xl">LOADING DATA</h1>
</div>
{/if}