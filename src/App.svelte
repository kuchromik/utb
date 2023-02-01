<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import JobList from "./components/JobList.svelte";
	import Archiv from "./components/Archiv.svelte";
	import CreateJobForm from "./components/CreateJobForm.svelte";
	import Tabs from "./shared/Tabs.svelte";
	import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import Button from './shared/Button.svelte';


	//tabs
	let items = ['Aktuell', 'Neuer Auftrag', 'Archiv'];
	let activeItem = 'Aktuell';

	const tabChange = (e) => {
		activeItem = e.detail;
	}

	const handleAdd = (e) => {
		
		activeItem = 'Aktuell';

	}

	

    let email = '';
    let password = '';

    
    const login = () => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
  	  .then((userCredential) => {
      
      // Signed in 
      const user = userCredential.user;
      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      });
    }
  

</script>
<Header />

<main>
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

	<h1>Ufftragsbuch-Online</h1>
	<Tabs {activeItem} {items} on:tabChange={tabChange}/>
	{#if activeItem === 'Aktuell'}
		<JobList />
	{:else if activeItem === 'Neuer Auftrag'}
		<CreateJobForm on:add={handleAdd}/>
	{:else if activeItem === 'Archiv'}
	<Archiv />
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
 
</style>