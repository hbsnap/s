<script lang="ts">
	let { destination }: { destination: string } = $props();

	$effect(() => {
		const url = new URL(destination, window.location.href);
		if (window.location.search) {
			url.search = window.location.search;
		}
		window.location.replace(url.toString());
	});
</script>

<svelte:head>
	<meta http-equiv="refresh" content="0; url={destination}">
</svelte:head>

<p>
	<a href={destination}>Click here</a> if you are not redirected automatically.
</p>
