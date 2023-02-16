<script>
	import Button from './shared/Button.svelte';
	import Tabs from "./shared/Tabs.svelte";
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import JobList from "./components/JobList.svelte";
	import CreateJobForm from "./components/CreateJobForm.svelte";
	import SearchJobs from "./components/SearchJobs.svelte";
	
	import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
    
	import { onMount } from 'svelte';


	import app from './FireStore.js';

	//tabs
	let items = ['Aktuell', 'Neuer Auftrag', 'Archiv', 'Suchen'];
	let activeItem = 'Aktuell';

	const tabChange = (e) => {
		activeItem = e.detail;
	}

	const handleAdd = (e) => {
		
		activeItem = 'Aktuell';
	}

	

    let email = '';
    let password = '';
	let user = null;

    
    const login = async () => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
  	  .then((userCredential) => {
      
      // Signed in 
      user = userCredential.user;
      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      });
    }
  
	const logout = async () => {
      const auth = getAuth();
      signOut(auth).then(() => {
		user = null;
	  	activeItem = 'Aktuell';
	  })
	}

	onMount(async () => {
		const auth = getAuth();
		onAuthStateChanged(auth, (newUser) => {
			user = newUser
		})
	}
	)
</script>
<Header />

<main>
	{#if (!user)}
	<div>
		<form on:submit|preventDefault={login}>
			<div class="form-field">
				<label for="email">E-Mail</label>
				<input type="email" id="email" bind:value={email}>
			   
			</div>
			<div class="form-field">
				<label for="password">Passwort</label>
				<input type="password" id="password"bind:value={password}>
				
			</div>
			<Button type="secondary" flat={false}>LOGIN</Button>
		</form>
	</div>
	{/if}
	{#if user}
	<div>
		<p class="loginfo">logged as {user.email}</p>
		<form>
			<Button type="primary" flat={false} on:click={logout}>LOGOUT</Button>
		</form>
	</div>
		<h1>Ufftragsbuch-Online</h1>
		<Tabs {activeItem} {items} on:tabChange={tabChange}/>
		{#if activeItem === 'Aktuell'}
			<JobList archiv={false}/>
			{:else if activeItem === 'Neuer Auftrag'}
			<CreateJobForm on:add={handleAdd}/>
			{:else if activeItem === 'Archiv'}
			<JobList archiv={true}/>
			{:else if activeItem === 'Suchen'}
			<SearchJobs />
		{/if}
	{/if}	
</main>
<Footer />
<style>
	main {
		max-width: 1600px;
		margin: 20px auto;
	}
	h1{
		text-align: center;
		color: #555;
	}
	form{
      width: 600px;
      margin: 0 auto;
      text-align: center;
  }
  .form-field{
      margin: 18px auto;
      border: solid 2px crimson;
      background-color: lightgray;
      border-radius: 6px;
  }
  input {
      width: 95%;
      border-radius: 6px;
      margin: 10px;
  }

  label{
      margin: 10px;
      text-align: left;
  }
  .loginfo {
		text-align: center;
        color: #aaa;
        font-size: 14px;
    }
</style>