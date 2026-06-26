<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import type { CanvasTexture } from 'three';

	let { texture, aspect }: { texture: CanvasTexture | null; aspect: number } = $props();

	const uniforms = {
		tDiffuse: { value: null as CanvasTexture | null },
		time: { value: 0 },
		distortion: { value: 2 },
		distortion2: { value: 2 },
		speed: { value: 1 },
		rollSpeed: { value: 0.25 },
		glitchIntensity: { value: 0.025 },
		scanlineIntensity: { value: 0.02 },
		scanlineCount: { value: 800.0 },
		vignetteIntensity: { value: 0.3 },
		rgbShift: { value: 0.001 }
	};

	useTask((delta: number) => {
		uniforms.time.value += delta;
	});

	$effect(() => {
		if (texture) {
			uniforms.tDiffuse.value = texture;
		}
	});

	const vertexShader = `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`;

	const fragmentShader = `
		uniform sampler2D tDiffuse;
		uniform float time;
		uniform float distortion;
		uniform float distortion2;
		uniform float speed;
		uniform float rollSpeed;
		uniform float glitchIntensity;
		uniform float scanlineIntensity;
		uniform float scanlineCount;
		uniform float vignetteIntensity;
		uniform float rgbShift;
		varying vec2 vUv;

		float rand(vec2 co) {
			return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
		}

		float noise(vec2 p) {
			vec2 i = floor(p);
			vec2 f = fract(p);
			f = f * f * (3.0 - 2.0 * f);
			float a = rand(i);
			float b = rand(i + vec2(1.0, 0.0));
			float c = rand(i + vec2(0.0, 1.0));
			float d = rand(i + vec2(1.0, 1.0));
			return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
		}

		void main() {
			vec2 uv = vUv;

			vec2 crtUV = uv * 2.0 - 1.0;
			vec2 offset = crtUV.yx / vec2(distortion, distortion2);
			crtUV += crtUV * offset * offset;
			crtUV = crtUV * 0.5 + 0.5;

			vec2 vignetteUV = crtUV * (1.0 - crtUV);
			float vignette = vignetteUV.x * vignetteUV.y * 15.0;
			vignette = pow(vignette, vignetteIntensity);

			float glitchLine = floor(uv.y * 20.0);
			float glitchNoise = noise(vec2(glitchLine * 10.0, time * speed * 2.0));

			if (glitchNoise > 0.9) {
				float amount = (glitchNoise - 0.9) * 10.0 * glitchIntensity;
				crtUV.x += (rand(vec2(time * speed, glitchLine)) - 0.5) * amount;
			}

			float rollAmount = sin(time * rollSpeed) * 0.02;
			crtUV.y = mod(crtUV.y + rollAmount, 1.0);

			float r = texture2D(tDiffuse, crtUV + vec2(rgbShift, 0.0)).r;
			float g = texture2D(tDiffuse, crtUV).g;
			float b = texture2D(tDiffuse, crtUV - vec2(rgbShift, 0.0)).b;
			vec3 color = vec3(r, g, b);

			float scanline = sin(crtUV.y * scanlineCount) * scanlineIntensity;
			color -= scanline;

			float noiseValue = rand(crtUV * time) * 0.05;
			color += noiseValue;

			color *= vignette;

			if (crtUV.x < 0.0 || crtUV.x > 1.0 || crtUV.y < 0.0 || crtUV.y > 1.0) {
				color = vec3(0.0);
			}

			gl_FragColor = vec4(color, 1.0);
		}
	`;
</script>

<T.Mesh>
	<!-- Plane size matches orthographic camera frustum: width = 2*aspect, height = 2 -->
	<T.PlaneGeometry args={[aspect * 8, 8]} />
	<T.ShaderMaterial
		uniforms={uniforms}
		vertexShader={vertexShader}
		fragmentShader={fragmentShader}
		depthWrite={false}
	/>
</T.Mesh>