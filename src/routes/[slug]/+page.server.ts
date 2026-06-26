import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';

const linkEnvVars = () => {
	const vars: { slug: string; destination: string }[] = [];
	for (const [key, value] of Object.entries(process.env)) {
		if (key.startsWith('link_') && key !== 'link_default' && value) {
			const idx = value.indexOf('|');
			if (idx === -1) continue;
			const slug = value.slice(0, idx);
			const destination = value.slice(idx + 1);
			if (slug && destination) vars.push({ slug, destination });
		}
	}
	return vars;
};

export const entries: EntryGenerator = () => {
	return linkEnvVars().map((v) => ({ slug: v.slug }));
};

export const load: PageServerLoad = ({ params }) => {
	const entry = linkEnvVars().find((v) => v.slug === params.slug);
	if (!entry) {
		error(404, `link "${params.slug}" is not configured`);
	}
	return { destination: entry.destination };
};
