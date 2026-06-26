<script lang="ts">
	let { data } = $props();
</script>

<h1>Debug — Links</h1>

<table>
	<thead>
		<tr>
			<th>Path</th>
			<th>Destination</th>
		</tr>
	</thead>
	<tbody>
		{#each data.links as link}
			<tr>
				<td><a href={link.slug}>{link.slug}</a></td>
				<td><a href={link.destination}>{link.destination}</a></td>
			</tr>
		{/each}
	</tbody>
</table>
