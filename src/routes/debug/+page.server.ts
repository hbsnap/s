import { getAllLinks } from '$lib/links';

export function load() {
	const links = getAllLinks();
	return { links };
}
