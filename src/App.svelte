<script>
  import GoogleAuth from "./GoogleAuth.svelte";
  import { googleUser } from "./storeUser";
  import { onMount } from "svelte";
  import { Router, Route, Link } from "svelte-routing";
  import { onAuthStateChanged, signOut } from "firebase/auth";
  import { auth } from "./firebase";
  import { navigate } from "svelte-routing";
  import Homepage from "./pages/Homepage.svelte";
  import { checkUserDocument } from './GoogleAuth.svelte';

   let unsubscribeCharacters;

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };
  onMount(() => {
  onAuthStateChanged(auth, async (newUser) => {
    if (unsubscribeCharacters) {
      unsubscribeCharacters(); // Unsubscribe from the previous user's characters
    }

    if (newUser) {
      unsubscribeCharacters = await checkUserDocument(newUser.uid);
      googleUser.set(newUser); // Update the googleUser store with the new user value
      navigate('/main'); // Navigate to the main page once the user is logged in
    } else {
      googleUser.set(null); // Set googleUser store value to null if the user is logged out
      navigate('/login'); // Navigate to the login page if the user is logged out
    }
    console.log($googleUser);
  });
});


</script>

<main>
  <Router>
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/main">Main</Link>
      {#if $googleUser}
        <button on:click={logout}>Logout</button>
        <span>User: {$googleUser.displayName} </span>
      {/if}
    </nav>
    <div>
      <Route path="/login" component={GoogleAuth} />
      <Route path="/main" component={Homepage} />
    </div>
  </Router>
</main>
