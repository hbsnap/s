<script lang="ts">
	let { children } = $props();
</script>

{@render children()}

<style>
	/* 1. Use a more-intuitive box-sizing model */
	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}

	/* 2. Remove default margin */
	:global(*:not(dialog)) {
		margin: 0;
	}

	/* 3. Enable keyword animations */
	@media (prefers-reduced-motion: no-preference) {
		:global(html) {
			interpolate-size: allow-keywords;
		}
	}

	:global(body) {
		/* 4. Increase line-height */
		line-height: 1.5;
		/* 5. Improve text rendering */
		-webkit-font-smoothing: antialiased;
	}

	/* 6. Improve media defaults */
	:global(img, picture, video, canvas, svg) {
		display: block;
		max-width: 100%;
	}

	/* 7. Inherit fonts for form controls */
	:global(input, button, textarea, select) {
		font: inherit;
	}

	/* 8. Avoid text overflows */
	:global(p, h1, h2, h3, h4, h5, h6) {
		overflow-wrap: break-word;
	}

	/* 9. Improve line wrapping */
	:global(p) {
		text-wrap: pretty;
	}
	:global(h1, h2, h3, h4, h5, h6) {
		text-wrap: balance;
	}

	/*
  10. Create a root stacking context
*/
	:global(#root, #__next) {
		isolation: isolate;
	}
</style>
