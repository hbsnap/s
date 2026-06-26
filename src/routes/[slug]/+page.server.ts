import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';
import { getAllLinks } from '$lib/links';

const linkVars = () => getAllLinks().filter((l) => l.slug !== '/');

export const entries: EntryGenerator = () => {
	return linkVars().map((v) => ({ slug: v.slug.slice(1, -1) }));
};

export const load: PageServerLoad = ({ params }) => {
	const entry = linkVars().find((v) => v.slug === `/${params.slug}/`);
	if (!entry) {
		error(404, `link "${params.slug}" is not configured`);
	}
	return { destination: entry.destination };
};
