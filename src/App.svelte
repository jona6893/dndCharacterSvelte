<script>
  import GoogleAuth from "./GoogleAuth.svelte";
  import { googleUser } from "./storeUser";
  import { onMount } from "svelte";
  import { Router, Route, Link } from "svelte-routing";
  import { signOut } from "firebase/auth";
  import { auth } from "./firebase";
  import { navigate } from "svelte-routing";
  import Homepage from "./pages/Homepage.svelte";

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };
</script>

<main>
  <Router>
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/main">Main</Link>
      {#if $googleUser}
        <button on:click={logout}>Logout</button>
      {/if}
    </nav>
    <div>
      <Route path="/login" component={GoogleAuth} />
      <Route path="/main" component={Homepage} />
    </div>
  </Router>
</main>
