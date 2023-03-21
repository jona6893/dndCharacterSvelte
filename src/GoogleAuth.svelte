<script lang="ts">
  import { app, auth } from './firebase';
  import {
    getAuth,
    signOut,
    type User,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
  } from 'firebase/auth';
  import { onMount } from 'svelte';
  import { googleUser } from './storeUser';

  let user: User | null;

  const loginWithGoogle = () => {
    //const auth = getAuth(app);
    signInWithPopup(auth, new GoogleAuthProvider());
  };

  const logout = async () => {
    //const auth = getAuth(app);
    signOut(auth);
  };

  onMount(async () => {
    //const auth = getAuth(app);
    onAuthStateChanged(auth, (newUser) => {
      user = newUser;
      googleUser.set(user); // Update the googleUser store with the new user value
      console.log($googleUser);
    });
  });
</script>

{#if user}
	<p>Signed in with {user.providerData[0].providerId}!</p>
  <span class="text-red-500">{user.displayName}</span>
	<button on:click={logout}>Logout</button>
{:else}

<div class="inset-0 w-screen h-screen m-auto flex items-center justify-center">
	<button class="bg-blue-500 text-white p-2 rounded flex gap-2 items-center" on:click={loginWithGoogle}><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" class="w-8 h-8 bg-white rounded p-1"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg> Login with Google</button>
</div>
{/if}
