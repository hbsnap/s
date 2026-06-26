<script lang="ts">
	import { page } from "$app/state";
	import GlitchBackground from "$lib/components/GlitchBackground.svelte";

	const errorContent: Record<
		number | "default",
		{ title: string; message: string }
	> = {
		404: {
			title: "SINAL PERDIDO",
			message:
				"Parece que o canal que você procura saiu do ar ou mudou para uma nova frequência. Por favor, verifique sua antena ou retorne à nossa transmissão principal.",
		},
		500: {
			title: "PROBLEMAS TÉCNICOS",
			message:
				"Por favor, aguarde! Nosso transmissor está sofrendo uma sobrecarga de energia inesperada. A culpa não é sua — trata-se de uma falha em nosso hardware.",
		},
		default: {
			title: "SINAL EMBARALHADO",
			message:
				"Estamos recebendo sua solicitação, mas a transmissão apresenta forte interferência. A imagem está muito distorcida para ser exibida corretamente. Isso pode ser uma perturbação atmosférica temporária ou uma entrada inválida da sua parte..",
		},
	};

	const content = $derived(errorContent[page.status] || errorContent.default);
</script>

{#key page.url.pathname}
	<GlitchBackground>
		<div class="content-wrapper">
			<a href="/">
				<div class="content">
					<h1 class="error-code">{page.status}</h1>
					<p class="title">{content.title}</p>
					<p class="message">{content.message}</p>
					{#if page.error}
						<p class="error-message">{page.error.message}</p>
					{/if}
				</div>
			</a>
		</div>
	</GlitchBackground>
{/key}

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
		padding: 0.5rem;
		font-weight: 700;
		padding: 1rem;
	}

	.title {
		font-size: 1em;
	}
	.message {
		font-size: 0.5em;
	}
	.error-message {
		font-size: 0.4em;
		opacity: 0.7;
	}
</style>
