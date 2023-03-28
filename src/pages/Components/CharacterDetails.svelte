<script>
  import { currentCharacter } from "../../storeUser";
  import { storage } from "../../firebase";
  import { fly,fade } from 'svelte/transition';
  import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from "firebase/storage";
  import { userData, googleUser } from "../../storeUser";

  let imageUrl = "";
  let tooLarge = false;
  let stockPortrait = "../../../public/stockPortrait.svg";

  // updates name class race level and alignment
  function updateDetails(e, field) {
    e.preventDefault();

    currentCharacter.update((character) => {
      return { ...character, [field]: e.target.value };
    });
  }

 async function uploadImage(event) {
  if (event.target.files[0].size >= 5000000) {
    imageToLarge();
  } else {
    const file = event.target.files[0];
    const fileName = `${Date.now()}-${file.name}`; // To generate a unique file name

    const folderPath = `images/${$googleUser.uid}/${$currentCharacter.id}`;
    const folderRef = ref(storage, folderPath);

    try {
      // Delete all existing images in the folder
      const listResult = await listAll(folderRef);
      await Promise.all(
        listResult.items.map((item) => {
          return deleteObject(item);
        })
      );

      // Upload the new image
      const storageRef = ref(storage, `${folderPath}/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            reject(error);
 },
      () => {
        resolve(uploadTask.snapshot);
      }
    );
  });

  const downloadURL = await getDownloadURL(storageRef);
  imageUrl = downloadURL;
} catch (error) {
  console.error("Error uploading image:", error);
}
currentCharacter.update((character) => {
  return { ...character, image: imageUrl };
});
}
}





  function imageToLarge() {
    tooLarge = true;
    setTimeout(() => {
      tooLarge = false;
    },2000)
  }
</script>

<div class=" text-white flex items-center justify-center gap-4">
  {#if $currentCharacter !== null && $currentCharacter.name !== undefined}
    <!-- Character Portrait -->
    <div class="relative">
      <label for="myfile" class="cursor-pointer grid group">
      <img
        class="w-20 h-20 border border-black rounded bg-white object-cover col-start-1 row-start-1 "
        src={$currentCharacter.image ? $currentCharacter.image : stockPortrait}
        alt=""
        />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 hidden group-hover:block p-1 shadow col-start-1 row-start-1 bg-white text-black rounded m-2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
      </svg>

      </label>
        <input id="myfile" class="hidden" type="file" accept="image/*" on:change={uploadImage} />
      {#if tooLarge}
      <div in:fly="{{ y: -50, duration: 300 }}" out:fade class="absolute w-32 h-10 bg-white shadow-md top-1 left-0 rounded flex items-center justify-center">
        <span class="text-black my-auto">File too large.</span>
      </div>
      {/if}
    </div>
    <!-- Character Details -->
    <div>
      <p class="flex gap-2 group relative max-w-max">
         <input
          on:change={(e) => updateDetails(e, "name")}
          style="width:{$currentCharacter.name.length}ch"
          class="bg-transparent cursor-pointer"
          value={$currentCharacter.name ? $currentCharacter.name : ""}
          type="text"
        /><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 hidden group-hover:block absolute left-full"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </p>
      <div class="flex">
        
        <p class="flex gap-2 group relative max-w-max">
          <input
          on:change={(e) => updateDetails(e, "race")}
          style="width:{$currentCharacter.race.length}ch"
          class="bg-transparent cursor-pointer"
          value={$currentCharacter.race ? $currentCharacter.race : ""}
          type="text"
          /><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 hidden group-hover:block"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
      </p>
      <p class="flex gap-2 group">
        -
         <input
          on:change={(e) => updateDetails(e, "class")}
          style="width:{$currentCharacter.class.length}ch"
          class="bg-transparent cursor-pointer"
          value={$currentCharacter.class ? $currentCharacter.class : ""}
          type="text"
        /><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 hidden group-hover:block"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </p>
      <p class="flex gap-2 group relative max-w-max text-xs text-gray-200 items-center">
        Lvl:
          <input
            on:change={(e) => updateDetails(e, "level")}
            style="width:{$currentCharacter.level.length}ch"
            class="bg-transparent cursor-pointer text-white text-base"
            value={$currentCharacter.level ? $currentCharacter.level : ""}
            type="text"
          /><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 hidden group-hover:block absolute left-full"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </p>
    </div>
      <p class="flex gap-2 group text-xs text-gray-200 items-center relative max-w-max">
        Alignment: <input
          on:change={(e) => updateDetails(e, "alignment")}
          style="width:{$currentCharacter.alignment.length}ch"
          class="bg-transparent cursor-pointer text-white text-base"
          value={$currentCharacter.alignment ? $currentCharacter.alignment : ""}
          type="text"
        /><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
            class="w-6 h-6 hidden group-hover:block absolute left-full"
          
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </p>
    </div>
  {/if}
</div>
