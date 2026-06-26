<script lang="ts">
	let { destination }: { destination: string } = $props();

	$effect(() => {
		const query = window.location.search;
		if (query) {
			const sep = destination.includes('?') ? '&' : '?';
			window.location.replace(`${destination}${sep}${query.slice(1)}`);
		}
	});
</script>

<svelte:head>
	<meta http-equiv="refresh" content="0; url={destination}">
</svelte:head>

<p>
	<a href={destination}>Click here</a> if you are not redirected automatically.
</p>
