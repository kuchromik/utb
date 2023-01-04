<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Tabs from "./shared/Tabs.svelte";

	//tabs
	let items = ['Current Jobs', 'Add New Job'];
	let activeItem = 'Current Jobs';

	const tabChange = (e) => {
		activeItem = e.detail;
	}

</script>
<Header />
<main>
	<h1>Ufftragsbuch-Online</h1>
	<Tabs {activeItem} {items} on:tabChange={tabChange}/>
	{#if activeItem === 'Current Jobs'}
		<p>Joblist comes here</p>
	{:else if activeItem === 'Add New Job'}
		<p>Create New Job comes here</p>
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