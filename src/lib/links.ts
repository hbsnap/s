export function getAllLinks(): { slug: string; destination: string }[] {
	const links: { slug: string; destination: string }[] = [];
	const def = process.env['link_default'];
	if (def) links.push({ slug: '/', destination: def });
	for (const [key, value] of Object.entries(process.env)) {
		if (key.startsWith('link_') && key !== 'link_default' && value) {
			const idx = value.indexOf('|');
			if (idx === -1) continue;
			const slug = value.slice(0, idx);
			const destination = value.slice(idx + 1);
			if (slug && destination) links.push({ slug: `/${slug}/`, destination });
		}
	}
	return links;
}
