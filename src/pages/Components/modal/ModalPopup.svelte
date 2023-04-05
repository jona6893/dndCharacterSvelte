
<script>
    import {fade} from 'svelte/transition';
    export let modalStatus;;


  // Stop the popup from closing when the user clicks the children of the popup
  function handleChildClick(event) {
    event.stopPropagation();
  }

// empty function to aviod errors
  function handleKeypress() {
  }



</script>




<div transition:fade
  on:click={() => {
    modalStatus = !modalStatus;
  }}
  on:keydown={handleKeypress}
class="fixed w-full h-full inset-0 bg-slate-600/25 flex items-center justify-center z-10">

    <div on:keydown={handleKeypress}
     on:click={handleChildClick} class="w-9/12 h-4/6 bg-white text-black flex gap-2 overflow-auto justify-between p-8 rounded relative">
          <!-- Close Button -->
    <button
      class="absolute hover:bg-gray-200 rounded-full top-[5px] left-[5px] border-2 border-black"
      on:click={() => {
        modalStatus = !modalStatus;
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <slot>

    </slot>
    </div>
</div>