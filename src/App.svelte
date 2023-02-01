<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import JobList from "./components/JobList.svelte";
	import Archiv from "./components/Archiv.svelte";
	import CreateJobForm from "./components/CreateJobForm.svelte";
	import SignIn from "./components/SignIn.svelte";
	import Tabs from "./shared/Tabs.svelte";


	//tabs
	let items = ['Aktuell', 'Neuer Auftrag', 'Archiv'];
	let activeItem = 'Aktuell';

	const tabChange = (e) => {
		activeItem = e.detail;
	}

	const handleAdd = (e) => {
		
		activeItem = 'Aktuell';

	}

</script>
<Header />
<main>
	<SignIn />
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
</style>