<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import JobList from "./components/JobList.svelte";
	import CreateJobForm from "./components/CreateJobForm.svelte";
	import Tabs from "./shared/Tabs.svelte";
	import Test from "./components/Test.svelte";

	//tabs
	let items = ['Current Jobs', 'Add New Job'];
	let activeItem = 'Current Jobs';

	const tabChange = (e) => {
		activeItem = e.detail;
	}

	const handleAdd = (e) => {
		
		activeItem = 'Current Jobs';

	}

</script>
<Header />
<main>
	<Test />
	<h1>Ufftragsbuch-Online</h1>
	<Tabs {activeItem} {items} on:tabChange={tabChange}/>
	{#if activeItem === 'Current Jobs'}
		<JobList />
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