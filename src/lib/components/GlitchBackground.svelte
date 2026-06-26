<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import GlitchPlane from './GlitchPlane.svelte';
	import { CanvasTexture } from 'three';

	let { children }: { children: import('svelte').Snippet } = $props();

	let captureEl: HTMLDivElement;
	let capturedTexture = $state<CanvasTexture | null>(null);
	let innerWidth = $state(0);
	let innerHeight = $state(0);
	let captureTimeout: ReturnType<typeof setTimeout> | null = null;
	let aspect = $state(1);

	$effect(() => {
		if (innerWidth && innerHeight) {
			aspect = innerWidth / innerHeight;
		}
	});

	async function capture() {
		if (!captureEl || typeof window === 'undefined') return;
		try {
			const { default: html2canvas } = await import('html2canvas');
			await new Promise((r) => requestAnimationFrame(r));
			const canvas = await html2canvas(captureEl, {
				backgroundColor: '#151515',
				useCORS: true,
				scale: 1
			});
			const tex = new CanvasTexture(canvas);
			tex.colorSpace = 'srgb';
			capturedTexture = tex;
		} catch (e) {
			console.error('html2canvas capture failed', e);
		}
	}

	function debouncedCapture() {
		if (captureTimeout) clearTimeout(captureTimeout);
		captureTimeout = setTimeout(capture, 200);
	}

	$effect(() => {
		if (captureEl) {
			capture();
		}
	});

	$effect(() => {
		if (captureEl && innerWidth && innerHeight) {
			debouncedCapture();
		}
		return () => {
			if (captureTimeout) clearTimeout(captureTimeout);
		};
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="glitch-wrapper">
	<div bind:this={captureEl} class="glitch-content">
		{@render children()}
	</div>
	<div class="glitch-overlay">
		<Canvas>
			<GlitchPlane texture={capturedTexture} {aspect} />
		</Canvas>
	</div>
</div>

<style>
	.glitch-wrapper {
		position: fixed;
		inset: 0;
		z-index: 0;
	}

	.glitch-content {
		position: relative;
		z-index: 0;
		width: 100%;
		height: 100%;
	}

	.glitch-overlay {
		position: fixed;
		inset: 0;
		z-index: 1;
		pointer-events: none;
	}

	.glitch-overlay :global(canvas) {
		pointer-events: none;
	}
</style>