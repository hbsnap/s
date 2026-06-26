<script lang="ts">
	import GlitchBackground from "$lib/components/GlitchBackground.svelte";
	import { resolve } from '$app/paths';

</script>

<GlitchBackground>
	<div class="content-wrapper">
		<a href={resolve("/")}>
			<div class="content">
				<h1 class="error-code">404</h1>
				<p class="title">SINAL PERDIDO</p>
				<p class="message">
					Parece que o canal que você procura saiu do ar ou mudou para uma nova
					frequência. Por favor, verifique sua antena ou retorne à nossa
					transmissão principal.
				</p>
			</div>
		</a>
	</div>
</GlitchBackground>

<style>
	* {
		font-family: "Courier New", "Lucida Console", Courier, monospace;
	}

	.content-wrapper {
		background-color: black;
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 99999;
		padding-right: 15vw;
		padding-left: 15vw;
		box-sizing: border-box;
	}

	.content {
		align-items: center;
		color: #fff;
		display: flex;
		flex-direction: column;
		font-size: 2rem;
		gap: 1rem;
		height: 100%;
		justify-content: center;
		text-align: center;
		width: 100%;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	.error-code {
		color: #151515;
		background-color: #fff;
		width: fit-content;
		padding: 0.5rem 1rem;
		font-weight: 700;
	}

	.title {
		font-size: 1em;
	}
	.message {
		font-size: 0.5em;
	}
</style>
