import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const destination = process.env['link_default'];
	if (!destination) {
		error(500, 'link_default is not configured');
	}
	return { destination };
};
