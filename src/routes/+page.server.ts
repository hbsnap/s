import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { withQuery } from '$lib/links';

export const load: PageServerLoad = ({ url }) => {
	const dest = process.env['link_default'];
	if (!dest) {
		error(500, 'link_default is not configured');
	}
	return { destination: withQuery(url, dest) };
};
