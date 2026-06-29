<script lang="ts">
	let { destination }: { destination: string } = $props();

	$effect(() => {
		window.location.replace(destination);
	});
</script>

<svelte:head>
	<meta http-equiv="refresh" content="0; url={destination}" />
</svelte:head>

<main>
	<div>
		<h1>Redirecionando</h1>
		<p>
			<a href={destination}>Clique aqui</a> se você não for redirecionado automaticamente.
		</p>
	</div>
</main>

<style>
	main {
		font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
			sans-serif;
		text-align: center;
		display: grid;
		position: fixed;
		inset: 0;
		place-items: center;
	}
</style>
