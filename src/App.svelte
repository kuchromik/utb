<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import CreateJobForm from "./components/CreateJobForm.svelte";
	import Tabs from "./shared/Tabs.svelte";

	//tabs
	let items = ['Current Jobs', 'Add New Job'];
	let activeItem = 'Current Jobs';

	const tabChange = (e) => {
		activeItem = e.detail;
	}

	//jobs

	let jobs = [
		{
			id: 1,
			customer: 'Giraffe',
			jobname: 'Visitenkarten',
			done: false,
		},
	]

	const handleAdd = (e) => {
		const job = e.detail;
		jobs = [job, ...jobs];
		console.log(jobs);
	}

</script>
<Header />
<main>
	<h1>Ufftragsbuch-Online</h1>
	<Tabs {activeItem} {items} on:tabChange={tabChange}/>
	{#if activeItem === 'Current Jobs'}
		<p>Joblist comes here</p>
	{:else if activeItem === 'Add New Job'}
		<CreateJobForm on:add={handleAdd}/>
	{/if}
</main>
<Footer />
<style>
	main {
		max-width: 960px;
		margin: 40px auto;
	}
	h1{
		text-align: center;
		color: #555;
	}
</style>