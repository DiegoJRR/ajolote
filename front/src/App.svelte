<script>
	import { Router, Route, Link } from "svelte-navigator";
  import History from "./History.svelte";
    import Login from "./History.svelte";
</script>

<Router>
    <header>
      <h1>Ajolote</h1>
  
      <nav>
        <Link to="/">Home</Link>
        <Link to="about">About</Link>
        <Link to="history">History</Link>
      </nav>
    </header>
  
    <main>
      <Route path="history">
        <History />
      </Route>
  
      <Route path="/">
        <h3>Home</h3>
        <p>Home sweet home...</p>
      </Route>
  
      <Route path="about">
        <h3 class="text-tahiti">About</h3>
        <p class="text-tahiti">That's what it's all about!</p>
      </Route>
    </main>
  </Router>